'use client';

import { useState, useEffect, Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar';
import { PostPublishingWorkflow } from '@/components/dashboard/post-publishing-workflow';
import { ClientCollaborationPanel } from '@/components/dashboard/client-collaboration-panel';
import { Plus, Edit, Trash2, FileText, Calendar, Send, Clock, CheckCircle, MessageSquare } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';

interface Post {
  id: string;
  title?: string;
  content: string;
  status: 'DRAFT' | 'SCHEDULED' | 'PUBLISHED' | 'ARCHIVED';
  scheduledFor?: string;
  publishedAt?: string;
  likes: number;
  comments: number;
  shares: number;
  views: number;
  hashtags: string[];
  mentions: string[];
  createdAt: string;
  updatedAt: string;
  client: {
    id: string;
    name: string;
    company?: string;
    avatar?: string;
  };
}

interface Client {
  id: string;
  name: string;
  company?: string;
  avatar?: string;
}

function ContentPageInner() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedClient, setSelectedClient] = useState<string>('all');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showCollaboration, setShowCollaboration] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    clientId: '',
    scheduledFor: '',
    hashtags: '',
    mentions: '',
  });

  useEffect(() => {
    fetchPosts();
    fetchClients();
    
    // Check for action parameter to auto-open create post dialog
    if (searchParams.get('action') === 'create') {
      setIsDialogOpen(true);
    }
  }, [searchParams]);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/posts', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      toast.error('Failed to fetch posts');
    } finally {
      setIsLoading(false);
    }
  };

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
      console.error('Failed to fetch clients');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      const url = editingPost ? `/api/posts/${editingPost.id}` : '/api/posts';
      const method = editingPost ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          hashtags: formData.hashtags.split(',').map(tag => tag.trim()).filter(Boolean),
          mentions: formData.mentions.split(',').map(mention => mention.trim()).filter(Boolean),
        }),
      });

      if (response.ok) {
        toast.success(editingPost ? 'Post updated successfully' : 'Post created successfully');
        setIsDialogOpen(false);
        setEditingPost(null);
        resetForm();
        fetchPosts();
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to save post');
      }
    } catch (error) {
      toast.error('Failed to save post');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      clientId: '',
      scheduledFor: '',
      hashtags: '',
      mentions: '',
    });
  };

  const handlePublish = async (postId: string) => {
    // This now triggers the publishing workflow component
    const post = posts.find(p => p.id === postId);
    if (post) {
      setSelectedPost(post);
    }
  };

  const handlePublishComplete = () => {
    setSelectedPost(null);
    fetchPosts();
  };

  const handleCollaboration = (post: Post) => {
    setSelectedPost(post);
    setShowCollaboration(true);
  };

  const handleStatusChange = (newStatus: string) => {
    if (selectedPost) {
      // Update post status in the list
      setPosts(posts.map(post => 
        post.id === selectedPost.id 
          ? { ...post, status: newStatus as any }
          : post
      ));
    }
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setFormData({
      title: post.title || '',
      content: post.content,
      clientId: post.client.id,
      scheduledFor: post.scheduledFor ? new Date(post.scheduledFor).toISOString().slice(0, 16) : '',
      hashtags: post.hashtags.join(', '),
      mentions: post.mentions.join(', '),
    });
    setIsDialogOpen(true);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'DRAFT':
        return <Edit className="h-4 w-4" />;
      case 'SCHEDULED':
        return <Clock className="h-4 w-4" />;
      case 'PUBLISHED':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DRAFT':
        return 'bg-gray-100 text-gray-800';
      case 'SCHEDULED':
        return 'bg-blue-100 text-blue-800';
      case 'PUBLISHED':
        return 'bg-green-100 text-green-800';
      case 'ARCHIVED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredPosts = posts.filter(post => {
    const statusMatch = selectedStatus === 'all' || post.status === selectedStatus;
    const clientMatch = selectedClient === 'all' || post.client.id === selectedClient;
    return statusMatch && clientMatch;
  });

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
                  <div key={i} className="h-32 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
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
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                  Content Library
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mt-2">
                  Create, schedule, and manage LinkedIn posts for your clients.
                </p>
              </div>
              
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => { resetForm(); setEditingPost(null); }}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Post
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>
                      {editingPost ? 'Edit Post' : 'Create New Post'}
                    </DialogTitle>
                  </DialogHeader>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="clientId">Client *</Label>
                      <Select value={formData.clientId} onValueChange={(value) => setFormData({ ...formData, clientId: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select client" />
                        </SelectTrigger>
                        <SelectContent>
                          {clients.map((client) => (
                            <SelectItem key={client.id} value={client.id}>
                              {client.name} {client.company && `(${client.company})`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="title">Title (Optional)</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Post title for internal reference"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="content">Content *</Label>
                      <Textarea
                        id="content"
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        rows={8}
                        placeholder="Write your LinkedIn post content here..."
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="scheduledFor">Schedule For (Optional)</Label>
                      <Input
                        id="scheduledFor"
                        type="datetime-local"
                        value={formData.scheduledFor}
                        onChange={(e) => setFormData({ ...formData, scheduledFor: e.target.value })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="hashtags">Hashtags (comma-separated)</Label>
                      <Input
                        id="hashtags"
                        value={formData.hashtags}
                        onChange={(e) => setFormData({ ...formData, hashtags: e.target.value })}
                        placeholder="leadership, innovation, technology"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="mentions">Mentions (comma-separated)</Label>
                      <Input
                        id="mentions"
                        value={formData.mentions}
                        onChange={(e) => setFormData({ ...formData, mentions: e.target.value })}
                        placeholder="@company, @person"
                      />
                    </div>
                    
                    <div className="flex justify-end space-x-4">
                      <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">
                        {editingPost ? 'Update Post' : 'Create Post'}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Filters */}
            <div className="flex space-x-4 mb-6">
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="DRAFT">Draft</SelectItem>
                  <SelectItem value="SCHEDULED">Scheduled</SelectItem>
                  <SelectItem value="PUBLISHED">Published</SelectItem>
                  <SelectItem value="ARCHIVED">Archived</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedClient} onValueChange={setSelectedClient}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by client" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Clients</SelectItem>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {filteredPosts.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    No posts yet
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">
                    Create your first LinkedIn post to get started.
                  </p>
                  <Button onClick={() => setIsDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Post
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(post.status)}
                            <Badge className={getStatusColor(post.status)}>
                              {post.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">
                            {post.client.name} {post.client.company && `• ${post.client.company}`}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(post)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          {post.status === 'DRAFT' && (
                            <>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleCollaboration(post)}
                                className="text-blue-600 hover:text-blue-700"
                              >
                                <MessageSquare className="h-4 w-4" />
                              </Button>
                              <PostPublishingWorkflow
                                postId={post.id}
                                postTitle={post.title || 'Untitled Post'}
                                postContent={post.content}
                                clientName={post.client.name}
                                onPublishComplete={handlePublishComplete}
                              />
                            </>
                          )}
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {post.title && (
                        <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                          {post.title}
                        </h3>
                      )}
                      
                      <p className="text-slate-700 dark:text-slate-300 mb-4 line-clamp-3">
                        {post.content}
                      </p>
                      
                      {post.hashtags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {post.hashtags.map((hashtag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              #{hashtag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6 text-sm text-slate-600 dark:text-slate-400">
                          {post.status === 'PUBLISHED' && (
                            <>
                              <span>{post.likes} likes</span>
                              <span>{post.comments} comments</span>
                              <span>{post.shares} shares</span>
                              <span>{post.views} views</span>
                            </>
                          )}
                          {post.status === 'SCHEDULED' && post.scheduledFor && (
                            <span>
                              Scheduled for {new Date(post.scheduledFor).toLocaleString()}
                            </span>
                          )}
                        </div>
                        
                        <div className="text-sm text-slate-500">
                          {post.status === 'PUBLISHED' && post.publishedAt
                            ? `Published ${new Date(post.publishedAt).toLocaleDateString()}`
                            : `Created ${new Date(post.createdAt).toLocaleDateString()}`
                          }
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Collaboration Panel Dialog */}
          {selectedPost && showCollaboration && (
            <Dialog open={showCollaboration} onOpenChange={setShowCollaboration}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    Collaborate on: {selectedPost.title || 'Untitled Post'}
                  </DialogTitle>
                </DialogHeader>
                
                <ClientCollaborationPanel
                  postId={selectedPost.id}
                  clientId={selectedPost.client.id}
                  clientName={selectedPost.client.name}
                  clientAvatar={selectedPost.client.avatar}
                  currentStatus={selectedPost.status.toLowerCase() as any}
                  onStatusChange={handleStatusChange}
                />
              </DialogContent>
            </Dialog>
          )}

          {/* Publishing Workflow for selected post */}
          {selectedPost && !showCollaboration && (
            <PostPublishingWorkflow
              postId={selectedPost.id}
              postTitle={selectedPost.title || 'Untitled Post'}
              postContent={selectedPost.content}
              clientName={selectedPost.client.name}
              onPublishComplete={handlePublishComplete}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default function ContentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <DashboardHeader />
        <div className="flex">
          <DashboardSidebar />
          <main className="flex-1 p-8 ml-64 mt-16">
            <div className="animate-pulse">
              <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/4 mb-8"></div>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-32 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    }>
      <ContentPageInner />
    </Suspense>
  );
}