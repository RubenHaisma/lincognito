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

    const syncResults = [];

    for (const post of posts) {
      try {
        const linkedinAPI = await getLinkedInAPIForClient(post.clientId);
        
        if (linkedinAPI && post.linkedinPostId) {
          // Get latest analytics from LinkedIn
          const analytics = await linkedinAPI.getPostAnalytics(post.linkedinPostId);
          
          // Update post with latest metrics
          const updatedPost = await prisma.post.update({
            where: { id: post.id },
            data: {
              likes: analytics.numLikes || post.likes,
              comments: analytics.numComments || post.comments,
              shares: analytics.numShares || post.shares,
              views: analytics.numViews || post.views,
              impressions: analytics.numImpressions || post.impressions,
              clicks: analytics.numClicks || post.clicks,
              engagementRate: calculateEngagementRate(analytics),
            },
          });

          // Create analytics snapshot
          await prisma.postAnalytics.create({
            data: {
              postId: post.id,
              likes: analytics.numLikes || 0,
              comments: analytics.numComments || 0,
              shares: analytics.numShares || 0,
              views: analytics.numViews || 0,
              impressions: analytics.numImpressions || 0,
              clicks: analytics.numClicks || 0,
              engagementRate: calculateEngagementRate(analytics),
              clickThroughRate: calculateClickThroughRate(analytics),
            },
          });

          syncResults.push({
            postId: post.id,
            success: true,
            metrics: analytics,
          });
        }
      } catch (error) {
        console.error(`Failed to sync analytics for post ${post.id}:`, error);
        syncResults.push({
          postId: post.id,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    // Update client analytics aggregates
    await updateClientAnalytics(userId);

    return NextResponse.json({
      message: `Synced analytics for ${syncResults.filter(r => r.success).length} posts`,
      results: syncResults,
      totalPosts: posts.length,
    });
  } catch (error) {
    console.error('Analytics sync error:', error);
    return NextResponse.json(
      { error: 'Failed to sync analytics' },
      { status: 500 }
    );
  }
}

async function updateClientAnalytics(userId: string) {
  const clients = await prisma.client.findMany({
    where: { userId },
    include: {
      posts: {
        where: { status: 'PUBLISHED' },
      },
    },
  });

  for (const client of clients) {
    const totalPosts = client.posts.length;
    const totalLikes = client.posts.reduce((sum, post) => sum + post.likes, 0);
    const totalComments = client.posts.reduce((sum, post) => sum + post.comments, 0);
    const totalShares = client.posts.reduce((sum, post) => sum + post.shares, 0);
    const totalViews = client.posts.reduce((sum, post) => sum + post.views, 0);
    const totalImpressions = client.posts.reduce((sum, post) => sum + post.impressions, 0);
    
    const avgEngagementRate = totalPosts > 0
      ? client.posts.reduce((sum, post) => sum + post.engagementRate, 0) / totalPosts
      : 0;

    // Upsert daily analytics
    await prisma.clientAnalytics.upsert({
      where: {
        clientId_period_date: {
          clientId: client.id,
          period: 'daily',
          date: new Date(new Date().toDateString()),
        },
      },
      update: {
        totalPosts,
        totalLikes,
        totalComments,
        totalShares,
        totalViews,
        totalImpressions,
        avgEngagementRate,
      },
      create: {
        clientId: client.id,
        period: 'daily',
        date: new Date(new Date().toDateString()),
        totalPosts,
        totalLikes,
        totalComments,
        totalShares,
        totalViews,
        totalImpressions,
        avgEngagementRate,
        followerGrowth: 0, // Would need LinkedIn API to get this
      },
    });
  }
}

function calculateEngagementRate(analytics: any): number {
  const engagement = (analytics.numLikes || 0) + (analytics.numComments || 0) + (analytics.numShares || 0);
  const impressions = analytics.numImpressions || 1;
  return (engagement / impressions) * 100;
}

function calculateClickThroughRate(analytics: any): number {
  const clicks = analytics.numClicks || 0;
  const impressions = analytics.numImpressions || 1;
  return (clicks / impressions) * 100;
}