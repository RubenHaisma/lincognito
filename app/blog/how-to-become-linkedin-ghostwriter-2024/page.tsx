import { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Clock, 
  Target,
  BookOpen,
  Award,
  ArrowRight
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'How to Become a Professional LinkedIn Ghostwriter in 2024 | Complete Guide',
  description: 'Learn how to become a professional LinkedIn ghostwriter in 2024. Complete guide covering skills, pricing, client acquisition, and tools for LinkedIn content writing success.',
  keywords: 'how to become linkedin ghostwriter, professional linkedin ghostwriter, linkedin content writer, ghostwriting career, linkedin writing jobs',
};

export default function HowToBecomeLinkedInGhostwriter() {
  const steps = [
    {
      number: '01',
      title: 'Master LinkedIn Content Writing',
      description: 'Develop expertise in LinkedIn-specific content formats, tone, and engagement strategies.',
      skills: ['LinkedIn post formats', 'Professional tone', 'Engagement optimization', 'Hashtag strategy']
    },
    {
      number: '02',
      title: 'Build Your Portfolio',
      description: 'Create sample LinkedIn posts and case studies that demonstrate your ghostwriting abilities.',
      skills: ['Sample posts', 'Case studies', 'Before/after examples', 'Client testimonials']
    },
    {
      number: '03',
      title: 'Set Your Pricing Strategy',
      description: 'Research market rates and establish competitive pricing for your LinkedIn ghostwriting services.',
      skills: ['Market research', 'Pricing models', 'Package creation', 'Value proposition']
    },
    {
      number: '04',
      title: 'Find Your First Clients',
      description: 'Use proven strategies to acquire your first LinkedIn ghostwriting clients and build relationships.',
      skills: ['Client outreach', 'Networking', 'Referral systems', 'Social proof']
    }
  ];

  const skills = [
    { name: 'LinkedIn Algorithm Understanding', importance: 'Critical' },
    { name: 'Professional Writing', importance: 'Critical' },
    { name: 'Content Strategy', importance: 'High' },
    { name: 'Client Communication', importance: 'High' },
    { name: 'Social Media Marketing', importance: 'Medium' },
    { name: 'Analytics & Reporting', importance: 'Medium' }
  ];

  const pricingModels = [
    {
      model: 'Per Post',
      range: '€25-€100',
      description: 'Charge per individual LinkedIn post',
      pros: ['Simple pricing', 'Easy to scale'],
      cons: ['Inconsistent income', 'Time-consuming billing']
    },
    {
      model: 'Monthly Retainer',
      range: '€500-€3000',
      description: 'Fixed monthly fee for ongoing content',
      pros: ['Predictable income', 'Long-term relationships'],
      cons: ['Scope creep risk', 'Higher commitment']
    },
    {
      model: 'Package Deals',
      range: '€200-€800',
      description: 'Bundled services for specific outcomes',
      pros: ['Higher value perception', 'Clear deliverables'],
      cons: ['Complex pricing', 'Limited flexibility']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Header onAuthOpen={() => {}} />
      
      <main className="pt-32 pb-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4">Career Guide</Badge>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl mb-6">
              How to Become a Professional{' '}
              <span className="gradient-text">LinkedIn Ghostwriter</span>{' '}
              in 2024
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
              Complete step-by-step guide to building a successful LinkedIn ghostwriting career. Learn the skills, strategies, and tools you need to succeed.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                15 min read
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Beginner to Advanced
              </div>
              <div className="flex items-center">
                <Award className="h-4 w-4 mr-2" />
                Expert Guide
              </div>
            </div>
          </div>

          {/* Introduction */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                What is LinkedIn Ghostwriting?
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                LinkedIn ghostwriting is the practice of creating content for executives, entrepreneurs, and professionals who want to maintain an active LinkedIn presence but lack the time or expertise to create engaging content themselves. As a LinkedIn ghostwriter, you become the voice behind their personal brand, crafting posts that reflect their expertise and personality while driving engagement and business results.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">€2,000+</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Average Monthly Income</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">300%</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Industry Growth Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">5-10</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Clients per Ghostwriter</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step-by-Step Guide */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 text-center">
              4-Step Path to LinkedIn Ghostwriting Success
            </h2>
            
            <div className="space-y-8">
              {steps.map((step, index) => (
                <Card key={step.number} className="overflow-hidden">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-6">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-xl font-bold flex-shrink-0">
                        {step.number}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                          {step.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-4">
                          {step.description}
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          {step.skills.map((skill, skillIndex) => (
                            <div key={skillIndex} className="flex items-center text-sm text-slate-700 dark:text-slate-300">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                              {skill}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Essential Skills */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 text-center">
              Essential Skills for LinkedIn Ghostwriters
            </h2>
            
            <Card>
              <CardContent className="p-8">
                <div className="space-y-4">
                  {skills.map((skill, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <BookOpen className="h-5 w-5 text-primary" />
                        <span className="font-medium text-slate-900 dark:text-slate-100">
                          {skill.name}
                        </span>
                      </div>
                      <Badge variant={
                        skill.importance === 'Critical' ? 'default' :
                        skill.importance === 'High' ? 'secondary' : 'outline'
                      }>
                        {skill.importance}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pricing Strategies */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 text-center">
              LinkedIn Ghostwriter Pricing Models
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pricingModels.map((model, index) => (
                <Card key={index} className="h-full">
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
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
                        <h4 className="font-medium text-green-600 mb-2">Pros:</h4>
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
                        <h4 className="font-medium text-red-600 mb-2">Cons:</h4>
                        <ul className="space-y-1">
                          {model.cons.map((con, conIndex) => (
                            <li key={conIndex} className="text-sm text-slate-600 dark:text-slate-400 flex items-center">
                              <Target className="h-3 w-3 text-red-500 mr-2 flex-shrink-0" />
                              {con}
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

          {/* Client Acquisition */}
          <Card className="mb-16">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                Finding Your First LinkedIn Ghostwriting Clients
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">
                    Direct Outreach Strategies
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        Target executives with inactive LinkedIn profiles
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        Offer free content audits as conversation starters
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        Use LinkedIn Sales Navigator for targeted prospecting
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        Leverage warm introductions through your network
                      </span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">
                    Content Marketing Approach
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        Share LinkedIn writing tips and insights
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        Create case studies of successful campaigns
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        Offer free LinkedIn content templates
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        Host webinars on LinkedIn content strategy
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tools and Resources */}
          <Card className="mb-16">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                Essential Tools for LinkedIn Ghostwriters
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    Content Management
                  </h3>
                  <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                    <li>• Lincognito (LinkedIn-specific)</li>
                    <li>• Notion (content planning)</li>
                    <li>• Google Docs (collaboration)</li>
                    <li>• Grammarly (editing)</li>
                  </ul>
                </div>
                
                <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    Analytics & Research
                  </h3>
                  <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                    <li>• LinkedIn Analytics</li>
                    <li>• Google Trends</li>
                    <li>• BuzzSumo</li>
                    <li>• Social Blade</li>
                  </ul>
                </div>
                
                <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    Client Management
                  </h3>
                  <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                    <li>• HubSpot CRM</li>
                    <li>• Calendly (scheduling)</li>
                    <li>• Slack (communication)</li>
                    <li>• FreshBooks (invoicing)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Start Your LinkedIn Ghostwriting Career?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Join Lincognito and get the tools you need to manage multiple LinkedIn clients professionally.
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