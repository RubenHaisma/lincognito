'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar';
import { 
  Building, 
  Plus, 
  Users, 
  Settings, 
  Crown, 
  Mail,
  MoreHorizontal,
  TrendingUp,
  Calendar,
  BarChart3
} from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { toast } from 'sonner';
import Link from 'next/link';

interface Agency {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  website?: string;
  plan: string;
  planStatus: string;
  owner: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  members: Array<{
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    avatar?: string;
  }>;
  clients: Array<{
    id: string;
    name: string;
    company?: string;
    posts: Array<{
      id: string;
      status: string;
      likes: number;
      comments: number;
      shares: number;
    }>;
  }>;
}

export default function AgencyPage() {
  const { user } = useAuth();
  const [agency, setAgency] = useState<Agency | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [createForm, setCreateForm] = useState({
    name: '',
    slug: '',
    description: '',
    website: '',
  });
  const [inviteForm, setInviteForm] = useState({
    email: '',
    role: 'USER',
  });

  useEffect(() => {
    fetchAgency();
  }, []);

  const fetchAgency = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/agencies', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAgency(data);
      }
    } catch (error) {
      toast.error('Failed to fetch agency data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAgency = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/agencies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(createForm),
      });

      if (response.ok) {
        const newAgency = await response.json();
        setAgency(newAgency);
        setIsCreateDialogOpen(false);
        toast.success('Agency created successfully!');
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to create agency');
      }
    } catch (error) {
      toast.error('Failed to create agency');
    }
  };

  const handleInviteMember = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agency) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/agencies/${agency.id}/members`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(inviteForm),
      });

      if (response.ok) {
        setIsInviteDialogOpen(false);
        setInviteForm({ email: '', role: 'USER' });
        toast.success('Invitation sent successfully!');
        fetchAgency(); // Refresh data
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to send invitation');
      }
    } catch (error) {
      toast.error('Failed to send invitation');
    }
  };

  const getAgencyStats = () => {
    if (!agency) return { totalClients: 0, totalPosts: 0, totalEngagement: 0 };

    const totalClients = agency.clients.length;
    const totalPosts = agency.clients.reduce((sum, client) => sum + client.posts.length, 0);
    const totalEngagement = agency.clients.reduce((sum, client) => 
      sum + client.posts.reduce((postSum, post) => 
        postSum + post.likes + post.comments + post.shares, 0), 0);

    return { totalClients, totalPosts, totalEngagement };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <DashboardHeader />
        <div className="flex">
          <DashboardSidebar />
          <main className="flex-1 p-8 ml-64 mt-16">
            <div className="animate-pulse">
              <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/4 mb-8"></div>
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-32 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (!agency) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <DashboardHeader />
        <div className="flex">
          <DashboardSidebar />
          <main className="flex-1 p-8 ml-64 mt-16">
            <div className="max-w-4xl mx-auto">
              <div className="text-center py-12">
                <Building className="h-16 w-16 text-slate-400 mx-auto mb-6" />
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                  Create Your Agency
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
                  Transform your LinkedIn ghostwriting business into a full-scale agency. 
                  Manage multiple team members, clients, and scale your operations.
                </p>
                
                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg">
                      <Building className="h-5 w-5 mr-2" />
                      Create Agency
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Create Your Agency</DialogTitle>
                    </DialogHeader>
                    
                    <form onSubmit={handleCreateAgency} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Agency Name *</Label>
                        <Input
                          id="name"
                          value={createForm.name}
                          onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                          placeholder="Your Agency Name"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="slug">Agency Slug *</Label>
                        <Input
                          id="slug"
                          value={createForm.slug}
                          onChange={(e) => setCreateForm({ ...createForm, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })}
                          placeholder="your-agency-slug"
                          required
                        />
                        <p className="text-xs text-slate-500">
                          This will be your agency URL: lincognito.com/agency/{createForm.slug}
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={createForm.description}
                          onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
                          placeholder="Describe your agency..."
                          rows={3}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          type="url"
                          value={createForm.website}
                          onChange={(e) => setCreateForm({ ...createForm, website: e.target.value })}
                          placeholder="https://your-website.com"
                        />
                      </div>
                      
                      <div className="flex space-x-3">
                        <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)} className="flex-1">
                          Cancel
                        </Button>
                        <Button type="submit" className="flex-1" disabled={!inviteForm.email}>
                          Create Agency
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const stats = getAgencyStats();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-8 ml-64 mt-16">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                  {agency.name}
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mt-2">
                  Manage your agency team, clients, and operations
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <Badge className="bg-green-100 text-green-800">
                  {agency.plan} Plan
                </Badge>
                <Link href="/dashboard/settings">
                  <Button variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </Link>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        Total Clients
                      </p>
                      <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                        {stats.totalClients}
                      </p>
                    </div>
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        Total Posts
                      </p>
                      <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                        {stats.totalPosts}
                      </p>
                    </div>
                    <Calendar className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        Total Engagement
                      </p>
                      <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                        {stats.totalEngagement.toLocaleString()}
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Team Members */}
            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Team Members ({agency.members.length + 1})
                  </CardTitle>
                  
                  <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Invite Member
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Invite Team Member</DialogTitle>
                      </DialogHeader>
                      
                      <form onSubmit={handleInviteMember} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={inviteForm.email}
                            onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                            placeholder="colleague@example.com"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="role">Role</Label>
                          <Select value={inviteForm.role} onValueChange={(value) => setInviteForm({ ...inviteForm, role: value })}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="USER">Team Member</SelectItem>
                              <SelectItem value="ADMIN">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="flex space-x-3">
                          <Button type="button" variant="outline" onClick={() => setIsInviteDialogOpen(false)} className="flex-1">
                            Cancel
                          </Button>
                          <Button type="submit" className="flex-1">
                            Send Invitation
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Agency Owner */}
                  <div className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={agency.owner.avatar || ''} alt={agency.owner.name} />
                        <AvatarFallback>{agency.owner.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-slate-900 dark:text-slate-100">
                            {agency.owner.name}
                          </h4>
                          <Crown className="h-4 w-4 text-yellow-500" />
                        </div>
                        <p className="text-sm text-slate-500">{agency.owner.email}</p>
                        <Badge variant="outline" className="text-xs">Owner</Badge>
                      </div>
                    </div>
                  </div>

                  {/* Team Members */}
                  {agency.members.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={member.avatar || ''} alt={member.name} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium text-slate-900 dark:text-slate-100">
                            {member.name}
                          </h4>
                          <p className="text-sm text-slate-500">{member.email}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {member.role === 'ADMIN' ? 'Admin' : 'Member'}
                            </Badge>
                            <span className="text-xs text-slate-400">
                              Joined {new Date(member.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Agency Clients */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Agency Clients ({agency.clients.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {agency.clients.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600 dark:text-slate-400">
                      No clients yet. Team members can start adding clients.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {agency.clients.map((client) => {
                      const totalEngagement = client.posts.reduce((sum, post) => 
                        sum + post.likes + post.comments + post.shares, 0);
                      
                      return (
                        <div key={client.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                          <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-1">
                            {client.name}
                          </h4>
                          {client.company && (
                            <p className="text-sm text-slate-500 mb-3">{client.company}</p>
                          )}
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-slate-500">Posts:</span>
                              <span className="font-medium ml-1">{client.posts.length}</span>
                            </div>
                            <div>
                              <span className="text-slate-500">Engagement:</span>
                              <span className="font-medium ml-1">{totalEngagement}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}