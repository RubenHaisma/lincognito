'use client';

import { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Users, 
  TrendingUp, 
  MessageSquare, 
  Calendar, 
  BarChart3,
  Shield,
  Zap,
  Star,
  ArrowRight
} from 'lucide-react';

const services = [
  {
    title: 'Executive LinkedIn Ghostwriting',
    description: 'Premium ghostwriting services for C-level executives and thought leaders',
    features: [
      'Personal brand development',
      'Thought leadership content',
      'Industry expertise positioning',
      'Executive voice development',
      'Strategic content planning'
    ],
    price: 'From €500/month',
    popular: true,
    icon: Users
  },
  {
    title: 'B2B LinkedIn Content Writing',
    description: 'Professional LinkedIn content for businesses and marketing teams',
    features: [
      'Company page management',
      'Lead generation content',
      'Industry-specific expertise',
      'Multi-platform integration',
      'Performance tracking'
    ],
    price: 'From €300/month',
    popular: false,
    icon: TrendingUp
  },
  {
    title: 'LinkedIn Thought Leadership',
    description: 'Establish authority with expert thought leadership content',
    features: [
      'Industry trend analysis',
      'Opinion pieces',
      'Research-backed content',
      'Engagement optimization',
      'Authority building strategy'
    ],
    price: 'From €400/month',
    popular: false,
    icon: MessageSquare
  }
];

const benefits = [
  {
    title: 'Expert LinkedIn Ghostwriters',
    description: 'Certified professionals with 5+ years of LinkedIn content writing experience',
    icon: Star
  },
  {
    title: 'Proven Results',
    description: 'Average 300% increase in LinkedIn engagement within 90 days',
    icon: BarChart3
  },
  {
    title: 'LinkedIn Compliant',
    description: 'All content follows LinkedIn best practices and terms of service',
    icon: Shield
  },
  {
    title: 'Fast Turnaround',
    description: '24-48 hour content delivery with unlimited revisions',
    icon: Zap
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Header onAuthOpen={() => {}} />
      
      <main className="pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Header */}
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl mb-6">
              Professional{' '}
              <span className="gradient-text">LinkedIn Ghostwriting</span>{' '}
              Services
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
              Expert LinkedIn content writing and ghostwriting services by certified professionals. 
              Boost your LinkedIn presence with our proven ghostwriting strategies.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                1,200+ Happy Clients
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                50K+ Posts Written
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                4.9/5 Rating
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {services.map((service, index) => (
              <Card 
                key={service.title} 
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
                  service.popular 
                    ? 'border-2 border-primary shadow-lg scale-105' 
                    : 'border-slate-200 dark:border-slate-700 hover:border-primary/20'
                }`}
              >
                {service.popular && (
                  <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 text-sm font-medium">
                    Most Popular
                  </div>
                )}
                
                <CardHeader className="text-center pb-8">
                  <div className="flex justify-center mb-4">
                    <div className={`flex h-16 w-16 items-center justify-center rounded-full ${
                      service.popular ? 'bg-primary' : 'bg-primary/10'
                    }`}>
                      <service.icon className={`h-8 w-8 ${service.popular ? 'text-white' : 'text-primary'}`} />
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                    {service.title}
                  </CardTitle>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    {service.description}
                  </p>
                  <div className="text-2xl font-bold text-primary">
                    {service.price}
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm text-slate-900 dark:text-slate-100">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${service.popular ? 'bg-primary' : ''}`}
                    variant={service.popular ? 'default' : 'outline'}
                  >
                    Get Started
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Benefits Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                Why Choose Our LinkedIn Ghostwriting Services?
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Professional LinkedIn ghostwriters with proven track record of success
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={benefit.title} className="text-center border-slate-200 dark:border-slate-700">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <benefit.icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      {benefit.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Process Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                Our LinkedIn Ghostwriting Process
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Proven 4-step process for LinkedIn content success
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: '01', title: 'Strategy & Discovery', description: 'We analyze your brand, audience, and goals to create a custom LinkedIn content strategy.' },
                { step: '02', title: 'Content Creation', description: 'Our expert ghostwriters create engaging, on-brand LinkedIn content that resonates with your audience.' },
                { step: '03', title: 'Review & Approval', description: 'You review and approve all content before publication with unlimited revisions included.' },
                { step: '04', title: 'Performance Tracking', description: 'We monitor engagement and optimize content strategy based on performance data.' }
              ].map((process, index) => (
                <div key={process.step} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-xl font-bold">
                      {process.step}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    {process.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    {process.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-8 text-center text-white">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Elevate Your LinkedIn Presence?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Join 1,200+ professionals who trust our LinkedIn ghostwriting services
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-slate-100">
                Start Your Project
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}