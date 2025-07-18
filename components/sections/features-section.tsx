'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  Calendar, 
  BarChart3, 
  Shield, 
  MessageSquare, 
  Clock, 
  Target, 
  Zap,
  CheckCircle 
} from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: Users,
      title: 'Multi-Client Management',
      description: 'Manage unlimited pseudonymous LinkedIn profiles with unique bios, tone guidelines, and brand settings.',
      benefits: ['Unlimited client profiles', 'Custom brand guidelines', 'Tone consistency tracking']
    },
    {
      icon: Calendar,
      title: 'Content Scheduling',
      description: 'Plan, schedule, and organize posts with our intuitive content calendar and rich text editor.',
      benefits: ['Visual content calendar', 'Bulk scheduling', 'Content templates']
    },
    {
      icon: BarChart3,
      title: 'Engagement Analytics',
      description: 'Track performance metrics, engagement rates, and identify your top-performing content.',
      benefits: ['Real-time analytics', 'Performance insights', 'ROI tracking']
    },
    {
      icon: Shield,
      title: 'LinkedIn Compliant',
      description: 'Stay compliant with LinkedIn\'s terms of service with our manual management approach.',
      benefits: ['Terms compliance', 'Manual posting', 'Risk-free operation']
    },
    {
      icon: MessageSquare,
      title: 'Client Collaboration',
      description: 'Streamline client approval workflows with built-in feedback and revision management.',
      benefits: ['Approval workflows', 'Client feedback', 'Revision tracking']
    },
    {
      icon: Clock,
      title: 'Time Management',
      description: 'Smart reminders and notifications to keep your content schedule on track.',
      benefits: ['Smart reminders', 'Deadline tracking', 'Priority management']
    },
    {
      icon: Target,
      title: 'Audience Targeting',
      description: 'Maintain client-specific hashtags, keywords, and audience targeting strategies.',
      benefits: ['Hashtag management', 'Keyword optimization', 'Audience insights']
    },
    {
      icon: Zap,
      title: 'Workflow Automation',
      description: 'Automate repetitive tasks and streamline your ghostwriting workflow.',
      benefits: ['Task automation', 'Workflow templates', 'Efficiency tools']
    }
  ];

  return (
    <section id="features" className="py-24 bg-white dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
            Complete{' '}
            <span className="gradient-text">LinkedIn Ghostwriter</span>{' '}
            Solution
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Professional LinkedIn ghostwriting tools and services designed for expert LinkedIn content writers and social media ghostwriters.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              className="group hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-700 hover:border-primary/20 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature Highlight */}
        <div className="mt-20 rounded-2xl bg-gradient-to-r from-primary/10 to-blue-500/10 p-8 animate-fade-in">
          <div className="mx-auto max-w-4xl text-center">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Why Choose Lincognito?
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
              We understand the unique challenges of LinkedIn ghostwriting. Our platform is built by ghostwriters, for ghostwriters.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Uptime Guarantee</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Customer Support</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">SOC 2</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Security Certified</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}