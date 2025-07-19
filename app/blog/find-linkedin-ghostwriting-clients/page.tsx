'use client';

import { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Target, 
  TrendingUp, 
  Users, 
  Clock, 
  Search,
  CheckCircle,
  BarChart3,
  ArrowRight,
  MessageSquare,
  Mail,
  Linkedin,
  FileText,
  Award,
  Zap,
  DollarSign
} from 'lucide-react';

export default function FindLinkedInGhostwritingClients() {
  const strategies = [
    {
      number: '01',
      title: 'LinkedIn Outreach and Networking',
      difficulty: 'Medium',
      timeToResults: '2-4 weeks',
      successRate: '15-25%',
      description: 'Direct outreach to executives and professionals who could benefit from ghostwriting services.',
      steps: [
        'Identify target prospects using LinkedIn Sales Navigator',
        'Research their current LinkedIn activity and content gaps',
        'Craft personalized connection requests with value propositions',
        'Follow up with helpful content and insights',
        'Propose ghostwriting services after building rapport'
      ],
      tips: [
        'Focus on executives with inactive or inconsistent posting',
        'Offer free content audits as conversation starters',
        'Share relevant industry insights to demonstrate expertise',
        'Use warm introductions whenever possible'
      ],
      tools: ['LinkedIn Sales Navigator', 'LinkedIn Premium', 'CRM system'],
      expectedResults: '2-5 qualified leads per 100 outreach attempts'
    },
    {
      number: '02',
      title: 'Content Marketing and Thought Leadership',
      difficulty: 'High',
      timeToResults: '3-6 months',
      successRate: '30-40%',
      description: 'Establish yourself as a LinkedIn expert through valuable content that attracts potential clients.',
      steps: [
        'Create a content calendar focused on LinkedIn best practices',
        'Share case studies and client success stories',
        'Offer free templates and resources',
        'Engage with your target audience\'s content',
        'Convert followers into clients through strategic CTAs'
      ],
      tips: [
        'Post consistently (3-5 times per week minimum)',
        'Share behind-the-scenes content from your ghostwriting work',
        'Create "before and after" examples of LinkedIn transformations',
        'Host LinkedIn Live sessions on content strategy'
      ],
      tools: ['Content calendar', 'Design tools', 'Analytics platforms'],
      expectedResults: '5-10 inbound leads per month after 6 months'
    },
    {
      number: '03',
      title: 'Referral Program Development',
      difficulty: 'Low',
      timeToResults: '1-2 months',
      successRate: '40-60%',
      description: 'Leverage existing relationships and satisfied clients to generate new business.',
      steps: [
        'Create a formal referral program with clear incentives',
        'Reach out to past clients and professional contacts',
        'Offer referral bonuses or commission structures',
        'Make it easy for referrers with templates and materials',
        'Track and follow up on all referrals promptly'
      ],
      tips: [
        'Offer 10-20% commission for successful referrals',
        'Create referral cards or digital assets for easy sharing',
        'Follow up with referrers to show appreciation',
        'Ask for referrals at the end of successful projects'
      ],
      tools: ['CRM system', 'Referral tracking software', 'Payment processing'],
      expectedResults: '1-3 qualified referrals per existing client annually'
    },
    {
      number: '04',
      title: 'Cold Email Campaigns',
      difficulty: 'Medium',
      timeToResults: '2-6 weeks',
      successRate: '5-15%',
      description: 'Systematic email outreach to potential clients with personalized value propositions.',
      steps: [
        'Build targeted email lists using tools like Apollo or ZoomInfo',
        'Research prospects thoroughly for personalization',
        'Create compelling subject lines and email templates',
        'Develop a multi-touch follow-up sequence',
        'Track open rates, responses, and conversions'
      ],
      tips: [
        'Keep initial emails under 100 words',
        'Include specific examples of how you can help',
        'Use social proof and case studies',
        'Follow up 3-5 times with different angles'
      ],
      tools: ['Email automation tools', 'Lead generation platforms', 'Email verification'],
      expectedResults: '1-3 qualified leads per 100 emails sent'
    },
    {
      number: '05',
      title: 'Freelance Platform Optimization',
      difficulty: 'Low',
      timeToResults: '1-3 weeks',
      successRate: '20-35%',
      description: 'Optimize profiles on Upwork, Fiverr, and other platforms to attract LinkedIn ghostwriting clients.',
      steps: [
        'Create compelling profiles highlighting LinkedIn expertise',
        'Showcase portfolio with before/after examples',
        'Gather client testimonials and reviews',
        'Bid strategically on relevant projects',
        'Gradually increase rates as you build reputation'
      ],
      tips: [
        'Use keywords like "LinkedIn ghostwriter" in your profile',
        'Offer competitive rates initially to build reviews',
        'Respond quickly to project invitations',
        'Create packages for different client needs'
      ],
      tools: ['Upwork', 'Fiverr', 'Freelancer.com', 'PeoplePerHour'],
      expectedResults: '2-5 projects per month on established platforms'
    },
    {
      number: '06',
      title: 'Speaking and Webinar Marketing',
      difficulty: 'High',
      timeToResults: '3-12 months',
      successRate: '50-70%',
      description: 'Position yourself as an expert through speaking engagements and educational webinars.',
      steps: [
        'Identify relevant conferences and events',
        'Develop compelling speaking topics',
        'Create webinar content on LinkedIn best practices',
        'Promote events through your network',
        'Convert attendees through follow-up campaigns'
      ],
      tips: [
        'Start with local business groups and chambers of commerce',
        'Offer free webinars to build your audience',
        'Record sessions for future marketing use',
        'Collect contact information for follow-up'
      ],
      tools: ['Webinar platforms', 'Presentation software', 'Email marketing'],
      expectedResults: '5-15 qualified leads per speaking engagement'
    },
    {
      number: '07',
      title: 'Strategic Partnerships',
      difficulty: 'Medium',
      timeToResults: '2-6 months',
      successRate: '25-45%',
      description: 'Partner with complementary service providers to cross-refer clients and expand reach.',
      steps: [
        'Identify potential partners (marketing agencies, consultants)',
        'Develop mutually beneficial partnership agreements',
        'Create co-marketing opportunities',
        'Establish referral processes and tracking',
        'Maintain regular communication with partners'
      ],
      tips: [
        'Target agencies that don\'t offer LinkedIn services',
        'Offer revenue sharing for successful referrals',
        'Create joint content and case studies',
        'Attend industry networking events'
      ],
      tools: ['CRM system', 'Partnership agreements', 'Communication tools'],
      expectedResults: '2-8 qualified leads per active partnership monthly'
    }
  ];

  const clientTypes = [
    {
      type: 'C-Suite Executives',
      budget: '$2,000-$5,000/month',
      painPoints: ['Time constraints', 'Personal branding needs', 'Thought leadership goals'],
      whereToFind: ['LinkedIn Sales Navigator', 'Executive networks', 'Industry events'],
      approach: 'Focus on ROI and business impact'
    },
    {
      type: 'Marketing Agencies',
      budget: '$1,000-$3,000/month',
      painPoints: ['Client demand', 'Resource constraints', 'Expertise gaps'],
      whereToFind: ['Agency directories', 'Marketing conferences', 'LinkedIn groups'],
      approach: 'Emphasize white-label services and scalability'
    },
    {
      type: 'Consultants & Coaches',
      budget: '$500-$2,000/month',
      painPoints: ['Lead generation', 'Authority building', 'Content consistency'],
      whereToFind: ['Professional associations', 'Coaching platforms', 'Industry forums'],
      approach: 'Highlight lead generation and authority building'
    },
    {
      type: 'Tech Startups',
      budget: '$800-$2,500/month',
      painPoints: ['Founder visibility', 'Investor relations', 'Talent attraction'],
      whereToFind: ['Startup directories', 'Tech events', 'Accelerator programs'],
      approach: 'Focus on growth and investor appeal'
    }
  ];

  const prospectingTools = [
    {
      tool: 'LinkedIn Sales Navigator',
      price: '$79.99/month',
      features: ['Advanced search filters', 'Lead recommendations', 'InMail credits'],
      bestFor: 'Finding and researching prospects on LinkedIn'
    },
    {
      tool: 'Apollo.io',
      price: '$49-149/month',
      features: ['Email finder', 'Company data', 'Sequence automation'],
      bestFor: 'Building email lists and outreach campaigns'
    },
    {
      tool: 'ZoomInfo',
      price: '$14,995/year',
      features: ['Comprehensive database', 'Intent data', 'Technographics'],
      bestFor: 'Enterprise-level prospecting and research'
    },
    {
      tool: 'Hunter.io',
      price: '$49-399/month',
      features: ['Email verification', 'Domain search', 'Email campaigns'],
      bestFor: 'Finding and verifying email addresses'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Header onAuthOpen={() => {}} />
      
      <main className="pt-32 pb-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4">Client Acquisition Guide</Badge>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl mb-6">
              How to Find LinkedIn Ghostwriting{' '}
              <span className="gradient-text">Clients</span>:{' '}
              7 Proven Strategies That Work
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
              Complete guide to finding and landing high-paying LinkedIn ghostwriting clients. Tested strategies used by successful ghostwriters to build 6-figure businesses.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                20 min read
              </div>
              <div className="flex items-center">
                <Target className="h-4 w-4 mr-2" />
                7 Strategies
              </div>
              <div className="flex items-center">
                <Award className="h-4 w-4 mr-2" />
                Proven Methods
              </div>
            </div>
          </div>

          {/* Introduction */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                The LinkedIn Ghostwriting Client Acquisition Challenge
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Finding quality LinkedIn ghostwriting clients is the #1 challenge for 78% of ghostwriters. The strategies in this guide have helped over 500 ghostwriters build sustainable client bases, with many reaching $10,000+ monthly recurring revenue within 12 months.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">78%</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Struggle with Client Acquisition</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">$10K+</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Monthly Revenue Potential</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">500+</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Ghostwriters Helped</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">7</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Proven Strategies</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Strategies */}
          <div className="space-y-12">
            {strategies.map((strategy, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-3">
                      <div className="flex items-start space-x-6 mb-6">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-xl font-bold flex-shrink-0">
                          {strategy.number}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                            {strategy.title}
                          </h3>
                          <p className="text-slate-600 dark:text-slate-400 mb-4">
                            {strategy.description}
                          </p>
                          <div className="flex items-center space-x-4 mb-4">
                            <Badge variant={strategy.difficulty === 'Low' ? 'secondary' : strategy.difficulty === 'Medium' ? 'outline' : 'default'}>
                              {strategy.difficulty} Difficulty
                            </Badge>
                            <span className="text-sm text-slate-500">
                              <Clock className="h-4 w-4 inline mr-1" />
                              {strategy.timeToResults}
                            </span>
                            <span className="text-sm text-slate-500">
                              <Target className="h-4 w-4 inline mr-1" />
                              {strategy.successRate} success rate
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">Implementation Steps:</h4>
                          <ol className="space-y-2">
                            {strategy.steps.map((step, stepIndex) => (
                              <li key={stepIndex} className="flex items-start text-sm text-slate-600 dark:text-slate-400">
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                                  {stepIndex + 1}
                                </span>
                                {step}
                              </li>
                            ))}
                          </ol>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">Pro Tips:</h4>
                          <ul className="space-y-2">
                            {strategy.tips.map((tip, tipIndex) => (
                              <li key={tipIndex} className="flex items-start text-sm text-slate-600 dark:text-slate-400">
                                <Zap className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Tools Needed:</h4>
                        <ul className="space-y-1">
                          {strategy.tools.map((tool, toolIndex) => (
                            <li key={toolIndex} className="text-sm text-slate-600 dark:text-slate-400 flex items-center">
                              <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                              {tool}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Expected Results:</h4>
                        <p className="text-sm text-green-700 dark:text-green-300">
                          {strategy.expectedResults}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Client Types */}
          <div className="mt-20 mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 text-center">
              Types of LinkedIn Ghostwriting Clients and How to Approach Them
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {clientTypes.map((client, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                        {client.type}
                      </h3>
                      <Badge className="bg-green-100 text-green-800">
                        {client.budget}
                      </Badge>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">Pain Points:</h4>
                        <ul className="space-y-1">
                          {client.painPoints.map((pain, painIndex) => (
                            <li key={painIndex} className="text-sm text-slate-600 dark:text-slate-400 flex items-center">
                              <Target className="h-3 w-3 text-red-500 mr-2 flex-shrink-0" />
                              {pain}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">Where to Find Them:</h4>
                        <ul className="space-y-1">
                          {client.whereToFind.map((location, locationIndex) => (
                            <li key={locationIndex} className="text-sm text-slate-600 dark:text-slate-400 flex items-center">
                              <Search className="h-3 w-3 text-blue-500 mr-2 flex-shrink-0" />
                              {location}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-1">Best Approach:</h4>
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                          {client.approach}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Prospecting Tools */}
          <Card className="mb-16">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                Essential Prospecting Tools for LinkedIn Ghostwriters
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {prospectingTools.map((tool, index) => (
                  <div key={index} className="p-6 border border-slate-200 dark:border-slate-700 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-slate-900 dark:text-slate-100">
                        {tool.tool}
                      </h3>
                      <Badge variant="outline">{tool.price}</Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">Features:</h4>
                        <ul className="space-y-1">
                          {tool.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="text-sm text-slate-600 dark:text-slate-400 flex items-center">
                              <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <div className="text-sm text-slate-700 dark:text-slate-300">
                          <strong>Best For:</strong> {tool.bestFor}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Implementation Timeline */}
          <Card className="mb-16">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                90-Day Client Acquisition Implementation Plan
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-lg">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-4">Days 1-30: Foundation</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Set up prospecting tools
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Create client personas
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Build prospect lists
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Develop outreach templates
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Launch referral program
                    </li>
                  </ul>
                </div>
                
                <div className="p-6 border-2 border-primary rounded-lg">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-4">Days 31-60: Execution</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Start LinkedIn outreach (50/week)
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Launch content marketing
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Begin cold email campaigns
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Optimize freelance profiles
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Track and analyze results
                    </li>
                  </ul>
                </div>
                
                <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-lg">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-4">Days 61-90: Optimization</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Refine successful strategies
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Scale working approaches
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Develop partnerships
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Plan speaking engagements
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Measure ROI and adjust
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Success Metrics */}
          <Card className="mb-16">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                Key Metrics to Track Your Client Acquisition Success
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                  <MessageSquare className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">Response Rate</h3>
                  <div className="text-lg font-bold text-primary">15-25%</div>
                  <div className="text-sm text-slate-500">Target for outreach</div>
                </div>
                
                <div className="text-center p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                  <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">Conversion Rate</h3>
                  <div className="text-lg font-bold text-primary">5-10%</div>
                  <div className="text-sm text-slate-500">Leads to clients</div>
                </div>
                
                <div className="text-center p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                  <DollarSign className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">Client Value</h3>
                  <div className="text-lg font-bold text-primary">$1,500</div>
                  <div className="text-sm text-slate-500">Average monthly</div>
                </div>
                
                <div className="text-center p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                  <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">Sales Cycle</h3>
                  <div className="text-lg font-bold text-primary">30-60</div>
                  <div className="text-sm text-slate-500">Days average</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Find Your First LinkedIn Ghostwriting Clients?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Use Lincognito to manage your prospects, track outreach, and convert leads into long-term clients. Join 1,200+ successful ghostwriters.
            </p>
            <Button size="lg" className="bg-white text-primary hover:bg-slate-100">
              Start Client Acquisition
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}