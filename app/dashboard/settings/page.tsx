'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar';
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Key, 
  Globe, 
  Mail,
  Smartphone,
  Clock,
  Palette,
  Database,
  Trash2
} from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { toast } from 'sonner';
import Link from 'next/link';

export default function SettingsPage() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    profile: {
      name: user?.name || '',
      email: user?.email || '',
      bio: '',
      timezone: 'UTC',
      avatar: ''
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: false,
      postReminders: true,
      clientUpdates: true,
      weeklyReports: true,
      marketingEmails: false
    },
    privacy: {
      profileVisibility: 'private',
      dataSharing: false,
      analyticsTracking: true
    },
    preferences: {
      theme: 'system',
      language: 'en',
      dateFormat: 'MM/dd/yyyy',
      timeFormat: '12h'
    }
  });

  const handleSave = async (section: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(`${section} settings updated successfully`);
    } catch (error) {
      toast.error('Failed to update settings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast.success('Account deletion initiated. You will receive a confirmation email.');
      } catch (error) {
        toast.error('Failed to delete account');
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-8 ml-64 mt-16">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                Settings
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-2">
                Manage your account settings and preferences.
              </p>
            </div>

            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="privacy">Privacy</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>

              {/* Profile Settings */}
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="h-5 w-5 mr-2" />
                      Profile Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-6">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src={settings.profile.avatar} alt={settings.profile.name} />
                        <AvatarFallback className="text-lg">
                          {settings.profile.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <Button variant="outline">Change Avatar</Button>
                        <p className="text-sm text-slate-500 mt-2">
                          JPG, GIF or PNG. 1MB max.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={settings.profile.name}
                          onChange={(e) => setSettings({
                            ...settings,
                            profile: { ...settings.profile, name: e.target.value }
                          })}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={settings.profile.email}
                          onChange={(e) => setSettings({
                            ...settings,
                            profile: { ...settings.profile, email: e.target.value }
                          })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        placeholder="Tell us about yourself..."
                        value={settings.profile.bio}
                        onChange={(e) => setSettings({
                          ...settings,
                          profile: { ...settings.profile, bio: e.target.value }
                        })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select value={settings.profile.timezone} onValueChange={(value) => 
                        setSettings({
                          ...settings,
                          profile: { ...settings.profile, timezone: value }
                        })
                      }>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="UTC">UTC</SelectItem>
                          <SelectItem value="America/New_York">Eastern Time</SelectItem>
                          <SelectItem value="America/Chicago">Central Time</SelectItem>
                          <SelectItem value="America/Denver">Mountain Time</SelectItem>
                          <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                          <SelectItem value="Europe/London">London</SelectItem>
                          <SelectItem value="Europe/Paris">Paris</SelectItem>
                          <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button onClick={() => handleSave('Profile')} disabled={isLoading}>
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </Button>
                    
                    <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <p className="text-sm text-green-700 dark:text-green-300">
                        💡 <strong>Pro Tip:</strong> Keep your profile updated to help clients understand your expertise and background.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notification Settings */}
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Bell className="h-5 w-5 mr-2" />
                      Notification Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Email Notifications</Label>
                          <p className="text-sm text-slate-500">
                            Receive notifications via email
                          </p>
                        </div>
                        <Switch
                          checked={settings.notifications.emailNotifications}
                          onCheckedChange={(checked) => setSettings({
                            ...settings,
                            notifications: { ...settings.notifications, emailNotifications: checked }
                          })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Push Notifications</Label>
                          <p className="text-sm text-slate-500">
                            Receive push notifications in your browser
                          </p>
                        </div>
                        <Switch
                          checked={settings.notifications.pushNotifications}
                          onCheckedChange={(checked) => setSettings({
                            ...settings,
                            notifications: { ...settings.notifications, pushNotifications: checked }
                          })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Post Reminders</Label>
                          <p className="text-sm text-slate-500">
                            Get reminded about scheduled posts
                          </p>
                        </div>
                        <Switch
                          checked={settings.notifications.postReminders}
                          onCheckedChange={(checked) => setSettings({
                            ...settings,
                            notifications: { ...settings.notifications, postReminders: checked }
                          })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Client Updates</Label>
                          <p className="text-sm text-slate-500">
                            Notifications about client activity
                          </p>
                        </div>
                        <Switch
                          checked={settings.notifications.clientUpdates}
                          onCheckedChange={(checked) => setSettings({
                            ...settings,
                            notifications: { ...settings.notifications, clientUpdates: checked }
                          })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Weekly Reports</Label>
                          <p className="text-sm text-slate-500">
                            Weekly performance summaries
                          </p>
                        </div>
                        <Switch
                          checked={settings.notifications.weeklyReports}
                          onCheckedChange={(checked) => setSettings({
                            ...settings,
                            notifications: { ...settings.notifications, weeklyReports: checked }
                          })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Marketing Emails</Label>
                          <p className="text-sm text-slate-500">
                            Product updates and marketing content
                          </p>
                        </div>
                        <Switch
                          checked={settings.notifications.marketingEmails}
                          onCheckedChange={(checked) => setSettings({
                            ...settings,
                            notifications: { ...settings.notifications, marketingEmails: checked }
                          })}
                        />
                      </div>
                    </div>

                    <Button onClick={() => handleSave('Notification')} disabled={isLoading}>
                      {isLoading ? 'Saving...' : 'Save Preferences'}
                    </Button>
                    
                    <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        📧 <strong>Email Preferences:</strong> You can unsubscribe from marketing emails while keeping important account notifications.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Privacy Settings */}
              <TabsContent value="privacy">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="h-5 w-5 mr-2" />
                      Privacy & Security
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Profile Visibility</Label>
                        <Select value={settings.privacy.profileVisibility} onValueChange={(value) => 
                          setSettings({
                            ...settings,
                            privacy: { ...settings.privacy, profileVisibility: value }
                          })
                        }>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="public">Public</SelectItem>
                            <SelectItem value="private">Private</SelectItem>
                            <SelectItem value="team">Team Only</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Data Sharing</Label>
                          <p className="text-sm text-slate-500">
                            Allow anonymous usage data sharing for product improvement
                          </p>
                        </div>
                        <Switch
                          checked={settings.privacy.dataSharing}
                          onCheckedChange={(checked) => setSettings({
                            ...settings,
                            privacy: { ...settings.privacy, dataSharing: checked }
                          })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Analytics Tracking</Label>
                          <p className="text-sm text-slate-500">
                            Enable analytics to help us improve your experience
                          </p>
                        </div>
                        <Switch
                          checked={settings.privacy.analyticsTracking}
                          onCheckedChange={(checked) => setSettings({
                            ...settings,
                            privacy: { ...settings.privacy, analyticsTracking: checked }
                          })}
                        />
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-4">
                        Two-Factor Authentication
                      </h4>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <Button variant="outline">
                          <Key className="h-4 w-4 mr-2" />
                          Enable 2FA
                        </Button>
                      </div>
                    </div>

                    <Button onClick={() => handleSave('Privacy')} disabled={isLoading}>
                      {isLoading ? 'Saving...' : 'Save Settings'}
                    </Button>
                    
                    <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">
                        🔒 <strong>Security Note:</strong> We recommend enabling 2FA for enhanced account security, especially for agency accounts.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Billing Settings */}
              <TabsContent value="billing">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <CreditCard className="h-5 w-5 mr-2" />
                        Current Plan
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                              Starter Plan
                            </h3>
                            <Badge>Active</Badge>
                          </div>
                          <p className="text-slate-600 dark:text-slate-400">
                            $10/month • Up to 5 clients • Advanced features
                          </p>
                          <p className="text-sm text-slate-500 mt-1">
                            Next billing date: February 15, 2025
                          </p>
                        </div>
                        <div className="text-right">
                          <Button variant="outline" className="mb-2">
                            Change Plan
                          </Button>
                          <br />
                          <Button variant="ghost" size="sm">
                            Cancel Subscription
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Payment Method</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-8 bg-slate-200 dark:bg-slate-700 rounded flex items-center justify-center">
                            <span className="text-xs font-medium">VISA</span>
                          </div>
                          <div>
                            <p className="font-medium text-slate-900 dark:text-slate-100">
                              •••• •••• •••• 4242
                            </p>
                            <p className="text-sm text-slate-500">
                              Expires 12/2025
                            </p>
                          </div>
                        </div>
                        <Link href="/dashboard/billing">
                          <Button variant="outline">
                            Update
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Billing History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { date: 'Jan 15, 2025', amount: '$10.00', status: 'Paid' },
                          { date: 'Dec 15, 2023', amount: '$10.00', status: 'Paid' },
                          { date: 'Nov 15, 2023', amount: '$10.00', status: 'Paid' },
                        ].map((invoice, index) => (
                          <div key={index} className="flex items-center justify-between py-2 border-b border-slate-200 dark:border-slate-700 last:border-0">
                            <div>
                              <p className="font-medium text-slate-900 dark:text-slate-100">
                                {invoice.date}
                              </p>
                              <p className="text-sm text-slate-500">
                                Starter Plan
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-slate-900 dark:text-slate-100">
                                {invoice.amount}
                              </p>
                              <Badge variant="outline" className="text-xs">
                                {invoice.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4">
                        <Link href="/dashboard/billing">
                          <Button variant="outline" className="w-full">
                            View Full Billing History
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Advanced Settings */}
              <TabsContent value="advanced">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Palette className="h-5 w-5 mr-2" />
                        Appearance & Preferences
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label>Theme</Label>
                          <Select value={settings.preferences.theme} onValueChange={(value) => 
                            setSettings({
                              ...settings,
                              preferences: { ...settings.preferences, theme: value }
                            })
                          }>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="light">Light</SelectItem>
                              <SelectItem value="dark">Dark</SelectItem>
                              <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Language</Label>
                          <Select value={settings.preferences.language} onValueChange={(value) => 
                            setSettings({
                              ...settings,
                              preferences: { ...settings.preferences, language: value }
                            })
                          }>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="en">English</SelectItem>
                              <SelectItem value="es">Spanish</SelectItem>
                              <SelectItem value="fr">French</SelectItem>
                              <SelectItem value="de">German</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Date Format</Label>
                          <Select value={settings.preferences.dateFormat} onValueChange={(value) => 
                            setSettings({
                              ...settings,
                              preferences: { ...settings.preferences, dateFormat: value }
                            })
                          }>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="MM/dd/yyyy">MM/DD/YYYY</SelectItem>
                              <SelectItem value="dd/MM/yyyy">DD/MM/YYYY</SelectItem>
                              <SelectItem value="yyyy-MM-dd">YYYY-MM-DD</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Time Format</Label>
                          <Select value={settings.preferences.timeFormat} onValueChange={(value) => 
                            setSettings({
                              ...settings,
                              preferences: { ...settings.preferences, timeFormat: value }
                            })
                          }>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="12h">12 Hour</SelectItem>
                              <SelectItem value="24h">24 Hour</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <Button onClick={() => handleSave('Preferences')} disabled={isLoading}>
                        {isLoading ? 'Saving...' : 'Save Preferences'}
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Database className="h-5 w-5 mr-2" />
                        Data Management
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-slate-900 dark:text-slate-100">
                            Export Data
                          </h4>
                          <p className="text-sm text-slate-500">
                            Download all your data in JSON format
                          </p>
                        </div>
                        <Button variant="outline" onClick={() => {
                          // Export user data
                          const userData = {
                            profile: settings.profile,
                            preferences: settings.preferences,
                            exportDate: new Date().toISOString()
                          };
                          const blob = new Blob([JSON.stringify(userData, null, 2)], { type: 'application/json' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = 'lincognito-data-export.json';
                          a.click();
                          URL.revokeObjectURL(url);
                          toast.success('Data exported successfully');
                        }}>
                          Export
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-slate-900 dark:text-slate-100">
                            Clear Cache
                          </h4>
                          <p className="text-sm text-slate-500">
                            Clear all cached data and preferences
                          </p>
                        </div>
                        <Button variant="outline" onClick={() => {
                          // Clear localStorage and sessionStorage
                          localStorage.clear();
                          sessionStorage.clear();
                          toast.success('Cache cleared successfully');
                          // Optionally reload the page
                          window.location.reload();
                        }}>
                          Clear
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-red-200 dark:border-red-800">
                    <CardHeader>
                      <CardTitle className="flex items-center text-red-600">
                        <Trash2 className="h-5 w-5 mr-2" />
                        Danger Zone
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-slate-900 dark:text-slate-100">
                            Delete Account
                          </h4>
                          <p className="text-sm text-slate-500">
                            Permanently delete your account and all data
                          </p>
                        </div>
                        <Button variant="destructive" onClick={handleDeleteAccount}>
                          Delete Account
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}