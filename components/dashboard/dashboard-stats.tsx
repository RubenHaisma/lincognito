'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Users, Calendar, TrendingUp, MessageSquare, ArrowUp, ArrowDown } from 'lucide-react';

export function DashboardStats() {
  const stats = [
    {
      title: 'Active Clients',
      value: '12',
      change: '+2 this month',
      changeType: 'increase',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      title: 'Posts This Month',
      value: '48',
      change: '+15% from last month',
      changeType: 'increase',
      icon: Calendar,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      title: 'Total Engagement',
      value: '2,847',
      change: '+8% from last month',
      changeType: 'increase',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      title: 'Pending Approvals',
      value: '7',
      change: '3 urgent',
      changeType: 'neutral',
      icon: MessageSquare,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20'
    }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
              {stat.changeType === 'increase' && (
                <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
              )}
              {stat.changeType === 'decrease' && (
                <ArrowDown className="h-3 w-3 text-red-500 mr-1" />
              )}
              <span className={`text-xs ${
                stat.changeType === 'increase' ? 'text-green-600' : 
                stat.changeType === 'decrease' ? 'text-red-600' : 'text-slate-500'
              }`}>
                {stat.change}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}