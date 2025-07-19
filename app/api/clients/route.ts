import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { sendClientAddedEmail } from '@/lib/email';
import { z } from 'zod';

const clientSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  company: z.string().optional(),
  bio: z.string().optional(),
  tone: z.string().optional(),
  industry: z.string().optional(),
  linkedinUrl: z.string().url().optional().or(z.literal('')),
  brandGuidelines: z.string().optional(),
  hashtags: z.array(z.string()).optional(),
  keywords: z.array(z.string()).optional(),
});

export async function GET(request: NextRequest) {
  try {
    const userId = await verifyToken(request);
    
    const clients = await prisma.client.findMany({
      where: { userId },
      include: {
        posts: {
          select: {
            id: true,
            status: true,
            scheduledFor: true,
            likes: true,
            comments: true,
            shares: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(clients);
  } catch (error) {
    console.error('Get clients error:', error);
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await verifyToken(request);
    const body = await request.json();
    const data = clientSchema.parse(body);

    const client = await prisma.client.create({
      data: {
        ...data,
        userId,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    // Send client added notification email
    try {
      await sendClientAddedEmail(client.user.email, client.user.name, client.name);
    } catch (emailError) {
      console.error('Failed to send client added email:', emailError);
      // Don't fail client creation if email fails
    }

    return NextResponse.json(client);
  } catch (error) {
    console.error('Create client error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.message },
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}