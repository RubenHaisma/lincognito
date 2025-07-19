'use client';

import { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Clock, 
  Target,
  CheckCircle,
  AlertCircle,
  BarChart3,
  ArrowRight
} from 'lucide-react';

export default function LinkedInGhostwritingPricingGuide() {
  const pricingTiers = [
    {
      level: 'Entry Level',
      experience: '0-1 years',
      perPost: '$15-$35',
      monthly: '$300-$800',
      hourly: '$20-$40',
      description: 'New ghostwriters building their portfolio',
      clients: 'Small businesses, startups, individual professionals'
    },
    {
      level: 'Intermediate',
      experience: '1-3 years',
      perPost: '$35-$75',
      monthly: '$800-$2000',
      hourly: '$40-$80',
      description: 'Established ghostwriters with proven results',
      clients: 'Mid-size companies, established professionals'
    },
    {
      level: 'Expert',
      experience: '3+ years',
      perPost: '$75-$150',
      monthly: '$2000-$5000',
      hourly: '$80-$150',
      description: 'Top-tier ghostwriters with premium positioning',
      clients: 'Enterprise clients, C-suite executives, thought leaders'
    }
  ];

  const pricingFactors = [
    {
      factor: 'Client Industry',
      impact: 'High',
      description: 'Tech, finance, and consulting typically pay 30-50% more than other industries',
      examples: ['Tech: $50-$100/post', 'Finance: $60-$120/post', 'Healthcare: $40-$80/post']
    },
    {
      factor: 'Content Complexity',
      impact: 'Medium',
      description: 'Technical content, thought leadership, and research-heavy posts command premium rates',
      examples: ['Simple updates: $25-$40', 'Thought leadership: $60-$100', 'Technical content: $80-$150']
    },
    {
      factor: 'Client Size',
      impact: 'High',
      description: 'Larger companies typically have bigger budgets and pay higher rates',
      examples: ['Startups: $20-$50/post', 'Mid-size: $40-$80/post', 'Enterprise: $80-$150/post']
    },
    {
      factor: 'Geographic Location',
      impact: 'Medium',
      description: 'US and UK clients typically pay 20-40% more than European clients',
      examples: ['US clients: +30% premium', 'UK clients: +20% premium', 'EU clients: Base rates']
    }
  ];

  const packageExamples = [
    {
      name: 'LinkedIn Starter Package',
      price: '$500/month',
      includes: [
        '4 LinkedIn posts per month',
        'Content strategy consultation',
        'Basic engagement tracking',
        'Monthly performance report'
      ],
      ideal: 'Small business owners, individual professionals'
    },
    {
      name: 'Professional Growth Package',
      price: '$1,200/month',
      includes: [
        '8 LinkedIn posts per month',
        'Content calendar planning',
        'Hashtag research & optimization',
        'Engagement monitoring',
        'Bi-weekly strategy calls',
        'Detailed analytics reports'
      ],
      ideal: 'Growing companies, department heads'
    },
    {
      name: 'Executive Thought Leadership',
      price: '$2,500/month',
      includes: [
        '12 LinkedIn posts per month',
        'Thought leadership strategy',
        'Industry research & insights',
        'Personal brand development',
        'Weekly strategy sessions',
        'Comprehensive reporting',
        'Crisis communication support'
      ],
      ideal: 'C-suite executives, industry leaders'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Header onAuthOpen={() => {}} />
      
      <main className="pt-32 pb-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4">Pricing Guide</Badge>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl mb-6">
              LinkedIn Ghostwriting{' '}
              <span className="gradient-text">Pricing Guide</span>{' '}
              2025
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
              Complete guide to pricing your LinkedIn ghostwriting services. Learn what to charge, how to structure packages, and maximize your revenue.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                12 min read
              </div>
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-2" />
                Pricing Strategy
              </div>
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                Revenue Optimization
              </div>
            </div>
          </div>

          {/* Market Overview */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                LinkedIn Ghostwriting Market Overview
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                The LinkedIn ghostwriting market has experienced explosive growth, with demand increasing by over 300% in the past two years. As more executives recognize the importance of personal branding on LinkedIn, professional ghostwriters are commanding premium rates for their expertise.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">$45</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Average per post</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">$1,500</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Monthly retainer</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">300%</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Market growth</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">85%</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Client retention</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pricing Tiers */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 text-center">
              LinkedIn Ghostwriter Pricing Tiers
            </h2>
            
            <div className="space-y-6">
              {pricingTiers.map((tier, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                          {tier.level}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-4">
                          {tier.description}
                        </p>
                        <div className="text-sm text-slate-500">
                          <strong>Experience:</strong> {tier.experience}
                        </div>
                        <div className="text-sm text-slate-500">
                          <strong>Typical Clients:</strong> {tier.clients}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-primary">{tier.perPost}</div>
                          <div className="text-xs text-slate-500">Per Post</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-primary">{tier.monthly}</div>
                          <div className="text-xs text-slate-500">Monthly</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-primary">{tier.hourly}</div>
                          <div className="text-xs text-slate-500">Hourly</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center">
                        <Badge variant={index === 1 ? 'default' : 'outline'} className="px-4 py-2">
                          {index === 0 ? 'Starting Out' : index === 1 ? 'Most Common' : 'Premium'}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Pricing Factors */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 text-center">
              Factors That Affect LinkedIn Ghostwriting Rates
            </h2>
            
            <div className="space-y-6">
              {pricingFactors.map((factor, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
                          {factor.factor}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400">
                          {factor.description}
                        </p>
                      </div>
                      <Badge variant={factor.impact === 'High' ? 'default' : 'secondary'}>
                        {factor.impact} Impact
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {factor.examples.map((example, exampleIndex) => (
                        <div key={exampleIndex} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                          <div className="text-sm text-slate-700 dark:text-slate-300">
                            {example}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Package Examples */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 text-center">
              LinkedIn Ghostwriting Package Examples
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {packageExamples.map((pkg, index) => (
                <Card key={index} className={`h-full ${index === 1 ? 'border-2 border-primary' : ''}`}>
                  {index === 1 && (
                    <div className="bg-primary text-white text-center py-2 text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
                        {pkg.name}
                      </h3>
                      <div className="text-2xl font-bold text-primary mb-2">
                        {pkg.price}
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {pkg.ideal}
                      </p>
                    </div>
                    
                    <ul className="space-y-3 mb-6">
                      {pkg.includes.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-600 dark:text-slate-400">{item}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button className="w-full" variant={index === 1 ? 'default' : 'outline'}>
                      Use This Package
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Pricing Strategies */}
          <Card className="mb-16">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                Advanced Pricing Strategies
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
                    Value-Based Pricing
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        Price based on business impact, not time spent
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        Charge premium for thought leadership content
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        Include performance bonuses for viral posts
                      </span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-blue-500" />
                    Tiered Pricing Model
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        Offer multiple service levels (Basic, Pro, Premium)
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        Include add-on services for additional revenue
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        Create urgency with limited premium slots
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pricing Tips */}
          <Card className="mb-16">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                10 Tips for Pricing LinkedIn Ghostwriting Services
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-bold mr-3 mt-0.5">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-slate-100">Start with market research</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Survey competitors and industry reports</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-bold mr-3 mt-0.5">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-slate-100">Calculate your minimum viable rate</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Cover expenses plus desired profit margin</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-bold mr-3 mt-0.5">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-slate-100">Test different pricing models</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Try per-post, retainer, and project-based pricing</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-bold mr-3 mt-0.5">
                      4
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-slate-100">Increase rates gradually</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Raise prices by 10-20% every 6 months</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-bold mr-3 mt-0.5">
                      5
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-slate-100">Offer package deals</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Bundle services for higher perceived value</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-bold mr-3 mt-0.5">
                      6
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-slate-100">Charge for revisions</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Include 2 revisions, charge for additional changes</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-bold mr-3 mt-0.5">
                      7
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-slate-100">Premium for rush jobs</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Add 50-100% surcharge for urgent requests</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-bold mr-3 mt-0.5">
                      8
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-slate-100">Track your time</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Understand true hourly rate for each client</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-bold mr-3 mt-0.5">
                      9
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-slate-100">Justify your rates</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Show ROI and business impact to clients</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-bold mr-3 mt-0.5">
                      10
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-slate-100">Review pricing quarterly</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Adjust based on demand and market changes</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Optimize Your LinkedIn Ghostwriting Pricing?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Use Lincognito to track your time, manage clients, and justify premium rates with detailed analytics.
            </p>
            <Button size="lg" className="bg-white text-primary hover:bg-slate-100">
              Start Free Trial
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}