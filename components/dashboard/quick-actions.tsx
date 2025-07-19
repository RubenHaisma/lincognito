'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Calendar, Users, FileText, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export function QuickActions() {
  const actions = [
    {
      title: 'Create New Post',
      description: 'Write a new LinkedIn post for your clients',
      icon: Plus,
      color: 'bg-primary',
      href: '/dashboard/content?action=create'
    },
    {
      title: 'Schedule Content',
      description: 'Plan posts for the upcoming week',
      icon: Calendar,
      color: 'bg-blue-600',
      href: '/dashboard/calendar?action=schedule'
    },
    {
      title: 'Add New Client',
      description: 'Set up a new client profile',
      icon: Users,
      color: 'bg-green-600',
      href: '/dashboard/clients?action=add'
    },
    {
      title: 'Content Library',
      description: 'Browse your saved content templates',
      icon: FileText,
      color: 'bg-purple-600',
      href: '/dashboard/templates'
    },
    {
      title: 'Client Messages',
      description: 'Check pending client communications',
      icon: MessageSquare,
      color: 'bg-orange-600',
      href: '/dashboard/messages'
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
          <Link
            key={action.title}
            href={action.href}
          >
            <Button
              variant="outline"
              className="w-full justify-start h-auto p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800"
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
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}