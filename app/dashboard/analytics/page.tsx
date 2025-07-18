'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar';
import { TrendingUp, Users, MessageSquare, Share2, Eye, Calendar, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('30');
  const [selectedClient, setSelectedClient] = useState('all');

  // Mock data - in real app, this would come from API
  const engagementData = [
    { date: '2024-01-01', likes: 45, comments: 12, shares: 8, views: 234 },
    { date: '2024-01-02', likes: 52, comments: 18, shares: 12, views: 289 },
    { date: '2024-01-03', likes: 38, comments: 9, shares: 6, views: 198 },
    { date: '2024-01-04', likes: 67, comments: 24, shares: 15, views: 345 },
    { date: '2024-01-05', likes: 71, comments: 28, shares: 18, views: 412 },
    { date: '2024-01-06', likes: 59, comments: 21, shares: 13, views: 367 },
    { date: '2024-01-07', likes: 84, comments: 32, shares: 22, views: 456 },
  ];

  const postPerformanceData = [
    { title: 'Leadership in Tech', likes: 156, comments: 42, shares: 28 },
    { title: 'Innovation Trends', likes: 134, comments: 38, shares: 24 },
    { title: 'Team Building', likes: 98, comments: 29, shares: 18 },
    { title: 'Industry Insights', likes: 87, comments: 25, shares: 15 },
    { title: 'Career Growth', likes: 76, comments: 22, shares: 12 },
  ];

  const clientDistribution = [
    { name: 'Sarah Johnson', value: 35, color: '#8b5cf6' },
    { name: 'Michael Chen', value: 25, color: '#06b6d4' },
    { name: 'Emma Rodriguez', value: 20, color: '#10b981' },
    { name: 'David Thompson', value: 20, color: '#f59e0b' },
  ];

  const stats = [
    {
      title: 'Total Engagement',
      value: '2,847',
      change: '+12.5%',
      changeType: 'increase',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      title: 'Average Likes',
      value: '64',
      change: '+8.2%',
      changeType: 'increase',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      title: 'Comments Rate',
      value: '18.5%',
      change: '+3.1%',
      changeType: 'increase',
      icon: MessageSquare,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      title: 'Share Rate',
      value: '12.3%',
      change: '+5.7%',
      changeType: 'increase',
      icon: Share2,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20'
    }
  ];

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
                  Analytics Dashboard
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mt-2">
                  Track engagement and performance across all your LinkedIn content.
                </p>
              </div>
              
              <div className="flex space-x-4">
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
                    <SelectItem value="sarah">Sarah Johnson</SelectItem>
                    <SelectItem value="michael">Michael Chen</SelectItem>
                    <SelectItem value="emma">Emma Rodriguez</SelectItem>
                    <SelectItem value="david">David Thompson</SelectItem>
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
                    <LineChart data={engagementData}>
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
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={clientDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {clientDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
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
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={postPerformanceData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="title" type="category" width={120} />
                    <Tooltip />
                    <Bar dataKey="likes" fill="#8b5cf6" />
                    <Bar dataKey="comments" fill="#06b6d4" />
                    <Bar dataKey="shares" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
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
                  <div className="text-2xl font-bold text-primary mb-2">4.2%</div>
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