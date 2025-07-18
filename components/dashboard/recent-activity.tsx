'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Clock, MessageSquare, Calendar, TrendingUp } from 'lucide-react';

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: 'post_published',
      title: 'Post published for Sarah Johnson',
      description: 'LinkedIn post about personal branding went live',
      time: '2 hours ago',
      icon: Calendar,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      id: 2,
      type: 'approval_needed',
      title: 'Approval needed from Michael Chen',
      description: 'New post draft ready for review',
      time: '3 hours ago',
      icon: MessageSquare,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20'
    },
    {
      id: 3,
      type: 'high_engagement',
      title: 'High engagement on Emma\'s post',
      description: 'Post reached 500+ likes and 50 comments',
      time: '5 hours ago',
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      id: 4,
      type: 'client_added',
      title: 'New client added: David Thompson',
      description: 'Profile setup completed and ready for content',
      time: '1 day ago',
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    }
  ];

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4">
            <div className={`p-2 rounded-full ${activity.bgColor}`}>
              <activity.icon className={`h-4 w-4 ${activity.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  {activity.title}
                </h4>
                <span className="text-xs text-slate-500">{activity.time}</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {activity.description}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}