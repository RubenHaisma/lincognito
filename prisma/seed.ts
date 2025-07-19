import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create a test user
  const hashedPassword = await bcrypt.hash('password123', 12);
  
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
      password: hashedPassword,
      emailVerified: true,
      plan: 'PRO',
      planStatus: 'active',
      role: 'USER',
      timezone: 'UTC',
    },
  });

  console.log('✅ Created test user:', user.email);

  // Create a test client
  const client = await prisma.client.upsert({
    where: { 
      id: 'test-client-1' 
    },
    update: {},
    create: {
      id: 'test-client-1',
      name: 'John Doe',
      company: 'Tech Startup Inc.',
      bio: 'Tech entrepreneur and thought leader in the startup space.',
      tone: 'professional',
      industry: 'Technology',
      linkedinUrl: 'https://linkedin.com/in/johndoe',
      accountType: 'PERSONAL',
      brandGuidelines: 'Professional, innovative, and approachable tone. Focus on tech trends and startup insights.',
      hashtags: ['#startup', '#tech', '#innovation', '#entrepreneurship'],
      keywords: ['startup', 'technology', 'innovation', 'entrepreneurship'],
      isActive: true,
      userId: user.id,
    },
  });

  console.log('✅ Created test client:', client.name);

  // Create some sample posts
  const posts = await Promise.all([
    prisma.post.upsert({
      where: { id: 'test-post-1' },
      update: {},
      create: {
        id: 'test-post-1',
        title: 'The Future of AI in Startups',
        content: 'Artificial Intelligence is revolutionizing how startups operate. From automating customer service to predictive analytics, AI tools are becoming essential for competitive advantage. The key is not just adopting AI, but implementing it strategically to solve real business problems. #AI #startup #innovation',
        status: 'PUBLISHED',
        publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        likes: 45,
        comments: 12,
        shares: 8,
        views: 1200,
        impressions: 3500,
        clicks: 23,
        engagementRate: 0.085,
        hashtags: ['#AI', '#startup', '#innovation'],
        mentions: [],
        clientId: client.id,
        userId: user.id,
      },
    }),
    prisma.post.upsert({
      where: { id: 'test-post-2' },
      update: {},
      create: {
        id: 'test-post-2',
        title: 'Building a Remote-First Culture',
        content: 'Remote work isn\'t just a trend—it\'s the future. But building a strong remote-first culture requires intentional effort. Here are three key principles: 1) Trust over control, 2) Async communication, 3) Results over hours. What\'s your experience with remote teams? #remotework #culture #leadership',
        status: 'PUBLISHED',
        publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        likes: 67,
        comments: 18,
        shares: 15,
        views: 2100,
        impressions: 4800,
        clicks: 34,
        engagementRate: 0.092,
        hashtags: ['#remotework', '#culture', '#leadership'],
        mentions: [],
        clientId: client.id,
        userId: user.id,
      },
    }),
    prisma.post.upsert({
      where: { id: 'test-post-3' },
      update: {},
      create: {
        id: 'test-post-3',
        title: 'Customer Feedback: The Startup\'s North Star',
        content: 'Your customers are your best product managers. Every piece of feedback is gold. The challenge? Distinguishing signal from noise. Here\'s how we structure our feedback collection: 1) Multiple touchpoints, 2) Quantitative + qualitative, 3) Regular review cycles. How do you collect and act on customer feedback? #customers #product #feedback',
        status: 'DRAFT',
        hashtags: ['#customers', '#product', '#feedback'],
        mentions: [],
        clientId: client.id,
        userId: user.id,
      },
    }),
  ]);

  console.log('✅ Created sample posts:', posts.length);

  // Create some sample activities
  const activities = await Promise.all([
    prisma.activity.create({
      data: {
        type: 'post_published',
        title: 'Post Published',
        description: 'Published "The Future of AI in Startups"',
        metadata: { postId: 'test-post-1', clientId: client.id },
        userId: user.id,
      },
    }),
    prisma.activity.create({
      data: {
        type: 'client_added',
        title: 'Client Added',
        description: 'Added John Doe as a new client',
        metadata: { clientId: client.id, clientName: client.name },
        userId: user.id,
      },
    }),
    prisma.activity.create({
      data: {
        type: 'engagement_milestone',
        title: 'Engagement Milestone',
        description: 'Reached 100+ likes on recent posts',
        metadata: { totalLikes: 112, period: 'last_7_days' },
        userId: user.id,
      },
    }),
  ]);

  console.log('✅ Created sample activities:', activities.length);

  // Create sample analytics
  const analytics = await Promise.all([
    prisma.postAnalytics.create({
      data: {
        postId: 'test-post-1',
        likes: 45,
        comments: 12,
        shares: 8,
        views: 1200,
        impressions: 3500,
        clicks: 23,
        engagementRate: 0.085,
        clickThroughRate: 0.066,
        recordedAt: new Date(),
      },
    }),
    prisma.postAnalytics.create({
      data: {
        postId: 'test-post-2',
        likes: 67,
        comments: 18,
        shares: 15,
        views: 2100,
        impressions: 4800,
        clicks: 34,
        engagementRate: 0.092,
        clickThroughRate: 0.071,
        recordedAt: new Date(),
      },
    }),
  ]);

  console.log('✅ Created sample analytics:', analytics.length);

  console.log('🎉 Database seeding completed successfully!');
  console.log('');
  console.log('📧 Test Account:');
  console.log('   Email: test@example.com');
  console.log('   Password: password123');
  console.log('');
  console.log('🔗 You can now log in to the dashboard with these credentials.');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 