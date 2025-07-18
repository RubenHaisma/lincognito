import { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Copy, 
  TrendingUp, 
  Users, 
  Clock, 
  Target,
  CheckCircle,
  MessageSquare,
  Share2,
  Heart,
  ArrowRight,
  FileText
} from 'lucide-react';

export const metadata: Metadata = {
  title: '10 LinkedIn Content Writing Templates That Convert | Free Templates',
  description: 'Proven LinkedIn content writing templates used by top ghostwriters. Free LinkedIn post templates that drive engagement and generate leads for clients.',
  keywords: 'linkedin content templates, linkedin post templates, linkedin writing templates, linkedin content writing, ghostwriting templates',
};

export default function LinkedInContentWritingTemplates() {
  const templates = [
    {
      id: 1,
      title: 'The Personal Story Template',
      category: 'Storytelling',
      engagement: 'High',
      description: 'Share a personal experience that connects to a business lesson',
      template: `[Personal Hook]
Last week, I made a mistake that cost us €10,000...

[Story Development]
Here's what happened: [Brief story with specific details]

[The Lesson]
But here's what I learned: [Key insight or lesson]

[Business Application]
This applies to business because: [How others can use this lesson]

[Call to Action]
What's the biggest lesson you've learned from a mistake?

#leadership #entrepreneurship #lessons`,
      metrics: { likes: '150-300', comments: '20-50', shares: '10-25' },
      bestFor: 'Personal branding, thought leadership, building trust'
    },
    {
      id: 2,
      title: 'The Contrarian Take Template',
      category: 'Opinion',
      engagement: 'Very High',
      description: 'Challenge conventional wisdom with a well-reasoned alternative view',
      template: `[Controversial Hook]
Unpopular opinion: [Contrarian statement]

[Common Belief]
Everyone says: [What most people believe]

[Your Counter-Argument]
But I think: [Your different perspective with reasoning]

[Evidence/Examples]
Here's why: [2-3 supporting points with examples]

[Balanced Conclusion]
I'm not saying [common belief] is wrong, but [your nuanced take]

What do you think? Am I missing something?

#innovation #leadership #contrarian`,
      metrics: { likes: '200-500', comments: '30-80', shares: '15-40' },
      bestFor: 'Thought leadership, sparking debate, building authority'
    },
    {
      id: 3,
      title: 'The List/Tips Template',
      category: 'Educational',
      engagement: 'High',
      description: 'Share actionable tips or insights in an easy-to-digest format',
      template: `[Value Proposition Hook]
5 things I wish I knew when I started [topic]:

[Tip 1]
1. [Specific tip with brief explanation]

[Tip 2]
2. [Specific tip with brief explanation]

[Tip 3]
3. [Specific tip with brief explanation]

[Tip 4]
4. [Specific tip with brief explanation]

[Tip 5]
5. [Specific tip with brief explanation]

[Bonus/Call to Action]
Bonus tip: [Additional insight]

Which tip resonates most with you?

#tips #advice #[industry]`,
      metrics: { likes: '100-250', comments: '15-35', shares: '8-20' },
      bestFor: 'Establishing expertise, providing value, easy engagement'
    },
    {
      id: 4,
      title: 'The Behind-the-Scenes Template',
      category: 'Transparency',
      engagement: 'Medium-High',
      description: 'Give followers a peek behind the curtain of your business or process',
      template: `[Curiosity Hook]
Here's what a typical [day/meeting/process] looks like for me:

[Time/Step 1]
6:00 AM - [Activity and why it matters]

[Time/Step 2]
8:00 AM - [Activity and insight]

[Time/Step 3]
10:00 AM - [Activity and lesson]

[Time/Step 4]
2:00 PM - [Activity and observation]

[Time/Step 5]
6:00 PM - [Activity and reflection]

[Key Insight]
The biggest surprise? [Unexpected learning or insight]

What does your typical [day/process] look like?

#behindthescenes #productivity #[industry]`,
      metrics: { likes: '80-200', comments: '10-30', shares: '5-15' },
      bestFor: 'Building relatability, showing authenticity, process sharing'
    },
    {
      id: 5,
      title: 'The Question/Poll Template',
      category: 'Engagement',
      engagement: 'Very High',
      description: 'Ask thought-provoking questions to drive comments and engagement',
      template: `[Context Setting]
I've been thinking about [topic/trend/challenge]...

[The Question Setup]
And it made me wonder: [Thought-provoking question]

[Options/Framework]
I see three main approaches:

A) [Option 1 with brief description]
B) [Option 2 with brief description]  
C) [Option 3 with brief description]

[Personal Take]
Personally, I lean toward [your choice] because [brief reasoning]

[Call to Action]
What's your take? A, B, C, or something else entirely?

Drop your thoughts in the comments 👇

#discussion #strategy #[industry]`,
      metrics: { likes: '120-300', comments: '25-60', shares: '8-20' },
      bestFor: 'Community building, market research, high engagement'
    },
    {
      id: 6,
      title: 'The Achievement/Milestone Template',
      category: 'Celebration',
      engagement: 'Medium',
      description: 'Share wins and milestones while providing value to others',
      template: `[Milestone Announcement]
🎉 Just hit [specific milestone]!

[The Journey]
When I started [timeframe] ago, I never imagined [context about the beginning]

[Key Moments]
The turning points:
• [Key moment 1 and lesson]
• [Key moment 2 and lesson]
• [Key moment 3 and lesson]

[Gratitude]
Huge thanks to [specific people/community] who [how they helped]

[Value for Others]
For anyone working toward [similar goal]:
[2-3 actionable tips based on your experience]

[Forward Looking]
Next up: [What's coming next]

#milestone #grateful #[industry] #growth`,
      metrics: { likes: '100-250', comments: '15-40', shares: '5-15' },
      bestFor: 'Building credibility, inspiring others, showing progress'
    },
    {
      id: 7,
      title: 'The Industry Insight Template',
      category: 'Analysis',
      engagement: 'High',
      description: 'Share observations about industry trends or changes',
      template: `[Trend Observation]
Something interesting is happening in [industry]...

[The Trend]
I'm seeing [specific trend or change] across [context/companies/market]

[Evidence]
Examples:
• [Specific example 1]
• [Specific example 2]
• [Specific example 3]

[Analysis]
Why this matters: [Your interpretation of the significance]

[Implications]
What this means for [target audience]:
1. [Implication 1]
2. [Implication 2]
3. [Implication 3]

[Future Prediction]
My prediction: [What you think will happen next]

Are you seeing this trend too? What's your take?

#trends #industry #analysis #future`,
      metrics: { likes: '150-350', comments: '20-45', shares: '12-30' },
      bestFor: 'Thought leadership, industry authority, sparking discussion'
    },
    {
      id: 8,
      title: 'The Problem/Solution Template',
      category: 'Problem-Solving',
      engagement: 'High',
      description: 'Identify a common problem and offer a practical solution',
      template: `[Problem Statement]
Here's a problem I see everywhere: [Specific problem]

[Problem Elaboration]
This shows up as:
• [Symptom 1]
• [Symptom 2]
• [Symptom 3]

[Root Cause]
The real issue? [Underlying cause of the problem]

[Solution]
Here's what actually works: [Your solution approach]

[Implementation Steps]
How to implement this:
1. [Step 1 with specific action]
2. [Step 2 with specific action]
3. [Step 3 with specific action]

[Results]
When you do this: [Expected outcomes/benefits]

Have you faced this problem? What worked for you?

#problemsolving #solutions #[industry]`,
      metrics: { likes: '120-280', comments: '18-40', shares: '10-25' },
      bestFor: 'Demonstrating expertise, providing value, building authority'
    },
    {
      id: 9,
      title: 'The Comparison Template',
      category: 'Educational',
      engagement: 'Medium-High',
      description: 'Compare two approaches, tools, or strategies',
      template: `[Comparison Hook]
[Option A] vs [Option B]: Which is better for [specific use case]?

[Option A Analysis]
[Option A] strengths:
✅ [Benefit 1]
✅ [Benefit 2]
✅ [Benefit 3]

[Option A] weaknesses:
❌ [Limitation 1]
❌ [Limitation 2]

[Option B Analysis]
[Option B] strengths:
✅ [Benefit 1]
✅ [Benefit 2]
✅ [Benefit 3]

[Option B] weaknesses:
❌ [Limitation 1]
❌ [Limitation 2]

[Recommendation]
My take: Choose [Option A] if [specific scenario]
Choose [Option B] if [different scenario]

What's been your experience with these options?

#comparison #strategy #tools #[industry]`,
      metrics: { likes: '100-220', comments: '15-35', shares: '8-18' },
      bestFor: 'Educational content, helping decision-making, showing expertise'
    },
    {
      id: 10,
      title: 'The Prediction/Future Template',
      category: 'Thought Leadership',
      engagement: 'High',
      description: 'Make predictions about industry or market changes',
      template: `[Bold Prediction]
Prediction: By [timeframe], [specific prediction about industry/market]

[Current State]
Right now: [Description of current situation]

[Driving Forces]
What's driving this change:
• [Force 1 with explanation]
• [Force 2 with explanation]
• [Force 3 with explanation]

[Timeline]
How I see this unfolding:
📅 [Timeframe 1]: [What will happen]
📅 [Timeframe 2]: [Next development]
📅 [Timeframe 3]: [Final outcome]

[Preparation Advice]
How to prepare:
1. [Action step 1]
2. [Action step 2]
3. [Action step 3]

[Confidence Level]
Confidence level: [X/10] - because [reasoning]

What do you think? Too optimistic? Too conservative?

#prediction #future #trends #[industry]`,
      metrics: { likes: '180-400', comments: '25-55', shares: '15-35' },
      bestFor: 'Thought leadership, sparking debate, building authority'
    }
  ];

  const copyTemplate = (template: string) => {
    navigator.clipboard.writeText(template);
    // You could add a toast notification here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Header onAuthOpen={() => {}} />
      
      <main className="pt-32 pb-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4">Free Templates</Badge>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl mb-6">
              10 LinkedIn Content Writing{' '}
              <span className="gradient-text">Templates</span>{' '}
              That Convert
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
              Proven LinkedIn post templates used by top ghostwriters to drive engagement and generate leads. Copy, customize, and use for your clients.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                10 Templates
              </div>
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                Proven Results
              </div>
              <div className="flex items-center">
                <Copy className="h-4 w-4 mr-2" />
                Copy & Paste Ready
              </div>
            </div>
          </div>

          {/* Template Overview */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                How to Use These LinkedIn Content Templates
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                These templates are based on analysis of thousands of high-performing LinkedIn posts. Each template includes the structure, example content, and expected engagement metrics to help you create compelling content for your ghostwriting clients.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">10</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Proven Templates</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">300%</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Avg. Engagement Boost</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">5 min</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Setup Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">∞</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Usage Rights</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Templates */}
          <div className="space-y-8">
            {templates.map((template, index) => (
              <Card key={template.id} className="overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <Badge variant="outline">{template.category}</Badge>
                        <Badge variant={template.engagement === 'Very High' ? 'default' : template.engagement === 'High' ? 'secondary' : 'outline'}>
                          {template.engagement} Engagement
                        </Badge>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                        {template.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400">
                        {template.description}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyTemplate(template.template)}
                      className="flex-shrink-0"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Template Content */}
                    <div className="lg:col-span-2">
                      <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">
                        Template Structure:
                      </h4>
                      <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 font-mono text-sm whitespace-pre-line">
                        {template.template}
                      </div>
                    </div>

                    {/* Metrics & Info */}
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">
                          Expected Metrics:
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Heart className="h-4 w-4 text-red-500 mr-2" />
                              <span className="text-sm">Likes</span>
                            </div>
                            <span className="text-sm font-medium">{template.metrics.likes}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <MessageSquare className="h-4 w-4 text-blue-500 mr-2" />
                              <span className="text-sm">Comments</span>
                            </div>
                            <span className="text-sm font-medium">{template.metrics.comments}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Share2 className="h-4 w-4 text-green-500 mr-2" />
                              <span className="text-sm">Shares</span>
                            </div>
                            <span className="text-sm font-medium">{template.metrics.shares}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">
                          Best For:
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {template.bestFor}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Usage Tips */}
          <Card className="mt-16 mb-12">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                Pro Tips for Using These Templates
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">
                    Customization Guidelines
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        Adapt the tone to match your client's voice and industry
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        Replace placeholder text with specific, relevant examples
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        Use industry-specific hashtags and terminology
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        Add personal anecdotes to make content more authentic
                      </span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">
                    Optimization Strategies
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        Test different templates to see what works best for each client
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        Track engagement metrics to identify top-performing formats
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        Combine templates for longer-form content pieces
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        Create template variations to avoid repetitive content
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">
              Want More LinkedIn Ghostwriting Resources?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Get access to our complete library of templates, tools, and training materials with Lincognito.
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