import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { z } from 'zod';

const postSchema = z.object({
  title: z.string().optional(),
  content: z.string().min(1, 'Content is required'),
  clientId: z.string().min(1, 'Client is required'),
  scheduledFor: z.string().datetime().optional(),
  hashtags: z.array(z.string()).optional(),
  mentions: z.array(z.string()).optional(),
});

export async function GET(request: NextRequest) {
  try {
    const userId = await verifyToken(request);
    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get('clientId');
    const status = searchParams.get('status');

    const where: any = { userId };
    if (clientId) where.clientId = clientId;
    if (status) where.status = status;

    const posts = await prisma.post.findMany({
      where,
      include: {
        client: {
          select: {
            id: true,
            name: true,
            company: true,
            avatar: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Get posts error:', error);
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
    const data = postSchema.parse(body);

    // Verify client belongs to user
    const client = await prisma.client.findFirst({
      where: {
        id: data.clientId,
        userId,
      },
    });

    if (!client) {
      return NextResponse.json(
        { error: 'Client not found' },
        { status: 404 }
      );
    }

    const post = await prisma.post.create({
      data: {
        ...data,
        userId,
        scheduledFor: data.scheduledFor ? new Date(data.scheduledFor) : null,
        status: data.scheduledFor ? 'SCHEDULED' : 'DRAFT',
      },
      include: {
        client: {
          select: {
            id: true,
            name: true,
            company: true,
            avatar: true,
          },
        },
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error('Create post error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}