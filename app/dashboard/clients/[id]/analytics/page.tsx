'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Share2, 
  Eye, 
  Calendar, 
  BarChart3, 
  ArrowLeft,
  Download,
  RefreshCw
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import Link from 'next/link';

interface ClientAnalytics {
  client: {
    id: string;
    name: string;
    company?: string;
    avatar?: string;
    industry?: string;
  };
  overview: {
    totalPosts: number;
    totalEngagement: number;
    avgEngagementRate: number;
    followerGrowth: number;
    topPost: {
      id: string;
      content: string;
      likes: number;
      comments: number;
      shares: number;
    };
  };
  engagementTrends: Array<{
    date: string;
    likes: number;
    comments: number;
    shares: number;
    views: number;
  }>;
  topPosts: Array<{
    id: string;
    title?: string;
    content: string;
    publishedAt: string;
    likes: number;
    comments: number;
    shares: number;
    engagementRate: number;
  }>;
  audienceInsights: {
    demographics: Array<{
      category: string;
      value: number;
      color: string;
    }>;
    topHashtags: Array<{
      tag: string;
      usage: number;
      performance: number;
    }>;
    bestPostingTimes: Array<{
      day: string;
      hour: number;
      engagement: number;
    }>;
  };
}

export default function ClientAnalyticsPage() {
  const params = useParams();
  const clientId = params.id as string;
  const [analytics, setAnalytics] = useState<ClientAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('30');
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    fetchClientAnalytics();
  }, [clientId, selectedPeriod]);

  const fetchClientAnalytics = async () => {
    try {
      // Mock data - in real app, this would be an API call
      const mockAnalytics: ClientAnalytics = {
        client: {
          id: clientId,
          name: 'Sarah Johnson',
          company: 'Tech Startup CEO',
          avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
          industry: 'Technology'
        },
        overview: {
          totalPosts: 24,
          totalEngagement: 3847,
          avgEngagementRate: 4.2,
          followerGrowth: 156,
          topPost: {
            id: 'post-1',
            content: 'The future of AI in business operations is not just about automation...',
            likes: 234,
            comments: 45,
            shares: 23
          }
        },
        engagementTrends: [
          { date: 'Jan 1', likes: 120, comments: 25, shares: 12, views: 1200 },
          { date: 'Jan 8', likes: 145, comments: 32, shares: 18, views: 1450 },
          { date: 'Jan 15', likes: 167, comments: 28, shares: 15, views: 1670 },
          { date: 'Jan 22', likes: 189, comments: 41, shares: 22, views: 1890 },
          { date: 'Jan 29', likes: 203, comments: 38, shares: 25, views: 2030 },
          { date: 'Feb 5', likes: 234, comments: 45, shares: 23, views: 2340 },
          { date: 'Feb 12', likes: 256, comments: 52, shares: 28, views: 2560 }
        ],
        topPosts: [
          {
            id: '1',
            title: 'AI in Business Operations',
            content: 'The future of AI in business operations is not just about automation...',
            publishedAt: '2025-01-15T10:00:00Z',
            likes: 234,
            comments: 45,
            shares: 23,
            engagementRate: 5.2
          },
          {
            id: '2',
            title: 'Leadership in Remote Teams',
            content: 'Building high-performance teams in a remote-first world requires...',
            publishedAt: '2025-01-10T14:30:00Z',
            likes: 189,
            comments: 38,
            shares: 19,
            engagementRate: 4.8
          },
          {
            id: '3',
            title: 'Innovation Mindset',
            content: 'Fostering an innovation mindset starts with creating psychological safety...',
            publishedAt: '2025-01-05T09:15:00Z',
            likes: 167,
            comments: 32,
            shares: 15,
            engagementRate: 4.1
          }
        ],
        audienceInsights: {
          demographics: [
            { category: 'Technology', value: 35, color: '#8b5cf6' },
            { category: 'Business', value: 25, color: '#06b6d4' },
            { category: 'Marketing', value: 20, color: '#10b981' },
            { category: 'Finance', value: 12, color: '#f59e0b' },
            { category: 'Other', value: 8, color: '#ef4444' }
          ],
          topHashtags: [
            { tag: '#leadership', usage: 12, performance: 4.8 },
            { tag: '#innovation', usage: 8, performance: 5.2 },
            { tag: '#technology', usage: 6, performance: 3.9 },
            { tag: '#startup', usage: 5, performance: 4.1 },
            { tag: '#ai', usage: 4, performance: 5.8 }
          ],
          bestPostingTimes: [
            { day: 'Tuesday', hour: 10, engagement: 4.8 },
            { day: 'Wednesday', hour: 14, engagement: 4.5 },
            { day: 'Thursday', hour: 9, engagement: 4.2 },
            { day: 'Tuesday', hour: 15, engagement: 4.0 },
            { day: 'Friday', hour: 11, engagement: 3.8 }
          ]
        }
      };
      
      setAnalytics(mockAnalytics);
    } catch (error) {
      console.error('Failed to fetch client analytics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSyncAnalytics = async () => {
    setIsSyncing(true);
    try {
      // Simulate API call to sync latest data
      await new Promise(resolve => setTimeout(resolve, 2000));
      await fetchClientAnalytics();
    } catch (error) {
      console.error('Failed to sync analytics:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  const exportReport = () => {
    // Simulate report export
    const reportData = {
      client: analytics?.client.name,
      period: `Last ${selectedPeriod} days`,
      overview: analytics?.overview,
      generatedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${analytics?.client.name}-analytics-report.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <DashboardHeader />
        <div className="flex">
          <DashboardSidebar />
          <main className="flex-1 p-8 ml-64">
            <div className="animate-pulse">
              <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/4 mb-8"></div>
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-32 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <DashboardHeader />
        <div className="flex">
          <DashboardSidebar />
          <main className="flex-1 p-8 ml-64">
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                Client Not Found
              </h1>
              <Link href="/dashboard/clients">
                <Button>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Clients
                </Button>
              </Link>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-8 ml-64">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <Link href="/dashboard/clients">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Clients
                  </Button>
                </Link>
                
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={analytics.client.avatar} alt={analytics.client.name} />
                    <AvatarFallback>{analytics.client.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                      {analytics.client.name} Analytics
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400">
                      {analytics.client.company} • {analytics.client.industry}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">Last 7 days</SelectItem>
                    <SelectItem value="30">Last 30 days</SelectItem>
                    <SelectItem value="90">Last 90 days</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" onClick={exportReport}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
                
                <Button variant="outline" onClick={handleSyncAnalytics} disabled={isSyncing}>
                  <RefreshCw className={`h-4 w-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
                  {isSyncing ? 'Syncing...' : 'Sync Data'}
                </Button>
              </div>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        Total Posts
                      </p>
                      <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                        {analytics.overview.totalPosts}
                      </p>
                    </div>
                    <Calendar className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        Total Engagement
                      </p>
                      <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                        {analytics.overview.totalEngagement.toLocaleString()}
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        Avg. Engagement Rate
                      </p>
                      <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                        {analytics.overview.avgEngagementRate}%
                      </p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        Follower Growth
                      </p>
                      <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                        +{analytics.overview.followerGrowth}
                      </p>
                    </div>
                    <Users className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Engagement Trends */}
              <Card>
                <CardHeader>
                  <CardTitle>Engagement Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={analytics.engagementTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="likes" stroke="#8b5cf6" strokeWidth={2} />
                      <Line type="monotone" dataKey="comments" stroke="#06b6d4" strokeWidth={2} />
                      <Line type="monotone" dataKey="shares" stroke="#10b981" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Audience Demographics */}
              <Card>
                <CardHeader>
                  <CardTitle>Audience Demographics</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={analytics.audienceInsights.demographics}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ category, value }) => `${category} ${value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {analytics.audienceInsights.demographics.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Top Posts */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Top Performing Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.topPosts.map((post, index) => (
                    <div key={post.id} className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline">#{index + 1}</Badge>
                          <span className="font-medium text-slate-900 dark:text-slate-100">
                            {post.title || 'Untitled Post'}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-2">
                          {post.content}
                        </p>
                        <div className="text-xs text-slate-500">
                          Published {new Date(post.publishedAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div className="text-center">
                            <div className="font-semibold text-slate-900 dark:text-slate-100">{post.likes}</div>
                            <div className="text-xs text-slate-500">Likes</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-slate-900 dark:text-slate-100">{post.comments}</div>
                            <div className="text-xs text-slate-500">Comments</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-slate-900 dark:text-slate-100">{post.shares}</div>
                            <div className="text-xs text-slate-500">Shares</div>
                          </div>
                        </div>
                        <div className="text-sm font-medium text-primary mt-2">
                          {post.engagementRate}% engagement
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Insights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Top Hashtags */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Hashtags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analytics.audienceInsights.topHashtags.map((hashtag, index) => (
                      <div key={hashtag.tag} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                            {hashtag.tag}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {hashtag.usage} uses
                          </Badge>
                        </div>
                        <div className="text-sm font-medium text-primary">
                          {hashtag.performance}% avg engagement
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Best Posting Times */}
              <Card>
                <CardHeader>
                  <CardTitle>Best Posting Times</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analytics.audienceInsights.bestPostingTimes.map((time, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                          {time.day} at {time.hour}:00
                        </div>
                        <div className="text-sm font-medium text-primary">
                          {time.engagement}% engagement
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}