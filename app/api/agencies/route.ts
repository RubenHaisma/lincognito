import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { z } from 'zod';

const agencySchema = z.object({
  name: z.string().min(1, 'Agency name is required'),
  slug: z.string().min(1, 'Agency slug is required'),
  description: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
});

export async function GET(request: NextRequest) {
  try {
    const userId = await verifyToken(request);
    
    // Get user's agency (either owned or member of)
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        ownedAgency: {
          include: {
            members: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
              },
            },
            clients: {
              include: {
                posts: {
                  select: {
                    id: true,
                    status: true,
                    likes: true,
                    comments: true,
                    shares: true,
                  },
                },
              },
            },
          },
        },
        agency: {
          include: {
            owner: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            members: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true,
              },
            },
          },
        },
      },
    });

    const agency = user?.ownedAgency || user?.agency;

    return NextResponse.json(agency);
  } catch (error) {
    console.error('Get agency error:', error);
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
    const data = agencySchema.parse(body);

    // Check if user already owns an agency
    const existingAgency = await prisma.agency.findFirst({
      where: { ownerId: userId },
    });

    if (existingAgency) {
      return NextResponse.json(
        { error: 'User already owns an agency' },
        { status: 400 }
      );
    }

    // Check if slug is available
    const slugExists = await prisma.agency.findUnique({
      where: { slug: data.slug },
    });

    if (slugExists) {
      return NextResponse.json(
        { error: 'Agency slug already taken' },
        { status: 400 }
      );
    }

    const agency = await prisma.agency.create({
      data: {
        ...data,
        ownerId: userId,
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // Update user role to agency owner
    await prisma.user.update({
      where: { id: userId },
      data: { role: 'AGENCY_OWNER' },
    });

    // Create activity log
    await prisma.activity.create({
      data: {
        type: 'agency_created',
        title: 'Agency created',
        description: `Created agency: ${agency.name}`,
        userId,
        metadata: {
          agencyId: agency.id,
          agencyName: agency.name,
        },
      },
    });

    return NextResponse.json(agency);
  } catch (error) {
    console.error('Create agency error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}