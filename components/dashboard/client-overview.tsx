'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { MoreHorizontal, TrendingUp, Calendar, MessageSquare } from 'lucide-react';

export function ClientOverview() {
  const clients = [
    {
      id: 1,
      name: 'Sarah Johnson',
      company: 'Tech Startup CEO',
      avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
      status: 'active',
      postsThisMonth: 8,
      engagementRate: 4.2,
      nextPost: 'Tomorrow',
      pendingApprovals: 2
    },
    {
      id: 2,
      name: 'Michael Chen',
      company: 'Marketing Director',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
      status: 'active',
      postsThisMonth: 12,
      engagementRate: 3.8,
      nextPost: 'Friday',
      pendingApprovals: 0
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      company: 'HR Executive',
      avatar: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
      status: 'active',
      postsThisMonth: 6,
      engagementRate: 5.1,
      nextPost: 'Monday',
      pendingApprovals: 1
    },
    {
      id: 4,
      name: 'David Thompson',
      company: 'Sales Manager',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
      status: 'paused',
      postsThisMonth: 4,
      engagementRate: 3.2,
      nextPost: 'On hold',
      pendingApprovals: 3
    }
  ];

  return (
    <Card className="animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Client Overview
        </CardTitle>
        <Button variant="outline" size="sm">
          View All Clients
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {clients.map((client) => (
            <div key={client.id} className="flex items-center space-x-4 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
              <Avatar className="h-12 w-12">
                <AvatarImage src={client.avatar} alt={client.name} />
                <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-slate-100">
                      {client.name}
                    </h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {client.company}
                    </p>
                  </div>
                  <Badge variant={client.status === 'active' ? 'default' : 'secondary'}>
                    {client.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-slate-500 dark:text-slate-400">Posts</div>
                    <div className="font-medium text-slate-900 dark:text-slate-100">
                      {client.postsThisMonth}
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-500 dark:text-slate-400">Engagement</div>
                    <div className="font-medium text-slate-900 dark:text-slate-100">
                      {client.engagementRate}%
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-500 dark:text-slate-400">Next Post</div>
                    <div className="font-medium text-slate-900 dark:text-slate-100">
                      {client.nextPost}
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-500 dark:text-slate-400">Pending</div>
                    <div className="font-medium text-slate-900 dark:text-slate-100">
                      {client.pendingApprovals}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Calendar className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageSquare className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}