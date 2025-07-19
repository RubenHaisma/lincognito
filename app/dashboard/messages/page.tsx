'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar';
import { 
  MessageSquare, 
  Send, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Plus,
  Paperclip,
  MoreHorizontal
} from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { toast } from 'sonner';

interface Message {
  id: string;
  subject: string;
  content: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
    role: 'client' | 'user';
  };
  recipient: {
    id: string;
    name: string;
    avatar?: string;
  };
  status: 'unread' | 'read' | 'replied';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  thread?: Message[];
  attachments?: Array<{
    id: string;
    name: string;
    type: string;
    url: string;
  }>;
  relatedPost?: {
    id: string;
    title: string;
    content: string;
  };
}

export default function MessagesPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [composeForm, setComposeForm] = useState({
    recipient: '',
    subject: '',
    content: '',
    priority: 'medium'
  });

  // Mock data - in real app, this would come from API
  useEffect(() => {
    const mockMessages: Message[] = [
      {
        id: '1',
        subject: 'Approval needed for LinkedIn post about leadership',
        content: 'Hi! I\'ve reviewed the draft post about leadership principles. Could you please adjust the tone to be more conversational? Also, can we add a personal anecdote about overcoming challenges? The current version feels a bit too formal for my audience. Looking forward to your revisions!',
        sender: {
          id: 'client-1',
          name: 'Sarah Johnson',
          avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
          role: 'client'
        },
        recipient: {
          id: user?.id || '1',
          name: user?.name || 'Demo User',
          avatar: ''
        },
        status: 'unread',
        priority: 'high',
        createdAt: '2025-01-15T10:30:00Z',
        updatedAt: '2025-01-15T10:30:00Z',
        relatedPost: {
          id: 'post-1',
          title: 'Leadership Principles for Modern Executives',
          content: 'In today\'s rapidly evolving business landscape...'
        }
      },
      {
        id: '2',
        subject: 'Great work on the industry trends post!',
        content: 'The post about AI trends in our industry was fantastic! The engagement has been amazing - over 200 likes and 50 comments so far. Could we create a follow-up post diving deeper into the implementation challenges? I think our audience would love more tactical advice.',
        sender: {
          id: 'client-2',
          name: 'Michael Chen',
          avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
          role: 'client'
        },
        recipient: {
          id: user?.id || '1',
          name: user?.name || 'Demo User',
          avatar: ''
        },
        status: 'read',
        priority: 'medium',
        createdAt: '2025-01-14T15:45:00Z',
        updatedAt: '2025-01-14T16:20:00Z'
      },
      {
        id: '3',
        subject: 'Content calendar review for February',
        content: 'Hi! I\'ve reviewed the February content calendar you sent. Overall it looks great, but I\'d like to make a few adjustments:\n\n1. Can we add more posts about team building?\n2. The post scheduled for Feb 14th should be more Valentine\'s Day themed\n3. Let\'s include at least one post about our recent product launch\n\nWhen can we schedule a call to discuss these changes?',
        sender: {
          id: 'client-3',
          name: 'Emma Rodriguez',
          avatar: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
          role: 'client'
        },
        recipient: {
          id: user?.id || '1',
          name: user?.name || 'Demo User',
          avatar: ''
        },
        status: 'replied',
        priority: 'medium',
        createdAt: '2025-01-13T09:15:00Z',
        updatedAt: '2025-01-13T14:30:00Z'
      },
      {
        id: '4',
        subject: 'Urgent: Post approval needed by EOD',
        content: 'Hi! We have a time-sensitive post that needs to go live tomorrow morning. It\'s about our company\'s response to the recent industry news. Could you please review and approve ASAP? The draft is attached. Thanks!',
        sender: {
          id: 'client-4',
          name: 'David Thompson',
          avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
          role: 'client'
        },
        recipient: {
          id: user?.id || '1',
          name: user?.name || 'Demo User',
          avatar: ''
        },
        status: 'unread',
        priority: 'high',     
        createdAt: '2025-01-15T14:20:00Z',
        updatedAt: '2025-01-15T14:20:00Z',
        attachments: [
          {
            id: 'att-1',
            name: 'urgent-post-draft.docx',
            type: 'document',
            url: '#'
          }
        ]
      }
    ];
    
    setMessages(mockMessages);
    setIsLoading(false);
  }, [user]);

  const handleSendReply = async () => {
    if (!selectedMessage || !replyContent.trim()) return;

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update message status
      setMessages(messages.map(msg => 
        msg.id === selectedMessage.id 
          ? { ...msg, status: 'replied' as const, updatedAt: new Date().toISOString() }
          : msg
      ));
      
      setReplyContent('');
      toast.success('Reply sent successfully!');
    } catch (error) {
      toast.error('Failed to send reply');
    }
  };

  const handleComposeMessage = async () => {
    if (!composeForm.recipient || !composeForm.subject || !composeForm.content) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Message sent successfully!');
      setIsComposeOpen(false);
      setComposeForm({
        recipient: '',
        subject: '',
        content: '',
        priority: 'medium'
      });
    } catch (error) {
      toast.error('Failed to send message');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'unread':
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case 'read':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'replied':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <MessageSquare className="h-4 w-4 text-slate-400" />;
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

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.sender.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || message.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || message.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <DashboardHeader />
        <div className="flex">
          <DashboardSidebar />
          <main className="flex-1 p-8 ml-64 mt-16">
            <div className="animate-pulse">
              <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/4 mb-8"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 h-96 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                <div className="lg:col-span-2 h-96 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
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
                  Messages & Communications
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mt-2">
                  Collaborate with clients on content approval and feedback.
                </p>
              </div>
              
              <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Compose Message
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Compose New Message</DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Recipient</label>
                        <Select value={composeForm.recipient} onValueChange={(value) => 
                          setComposeForm({ ...composeForm, recipient: value })
                        }>
                          <SelectTrigger>
                            <SelectValue placeholder="Select client" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="client-1">Sarah Johnson</SelectItem>
                            <SelectItem value="client-2">Michael Chen</SelectItem>
                            <SelectItem value="client-3">Emma Rodriguez</SelectItem>
                            <SelectItem value="client-4">David Thompson</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Priority</label>
                        <Select value={composeForm.priority} onValueChange={(value) => 
                          setComposeForm({ ...composeForm, priority: value })
                        }>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Subject</label>
                      <Input
                        value={composeForm.subject}
                        onChange={(e) => setComposeForm({ ...composeForm, subject: e.target.value })}
                        placeholder="Enter message subject"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Message</label>
                      <Textarea
                        value={composeForm.content}
                        onChange={(e) => setComposeForm({ ...composeForm, content: e.target.value })}
                        placeholder="Type your message here..."
                        rows={6}
                      />
                    </div>
                    
                    <div className="flex justify-end space-x-3">
                      <Button variant="outline" onClick={() => setIsComposeOpen(false)}>
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleComposeMessage} 
                        disabled={!composeForm.recipient || !composeForm.subject || !composeForm.content}
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Messages List */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Messages ({filteredMessages.length})</CardTitle>
                      <Button variant="ghost" size="sm">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          placeholder="Search messages..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      
                      <div className="flex space-x-2">
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                          <SelectTrigger className="flex-1">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="unread">Unread</SelectItem>
                            <SelectItem value="read">Read</SelectItem>
                            <SelectItem value="replied">Replied</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                          <SelectTrigger className="flex-1">
                            <SelectValue placeholder="Priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Priority</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-0">
                    <div className="space-y-1">
                      {filteredMessages.map((message) => (
                        <div
                          key={message.id}
                          onClick={() => setSelectedMessage(message)}
                          className={`p-4 cursor-pointer border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                            selectedMessage?.id === message.id ? 'bg-primary/5 border-l-4 border-l-primary' : ''
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
                              <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center space-x-2">
                                  {getStatusIcon(message.status)}
                                  <Badge className={getPriorityColor(message.priority)} variant="outline">
                                    {message.priority}
                                  </Badge>
                                </div>
                                <span className="text-xs text-slate-500">
                                  {new Date(message.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                              
                              <h4 className="font-medium text-slate-900 dark:text-slate-100 text-sm mb-1 truncate">
                                {message.subject}
                              </h4>
                              
                              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                                From: {message.sender.name}
                              </p>
                              
                              <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                                {message.content}
                              </p>
                              
                              {message.attachments && message.attachments.length > 0 && (
                                <div className="flex items-center mt-2">
                                  <Paperclip className="h-3 w-3 text-slate-400 mr-1" />
                                  <span className="text-xs text-slate-500">
                                    {message.attachments.length} attachment(s)
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Message Detail */}
              <div className="lg:col-span-2">
                {selectedMessage ? (
                  <Card className="h-full">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{selectedMessage.subject}</CardTitle>
                          <div className="flex items-center space-x-4 mt-2">
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={selectedMessage.sender.avatar} alt={selectedMessage.sender.name} />
                                <AvatarFallback>{selectedMessage.sender.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium text-sm">{selectedMessage.sender.name}</div>
                                <div className="text-xs text-slate-500">
                                  {new Date(selectedMessage.createdAt).toLocaleString()}
                                </div>
                              </div>
                            </div>
                            <Badge className={getPriorityColor(selectedMessage.priority)}>
                              {selectedMessage.priority} priority
                            </Badge>
                          </div>
                        </div>
                        
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      <div className="prose dark:prose-invert max-w-none">
                        <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
                          {selectedMessage.content}
                        </p>
                      </div>
                      
                      {selectedMessage.relatedPost && (
                        <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                          <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">
                            Related Post
                          </h4>
                          <div className="text-sm text-slate-600 dark:text-slate-400">
                            <div className="font-medium">{selectedMessage.relatedPost.title}</div>
                            <div className="mt-1">{selectedMessage.relatedPost.content.substring(0, 100)}...</div>
                          </div>
                        </div>
                      )}
                      
                      {selectedMessage.attachments && selectedMessage.attachments.length > 0 && (
                        <div>
                          <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-3">
                            Attachments
                          </h4>
                          <div className="space-y-2">
                            {selectedMessage.attachments.map((attachment) => (
                              <div key={attachment.id} className="flex items-center space-x-3 p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                                <Paperclip className="h-4 w-4 text-slate-400" />
                                <span className="text-sm text-slate-700 dark:text-slate-300">
                                  {attachment.name}
                                </span>
                                <Button variant="ghost" size="sm">
                                  Download
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                        <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-3">
                          Reply
                        </h4>
                        <div className="space-y-4">
                          <Textarea
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            placeholder="Type your reply here..."
                            rows={4}
                          />
                          <div className="flex justify-end space-x-3">
                            <Button variant="outline" onClick={() => {
                              // Simulate file attachment
                              const input = document.createElement('input');
                              input.type = 'file';
                              input.accept = '.pdf,.doc,.docx,.txt,.jpg,.png';
                              input.onchange = (e) => {
                                const file = (e.target as HTMLInputElement).files?.[0];
                                if (file) {
                                  toast.success(`File "${file.name}" attached`);
                                }
                              };
                              input.click();
                            }}>
                              <Paperclip className="h-4 w-4 mr-2" />
                              Attach File
                            </Button>
                            <Button onClick={handleSendReply} disabled={!replyContent.trim()}>
                              <Send className="h-4 w-4 mr-2" />
                              Send Reply
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="h-full flex items-center justify-center">
                    <CardContent className="text-center">
                      <MessageSquare className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                        Select a message
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400">
                        Choose a message from the list to view its content and reply.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}