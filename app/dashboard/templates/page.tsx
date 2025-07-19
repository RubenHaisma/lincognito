'use client';

import { useState, useEffect } from 'react';
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
import { 
  Plus, 
  Edit, 
  Trash2, 
  Copy, 
  Search, 
  Filter,
  FileText,
  Star,
  Clock,
  TrendingUp,
  Users,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { toast } from 'sonner';

interface ContentTemplate {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  description?: string;
  usageCount: number;
  avgEngagement: number;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function TemplatesPage() {
  const { user } = useAuth();
  const [templates, setTemplates] = useState<ContentTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<ContentTemplate | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    tags: '',
    description: ''
  });

  const categories = [
    'Thought Leadership',
    'Industry Insights',
    'Personal Stories',
    'Tips & Advice',
    'Company Updates',
    'Event Announcements',
    'Question Posts',
    'Behind the Scenes'
  ];

  // Mock data - in real app, this would come from API
  useEffect(() => {
    const mockTemplates: ContentTemplate[] = [
      {
        id: '1',
        title: 'Personal Story Template',
        content: `[Personal Hook]
Last week, I made a mistake that cost us $10,000...

[Story Development] 
Here's what happened: [Brief story with specific details]

[The Lesson]
But here's what I learned: [Key insight or lesson]

[Business Application]
This applies to business because: [How others can use this lesson]

[Call to Action]
What's the biggest lesson you've learned from a mistake?

#leadership #entrepreneurship #lessons`,
        category: 'Personal Stories',
        tags: ['storytelling', 'leadership', 'lessons'],
        description: 'Share personal experiences that connect to business lessons',
        usageCount: 45,
        avgEngagement: 4.8,
        isFavorite: true,
        createdAt: '2025-01-10T10:00:00Z',
        updatedAt: '2025-01-10T10:00:00Z'
      },
      {
        id: '2',
        title: 'Industry Insight Template',
        content: `[Trend Observation]
Something interesting is happening in [industry]...

[The Trend]
I'm seeing [specific trend or change] across [context/companies/market]

[Evidence]
Examples:
• [Specific example 1]
• [Specific example 2]
• [Specific example 3]

[Analysis]
Why this matters: [Your interpretation of the significance]

[Implications]
What this means for [target audience]:
1. [Implication 1]
2. [Implication 2]
3. [Implication 3]

[Future Prediction]
My prediction: [What you think will happen next]

Are you seeing this trend too? What's your take?

#trends #industry #analysis #future`,
        category: 'Industry Insights',
        tags: ['trends', 'analysis', 'predictions'],
        description: 'Share observations about industry trends and changes',
        usageCount: 32,
        avgEngagement: 5.2,
        isFavorite: false,
        createdAt: '2025-01-08T14:30:00Z',
        updatedAt: '2025-01-08T14:30:00Z'
      },
      {
        id: '3',
        title: 'Tips & Advice Template',
        content: `[Value Proposition Hook]
5 things I wish I knew when I started [topic]:

[Tip 1]
1. [Specific tip with brief explanation]

[Tip 2]
2. [Specific tip with brief explanation]

[Tip 3]
3. [Specific tip with brief explanation]

[Tip 4]
4. [Specific tip with brief explanation]

[Tip 5]
5. [Specific tip with brief explanation]

[Bonus/Call to Action]
Bonus tip: [Additional insight]

Which tip resonates most with you?

#tips #advice #[industry]`,
        category: 'Tips & Advice',
        tags: ['tips', 'advice', 'education'],
        description: 'Share actionable tips and insights in an easy-to-digest format',
        usageCount: 67,
        avgEngagement: 4.1,
        isFavorite: true,
        createdAt: '2025-01-05T09:15:00Z',
        updatedAt: '2025-01-05T09:15:00Z'
      },
      {
        id: '4',
        title: 'Question Engagement Template',
        content: `[Context Setting]
I've been thinking about [topic/trend/challenge]...

[The Question Setup]
And it made me wonder: [Thought-provoking question]

[Options/Framework]
I see three main approaches:

A) [Option 1 with brief description]
B) [Option 2 with brief description]  
C) [Option 3 with brief description]

[Personal Take]
Personally, I lean toward [your choice] because [brief reasoning]

[Call to Action]
What's your take? A, B, C, or something else entirely?

Drop your thoughts in the comments 👇

#discussion #strategy #[industry]`,
        category: 'Question Posts',
        tags: ['engagement', 'discussion', 'community'],
        description: 'Ask thought-provoking questions to drive comments and engagement',
        usageCount: 28,
        avgEngagement: 6.3,
        isFavorite: false,
        createdAt: '2025-01-03T16:45:00Z',
        updatedAt: '2025-01-03T16:45:00Z'
      }
    ];
    
    setTemplates(mockTemplates);
    setIsLoading(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const templateData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        usageCount: 0,
        avgEngagement: 0,
        isFavorite: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      if (editingTemplate) {
        // Update existing template
        setTemplates(templates.map(template => 
          template.id === editingTemplate.id 
            ? { ...template, ...templateData, updatedAt: new Date().toISOString() }
            : template
        ));
        toast.success('Template updated successfully');
      } else {
        // Create new template
        const newTemplate: ContentTemplate = {
          id: Date.now().toString(),
          ...templateData
        };
        setTemplates([newTemplate, ...templates]);
        toast.success('Template created successfully');
      }

      setIsDialogOpen(false);
      setEditingTemplate(null);
      resetForm();
    } catch (error) {
      toast.error('Failed to save template');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      category: '',
      tags: '',
      description: ''
    });
  };

  const handleEdit = (template: ContentTemplate) => {
    setEditingTemplate(template);
    setFormData({
      title: template.title,
      content: template.content,
      category: template.category,
      tags: template.tags.join(', '),
      description: template.description || ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (templateId: string) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      setTemplates(templates.filter(template => template.id !== templateId));
      toast.success('Template deleted successfully');
    }
  };

  const handleCopy = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success('Template copied to clipboard');
    } catch (error) {
      toast.error('Failed to copy template');
    }
  };

  const toggleFavorite = (templateId: string) => {
    setTemplates(templates.map(template => 
      template.id === templateId 
        ? { ...template, isFavorite: !template.isFavorite }
        : template
    ));
  };

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || template.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
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
                  Content Templates
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mt-2">
                  Create and manage reusable LinkedIn post templates for faster content creation.
                </p>
              </div>
              
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => { resetForm(); setEditingTemplate(null); }}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Template
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>
                      {editingTemplate ? 'Edit Template' : 'Create New Template'}
                    </DialogTitle>
                  </DialogHeader>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Template Title *</Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          placeholder="Enter template title"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="category">Category *</Label>
                        <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Brief description of when to use this template"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="content">Template Content *</Label>
                      <Textarea
                        id="content"
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        placeholder="Enter your template content with placeholders like [Topic], [Example], etc."
                        rows={12}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="tags">Tags (comma-separated)</Label>
                      <Input
                        id="tags"
                        value={formData.tags}
                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                        placeholder="leadership, tips, storytelling"
                      />
                    </div>
                    
                    <div className="flex justify-end space-x-4">
                      <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">
                        {editingTemplate ? 'Update Template' : 'Create Template'}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {filteredTemplates.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    {searchQuery || categoryFilter !== 'all' ? 'No templates found' : 'No templates yet'}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">
                    {searchQuery || categoryFilter !== 'all' 
                      ? 'Try adjusting your search or filter criteria.'
                      : 'Create your first content template to speed up your writing process.'
                    }
                  </p>
                  {!searchQuery && categoryFilter === 'all' && (
                    <Button onClick={() => setIsDialogOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Your First Template
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map((template) => (
                  <Card key={template.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant="outline">{template.category}</Badge>
                            {template.isFavorite && (
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            )}
                          </div>
                          <CardTitle className="text-lg line-clamp-2">
                            {template.title}
                          </CardTitle>
                          {template.description && (
                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 line-clamp-2">
                              {template.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-4">
                        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
                          <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-4 font-mono">
                            {template.content}
                          </p>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {template.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 text-center text-sm">
                          <div>
                            <div className="font-semibold text-slate-900 dark:text-slate-100">
                              {template.usageCount}
                            </div>
                            <div className="text-xs text-slate-500">Uses</div>
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900 dark:text-slate-100">
                              {template.avgEngagement}%
                            </div>
                            <div className="text-xs text-slate-500">Avg. Engagement</div>
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900 dark:text-slate-100">
                              {new Date(template.createdAt).toLocaleDateString()}
                            </div>
                            <div className="text-xs text-slate-500">Created</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleCopy(template.content)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleFavorite(template.id)}
                            >
                              <Star className={`h-4 w-4 ${template.isFavorite ? 'text-yellow-500 fill-current' : ''}`} />
                            </Button>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(template)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(template.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}