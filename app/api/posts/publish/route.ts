import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { getLinkedInAPIForClient } from '@/lib/linkedin';
import { z } from 'zod';

const publishSchema = z.object({
  postId: z.string().min(1, 'Post ID is required'),
});

export async function POST(request: NextRequest) {
  try {
    const userId = await verifyToken(request);
    const body = await request.json();
    const { postId } = publishSchema.parse(body);

    // Get post with client information
    const post = await prisma.post.findFirst({
      where: {
        id: postId,
        userId,
      },
      include: {
        client: true,
      },
    });

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    if (post.status === 'PUBLISHED') {
      return NextResponse.json(
        { error: 'Post is already published' },
        { status: 400 }
      );
    }

    // Get LinkedIn API instance for this client
    const linkedinAPI = await getLinkedInAPIForClient(post.clientId);

    if (!linkedinAPI) {
      return NextResponse.json(
        { error: 'LinkedIn not connected for this client' },
        { status: 400 }
      );
    }

    try {
      // Publish to LinkedIn
      let linkedinResponse;
      
      if (post.client.accountType === 'COMPANY' && post.client.linkedinProfileId) {
        linkedinResponse = await linkedinAPI.createCompanyPost(
          post.client.linkedinProfileId,
          post.content
        );
      } else {
        linkedinResponse = await linkedinAPI.createPost(post.content);
      }

      // Update post status
      const updatedPost = await prisma.post.update({
        where: { id: postId },
        data: {
          status: 'PUBLISHED',
          publishedAt: new Date(),
          linkedinPostId: linkedinResponse.id,
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

      return NextResponse.json(updatedPost);
    } catch (linkedinError) {
      console.error('LinkedIn API error:', linkedinError);
      return NextResponse.json(
        { error: 'Failed to publish to LinkedIn: ' + (linkedinError as Error).message },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Publish post error:', error);
    
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