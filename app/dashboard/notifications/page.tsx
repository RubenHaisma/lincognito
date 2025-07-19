'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar';
import { 
  Bell, 
  Check, 
  X, 
  Clock, 
  MessageSquare, 
  TrendingUp, 
  Users,
  Calendar,
  AlertCircle,
  CheckCircle,
  Settings,
  Filter
} from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { toast } from 'sonner';

interface Notification {
  id: string;
  type: 'message' | 'approval' | 'engagement' | 'system' | 'reminder';
  title: string;
  description: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  actionUrl?: string;
  metadata?: {
    clientId?: string;
    postId?: string;
    messageId?: string;
  };
}

export default function NotificationsPage() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    postReminders: true,
    clientMessages: true,
    engagementAlerts: true,
    weeklyReports: true,
    systemUpdates: false
  });

  // Mock data - in real app, this would come from API
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'approval',
        title: 'Post approval needed',
        description: 'Sarah Johnson needs approval for "Leadership in Remote Teams" post',
        isRead: false,
        priority: 'high',
        createdAt: '2025-01-15T10:30:00Z',
        actionUrl: '/dashboard/messages',
        metadata: { clientId: 'client-1', postId: 'post-1' }
      },
      {
        id: '2',
        type: 'engagement',
        title: 'High engagement alert',
        description: 'Your post for Michael Chen reached 500+ likes',
        isRead: false,
        priority: 'medium',
        createdAt: '2025-01-15T09:15:00Z',
        actionUrl: '/dashboard/analytics',
        metadata: { clientId: 'client-2', postId: 'post-2' }
      },
      {
        id: '3',
        type: 'message',
        title: 'New message from Emma Rodriguez',
        description: 'Content calendar review for February',
        isRead: true,
        priority: 'medium',
        createdAt: '2025-01-14T16:45:00Z',
        actionUrl: '/dashboard/messages',
        metadata: { clientId: 'client-3', messageId: 'msg-1' }
      },
      {
        id: '4',
        type: 'reminder',
        title: 'Scheduled post reminder',
        description: 'Post for David Thompson scheduled to publish in 2 hours',
        isRead: false,
        priority: 'low',
        createdAt: '2025-01-14T14:00:00Z',
        actionUrl: '/dashboard/calendar',
        metadata: { clientId: 'client-4', postId: 'post-3' }
      },
      {
        id: '5',
        type: 'system',
        title: 'LinkedIn API sync completed',
        description: 'Successfully synced engagement data for all clients',
        isRead: true,
        priority: 'low',
        createdAt: '2025-01-14T08:30:00Z'
      },
      {
        id: '6',
        type: 'engagement',
        title: 'Weekly engagement milestone',
        description: 'You\'ve reached 10,000 total engagements this week!',
        isRead: true,
        priority: 'medium',
        createdAt: '2025-01-13T18:00:00Z',
        actionUrl: '/dashboard/analytics'
      }
    ];
    
    setNotifications(mockNotifications);
    setIsLoading(false);
  }, []);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <MessageSquare className="h-5 w-5 text-blue-600" />;
      case 'approval':
        return <AlertCircle className="h-5 w-5 text-orange-600" />;
      case 'engagement':
        return <TrendingUp className="h-5 w-5 text-green-600" />;
      case 'reminder':
        return <Clock className="h-5 w-5 text-purple-600" />;
      case 'system':
        return <Settings className="h-5 w-5 text-slate-600" />;
      default:
        return <Bell className="h-5 w-5 text-slate-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const markAsRead = async (notificationId: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === notificationId 
        ? { ...notification, isRead: true }
        : notification
    ));
    toast.success('Notification marked as read');
  };

  const markAllAsRead = async () => {
    setNotifications(notifications.map(notification => ({ ...notification, isRead: true })));
    toast.success('All notifications marked as read');
  };

  const deleteNotification = async (notificationId: string) => {
    setNotifications(notifications.filter(notification => notification.id !== notificationId));
    toast.success('Notification deleted');
  };

  const updateSettings = async (key: string, value: boolean) => {
    setSettings({ ...settings, [key]: value });
    
    // Persist settings to localStorage
    const updatedSettings = { ...settings, [key]: value };
    localStorage.setItem('notificationSettings', JSON.stringify(updatedSettings));
    toast.success('Notification settings updated');
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.isRead;
    return notification.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

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
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-20 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
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
        <main className="flex-1 p-8 ml-64 mt-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                  Notifications
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mt-2">
                  Stay updated with client messages, post approvals, and system alerts.
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                {unreadCount > 0 && (
                  <Button variant="outline" onClick={markAllAsRead}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark All Read ({unreadCount})
                  </Button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Notifications List */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Recent Notifications</CardTitle>
                      <Select value={filter} onValueChange={setFilter}>
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="unread">Unread</SelectItem>
                          <SelectItem value="message">Messages</SelectItem>
                          <SelectItem value="approval">Approvals</SelectItem>
                          <SelectItem value="engagement">Engagement</SelectItem>
                          <SelectItem value="reminder">Reminders</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-0">
                    {filteredNotifications.length === 0 ? (
                      <div className="text-center py-12">
                        <Bell className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                          No notifications
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400">
                          {filter === 'unread' ? 'All caught up! No unread notifications.' : 'No notifications match your current filter.'}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        {filteredNotifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-4 border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                              !notification.isRead ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                            }`}
                          >
                            <div className="flex items-start space-x-4">
                              <div className="flex-shrink-0 mt-1">
                                {getNotificationIcon(notification.type)}
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center space-x-2">
                                    <h4 className="font-medium text-slate-900 dark:text-slate-100">
                                      {notification.title}
                                    </h4>
                                    {!notification.isRead && (
                                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                    )}
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Badge className={getPriorityColor(notification.priority)} variant="outline">
                                      {notification.priority}
                                    </Badge>
                                    <span className="text-xs text-slate-500">
                                      {new Date(notification.createdAt).toLocaleDateString()}
                                    </span>
                                  </div>
                                </div>
                                
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                                  {notification.description}
                                </p>
                                
                                <div className="flex items-center justify-between">
                                  <div className="flex space-x-2">
                                    {notification.actionUrl && (
                                      <Button variant="outline" size="sm">
                                        View Details
                                      </Button>
                                    )}
                                    {!notification.isRead && (
                                      <Button 
                                        variant="ghost" 
                                        size="sm"
                                        onClick={() => markAsRead(notification.id)}
                                      >
                                        <Check className="h-4 w-4 mr-1" />
                                        Mark Read
                                      </Button>
                                    )}
                                  </div>
                                  
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => deleteNotification(notification.id)}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Notification Settings */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Settings className="h-5 w-5 mr-2" />
                      Notification Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label className="text-sm font-medium">Email Notifications</label>
                          <p className="text-xs text-slate-500">
                            Receive notifications via email
                          </p>
                        </div>
                        <Switch
                          checked={settings.emailNotifications}
                          onCheckedChange={(checked) => updateSettings('emailNotifications', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label className="text-sm font-medium">Push Notifications</label>
                          <p className="text-xs text-slate-500">
                            Browser push notifications
                          </p>
                        </div>
                        <Switch
                          checked={settings.pushNotifications}
                          onCheckedChange={(checked) => updateSettings('pushNotifications', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label className="text-sm font-medium">Post Reminders</label>
                          <p className="text-xs text-slate-500">
                            Scheduled post reminders
                          </p>
                        </div>
                        <Switch
                          checked={settings.postReminders}
                          onCheckedChange={(checked) => updateSettings('postReminders', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label className="text-sm font-medium">Client Messages</label>
                          <p className="text-xs text-slate-500">
                            New messages from clients
                          </p>
                        </div>
                        <Switch
                          checked={settings.clientMessages}
                          onCheckedChange={(checked) => updateSettings('clientMessages', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label className="text-sm font-medium">Engagement Alerts</label>
                          <p className="text-xs text-slate-500">
                            High engagement notifications
                          </p>
                        </div>
                        <Switch
                          checked={settings.engagementAlerts}
                          onCheckedChange={(checked) => updateSettings('engagementAlerts', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label className="text-sm font-medium">Weekly Reports</label>
                          <p className="text-xs text-slate-500">
                            Weekly performance summaries
                          </p>
                        </div>
                        <Switch
                          checked={settings.weeklyReports}
                          onCheckedChange={(checked) => updateSettings('weeklyReports', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label className="text-sm font-medium">System Updates</label>
                          <p className="text-xs text-slate-500">
                            Platform updates and maintenance
                          </p>
                        </div>
                        <Switch
                          checked={settings.systemUpdates}
                          onCheckedChange={(checked) => updateSettings('systemUpdates', checked)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Notification Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600 dark:text-slate-400">Total</span>
                        <span className="font-medium">{notifications.length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600 dark:text-slate-400">Unread</span>
                        <span className="font-medium text-orange-600">{unreadCount}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600 dark:text-slate-400">High Priority</span>
                        <span className="font-medium text-red-600">
                          {notifications.filter(n => n.priority === 'high').length}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600 dark:text-slate-400">This Week</span>
                        <span className="font-medium">
                          {notifications.filter(n => 
                            new Date(n.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                          ).length}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}