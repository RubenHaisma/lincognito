'use client';

import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

const blogPosts = [
  {
    id: 1,
    title: 'How to Become a Professional LinkedIn Ghostwriter in 2025',
    excerpt: 'Complete guide to starting your LinkedIn ghostwriting career, from finding clients to pricing your services.',
    category: 'Getting Started',
    readTime: '8 min read',
    publishDate: '2025-01-15',
    slug: 'how-to-become-linkedin-ghostwriter-2025',
    featured: true
  },
  {
    id: 2,
    title: 'LinkedIn Ghostwriting Pricing: What to Charge Clients',
    excerpt: 'Comprehensive pricing guide for LinkedIn ghostwriters, including rate structures and value-based pricing strategies.',
    category: 'Business',
    readTime: '6 min read',
    publishDate: '2025-01-12',
    slug: 'linkedin-ghostwriting-pricing-guide'
  },
  {
    id: 3,
    title: '10 LinkedIn Content Writing Templates That Convert',
    excerpt: 'Proven LinkedIn post templates used by top ghostwriters to drive engagement and generate leads for clients.',
    category: 'Content Strategy',
    readTime: '10 min read',
    publishDate: '2025-01-10',
    slug: 'linkedin-content-writing-templates'
  },
  {
    id: 4,
    title: 'LinkedIn Ghostwriter vs Content Writer: Key Differences',
    excerpt: 'Understanding the distinction between LinkedIn ghostwriting and content writing to position your services correctly.',
    category: 'Industry Insights',
    readTime: '5 min read',
    publishDate: '2025-01-08',
    slug: 'linkedin-ghostwriter-vs-content-writer'
  },
  {
    id: 5,
    title: 'Building Authority: LinkedIn Thought Leadership Writing',
    excerpt: 'How professional LinkedIn ghostwriters create thought leadership content that establishes client authority.',
    category: 'Content Strategy',
    readTime: '7 min read',
    publishDate: '2025-01-05',
    slug: 'linkedin-thought-leadership-writing'
  },
  {
    id: 6,
    title: 'LinkedIn Ghostwriting Ethics: Best Practices Guide',
    excerpt: 'Essential ethical guidelines for LinkedIn ghostwriters to maintain integrity while serving clients effectively.',
    category: 'Ethics & Compliance',
    readTime: '6 min read',
    publishDate: '2025-01-03',
    slug: 'linkedin-ghostwriting-ethics-guide'
  }
];

export default function BlogPage() {
  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Header onAuthOpen={() => {}} />
      
      <main className="pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Header */}
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
              LinkedIn Ghostwriter{' '}
              <span className="gradient-text">Expert Blog</span>
            </h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
              Professional insights, strategies, and tips from expert LinkedIn ghostwriters and content creators.
            </p>
          </div>

          {/* Featured Post */}
          {featuredPost && (
            <div className="mb-16">
              <Card className="overflow-hidden border-2 border-primary/20 shadow-xl">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img
                      src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=800&h=600"
                      alt="Featured LinkedIn Ghostwriter Article"
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-8">
                    <Badge className="mb-4">{featuredPost.category}</Badge>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                      {featuredPost.title}
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-slate-500">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(featuredPost.publishDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {featuredPost.readTime}
                        </div>
                      </div>
                      <Link href={`/blog/${featuredPost.slug}`}>
                        <button className="flex items-center text-primary hover:text-primary/80 font-medium">
                          Read More
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-r from-primary/10 to-blue-500/10 flex items-center justify-center">
                  <img
                    src={`https://images.pexels.com/photos/${5632400 + post.id}/pexels-photo-${5632400 + post.id}.jpeg?auto=compress&cs=tinysrgb&w=400&h=300`}
                    alt={`LinkedIn Ghostwriter Article: ${post.title}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    <span className="text-xs text-slate-500">{post.readTime}</span>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-slate-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(post.publishDate).toLocaleDateString()}
                    </div>
                    <Link href={`/blog/${post.slug}`}>
                      <button className="text-primary hover:text-primary/80 text-sm font-medium">
                        Read More →
                      </button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="mt-20 bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">
              Get LinkedIn Ghostwriter Tips Weekly
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Join 5,000+ professional LinkedIn ghostwriters getting expert tips, strategies, and industry insights.
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg text-slate-900"
              />
              <button className="bg-white text-primary px-6 py-2 rounded-lg font-medium hover:bg-slate-100">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}