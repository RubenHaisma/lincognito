import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { getLinkedInAPIForClient } from '@/lib/linkedin';

export async function POST(request: NextRequest) {
  try {
    const userId = await verifyToken(request);

    // Get all published posts for this user
    const posts = await prisma.post.findMany({
      where: {
        userId,
        status: 'PUBLISHED',
        linkedinPostId: { not: null },
      },
      include: {
        client: true,
      },
    });

    const updatedPosts = [];

    for (const post of posts) {
      try {
        const linkedinAPI = await getLinkedInAPIForClient(post.clientId);
        
        if (linkedinAPI && post.linkedinPostId) {
          // Get analytics from LinkedIn
          const analytics = await linkedinAPI.getPostAnalytics(post.linkedinPostId);
          
          // Update post with latest metrics
          const updatedPost = await prisma.post.update({
            where: { id: post.id },
            data: {
              likes: analytics.numLikes || post.likes,
              comments: analytics.numComments || post.comments,
              shares: analytics.numShares || post.shares,
              views: analytics.numViews || post.views,
            },
          });

          updatedPosts.push(updatedPost);
        }
      } catch (error) {
        console.error(`Failed to update analytics for post ${post.id}:`, error);
        // Continue with other posts even if one fails
      }
    }

    return NextResponse.json({
      message: `Updated analytics for ${updatedPosts.length} posts`,
      updatedPosts: updatedPosts.length,
    });
  } catch (error) {
    console.error('Analytics sync error:', error);
    return NextResponse.json(
      { error: 'Failed to sync analytics' },
      { status: 500 }
    );
  }
}