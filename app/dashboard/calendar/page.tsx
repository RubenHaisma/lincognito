'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar';
import { Plus, Calendar as CalendarIcon, Clock, Users, Edit, Trash2 } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, parseISO } from 'date-fns';

interface ScheduledPost {
  id: string;
  title?: string;
  content: string;
  scheduledFor: string;
  status: 'SCHEDULED' | 'PUBLISHED' | 'FAILED';
  client: {
    id: string;
    name: string;
    company?: string;
    avatar?: string;
  };
}

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedClient, setSelectedClient] = useState<string>('all');
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - in real app, this would come from API
  useEffect(() => {
    const mockPosts: ScheduledPost[] = [
      {
        id: '1',
        title: 'Leadership Insights',
        content: 'Sharing thoughts on effective leadership in the digital age...',
        scheduledFor: '2024-01-15T10:00:00Z',
        status: 'SCHEDULED',
        client: {
          id: '1',
          name: 'Sarah Johnson',
          company: 'Tech Startup CEO',
          avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=150&h=150'
        }
      },
      {
        id: '2',
        title: 'Industry Trends',
        content: 'The future of AI in business operations...',
        scheduledFor: '2024-01-16T14:30:00Z',
        status: 'SCHEDULED',
        client: {
          id: '2',
          name: 'Michael Chen',
          company: 'Marketing Director',
          avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150'
        }
      },
      {
        id: '3',
        title: 'Team Building',
        content: 'Building high-performance teams in remote environments...',
        scheduledFor: '2024-01-17T09:15:00Z',
        status: 'PUBLISHED',
        client: {
          id: '3',
          name: 'Emma Rodriguez',
          company: 'HR Executive',
          avatar: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=150&h=150'
        }
      }
    ];
    
    setScheduledPosts(mockPosts);
    setIsLoading(false);
  }, []);

  const getPostsForDate = (date: Date) => {
    return scheduledPosts.filter(post => 
      isSameDay(parseISO(post.scheduledFor), date) &&
      (selectedClient === 'all' || post.client.id === selectedClient)
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SCHEDULED':
        return 'bg-blue-100 text-blue-800';
      case 'PUBLISHED':
        return 'bg-green-100 text-green-800';
      case 'FAILED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const selectedDatePosts = getPostsForDate(selectedDate);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <DashboardHeader />
        <div className="flex">
          <DashboardSidebar />
          <main className="flex-1 p-8 ml-64">
            <div className="animate-pulse">
              <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/4 mb-8"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 h-96 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                <div className="h-96 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
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
                  Content Calendar
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mt-2">
                  Plan and schedule LinkedIn posts for all your clients.
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <Select value={selectedClient} onValueChange={setSelectedClient}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="All clients" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Clients</SelectItem>
                    <SelectItem value="1">Sarah Johnson</SelectItem>
                    <SelectItem value="2">Michael Chen</SelectItem>
                    <SelectItem value="3">Emma Rodriguez</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Post
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calendar */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CalendarIcon className="h-5 w-5 mr-2" />
                    {format(selectedDate, 'MMMM yyyy')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    className="rounded-md border"
                    modifiers={{
                      hasPost: (date) => getPostsForDate(date).length > 0
                    }}
                    modifiersStyles={{
                      hasPost: { 
                        backgroundColor: 'hsl(var(--primary))', 
                        color: 'white',
                        fontWeight: 'bold'
                      }
                    }}
                  />
                </CardContent>
              </Card>

              {/* Selected Date Posts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{format(selectedDate, 'MMM d, yyyy')}</span>
                    <Badge variant="outline">
                      {selectedDatePosts.length} posts
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedDatePosts.length === 0 ? (
                    <div className="text-center py-8">
                      <Clock className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                      <p className="text-slate-600 dark:text-slate-400">
                        No posts scheduled for this date
                      </p>
                      <Button variant="outline" className="mt-4">
                        <Plus className="h-4 w-4 mr-2" />
                        Schedule Post
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {selectedDatePosts.map((post) => (
                        <div key={post.id} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <Badge className={getStatusColor(post.status)}>
                                {post.status}
                              </Badge>
                              <span className="text-sm text-slate-500">
                                {format(parseISO(post.scheduledFor), 'h:mm a')}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3 mb-3">
                            <img
                              src={post.client.avatar}
                              alt={post.client.name}
                              className="w-8 h-8 rounded-full"
                            />
                            <div>
                              <div className="font-medium text-sm text-slate-900 dark:text-slate-100">
                                {post.client.name}
                              </div>
                              <div className="text-xs text-slate-500">
                                {post.client.company}
                              </div>
                            </div>
                          </div>
                          
                          {post.title && (
                            <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">
                              {post.title}
                            </h4>
                          )}
                          
                          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                            {post.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Posts */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Upcoming Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scheduledPosts
                    .filter(post => post.status === 'SCHEDULED')
                    .sort((a, b) => new Date(a.scheduledFor).getTime() - new Date(b.scheduledFor).getTime())
                    .slice(0, 5)
                    .map((post) => (
                      <div key={post.id} className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <img
                            src={post.client.avatar}
                            alt={post.client.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <div className="font-medium text-slate-900 dark:text-slate-100">
                              {post.title || 'Untitled Post'}
                            </div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">
                              {post.client.name} • {format(parseISO(post.scheduledFor), 'MMM d, h:mm a')}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(post.status)}>
                            {post.status}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}