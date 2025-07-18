'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Play, CheckCircle, Users, TrendingUp, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  const stats = [
    { label: 'Active Ghostwriters', value: '1,200+', icon: Users },
    { label: 'Posts Managed', value: '50K+', icon: TrendingUp },
    { label: 'Client Profiles', value: '5,000+', icon: Shield },
  ];

  return (
    <div className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-8">
            <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary animate-bounce-in">
              <Shield className="mr-2 h-4 w-4" />
              LinkedIn Compliant Platform
            </div>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-6xl animate-fade-in">
            Professional{' '}
            <span className="gradient-text">LinkedIn Ghostwriter</span>{' '}
            Platform
          </h1>
          
          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400 animate-slide-up">
            The #1 LinkedIn ghostwriter platform trusted by 1,200+ professional ghostwriters. Expert LinkedIn content writing, 
            ghostwriting services, and social media management tools to scale your LinkedIn ghostwriting business.
          </p>
          
          <div className="mt-10 flex items-center justify-center gap-x-6 animate-slide-up">
            <Button size="lg" onClick={onGetStarted} className="group">
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" size="lg" className="group">
              <Play className="mr-2 h-4 w-4" />
              Watch Demo
            </Button>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-x-2 text-sm text-slate-500 animate-slide-up">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Free 14-day trial</span>
            <span className="mx-2">•</span>
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>No credit card required</span>
            <span className="mx-2">•</span>
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Cancel anytime</span>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <Card key={stat.label} className="text-center border-none shadow-lg animate-bounce-in glass-effect" style={{ animationDelay: `${index * 0.2}s` }}>
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stat.value}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Hero Image */}
        <div className="mt-20 animate-fade-in">
          <div className="relative rounded-2xl bg-gradient-to-r from-primary/20 to-blue-500/20 p-1">
            <div className="rounded-2xl bg-white dark:bg-slate-900 p-8">
              <img
                src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600"
                alt="Lincognito Dashboard"
                className="w-full rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}