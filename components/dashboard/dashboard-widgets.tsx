'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  MessageSquare,
  ArrowUp,
  ArrowDown,
  MoreHorizontal,
  Plus,
  Eye,
  EyeOff,
  Move
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Widget {
  id: string;
  title: string;
  type: 'stat' | 'chart' | 'list' | 'progress';
  size: 'small' | 'medium' | 'large';
  visible: boolean;
  order: number;
}

export function DashboardWidgets() {
  const [widgets, setWidgets] = useState<Widget[]>([
    { id: 'stats', title: 'Key Metrics', type: 'stat', size: 'large', visible: true, order: 1 },
    { id: 'engagement', title: 'Engagement Trends', type: 'chart', size: 'large', visible: true, order: 2 },
    { id: 'clients', title: 'Client Overview', type: 'list', size: 'medium', visible: true, order: 3 },
    { id: 'activity', title: 'Recent Activity', type: 'list', size: 'medium', visible: true, order: 4 },
    { id: 'goals', title: 'Monthly Goals', type: 'progress', size: 'small', visible: true, order: 5 },
    { id: 'performance', title: 'Top Posts', type: 'chart', size: 'medium', visible: true, order: 6 }
  ]);

  const toggleWidget = (widgetId: string) => {
    setWidgets(widgets.map(w => 
      w.id === widgetId ? { ...w, visible: !w.visible } : w
    ));
  };

  const visibleWidgets = widgets.filter(w => w.visible).sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-8">
      {/* Widget Controls */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Dashboard Overview
        </h2>
        <div className="flex items-center space-x-2">
          <Link href="/dashboard/settings">
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Widget
            </Button>
          </Link>
          <Link href="/dashboard/settings">
            <Button variant="outline" size="sm">
              <Move className="h-4 w-4 mr-2" />
              Customize
            </Button>
          </Link>
        </div>
      </div>

      {/* Key Metrics Widget */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <KeyMetricsWidget />
      </motion.div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Engagement Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-2"
        >
          <EngagementTrendsWidget />
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="quick-actions"
        >
          <QuickActionsWidget />
        </motion.div>
      </div>

      {/* Secondary Widgets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <ClientPerformanceWidget />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <UpcomingPostsWidget />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <MonthlyGoalsWidget />
        </motion.div>
      </div>
    </div>
  );
}

function KeyMetricsWidget() {
  const metrics = [
    {
      title: 'Total Engagement',
      value: '12,847',
      change: '+23.5%',
      changeType: 'increase',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      title: 'Active Clients',
      value: '8',
      change: '+2 this month',
      changeType: 'increase',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      title: 'Posts This Month',
      value: '64',
      change: '+18% vs last month',
      changeType: 'increase',
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      title: 'Avg. Engagement Rate',
      value: '4.2%',
      change: '+0.8% improvement',
      changeType: 'increase',
      icon: MessageSquare,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20'
    }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.title}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
        >
          <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                    {metric.title}
                  </p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                    {metric.value}
                  </p>
                  <div className="flex items-center mt-2">
                    <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                    <span className="text-sm text-green-600 font-medium">
                      {metric.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-full ${metric.bgColor} group-hover:scale-110 transition-transform`}>
                  <metric.icon className={`h-6 w-6 ${metric.color}`} />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

function EngagementTrendsWidget() {
  const data = [
    { date: 'Jan 1', likes: 120, comments: 45, shares: 23 },
    { date: 'Jan 8', likes: 145, comments: 52, shares: 28 },
    { date: 'Jan 15', likes: 167, comments: 48, shares: 31 },
    { date: 'Jan 22', likes: 189, comments: 61, shares: 35 },
    { date: 'Jan 29', likes: 203, comments: 58, shares: 42 },
    { date: 'Feb 5', likes: 234, comments: 67, shares: 38 },
    { date: 'Feb 12', likes: 256, comments: 72, shares: 45 }
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Engagement Trends</CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">Last 30 days</Badge>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
            <YAxis stroke="#64748b" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }} 
            />
            <Line 
              type="monotone" 
              dataKey="likes" 
              stroke="#8b5cf6" 
              strokeWidth={3}
              dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#8b5cf6', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="comments" 
              stroke="#06b6d4" 
              strokeWidth={3}
              dot={{ fill: '#06b6d4', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#06b6d4', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="shares" 
              stroke="#10b981" 
              strokeWidth={3}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

function QuickActionsWidget() {
  const actions = [
    {
      title: 'Create New Post',
      description: 'Write content for your clients',
      icon: Plus,
      color: 'bg-blue-600 hover:bg-blue-700',
      href: '/dashboard/content?action=create'
    },
    {
      title: 'Add Client',
      description: 'Set up a new client profile',
      icon: Users,
      color: 'bg-green-600 hover:bg-green-700',
      href: '/dashboard/clients?action=add'
    },
    {
      title: 'Schedule Content',
      description: 'Plan upcoming posts',
      icon: Calendar,
      color: 'bg-purple-600 hover:bg-purple-700',
      href: '/dashboard/calendar?action=schedule'
    }
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action, index) => (
          <motion.div
            key={action.title}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link href={action.href}>
              <Button
                variant="outline"
                className="w-full justify-start h-auto p-4 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <div className={`p-2 rounded-lg ${action.color} mr-4`}>
                  <action.icon className="h-4 w-4 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-slate-900 dark:text-slate-100">
                    {action.title}
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    {action.description}
                  </div>
                </div>
              </Button>
            </Link>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}

function ClientPerformanceWidget() {
  const clients = [
    { name: 'Sarah Johnson', engagement: 4.2, posts: 8, trend: 'up' },
    { name: 'Michael Chen', engagement: 3.8, posts: 12, trend: 'up' },
    { name: 'Emma Rodriguez', engagement: 5.1, posts: 6, trend: 'up' },
    { name: 'David Thompson', engagement: 3.2, posts: 4, trend: 'down' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Client Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800"
            >
              <div>
                <div className="font-medium text-slate-900 dark:text-slate-100">
                  {client.name}
                </div>
                <div className="text-sm text-slate-500">
                  {client.posts} posts this month
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center">
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    {client.engagement}%
                  </span>
                  {client.trend === 'up' ? (
                    <ArrowUp className="h-4 w-4 text-green-500 ml-1" />
                  ) : (
                    <ArrowDown className="h-4 w-4 text-red-500 ml-1" />
                  )}
                </div>
                <div className="text-xs text-slate-500">engagement</div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function UpcomingPostsWidget() {
  const posts = [
    { title: 'Leadership Insights', client: 'Sarah Johnson', time: '2 hours', status: 'scheduled' },
    { title: 'Industry Trends', client: 'Michael Chen', time: '1 day', status: 'draft' },
    { title: 'Team Building', client: 'Emma Rodriguez', time: '2 days', status: 'scheduled' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Upcoming Posts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {posts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700"
            >
              <div className={`w-3 h-3 rounded-full ${
                post.status === 'scheduled' ? 'bg-green-500' : 'bg-yellow-500'
              }`} />
              <div className="flex-1">
                <div className="font-medium text-slate-900 dark:text-slate-100 text-sm">
                  {post.title}
                </div>
                <div className="text-xs text-slate-500">
                  {post.client} • in {post.time}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function MonthlyGoalsWidget() {
  const goals = [
    { title: 'Posts Created', current: 64, target: 80, color: 'bg-blue-500' },
    { title: 'Client Satisfaction', current: 4.8, target: 5.0, color: 'bg-green-500' },
    { title: 'Engagement Rate', current: 4.2, target: 5.0, color: 'bg-purple-500' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Monthly Goals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {goals.map((goal, index) => (
            <motion.div
              key={goal.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-slate-900 dark:text-slate-100">
                    {goal.title}
                  </span>
                  <span className="text-slate-500">
                    {goal.current}/{goal.target}
                  </span>
                </div>
                <Progress 
                  value={(goal.current / goal.target) * 100} 
                  className="h-2"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}