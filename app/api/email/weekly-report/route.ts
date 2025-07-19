import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendWeeklyReport } from '@/lib/email';
import { verifyToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // This would typically be called by a cron job
    // For demo purposes, we'll allow manual triggering
    
    // Get all users who have weekly reports enabled
    const users = await prisma.user.findMany({
      where: {
        emailVerified: true,
        // Add a field for notification preferences
      },
      include: {
        posts: {
          where: {
            createdAt: {
              gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
            },
          },
          include: {
            client: true,
          },
        },
      },
    });

    const emailPromises = users.map(async (user) => {
      // Calculate weekly stats
      const postsPublished = user.posts.filter(post => post.status === 'PUBLISHED').length;
      const totalEngagement = user.posts.reduce((sum, post) => sum + post.likes + post.comments + post.shares, 0);
      const avgEngagementRate = postsPublished > 0 ? (totalEngagement / postsPublished / 100 * 4.2).toFixed(1) : '0';
      const topPost = user.posts
        .sort((a, b) => (b.likes + b.comments + b.shares) - (a.likes + a.comments + a.shares))[0]?.content?.substring(0, 100) + '...' || 'No posts this week';

      const stats = {
        postsPublished,
        totalEngagement,
        avgEngagementRate,
        newFollowers: Math.floor(Math.random() * 50), // Mock data
        topPost,
      };

      try {
        await sendWeeklyReport(user.email, user.name, stats);
        return { userId: user.id, success: true };
      } catch (error) {
        console.error(`Failed to send weekly report to ${user.email}:`, error);
        return { userId: user.id, success: false, error: error instanceof Error ? error.message : 'Unknown error' };
      }
    });

    const results = await Promise.all(emailPromises);
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;

    return NextResponse.json({
      message: `Weekly reports sent: ${successful} successful, ${failed} failed`,
      results,
    });
  } catch (error) {
    console.error('Weekly report error:', error);
    return NextResponse.json(
      { error: 'Failed to send weekly reports' },
      { status: 500 }
    );
  }
}