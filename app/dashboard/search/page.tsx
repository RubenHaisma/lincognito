'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search, 
  Filter, 
  Clock, 
  FileText, 
  Users, 
  MessageSquare,
  Calendar,
  BarChart3,
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import Link from 'next/link';
import { toast } from 'sonner';

interface SearchResult {
  id: string;
  type: 'client' | 'post' | 'message' | 'template' | 'analytics';
  title: string;
  description: string;
  url: string;
  metadata?: {
    client?: {
      name: string;
      avatar?: string;
    };
    date?: string;
    status?: string;
    engagement?: number;
  };
  relevanceScore: number;
}

export default function SearchPage() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Mock search data
  const mockSearchData: SearchResult[] = [
    {
      id: '1',
      type: 'client',
      title: 'Sarah Johnson',
      description: 'Tech Startup CEO - Technology industry',
      url: '/dashboard/clients/1',
      metadata: {
        client: {
          name: 'Sarah Johnson',
          avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=150&h=150'
        },
        status: 'Active'
      },
      relevanceScore: 0.95
    },
    {
      id: '2',
      type: 'post',
      title: 'Leadership Principles for Modern Executives',
      description: 'In today\'s rapidly evolving business landscape, effective leadership requires...',
      url: '/dashboard/content/post-1',
      metadata: {
        client: {
          name: 'Sarah Johnson',
          avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=150&h=150'
        },
        date: '2025-01-15',
        status: 'Published',
        engagement: 234
      },
      relevanceScore: 0.88
    },
    {
      id: '3',
      type: 'message',
      title: 'Approval needed for LinkedIn post about leadership',
      description: 'Hi! I\'ve reviewed the draft post about leadership principles...',
      url: '/dashboard/messages/msg-1',
      metadata: {
        client: {
          name: 'Sarah Johnson',
          avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=150&h=150'
        },
        date: '2025-01-15',
        status: 'Unread'
      },
      relevanceScore: 0.82
    },
    {
      id: '4',
      type: 'template',
      title: 'Personal Story Template',
      description: 'Share personal experiences that connect to business lessons',
      url: '/dashboard/templates/template-1',
      metadata: {
        date: '2025-01-10'
      },
      relevanceScore: 0.75
    },
    {
      id: '5',
      type: 'analytics',
      title: 'Michael Chen Analytics Report',
      description: 'Performance metrics and engagement data for Michael Chen',
      url: '/dashboard/clients/2/analytics',
      metadata: {
        client: {
          name: 'Michael Chen',
          avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150'
        },
        date: '2025-01-14',
        engagement: 3847
      },
      relevanceScore: 0.70
    }
  ];

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const performSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Filter mock data based on query and type
      const filtered = mockSearchData.filter(item => {
        const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase()) ||
                            item.description.toLowerCase().includes(query.toLowerCase());
        const matchesType = typeFilter === 'all' || item.type === typeFilter;
        return matchesQuery && matchesType;
      });
      
      // Sort by relevance score
      const sorted = filtered.sort((a, b) => b.relevanceScore - a.relevanceScore);
      
      setSearchResults(sorted);
      
      // Add to recent searches
      const updatedRecent = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
      setRecentSearches(updatedRecent);
      localStorage.setItem('recentSearches', JSON.stringify(updatedRecent));
      
    } catch (error) {
      console.error('Search failed:', error);
      toast.error('Search failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchQuery);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'client':
        return <Users className="h-4 w-4 text-blue-600" />;
      case 'post':
        return <FileText className="h-4 w-4 text-green-600" />;
      case 'message':
        return <MessageSquare className="h-4 w-4 text-purple-600" />;
      case 'template':
        return <Calendar className="h-4 w-4 text-orange-600" />;
      case 'analytics':
        return <BarChart3 className="h-4 w-4 text-red-600" />;
      default:
        return <Search className="h-4 w-4 text-slate-600" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'client':
        return 'Client';
      case 'post':
        return 'Post';
      case 'message':
        return 'Message';
      case 'template':
        return 'Template';
      case 'analytics':
        return 'Analytics';
      default:
        return 'Unknown';
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
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                Search
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Find clients, posts, messages, templates, and analytics across your dashboard.
              </p>
            </div>

            {/* Search Form */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <form onSubmit={handleSearch} className="space-y-4">
                  <div className="flex space-x-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        placeholder="Search for clients, posts, messages, templates..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="client">Clients</SelectItem>
                        <SelectItem value="post">Posts</SelectItem>
                        <SelectItem value="message">Messages</SelectItem>
                        <SelectItem value="template">Templates</SelectItem>
                        <SelectItem value="analytics">Analytics</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? 'Searching...' : 'Search'}
                    </Button>
                  </div>
                </form>
                
                {searchQuery && (
                  <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                    <span>Search results for "{searchQuery}"</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => {
                        setSearchQuery('');
                        setSearchResults([]);
                      }}
                    >
                      Clear
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Searches */}
            {recentSearches.length > 0 && !searchQuery && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="text-lg">Recent Searches</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((search, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSearchQuery(search);
                          performSearch(search);
                        }}
                      >
                        <Clock className="h-3 w-3 mr-2" />
                        {search}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Search Results */}
            {searchQuery && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>
                      Search Results {searchResults.length > 0 && `(${searchResults.length})`}
                    </CardTitle>
                    {searchResults.length > 0 && (
                      <Badge variant="outline">
                        Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent>
                  {isLoading ? (
                    <div className="space-y-4">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="animate-pulse">
                          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-2"></div>
                          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
                        </div>
                      ))}
                    </div>
                  ) : searchResults.length === 0 ? (
                    <div className="text-center py-12">
                      <Search className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                        No results found
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400">
                        Try adjusting your search terms or filters.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {searchResults.map((result) => (
                        <Link key={result.id} href={result.url}>
                          <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                            <div className="flex items-start space-x-4">
                              <div className="flex-shrink-0 mt-1">
                                {getTypeIcon(result.type)}
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2 mb-2">
                                  <Badge variant="outline" className="text-xs">
                                    {getTypeLabel(result.type)}
                                  </Badge>
                                  {result.metadata?.status && (
                                    <Badge 
                                      variant="outline" 
                                      className={`text-xs ${
                                        result.metadata.status === 'Published' ? 'text-green-600' :
                                        result.metadata.status === 'Unread' ? 'text-orange-600' :
                                        'text-slate-600'
                                      }`}
                                    >
                                      {result.metadata.status}
                                    </Badge>
                                  )}
                                </div>
                                
                                <h3 className="font-medium text-slate-900 dark:text-slate-100 mb-1">
                                  {result.title}
                                </h3>
                                
                                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-2">
                                  {result.description}
                                </p>
                                
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-4 text-xs text-slate-500">
                                    {result.metadata?.client && (
                                      <div className="flex items-center space-x-2">
                                        <Avatar className="h-4 w-4">
                                          <AvatarImage src={result.metadata.client.avatar} alt={result.metadata.client.name} />
                                          <AvatarFallback className="text-xs">{result.metadata.client.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <span>{result.metadata.client.name}</span>
                                      </div>
                                    )}
                                    {result.metadata?.date && (
                                      <span>{new Date(result.metadata.date).toLocaleDateString()}</span>
                                    )}
                                    {result.metadata?.engagement && (
                                      <span>{result.metadata.engagement} engagement</span>
                                    )}
                                  </div>
                                  
                                  <ExternalLink className="h-4 w-4 text-slate-400" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Search Tips */}
            {!searchQuery && (
              <Card>
                <CardHeader>
                  <CardTitle>Search Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-3">
                        What you can search for:
                      </h4>
                      <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                        <li className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-blue-600" />
                          Client names and companies
                        </li>
                        <li className="flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-green-600" />
                          Post titles and content
                        </li>
                        <li className="flex items-center">
                          <MessageSquare className="h-4 w-4 mr-2 text-purple-600" />
                          Message subjects and content
                        </li>
                        <li className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-orange-600" />
                          Template names and tags
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-3">
                        Search tips:
                      </h4>
                      <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                        <li>• Use specific keywords for better results</li>
                        <li>• Filter by type to narrow down results</li>
                        <li>• Search for client names to find all related content</li>
                        <li>• Use hashtags to find posts with specific tags</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}