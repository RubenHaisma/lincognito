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
import { Plus, Edit, Trash2, Users, TrendingUp, Calendar, MoreHorizontal } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { toast } from 'sonner';
import { LinkedInConnection } from '@/components/dashboard/linkedin-connection';

interface Client {
  id: string;
  name: string;
  company?: string;
  bio?: string;
  tone?: string;
  industry?: string;
  avatar?: string;
  linkedinUrl?: string;
  brandGuidelines?: string;
  hashtags?: string[];
  keywords?: string[];
  isActive: boolean;
  createdAt: string;
  linkedinTokens?: {
    accessToken: string;
    expiresAt: string;
  };
  posts: Array<{
    id: string;
    status: string;
    scheduledFor?: string;
    likes: number;
    comments: number;
    shares: number;
  }>;
}

export default function ClientsPage() {
  const { user } = useAuth();
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    bio: '',
    tone: '',
    industry: '',
    linkedinUrl: '',
    brandGuidelines: '',
    hashtags: '',
    keywords: '',
  });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/clients', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setClients(data);
      }
    } catch (error) {
      toast.error('Failed to fetch clients');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      const url = editingClient ? `/api/clients/${editingClient.id}` : '/api/clients';
      const method = editingClient ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          hashtags: formData.hashtags.split(',').map(tag => tag.trim()).filter(Boolean),
          keywords: formData.keywords.split(',').map(keyword => keyword.trim()).filter(Boolean),
        }),
      });

      if (response.ok) {
        toast.success(editingClient ? 'Client updated successfully' : 'Client created successfully');
        setIsDialogOpen(false);
        setEditingClient(null);
        resetForm();
        fetchClients();
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to save client');
      }
    } catch (error) {
      toast.error('Failed to save client');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      company: '',
      bio: '',
      tone: '',
      industry: '',
      linkedinUrl: '',
      brandGuidelines: '',
      hashtags: '',
      keywords: '',
    });
  };

  const handleEdit = (client: Client) => {
    setEditingClient(client);
    setFormData({
      name: client.name,
      company: client.company || '',
      bio: client.bio || '',
      tone: client.tone || '',
      industry: client.industry || '',
      linkedinUrl: client.linkedinUrl || '',
      brandGuidelines: client.brandGuidelines || '',
      hashtags: client.hashtags?.join(', ') || '',
      keywords: client.keywords?.join(', ') || '',
    });
    setIsDialogOpen(true);
  };

  const getClientStats = (client: Client) => {
    const totalPosts = client.posts.length;
    const totalEngagement = client.posts.reduce((sum, post) => sum + post.likes + post.comments + post.shares, 0);
    const scheduledPosts = client.posts.filter(post => post.status === 'SCHEDULED').length;
    
    return { totalPosts, totalEngagement, scheduledPosts };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <DashboardHeader />
        <div className="flex">
          <DashboardSidebar />
          <main className="flex-1 p-8 ml-64">
            <div className="animate-pulse">
              <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/4 mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-64 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
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
        <main className="flex-1 p-8 ml-64">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                  Client Management
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mt-2">
                  Manage your LinkedIn ghostwriting clients and their profiles.
                </p>
              </div>
              
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => { resetForm(); setEditingClient(null); }}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Client
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>
                      {editingClient ? 'Edit Client' : 'Add New Client'}
                    </DialogTitle>
                  </DialogHeader>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Client Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        rows={3}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="tone">Tone</Label>
                        <Select value={formData.tone} onValueChange={(value) => setFormData({ ...formData, tone: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select tone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="professional">Professional</SelectItem>
                            <SelectItem value="casual">Casual</SelectItem>
                            <SelectItem value="authoritative">Authoritative</SelectItem>
                            <SelectItem value="friendly">Friendly</SelectItem>
                            <SelectItem value="thought-leader">Thought Leader</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="industry">Industry</Label>
                        <Input
                          id="industry"
                          value={formData.industry}
                          onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                      <Input
                        id="linkedinUrl"
                        type="url"
                        value={formData.linkedinUrl}
                        onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="hashtags">Preferred Hashtags (comma-separated)</Label>
                      <Input
                        id="hashtags"
                        value={formData.hashtags}
                        onChange={(e) => setFormData({ ...formData, hashtags: e.target.value })}
                        placeholder="#leadership, #innovation, #technology"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="keywords">Keywords (comma-separated)</Label>
                      <Input
                        id="keywords"
                        value={formData.keywords}
                        onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                        placeholder="leadership, innovation, growth"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="brandGuidelines">Brand Guidelines</Label>
                      <Textarea
                        id="brandGuidelines"
                        value={formData.brandGuidelines}
                        onChange={(e) => setFormData({ ...formData, brandGuidelines: e.target.value })}
                        rows={4}
                        placeholder="Describe the client's brand voice, messaging guidelines, topics to avoid, etc."
                      />
                    </div>
                    
                    <div className="flex justify-end space-x-4">
                      <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">
                        {editingClient ? 'Update Client' : 'Create Client'}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {clients.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <Users className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    No clients yet
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">
                    Get started by adding your first LinkedIn ghostwriting client.
                  </p>
                  <Button onClick={() => setIsDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Client
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clients.map((client) => {
                  const stats = getClientStats(client);
                  
                  return (
                    <Card key={client.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={client.avatar} alt={client.name} />
                              <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-lg">{client.name}</CardTitle>
                              {client.company && (
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                  {client.company}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={client.isActive ? 'default' : 'secondary'}>
                              {client.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                            <Button variant="ghost" size="sm" onClick={() => handleEdit(client)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <LinkedInConnection 
                        clientId={client.id}
                        isConnected={!!client.linkedinTokens?.accessToken}
                        onConnectionChange={fetchClients}
                      />
                      
                      <CardContent>
                        {client.bio && (
                          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                            {client.bio}
                          </p>
                        )}
                        
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div className="text-center">
                            <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                              {stats.totalPosts}
                            </div>
                            <div className="text-xs text-slate-500">Posts</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                              {stats.totalEngagement}
                            </div>
                            <div className="text-xs text-slate-500">Engagement</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                              {stats.scheduledPosts}
                            </div>
                            <div className="text-xs text-slate-500">Scheduled</div>
                          </div>
                        </div>
                        
                        {client.hashtags && client.hashtags.length > 0 && (
                          <div className="mb-4">
                            <div className="text-xs text-slate-500 mb-2">Hashtags:</div>
                            <div className="flex flex-wrap gap-1">
                              {client.hashtags.slice(0, 3).map((hashtag, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  #{hashtag}
                                </Badge>
                              ))}
                              {client.hashtags.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{client.hashtags.length - 3}
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}
                        
                        <div className="flex justify-between items-center">
                          <div className="text-xs text-slate-500">
                            Created {new Date(client.createdAt).toLocaleDateString()}
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Calendar className="h-4 w-4 mr-1" />
                              Schedule
                            </Button>
                            <Button variant="outline" size="sm">
                              <TrendingUp className="h-4 w-4 mr-1" />
                              Analytics
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}