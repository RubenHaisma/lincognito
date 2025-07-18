'use client';

import { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Clock, 
  Users, 
  Heart,
  Coffee,
  Laptop,
  Plane,
  GraduationCap,
  ArrowRight
} from 'lucide-react';

const openPositions = [
  {
    title: 'Senior Full-Stack Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description: 'Help build and scale our platform used by 1,200+ LinkedIn ghostwriters worldwide.',
    requirements: [
      '5+ years of full-stack development experience',
      'Proficiency in React, Node.js, and PostgreSQL',
      'Experience with SaaS platforms and payment systems',
      'Strong understanding of API design and security'
    ]
  },
  {
    title: 'Product Designer',
    department: 'Design',
    location: 'Remote',
    type: 'Full-time',
    description: 'Design intuitive experiences for professional ghostwriters managing multiple client profiles.',
    requirements: [
      '3+ years of product design experience',
      'Proficiency in Figma and design systems',
      'Experience with B2B SaaS products',
      'Strong user research and testing skills'
    ]
  },
  {
    title: 'Customer Success Manager',
    department: 'Customer Success',
    location: 'Amsterdam / Remote',
    type: 'Full-time',
    description: 'Help our ghostwriting community succeed and grow their businesses using Lincognito.',
    requirements: [
      '2+ years in customer success or account management',
      'Experience with SaaS platforms',
      'Excellent communication skills',
      'Understanding of content marketing and LinkedIn'
    ]
  },
  {
    title: 'Content Marketing Manager',
    department: 'Marketing',
    location: 'Remote',
    type: 'Full-time',
    description: 'Create content that educates and inspires the LinkedIn ghostwriting community.',
    requirements: [
      '3+ years of content marketing experience',
      'Strong writing and editing skills',
      'Experience with SEO and content strategy',
      'Knowledge of LinkedIn and social media marketing'
    ]
  }
];

const benefits = [
  {
    icon: Laptop,
    title: 'Remote First',
    description: 'Work from anywhere in the world with flexible hours'
  },
  {
    icon: Heart,
    title: 'Health & Wellness',
    description: 'Comprehensive health insurance and wellness stipend'
  },
  {
    icon: GraduationCap,
    title: 'Learning Budget',
    description: '€2,000 annual budget for courses, conferences, and books'
  },
  {
    icon: Plane,
    title: 'Team Retreats',
    description: 'Annual company retreats and quarterly team meetups'
  },
  {
    icon: Coffee,
    title: 'Equipment',
    description: 'Top-tier laptop, monitor, and home office setup'
  },
  {
    icon: Users,
    title: 'Equity',
    description: 'Meaningful equity stake in the company\'s success'
  }
];

const values = [
  {
    title: 'Ownership Mindset',
    description: 'Take initiative and own your work from start to finish'
  },
  {
    title: 'Customer Obsession',
    description: 'Everything we do is focused on helping our users succeed'
  },
  {
    title: 'Continuous Learning',
    description: 'Always be growing, learning, and improving'
  },
  {
    title: 'Transparent Communication',
    description: 'Open, honest, and direct communication at all levels'
  }
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Header onAuthOpen={() => {}} />
      
      <main className="pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Header */}
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl mb-6">
              Join the <span className="gradient-text">Lincognito</span> Team
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
              Help us build the future of LinkedIn ghostwriting. We're looking for passionate people who want to make a real impact.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge className="px-4 py-2">Remote First</Badge>
              <Badge variant="outline" className="px-4 py-2">Equity for All</Badge>
              <Badge variant="outline" className="px-4 py-2">Learning Budget</Badge>
              <Badge variant="outline" className="px-4 py-2">Flexible Hours</Badge>
            </div>
          </div>

          {/* Company Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
            {[
              { label: 'Team Members', value: '12' },
              { label: 'Countries', value: '8' },
              { label: 'Users Served', value: '1,200+' },
              { label: 'Growth Rate', value: '300%' }
            ].map((stat, index) => (
              <Card key={stat.label} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Open Positions */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                Open Positions
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Join our growing team and help shape the future of LinkedIn ghostwriting
              </p>
            </div>
            
            <div className="space-y-6">
              {openPositions.map((position, index) => (
                <Card key={position.title} className="hover:shadow-lg transition-shadow animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                          {position.title}
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          <Badge variant="outline">{position.department}</Badge>
                          <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                            <MapPin className="h-4 w-4 mr-1" />
                            {position.location}
                          </div>
                          <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                            <Clock className="h-4 w-4 mr-1" />
                            {position.type}
                          </div>
                        </div>
                      </div>
                      <Button className="mt-4 lg:mt-0">
                        Apply Now
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                    
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                      {position.description}
                    </p>
                    
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">
                        Requirements:
                      </h4>
                      <ul className="space-y-2">
                        {position.requirements.map((req, reqIndex) => (
                          <li key={reqIndex} className="flex items-start text-sm text-slate-600 dark:text-slate-400">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                Why Work at Lincognito?
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                We believe in taking care of our team so they can do their best work
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={benefit.title} className="text-center border-slate-200 dark:border-slate-700 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <benefit.icon className="h-8 w-8 text-primary" />
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

          {/* Values */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                Our Values
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                The principles that guide how we work together
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <Card key={value.title} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Application Process */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                Our Hiring Process
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                We believe in a fair, transparent, and efficient hiring process
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: '1', title: 'Application', description: 'Submit your application and we\'ll review it within 48 hours' },
                { step: '2', title: 'Phone Screen', description: '30-minute call to discuss your background and the role' },
                { step: '3', title: 'Technical/Case Study', description: 'Role-specific assessment or case study discussion' },
                { step: '4', title: 'Final Interview', description: 'Meet the team and discuss culture fit and next steps' }
              ].map((step, index) => (
                <div key={step.step} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex justify-center mb-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-xl font-bold">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-8 text-center text-white">
            <h3 className="text-3xl font-bold mb-4">
              Don't See the Right Role?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              We're always looking for exceptional people. Send us your resume and tell us how you'd like to contribute.
            </p>
            <Button size="lg" className="bg-white text-primary hover:bg-slate-100">
              Get in Touch
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}