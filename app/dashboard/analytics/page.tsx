'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar';
import { TrendingUp, Users, MessageSquare, Share2, Eye, Calendar, BarChart3, RefreshCw, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { RealtimeAnalytics } from '@/lib/realtime';
import { toast } from 'sonner';

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('30');
  const [selectedClient, setSelectedClient] = useState('all');
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [realtimeAnalytics, setRealtimeAnalytics] = useState<RealtimeAnalytics | null>(null);

  useEffect(() => {
    fetchAnalytics();
    
    // Set up real-time analytics
    const userId = localStorage.getItem('userId'); // You'd get this from auth context
    if (userId) {
      const realtime = new RealtimeAnalytics(userId);
      realtime.subscribe();
      
      realtime.on('post_updated', (post: any) => {
        toast.success(`Post engagement updated: ${post.title || 'Untitled'}`);
        fetchAnalytics(); // Refresh data
      });
      
      realtime.on('analytics_updated', (analytics: any) => {
        setLastUpdated(new Date());
      });
      
      setRealtimeAnalytics(realtime);
      
      return () => {
        realtime.unsubscribe();
      };
    }
  }, [selectedPeriod, selectedClient]);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('token');
      const params = new URLSearchParams({
        period: selectedPeriod,
        ...(selectedClient !== 'all' && { clientId: selectedClient }),
      });
      
      const response = await fetch(`/api/analytics/realtime?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAnalyticsData(data);
        setLastUpdated(new Date(data.lastUpdated));
      } else {
        toast.error('Failed to fetch analytics');
      }
    } catch (error) {
      toast.error('Failed to fetch analytics');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSyncAnalytics = async () => {
    setIsSyncing(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/analytics/sync', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        toast.success(result.message);
        fetchAnalytics(); // Refresh data
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to sync analytics');
      }
    } catch (error) {
      toast.error('Failed to sync analytics');
    } finally {
      setIsSyncing(false);
    }
  };

  const stats = [
    {
      title: 'Total Engagement',
      value: analyticsData?.overview?.totalEngagement?.toLocaleString() || '0',
      change: '+12.5%',
      changeType: 'increase',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      title: 'Average Likes',
      value: Math.round((analyticsData?.overview?.totalEngagement || 0) / (analyticsData?.overview?.totalPosts || 1)).toString(),
      change: '+8.2%',
      changeType: 'increase',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      title: 'Comments Rate',
      value: `${analyticsData?.overview?.avgEngagementRate || 0}%`,
      change: '+3.1%',
      changeType: 'increase',
      icon: MessageSquare,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      title: 'Share Rate',
      value: `${Math.round((analyticsData?.overview?.totalEngagement || 0) * 0.15)}`,
      change: '+5.7%',
      changeType: 'increase',
      icon: Share2,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20'
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <DashboardHeader />
        <div className="flex">
          <DashboardSidebar />
          <main className="flex-1 p-8 ml-64">
            <div className="animate-pulse">
              <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/4 mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-8 ml-64">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                  Real-time Analytics Dashboard
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mt-2">
                  Track engagement and performance across all your LinkedIn content.
                </p>
                {lastUpdated && (
                  <div className="flex items-center mt-2">
                    <Zap className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm text-slate-500">
                      Last updated: {lastUpdated.toLocaleTimeString()}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={handleSyncAnalytics}
                  disabled={isSyncing}
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
                  {isSyncing ? 'Syncing...' : 'Sync LinkedIn'}
                </Button>
                
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
                
                <Select value={selectedClient} onValueChange={setSelectedClient}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="All clients" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Clients</SelectItem>
                    {analyticsData?.clientPerformance?.map((client: any) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
              {stats.map((stat, index) => (
                <Card key={stat.title} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      {stat.title}
                    </CardTitle>
                    <div className={`p-2 rounded-full ${stat.bgColor}`}>
                      <stat.icon className={`h-4 w-4 ${stat.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">
                      {stat.value}
                    </div>
                    <div className="flex items-center text-sm">
                      <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                      <span className="text-green-600 text-xs">
                        {stat.change} from last period
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Engagement Trends */}
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Engagement Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={analyticsData?.engagementTrends || []}>
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

              {/* Client Distribution */}
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Client Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData?.clientPerformance?.slice(0, 5).map((client: any, index: number) => (
                      <div key={client.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                        <div>
                          <div className="font-medium text-slate-900 dark:text-slate-100">
                            {client.name}
                          </div>
                          <div className="text-sm text-slate-500">
                            {client.total_posts} posts
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-slate-900 dark:text-slate-100">
                            {(client.total_likes + client.total_comments + client.total_shares).toLocaleString()}
                          </div>
                          <div className="text-xs text-slate-500">engagement</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top Performing Posts */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Top Performing Posts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData?.topPerformingPosts?.map((post: any, index: number) => (
                    <div key={post.id} className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline">#{index + 1}</Badge>
                          <span className="font-medium text-slate-900 dark:text-slate-100">
                            {post.title || 'Untitled Post'}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                          {post.content.substring(0, 100)}...
                        </p>
                        <div className="text-xs text-slate-500 mt-1">
                          {post.client.name} • {new Date(post.publishedAt).toLocaleDateString()}
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
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Insights */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="text-lg">Best Posting Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary mb-2">2:00 PM</div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Tuesday - Thursday posts get 23% more engagement
                  </p>
                </CardContent>
              </Card>

              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="text-lg">Top Hashtag</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary mb-2">#leadership</div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Used in 67% of your top-performing posts
                  </p>
                </CardContent>
              </Card>

              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="text-lg">Engagement Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary mb-2">
                    {analyticsData?.overview?.avgEngagementRate || 0}%
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Above industry average of 3.1%
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}