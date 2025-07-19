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
  BarChart3,
  ArrowRight,
  MapPin,
  Award,
  Briefcase
} from 'lucide-react';

export default function LinkedInGhostwriterSalaryGuide() {
  const salaryTiers = [
    {
      level: 'Entry Level (0-1 years)',
      salary: '$25,000 - $40,000',
      hourly: '$15 - $25',
      perPost: '$15 - $35',
      description: 'New ghostwriters building their portfolio and client base',
      skills: ['Basic LinkedIn knowledge', 'Writing fundamentals', 'Client communication'],
      clients: ['Small businesses', 'Startups', 'Individual professionals'],
      growth: '+15% year over year'
    },
    {
      level: 'Intermediate (1-3 years)',
      salary: '$40,000 - $75,000',
      hourly: '$25 - $50',
      perPost: '$35 - $75',
      description: 'Established ghostwriters with proven results and specializations',
      skills: ['Content strategy', 'Analytics interpretation', 'Client management'],
      clients: ['Mid-size companies', 'Department heads', 'Growing businesses'],
      growth: '+25% year over year'
    },
    {
      level: 'Expert (3+ years)',
      salary: '$75,000 - $150,000+',
      hourly: '$50 - $150',
      perPost: '$75 - $200',
      description: 'Top-tier ghostwriters with premium positioning and thought leadership',
      skills: ['Thought leadership', 'Brand strategy', 'Team management'],
      clients: ['Enterprise clients', 'C-suite executives', 'Industry leaders'],
      growth: '+35% year over year'
    }
  ];

  const pricingModels = [
    {
      model: 'Per Post',
      range: '$15 - $200',
      description: 'Charge per individual LinkedIn post',
      pros: ['Simple pricing', 'Easy to scale', 'Clear deliverables'],
      cons: ['Inconsistent income', 'Time-consuming billing', 'No relationship building'],
      bestFor: 'New ghostwriters, one-off projects'
    },
    {
      model: 'Monthly Retainer',
      range: '$500 - $5,000',
      description: 'Fixed monthly fee for ongoing content creation',
      pros: ['Predictable income', 'Long-term relationships', 'Higher total value'],
      cons: ['Scope creep risk', 'Higher commitment', 'Cash flow dependency'],
      bestFor: 'Established ghostwriters, ongoing relationships'
    },
    {
      model: 'Package Deals',
      range: '$200 - $1,500',
      description: 'Bundled services for specific outcomes or timeframes',
      pros: ['Higher perceived value', 'Clear scope', 'Premium positioning'],
      cons: ['Complex pricing', 'Limited flexibility', 'Harder to compare'],
      bestFor: 'Specialized services, campaign-based work'
    }
  ];

  const salaryFactors = [
    {
      factor: 'Geographic Location',
      impact: 'High (20-40% variance)',
      details: [
        'US clients: Premium rates ($50-150/post)',
        'UK clients: Above average ($40-120/post)',
        'EU clients: Standard rates ($30-100/post)',
        'Other regions: Variable ($20-80/post)'
      ]
    },
    {
      factor: 'Client Industry',
      impact: 'Very High (30-60% variance)',
      details: [
        'Technology: +40% premium',
        'Finance/Banking: +35% premium',
        'Healthcare: +25% premium',
        'Consulting: +30% premium',
        'Non-profit: -20% discount'
      ]
    },
    {
      factor: 'Content Complexity',
      impact: 'Medium (15-30% variance)',
      details: [
        'Thought leadership: +50% premium',
        'Technical content: +40% premium',
        'Industry analysis: +30% premium',
        'Simple updates: Base rate'
      ]
    },
    {
      factor: 'Client Size',
      impact: 'High (25-50% variance)',
      details: [
        'Enterprise (1000+ employees): +50% premium',
        'Mid-market (100-1000): +25% premium',
        'Small business (10-100): Base rate',
        'Startups (<10): -15% discount'
      ]
    }
  ];

  const incomeStreams = [
    {
      stream: 'Core Ghostwriting',
      percentage: '60-70%',
      description: 'Primary LinkedIn content creation services',
      potential: '$30,000 - $100,000+'
    },
    {
      stream: 'Strategy Consulting',
      percentage: '15-20%',
      description: 'LinkedIn strategy and brand development',
      potential: '$5,000 - $25,000'
    },
    {
      stream: 'Training & Courses',
      percentage: '10-15%',
      description: 'Teaching LinkedIn writing and personal branding',
      potential: '$3,000 - $20,000'
    },
    {
      stream: 'Templates & Resources',
      percentage: '5-10%',
      description: 'Selling content templates and guides',
      potential: '$1,000 - $10,000'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Header onAuthOpen={() => {}} />
      
      <main className="pt-32 pb-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4">Salary Guide 2025</Badge>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl mb-6">
              LinkedIn Ghostwriter{' '}
              <span className="gradient-text">Salary Guide</span>{' '}
              2025: Complete Earnings Report
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
              Comprehensive analysis of LinkedIn ghostwriter salaries, pricing models, and income potential. Based on data from 1,200+ professional ghostwriters worldwide.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                12 min read
              </div>
              <div className="flex items-center">
                <BarChart3 className="h-4 w-4 mr-2" />
                Data-Driven
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                1,200+ Responses
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
                The LinkedIn ghostwriting industry has experienced explosive growth, with the average ghostwriter salary increasing by 45% in 2024. As executives recognize the importance of personal branding, demand for professional LinkedIn ghostwriters continues to surge.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">$65,000</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Average Annual Salary</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">45%</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Salary Growth (2024)</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">300%</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Market Demand Increase</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">$150K+</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Top Earner Potential</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Salary Tiers */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 text-center">
              LinkedIn Ghostwriter Salary by Experience Level
            </h2>
            
            <div className="space-y-8">
              {salaryTiers.map((tier, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div>
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                            <Award className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                              {tier.level}
                            </h3>
                            <div className="flex items-center text-sm text-green-600">
                              <TrendingUp className="h-4 w-4 mr-1" />
                              {tier.growth}
                            </div>
                          </div>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 mb-4">
                          {tier.description}
                        </p>
                        <div className="space-y-2">
                          <h4 className="font-semibold text-slate-900 dark:text-slate-100">Key Skills:</h4>
                          <ul className="space-y-1">
                            {tier.skills.map((skill, skillIndex) => (
                              <li key={skillIndex} className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                                <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                                {skill}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                          <div className="text-2xl font-bold text-primary mb-1">{tier.salary}</div>
                          <div className="text-sm text-slate-500">Annual Salary</div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                            <div className="font-bold text-slate-900 dark:text-slate-100">{tier.hourly}</div>
                            <div className="text-xs text-slate-500">Hourly Rate</div>
                          </div>
                          <div className="text-center p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                            <div className="font-bold text-slate-900 dark:text-slate-100">{tier.perPost}</div>
                            <div className="text-xs text-slate-500">Per Post</div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">Typical Clients:</h4>
                        <ul className="space-y-2">
                          {tier.clients.map((client, clientIndex) => (
                            <li key={clientIndex} className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                              <Briefcase className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0" />
                              {client}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Pricing Models */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 text-center">
              LinkedIn Ghostwriter Pricing Models
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pricingModels.map((model, index) => (
                <Card key={index} className="h-full">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
                        {model.model}
                      </h3>
                      <div className="text-2xl font-bold text-primary mb-2">
                        {model.range}
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {model.description}
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-green-600 mb-2">Advantages:</h4>
                        <ul className="space-y-1">
                          {model.pros.map((pro, proIndex) => (
                            <li key={proIndex} className="text-sm text-slate-600 dark:text-slate-400 flex items-center">
                              <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-red-600 mb-2">Challenges:</h4>
                        <ul className="space-y-1">
                          {model.cons.map((con, conIndex) => (
                            <li key={conIndex} className="text-sm text-slate-600 dark:text-slate-400 flex items-center">
                              <Target className="h-3 w-3 text-red-500 mr-2 flex-shrink-0" />
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                        <div className="text-sm text-slate-500">
                          <strong>Best For:</strong> {model.bestFor}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Salary Factors */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 text-center">
              Factors That Affect LinkedIn Ghostwriter Salaries
            </h2>
            
            <div className="space-y-6">
              {salaryFactors.map((factor, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
                          {factor.factor}
                        </h3>
                        <Badge variant={factor.impact.includes('Very High') ? 'default' : factor.impact.includes('High') ? 'secondary' : 'outline'}>
                          {factor.impact}
                        </Badge>
                      </div>
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {factor.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                          <div className="text-sm text-slate-700 dark:text-slate-300">
                            {detail}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Income Streams */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 text-center">
              Multiple Income Streams for LinkedIn Ghostwriters
            </h2>
            
            <Card>
              <CardContent className="p-8">
                <p className="text-slate-600 dark:text-slate-400 mb-8 text-center">
                  Successful LinkedIn ghostwriters diversify their income through multiple revenue streams, increasing total earnings by 40-60% compared to single-service providers.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {incomeStreams.map((stream, index) => (
                    <div key={index} className="p-6 border border-slate-200 dark:border-slate-700 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-slate-900 dark:text-slate-100">
                          {stream.stream}
                        </h3>
                        <Badge variant="outline">{stream.percentage}</Badge>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 mb-3">
                        {stream.description}
                      </p>
                      <div className="text-lg font-bold text-primary">
                        {stream.potential}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Salary Increase Strategies */}
          <Card className="mb-16">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                10 Strategies to Increase Your LinkedIn Ghostwriter Salary
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-bold mr-3 mt-0.5">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-slate-100">Specialize in High-Value Industries</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Focus on tech, finance, or consulting for 30-50% higher rates</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-bold mr-3 mt-0.5">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-slate-100">Build a Strong Portfolio</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Showcase results and ROI to justify premium pricing</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-bold mr-3 mt-0.5">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-slate-100">Offer Strategic Consulting</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Add strategy services for 2-3x higher hourly rates</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-bold mr-3 mt-0.5">
                      4
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-slate-100">Target Enterprise Clients</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Large companies pay 40-60% more than small businesses</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-bold mr-3 mt-0.5">
                      5
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-slate-100">Create Package Deals</h4>
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
                      <h4 className="font-medium text-slate-900 dark:text-slate-100">Develop Thought Leadership</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Position yourself as an expert to command premium rates</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-bold mr-3 mt-0.5">
                      7
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-slate-100">Use Professional Tools</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Platforms like Lincognito increase efficiency and client satisfaction</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-bold mr-3 mt-0.5">
                      8
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-slate-100">Track and Report ROI</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Demonstrate value with detailed analytics and reporting</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-bold mr-3 mt-0.5">
                      9
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-slate-100">Build Long-term Relationships</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Retainer clients provide stable, higher-value income</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-bold mr-3 mt-0.5">
                      10
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-slate-100">Continuously Upskill</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Stay current with LinkedIn trends and algorithm changes</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Regional Salary Comparison */}
          <Card className="mb-16">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                LinkedIn Ghostwriter Salaries by Region
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                  <MapPin className="h-6 w-6 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">United States</h3>
                  <div className="text-lg font-bold text-primary">$70,000</div>
                  <div className="text-sm text-slate-500">Average Annual</div>
                </div>
                
                <div className="text-center p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                  <MapPin className="h-6 w-6 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">United Kingdom</h3>
                  <div className="text-lg font-bold text-primary">£45,000</div>
                  <div className="text-sm text-slate-500">Average Annual</div>
                </div>
                
                <div className="text-center p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                  <MapPin className="h-6 w-6 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">European Union</h3>
                  <div className="text-lg font-bold text-primary">$50,000</div>
                  <div className="text-sm text-slate-500">Average Annual</div>
                </div>
                
                <div className="text-center p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                  <MapPin className="h-6 w-6 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">Other Regions</h3>
                  <div className="text-lg font-bold text-primary">$35,000</div>
                  <div className="text-sm text-slate-500">Average Annual</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Maximize Your LinkedIn Ghostwriting Income?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Join 1,200+ professional ghostwriters using Lincognito to manage clients efficiently and increase their earning potential.
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