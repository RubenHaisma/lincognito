import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { sendEmail } from '@/lib/email';
import { z } from 'zod';

const inviteMemberSchema = z.object({
  email: z.string().email('Invalid email address'),
  role: z.enum(['USER', 'ADMIN']).default('USER'),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await verifyToken(request);
    const { id: agencyId } = await params;

    // Verify user has access to this agency
    const agency = await prisma.agency.findFirst({
      where: {
        id: agencyId,
        OR: [
          { ownerId: userId },
          { members: { some: { id: userId } } },
        ],
      },
      include: {
        members: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            avatar: true,
          },
        },
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
      },
    });

    if (!agency) {
      return NextResponse.json(
        { error: 'Agency not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(agency.members);
  } catch (error) {
    console.error('Get agency members error:', error);
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await verifyToken(request);
    const { id: agencyId } = await params;
    const body = await request.json();
    const { email, role } = inviteMemberSchema.parse(body);

    // Verify user is agency owner
    const agency = await prisma.agency.findFirst({
      where: {
        id: agencyId,
        ownerId: userId,
      },
    });

    if (!agency) {
      return NextResponse.json(
        { error: 'Only agency owners can invite members' },
        { status: 403 }
      );
    }

    // Check if user exists
    let invitedUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!invitedUser) {
      // Create placeholder user for invitation
      invitedUser = await prisma.user.create({
        data: {
          email,
          name: email.split('@')[0],
          password: '', // Will be set when they accept invitation
          emailVerified: false,
          role,
        },
      });
    }

    // Add user to agency
    await prisma.user.update({
      where: { id: invitedUser.id },
      data: {
        agencyId,
        role,
      },
    });

    // Send invitation email
    try {
      await sendEmail({
        to: email,
        subject: `You've been invited to join ${agency.name}`,
        html: `
          <h1>Agency Invitation</h1>
          <p>You've been invited to join ${agency.name} as a ${role.toLowerCase()}.</p>
          <a href="${process.env.NEXTAUTH_URL}/accept-invitation?token=${invitedUser.id}">
            Accept Invitation
          </a>
        `,
      });
    } catch (emailError) {
      console.error('Failed to send invitation email:', emailError);
    }

    // Create activity log
    await prisma.activity.create({
      data: {
        type: 'member_invited',
        title: 'Team member invited',
        description: `Invited ${email} to join agency`,
        userId,
        metadata: {
          agencyId,
          invitedEmail: email,
          role,
        },
      },
    });

    return NextResponse.json({
      message: 'Invitation sent successfully',
      member: {
        id: invitedUser.id,
        name: invitedUser.name,
        email: invitedUser.email,
        role: invitedUser.role,
      },
    });
  } catch (error) {
    console.error('Invite member error:', error);
    
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