'use client';

import { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Zap, 
  TrendingUp, 
  Users, 
  Clock, 
  Target,
  CheckCircle,
  BarChart3,
  ArrowRight,
  Star,
  ExternalLink,
  Shield,
  Calendar,
  MessageSquare,
  FileText,
  Search,
  Settings
} from 'lucide-react';

export default function LinkedInGhostwritingTools2025() {
  const toolCategories = [
    {
      category: 'Content Management & Scheduling',
      description: 'Platforms for managing multiple LinkedIn profiles and scheduling content',
      tools: [
        {
          name: 'Lincognito',
          price: '$10-30/month',
          rating: 4.9,
          description: 'The only platform built specifically for LinkedIn ghostwriters. Manage multiple client profiles, schedule content, and track engagement while staying LinkedIn compliant.',
          features: [
            'Multi-client profile management',
            'LinkedIn-compliant scheduling',
            'Real-time engagement analytics',
            'Client collaboration tools',
            'Brand guideline management'
          ],
          pros: ['LinkedIn-specific features', 'Compliance focus', 'Ghostwriter community'],
          cons: ['Newer platform', 'LinkedIn-only focus'],
          bestFor: 'Professional LinkedIn ghostwriters',
          featured: true
        },
        {
          name: 'Buffer',
          price: '$15-99/month',
          rating: 4.3,
          description: 'Popular social media management tool with LinkedIn support and team collaboration features.',
          features: [
            'Multi-platform scheduling',
            'Team collaboration',
            'Basic analytics',
            'Content calendar',
            'Browser extension'
          ],
          pros: ['Multi-platform support', 'Established platform', 'Good integrations'],
          cons: ['Not LinkedIn-specific', 'Limited ghostwriting features'],
          bestFor: 'Multi-platform social media management'
        },
        {
          name: 'Hootsuite',
          price: '$49-739/month',
          rating: 4.1,
          description: 'Enterprise-grade social media management with advanced LinkedIn features and team management.',
          features: [
            'Advanced scheduling',
            'Team management',
            'Comprehensive analytics',
            'Content approval workflows',
            'Custom reporting'
          ],
          pros: ['Enterprise features', 'Advanced analytics', 'Team workflows'],
          cons: ['Expensive', 'Complex interface', 'Overkill for solo ghostwriters'],
          bestFor: 'Large agencies and enterprise teams'
        }
      ]
    },
    {
      category: 'Writing & Content Creation',
      description: 'Tools to improve writing quality and create engaging LinkedIn content',
      tools: [
        {
          name: 'Grammarly Business',
          price: '$12.50-15/month',
          rating: 4.6,
          description: 'AI-powered writing assistant with business tone suggestions and brand voice consistency.',
          features: [
            'Grammar and spell check',
            'Tone detection',
            'Brand voice consistency',
            'Plagiarism detection',
            'Team style guides'
          ],
          pros: ['Excellent accuracy', 'Business tone features', 'Team collaboration'],
          cons: ['Subscription cost', 'Can be overly cautious'],
          bestFor: 'Professional writing quality assurance'
        },
        {
          name: 'Hemingway Editor',
          price: '$19.99 one-time',
          rating: 4.4,
          description: 'Readability-focused editor that helps create clear, concise LinkedIn posts.',
          features: [
            'Readability scoring',
            'Sentence structure analysis',
            'Passive voice detection',
            'Adverb highlighting',
            'Word count tracking'
          ],
          pros: ['One-time purchase', 'Improves clarity', 'Simple interface'],
          cons: ['Basic features', 'No collaboration tools'],
          bestFor: 'Improving content readability'
        },
        {
          name: 'Jasper AI',
          price: '$39-125/month',
          rating: 4.5,
          description: 'AI content generator with LinkedIn-specific templates and brand voice training.',
          features: [
            'AI content generation',
            'LinkedIn post templates',
            'Brand voice training',
            'Multiple output variations',
            'Content optimization'
          ],
          pros: ['Fast content creation', 'LinkedIn templates', 'Brand consistency'],
          cons: ['Expensive', 'Requires editing', 'Generic output'],
          bestFor: 'Content ideation and first drafts'
        }
      ]
    },
    {
      category: 'Research & Analytics',
      description: 'Tools for content research, trend analysis, and performance tracking',
      tools: [
        {
          name: 'BuzzSumo',
          price: '$99-499/month',
          rating: 4.5,
          description: 'Content research platform for finding trending topics and analyzing competitor performance.',
          features: [
            'Content trend analysis',
            'Competitor research',
            'Influencer identification',
            'Content alerts',
            'Performance analytics'
          ],
          pros: ['Comprehensive research', 'Trend identification', 'Competitor insights'],
          cons: ['Expensive', 'Learning curve', 'Overwhelming data'],
          bestFor: 'Content strategy and research'
        },
        {
          name: 'LinkedIn Sales Navigator',
          price: '$79.99/month',
          rating: 4.3,
          description: 'LinkedIn\'s premium tool for advanced search, lead research, and audience insights.',
          features: [
            'Advanced LinkedIn search',
            'Lead recommendations',
            'Company insights',
            'Saved searches and alerts',
            'InMail credits'
          ],
          pros: ['Native LinkedIn tool', 'Advanced search', 'Lead generation'],
          cons: ['LinkedIn-only', 'Expensive', 'Sales-focused'],
          bestFor: 'Client research and prospecting'
        },
        {
          name: 'Google Trends',
          price: 'Free',
          rating: 4.2,
          description: 'Free tool for identifying trending topics and seasonal content opportunities.',
          features: [
            'Trend analysis',
            'Geographic insights',
            'Related queries',
            'Seasonal patterns',
            'Comparison tools'
          ],
          pros: ['Completely free', 'Global data', 'Easy to use'],
          cons: ['Limited depth', 'No LinkedIn-specific data'],
          bestFor: 'Topic research and trend identification'
        }
      ]
    },
    {
      category: 'Client Management',
      description: 'CRM and project management tools for ghostwriting businesses',
      tools: [
        {
          name: 'HubSpot CRM',
          price: 'Free-$1,200/month',
          rating: 4.5,
          description: 'Comprehensive CRM with pipeline management, email tracking, and client communication tools.',
          features: [
            'Contact management',
            'Deal pipeline tracking',
            'Email integration',
            'Task management',
            'Reporting dashboard'
          ],
          pros: ['Free tier available', 'Comprehensive features', 'Great integrations'],
          cons: ['Can be complex', 'Expensive premium tiers'],
          bestFor: 'Client relationship management'
        },
        {
          name: 'Notion',
          price: 'Free-$10/month',
          rating: 4.7,
          description: 'All-in-one workspace for content planning, client documentation, and project management.',
          features: [
            'Content calendar templates',
            'Client documentation',
            'Project tracking',
            'Team collaboration',
            'Custom databases'
          ],
          pros: ['Highly customizable', 'Great templates', 'Affordable'],
          cons: ['Learning curve', 'Can be overwhelming'],
          bestFor: 'Content planning and organization'
        },
        {
          name: 'Calendly',
          price: 'Free-$16/month',
          rating: 4.6,
          description: 'Automated scheduling tool for client meetings and consultations.',
          features: [
            'Automated scheduling',
            'Calendar integration',
            'Meeting reminders',
            'Custom booking pages',
            'Payment integration'
          ],
          pros: ['Easy setup', 'Great automation', 'Professional appearance'],
          cons: ['Limited customization', 'Timezone complexity'],
          bestFor: 'Client meeting scheduling'
        }
      ]
    }
  ];

  const toolSelectionCriteria = [
    {
      criteria: 'LinkedIn Compliance',
      importance: 'Critical',
      description: 'Ensure tools follow LinkedIn\'s terms of service and don\'t risk account suspension',
      questions: ['Does it automate posting?', 'Are there rate limits?', 'Is it officially approved?']
    },
    {
      criteria: 'Multi-Client Support',
      importance: 'High',
      description: 'Ability to manage multiple client profiles and content streams efficiently',
      questions: ['How many profiles?', 'Client separation?', 'Bulk operations?']
    },
    {
      criteria: 'Analytics & Reporting',
      importance: 'High',
      description: 'Track performance and demonstrate ROI to clients',
      questions: ['What metrics?', 'Custom reports?', 'Export options?']
    },
    {
      criteria: 'Integration Capabilities',
      importance: 'Medium',
      description: 'Connect with other tools in your workflow',
      questions: ['API availability?', 'Native integrations?', 'Zapier support?']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Header onAuthOpen={() => {}} />
      
      <main className="pt-32 pb-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4">Tools Guide 2025</Badge>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl mb-6">
              15 LinkedIn Ghostwriting{' '}
              <span className="gradient-text">Tools</span>{' '}
              Every Professional Writer Needs in 2025
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
              Comprehensive guide to the best LinkedIn ghostwriting tools for content creation, client management, and business growth. Tested and reviewed by professional ghostwriters.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                18 min read
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-2" />
                Expert Reviewed
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                15 Tools Tested
              </div>
            </div>
          </div>

          {/* Introduction */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                Why the Right Tools Matter for LinkedIn Ghostwriters
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Professional LinkedIn ghostwriters using the right tools report 300% higher productivity and 40% better client retention. The key is choosing tools that enhance your workflow without compromising LinkedIn compliance or content quality.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">300%</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Productivity Increase</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">40%</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Better Client Retention</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">15</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Essential Tools</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">$200+</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Monthly Tool Budget</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tool Categories */}
          <div className="space-y-16">
            {toolCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                    {category.category}
                  </h2>
                  <p className="text-lg text-slate-600 dark:text-slate-400">
                    {category.description}
                  </p>
                </div>
                
                <div className="space-y-6">
                  {category.tools.map((tool, toolIndex) => (
                    <Card key={toolIndex} className={`overflow-hidden ${tool.featured ? 'border-2 border-primary shadow-lg' : ''}`}>
                      {tool.featured && (
                        <div className="bg-primary text-white text-center py-2 text-sm font-medium">
                          ⭐ Recommended for LinkedIn Ghostwriters
                        </div>
                      )}
                      <CardContent className="p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                          <div className="lg:col-span-2">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                                  {tool.name}
                                </h3>
                                <div className="flex items-center space-x-4 mb-3">
                                  <div className="flex items-center">
                                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                                    <span className="font-medium">{tool.rating}</span>
                                  </div>
                                  <Badge variant="outline">{tool.price}</Badge>
                                </div>
                                <p className="text-slate-600 dark:text-slate-400">
                                  {tool.description}
                                </p>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">Key Features:</h4>
                                <ul className="space-y-1">
                                  {tool.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                                      <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                                      {feature}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              
                              <div>
                                <div className="mb-4">
                                  <h4 className="font-semibold text-green-600 mb-2">Pros:</h4>
                                  <ul className="space-y-1">
                                    {tool.pros.map((pro, proIndex) => (
                                      <li key={proIndex} className="text-sm text-slate-600 dark:text-slate-400 flex items-center">
                                        <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                                        {pro}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                
                                <div>
                                  <h4 className="font-semibold text-red-600 mb-2">Cons:</h4>
                                  <ul className="space-y-1">
                                    {tool.cons.map((con, conIndex) => (
                                      <li key={conIndex} className="text-sm text-slate-600 dark:text-slate-400 flex items-center">
                                        <Target className="h-3 w-3 text-red-500 mr-2 flex-shrink-0" />
                                        {con}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                              <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Best For:</h4>
                              <p className="text-sm text-slate-600 dark:text-slate-400">{tool.bestFor}</p>
                            </div>
                            
                            <Button className={`w-full ${tool.featured ? 'bg-primary' : ''}`} variant={tool.featured ? 'default' : 'outline'}>
                              {tool.name === 'Lincognito' ? 'Try Free' : 'Learn More'}
                              <ExternalLink className="h-4 w-4 ml-2" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Tool Selection Guide */}
          <div className="mt-20 mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 text-center">
              How to Choose the Right LinkedIn Ghostwriting Tools
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {toolSelectionCriteria.map((criteria, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
                          {criteria.criteria}
                        </h3>
                        <Badge variant={criteria.importance === 'Critical' ? 'default' : criteria.importance === 'High' ? 'secondary' : 'outline'}>
                          {criteria.importance}
                        </Badge>
                      </div>
                      <Settings className="h-6 w-6 text-primary" />
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                      {criteria.description}
                    </p>
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">Key Questions:</h4>
                      <ul className="space-y-1">
                        {criteria.questions.map((question, questionIndex) => (
                          <li key={questionIndex} className="text-sm text-slate-600 dark:text-slate-400 flex items-center">
                            <Target className="h-3 w-3 text-primary mr-2 flex-shrink-0" />
                            {question}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Tool Stack Recommendations */}
          <Card className="mb-16">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                Recommended Tool Stacks by Business Size
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-lg">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-4">Solo Ghostwriter</h3>
                  <div className="text-lg font-bold text-primary mb-4">$50-80/month</div>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Lincognito (Starter)
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Grammarly Business
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Google Trends (Free)
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Calendly
                    </li>
                  </ul>
                </div>
                
                <div className="p-6 border-2 border-primary rounded-lg">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-4">Growing Agency</h3>
                  <div className="text-lg font-bold text-primary mb-4">$200-400/month</div>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Lincognito (Professional)
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      BuzzSumo
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      HubSpot CRM
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Notion
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      LinkedIn Sales Navigator
                    </li>
                  </ul>
                </div>
                
                <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-lg">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-4">Enterprise Agency</h3>
                  <div className="text-lg font-bold text-primary mb-4">$800-1,500/month</div>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Lincognito (Agency)
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Hootsuite Enterprise
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      BuzzSumo Pro
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      HubSpot Professional
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Custom integrations
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ROI Calculator */}
          <Card className="mb-16">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                Tool ROI: How Professional Tools Pay for Themselves
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Without Professional Tools:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Clock className="h-5 w-5 text-red-500 mr-3 mt-0.5" />
                      <div>
                        <div className="font-medium">8 hours/week on admin tasks</div>
                        <div className="text-sm text-slate-500">Manual scheduling, tracking, reporting</div>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Users className="h-5 w-5 text-red-500 mr-3 mt-0.5" />
                      <div>
                        <div className="font-medium">3-5 clients maximum</div>
                        <div className="text-sm text-slate-500">Limited by manual processes</div>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <BarChart3 className="h-5 w-5 text-red-500 mr-3 mt-0.5" />
                      <div>
                        <div className="font-medium">Basic reporting only</div>
                        <div className="text-sm text-slate-500">Difficulty proving ROI to clients</div>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">With Professional Tools:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Zap className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                      <div>
                        <div className="font-medium">2 hours/week on admin tasks</div>
                        <div className="text-sm text-slate-500">75% time savings through automation</div>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <TrendingUp className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                      <div>
                        <div className="font-medium">10-15 clients possible</div>
                        <div className="text-sm text-slate-500">3x capacity increase</div>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Target className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                      <div>
                        <div className="font-medium">Advanced analytics & ROI</div>
                        <div className="text-sm text-slate-500">Justify 20-40% higher rates</div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-center">
                  <h4 className="font-bold text-green-800 dark:text-green-200 mb-2">
                    ROI Calculation Example
                  </h4>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Tool cost: $200/month | Time saved: 6 hours/week | Rate: $50/hour<br/>
                    <strong>Monthly ROI: $1,100 (450% return on investment)</strong>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Supercharge Your LinkedIn Ghostwriting Business?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Start with Lincognito - the only platform built specifically for LinkedIn ghostwriters. Join 1,200+ professionals already scaling their businesses.
            </p>
            <Button size="lg" className="bg-white text-primary hover:bg-slate-100">
              Try Lincognito Free
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}