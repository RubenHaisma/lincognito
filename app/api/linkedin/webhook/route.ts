import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';
import crypto from 'crypto';

const LINKEDIN_WEBHOOK_SECRET = process.env.LINKEDIN_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = (await headers()).get('x-linkedin-signature');

    // Verify webhook signature
    if (!verifyLinkedInSignature(body, signature)) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    const event = JSON.parse(body);

    // Log webhook event
    await prisma.webhookEvent.create({
      data: {
        source: 'linkedin',
        eventType: event.eventType,
        eventId: event.eventId || crypto.randomUUID(),
        data: event as any,
      },
    });

    switch (event.eventType) {
      case 'SHARE_STATISTICS_UPDATE':
        await handleShareStatisticsUpdate(event);
        break;
      
      case 'MEMBER_ACTIVITY':
        await handleMemberActivity(event);
        break;
      
      case 'COMPANY_STATISTICS_UPDATE':
        await handleCompanyStatisticsUpdate(event);
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('LinkedIn webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

function verifyLinkedInSignature(body: string, signature: string | null): boolean {
  if (!signature || !LINKEDIN_WEBHOOK_SECRET) return false;

  const expectedSignature = crypto
    .createHmac('sha256', LINKEDIN_WEBHOOK_SECRET)
    .update(body)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

async function handleShareStatisticsUpdate(event: any) {
  const { shareUrn, statistics } = event.data;

  // Find post by LinkedIn URN
  const post = await prisma.post.findFirst({
    where: { linkedinUrn: shareUrn },
  });

  if (!post) return;

  // Update post metrics
  await prisma.post.update({
    where: { id: post.id },
    data: {
      likes: statistics.numLikes || post.likes,
      comments: statistics.numComments || post.comments,
      shares: statistics.numShares || post.shares,
      views: statistics.numViews || post.views,
      impressions: statistics.numImpressions || post.impressions,
      clicks: statistics.numClicks || post.clicks,
      engagementRate: calculateEngagementRate(statistics),
    },
  });

  // Create analytics snapshot
  await prisma.postAnalytics.create({
    data: {
      postId: post.id,
      likes: statistics.numLikes || 0,
      comments: statistics.numComments || 0,
      shares: statistics.numShares || 0,
      views: statistics.numViews || 0,
      impressions: statistics.numImpressions || 0,
      clicks: statistics.numClicks || 0,
      engagementRate: calculateEngagementRate(statistics),
      clickThroughRate: calculateClickThroughRate(statistics),
    },
  });

  // Create activity log
  await prisma.activity.create({
    data: {
      type: 'engagement_update',
      title: 'Post engagement updated',
      description: `Post metrics updated via LinkedIn webhook`,
      userId: post.userId,
      metadata: {
        postId: post.id,
        statistics,
      },
    },
  });
}

async function handleMemberActivity(event: any) {
  // Handle member activity events
  console.log('Member activity:', event);
}

async function handleCompanyStatisticsUpdate(event: any) {
  // Handle company page statistics
  console.log('Company statistics:', event);
}

function calculateEngagementRate(stats: any): number {
  const engagement = (stats.numLikes || 0) + (stats.numComments || 0) + (stats.numShares || 0);
  const impressions = stats.numImpressions || 1;
  return (engagement / impressions) * 100;
}

function calculateClickThroughRate(stats: any): number {
  const clicks = stats.numClicks || 0;
  const impressions = stats.numImpressions || 1;
  return (clicks / impressions) * 100;
}