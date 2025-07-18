'use client';

import { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Code, 
  Users, 
  Calendar, 
  BarChart3, 
  Shield,
  ArrowRight,
  Play,
  Download,
  ExternalLink
} from 'lucide-react';

const sections = [
  {
    title: 'Getting Started',
    description: 'Quick start guide to set up your account and create your first client profile',
    icon: Play,
    articles: [
      'Account Setup & Registration',
      'Creating Your First Client Profile',
      'Dashboard Overview',
      'Basic Navigation'
    ],
    badge: 'Essential'
  },
  {
    title: 'Client Management',
    description: 'Learn how to manage multiple pseudonymous LinkedIn profiles effectively',
    icon: Users,
    articles: [
      'Adding New Clients',
      'Client Profile Settings',
      'Brand Guidelines Setup',
      'Tone & Voice Configuration'
    ],
    badge: 'Core Feature'
  },
  {
    title: 'Content Creation',
    description: 'Master the content creation tools and rich text editor',
    icon: BookOpen,
    articles: [
      'Using the Rich Text Editor',
      'Content Templates',
      'Hashtag Management',
      'Image & Media Handling'
    ],
    badge: 'Popular'
  },
  {
    title: 'Scheduling & Calendar',
    description: 'Plan and organize your LinkedIn content with our scheduling tools',
    icon: Calendar,
    articles: [
      'Content Calendar Overview',
      'Scheduling Posts',
      'Bulk Operations',
      'Reminder Settings'
    ],
    badge: 'Time-Saver'
  },
  {
    title: 'Analytics & Tracking',
    description: 'Track engagement and measure the success of your LinkedIn content',
    icon: BarChart3,
    articles: [
      'Engagement Metrics',
      'Performance Dashboard',
      'Reporting Features',
      'ROI Tracking'
    ],
    badge: 'Advanced'
  },
  {
    title: 'Compliance & Security',
    description: 'Understand how Lincognito ensures LinkedIn compliance and data security',
    icon: Shield,
    articles: [
      'LinkedIn Terms Compliance',
      'Data Security Measures',
      'Privacy Protection',
      'Best Practices'
    ],
    badge: 'Important'
  }
];

const quickLinks = [
  { title: 'API Reference', href: '/api', icon: Code },
  { title: 'Video Tutorials', href: '#', icon: Play },
  { title: 'Download Guide', href: '#', icon: Download },
  { title: 'Community Forum', href: '#', icon: Users }
];

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Header onAuthOpen={() => {}} />
      
      <main className="pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Header */}
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl mb-6">
              <span className="gradient-text">Documentation</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
              Everything you need to know about using Lincognito to manage your LinkedIn ghostwriting business.
            </p>
            
            {/* Quick Links */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {quickLinks.map((link) => (
                <Button key={link.title} variant="outline" className="group">
                  <link.icon className="h-4 w-4 mr-2" />
                  {link.title}
                  <ExternalLink className="h-3 w-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              ))}
            </div>
          </div>

          {/* Documentation Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {sections.map((section, index) => (
              <Card 
                key={section.title} 
                className="group hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-700 hover:border-primary/20 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <section.icon className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="secondary">{section.badge}</Badge>
                  </div>
                  <CardTitle className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                    {section.title}
                  </CardTitle>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    {section.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {section.articles.map((article, articleIndex) => (
                      <li key={articleIndex} className="flex items-center text-sm text-slate-700 dark:text-slate-300 hover:text-primary cursor-pointer">
                        <ArrowRight className="h-3 w-3 mr-2 flex-shrink-0" />
                        {article}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full group">
                    View Section
                    <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Popular Articles */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8 text-center">
              Popular Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'How to Set Up Your First Client Profile',
                  description: 'Step-by-step guide to creating and configuring client profiles for LinkedIn ghostwriting.',
                  readTime: '5 min read',
                  category: 'Getting Started'
                },
                {
                  title: 'LinkedIn Compliance Best Practices',
                  description: 'Essential guidelines to ensure your ghostwriting activities comply with LinkedIn terms.',
                  readTime: '8 min read',
                  category: 'Compliance'
                },
                {
                  title: 'Maximizing Engagement with Analytics',
                  description: 'Learn how to use Lincognito\'s analytics tools to improve your content performance.',
                  readTime: '6 min read',
                  category: 'Analytics'
                },
                {
                  title: 'Content Scheduling Strategies',
                  description: 'Advanced techniques for planning and scheduling LinkedIn content effectively.',
                  readTime: '7 min read',
                  category: 'Scheduling'
                }
              ].map((article, index) => (
                <Card key={article.title} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{article.category}</Badge>
                      <span className="text-xs text-slate-500">{article.readTime}</span>
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {article.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Help Section */}
          <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Need More Help?
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                Contact Support
              </Button>
              <Button size="lg" variant="outline">
                Join Community
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}