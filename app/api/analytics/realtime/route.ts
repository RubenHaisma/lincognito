import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const userId = await verifyToken(request);
    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get('clientId');
    const period = searchParams.get('period') || '7d';

    // Calculate date range
    const now = new Date();
    const daysBack = period === '7d' ? 7 : period === '30d' ? 30 : 90;
    const startDate = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000);

    // Build where clause
    const where: any = {
      userId,
      createdAt: { gte: startDate },
    };

    if (clientId) {
      where.clientId = clientId;
    }

    // Get real-time metrics
    const [
      totalPosts,
      totalEngagement,
      recentPosts,
      topPerformingPosts,
      engagementTrends,
      clientPerformance,
    ] = await Promise.all([
      // Total posts
      prisma.post.count({
        where: {
          ...where,
          status: 'PUBLISHED',
        },
      }),

      // Total engagement
      prisma.post.aggregate({
        where: {
          ...where,
          status: 'PUBLISHED',
        },
        _sum: {
          likes: true,
          comments: true,
          shares: true,
          views: true,
        },
      }),

      // Recent posts
      prisma.post.findMany({
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
        take: 10,
      }),

      // Top performing posts
      prisma.post.findMany({
        where: {
          ...where,
          status: 'PUBLISHED',
        },
        include: {
          client: {
            select: {
              id: true,
              name: true,
              company: true,
            },
          },
        },
        orderBy: [
          { likes: 'desc' },
          { comments: 'desc' },
          { shares: 'desc' },
        ],
        take: 5,
      }),

      // Engagement trends (daily data)
      prisma.$queryRaw`
        SELECT 
          DATE(created_at) as date,
          COUNT(*) as posts,
          SUM(likes) as likes,
          SUM(comments) as comments,
          SUM(shares) as shares,
          SUM(views) as views
        FROM posts 
        WHERE user_id = ${userId} 
          AND status = 'PUBLISHED'
          AND created_at >= ${startDate}
        GROUP BY DATE(created_at)
        ORDER BY date DESC
      `,

      // Client performance
      prisma.$queryRaw`
        SELECT 
          c.id,
          c.name,
          c.company,
          COUNT(p.id) as total_posts,
          SUM(p.likes) as total_likes,
          SUM(p.comments) as total_comments,
          SUM(p.shares) as total_shares,
          AVG(p.engagement_rate) as avg_engagement_rate
        FROM clients c
        LEFT JOIN posts p ON c.id = p.client_id 
          AND p.status = 'PUBLISHED'
          AND p.created_at >= ${startDate}
        WHERE c.user_id = ${userId}
        GROUP BY c.id, c.name, c.company
        ORDER BY total_likes DESC
      `,
    ]);

    const totalEngagementSum = 
      (totalEngagement._sum.likes || 0) +
      (totalEngagement._sum.comments || 0) +
      (totalEngagement._sum.shares || 0);

    const avgEngagementRate = totalPosts > 0 
      ? (totalEngagementSum / totalPosts / 100 * 4.2) 
      : 0;

    return NextResponse.json({
      overview: {
        totalPosts,
        totalEngagement: totalEngagementSum,
        totalViews: totalEngagement._sum.views || 0,
        avgEngagementRate: Number(avgEngagementRate.toFixed(2)),
      },
      recentPosts,
      topPerformingPosts,
      engagementTrends,
      clientPerformance,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Real-time analytics error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}