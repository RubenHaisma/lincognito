'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Calendar, Users, FileText, MessageSquare } from 'lucide-react';

export function QuickActions() {
  const actions = [
    {
      title: 'Create New Post',
      description: 'Write a new LinkedIn post for your clients',
      icon: Plus,
      color: 'bg-primary',
      action: () => console.log('Create post')
    },
    {
      title: 'Schedule Content',
      description: 'Plan posts for the upcoming week',
      icon: Calendar,
      color: 'bg-blue-600',
      action: () => console.log('Schedule content')
    },
    {
      title: 'Add New Client',
      description: 'Set up a new client profile',
      icon: Users,
      color: 'bg-green-600',
      action: () => console.log('Add client')
    },
    {
      title: 'Content Library',
      description: 'Browse your saved content templates',
      icon: FileText,
      color: 'bg-purple-600',
      action: () => console.log('Content library')
    },
    {
      title: 'Client Messages',
      description: 'Check pending client communications',
      icon: MessageSquare,
      color: 'bg-orange-600',
      action: () => console.log('Messages')
    }
  ];

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action, index) => (
          <Button
            key={action.title}
            variant="outline"
            className="w-full justify-start h-auto p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800"
            onClick={action.action}
          >
            <div className={`p-2 rounded-lg ${action.color} mr-4`}>
              <action.icon className="h-4 w-4 text-white" />
            </div>
            <div>
              <div className="font-medium text-slate-900 dark:text-slate-100">
                {action.title}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                {action.description}
              </div>
            </div>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}