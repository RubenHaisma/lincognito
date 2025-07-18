'use client';

import { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Eye, Lock, Database, Users, Globe } from 'lucide-react';

const sections = [
  {
    icon: Eye,
    title: 'Information We Collect',
    content: `We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support. This includes:

• Account information (name, email, password)
• Profile information and client data you choose to store
• Content you create using our platform
• Payment information (processed securely through Stripe)
• Communication records when you contact support`
  },
  {
    icon: Database,
    title: 'How We Use Your Information',
    content: `We use the information we collect to:

• Provide, maintain, and improve our services
• Process transactions and send related information
• Send technical notices and support messages
• Respond to your comments and questions
• Monitor and analyze usage patterns
• Detect and prevent fraud and abuse`
  },
  {
    icon: Users,
    title: 'Information Sharing',
    content: `We do not sell, trade, or otherwise transfer your personal information to third parties except:

• With your explicit consent
• To service providers who assist in our operations
• When required by law or to protect our rights
• In connection with a business transfer or acquisition
• To prevent fraud or security threats`
  },
  {
    icon: Lock,
    title: 'Data Security',
    content: `We implement appropriate security measures to protect your information:

• Encryption of data in transit and at rest
• Regular security audits and assessments
• Access controls and authentication requirements
• Secure data centers with physical security
• Employee training on data protection practices`
  },
  {
    icon: Globe,
    title: 'International Transfers',
    content: `Your information may be transferred to and processed in countries other than your own. We ensure adequate protection through:

• Standard Contractual Clauses (SCCs)
• Adequacy decisions by relevant authorities
• Other appropriate safeguards as required by law
• Regular review of transfer mechanisms`
  },
  {
    icon: Shield,
    title: 'Your Rights',
    content: `Under applicable privacy laws, you have the right to:

• Access your personal information
• Correct inaccurate information
• Delete your information
• Restrict processing of your information
• Data portability
• Object to processing
• Withdraw consent where applicable`
  }
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Header onAuthOpen={() => {}} />
      
      <main className="pt-32 pb-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl mb-6">
              Privacy <span className="gradient-text">Policy</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-4">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Last updated: January 15, 2024
            </p>
          </div>

          {/* Introduction */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  At Lincognito ("we," "our," or "us"), we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our LinkedIn ghostwriting platform and related services.
                </p>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  By using our services, you agree to the collection and use of information in accordance with this policy. We will not use or share your information with anyone except as described in this Privacy Policy.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Sections */}
          <div className="space-y-8 mb-12">
            {sections.map((section, index) => (
              <Card key={section.title} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <CardTitle className="flex items-center text-xl font-semibold text-slate-900 dark:text-slate-100">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mr-4">
                      <section.icon className="h-5 w-5 text-primary" />
                    </div>
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose dark:prose-invert max-w-none">
                    <div className="text-slate-600 dark:text-slate-400 whitespace-pre-line">
                      {section.content}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Data Retention */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                Data Retention
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-slate-600 dark:text-slate-400">
                  We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your personal information, we will securely delete or anonymize it.
                </p>
                <div className="mt-6 space-y-3">
                  <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <span className="font-medium text-slate-900 dark:text-slate-100">Account Data</span>
                    <span className="text-slate-600 dark:text-slate-400">Until account deletion</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <span className="font-medium text-slate-900 dark:text-slate-100">Usage Analytics</span>
                    <span className="text-slate-600 dark:text-slate-400">24 months</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <span className="font-medium text-slate-900 dark:text-slate-100">Support Communications</span>
                    <span className="text-slate-600 dark:text-slate-400">3 years</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <span className="font-medium text-slate-900 dark:text-slate-100">Financial Records</span>
                    <span className="text-slate-600 dark:text-slate-400">7 years (legal requirement)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cookies */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                Cookies and Tracking Technologies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  We use cookies and similar tracking technologies to enhance your experience on our platform. You can control cookie settings through your browser preferences.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Essential Cookies</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Required for basic platform functionality and security.</p>
                  </div>
                  <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Analytics Cookies</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Help us understand how you use our platform to improve it.</p>
                  </div>
                  <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Preference Cookies</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Remember your settings and preferences.</p>
                  </div>
                  <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Marketing Cookies</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Used to deliver relevant advertisements (with your consent).</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                Contact Us About Privacy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="font-medium text-slate-900 dark:text-slate-100 w-24">Email:</span>
                    <span className="text-slate-600 dark:text-slate-400">privacy@lincognito.com</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium text-slate-900 dark:text-slate-100 w-24">Address:</span>
                    <span className="text-slate-600 dark:text-slate-400">Herengracht 182, 1016 BR Amsterdam, Netherlands</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium text-slate-900 dark:text-slate-100 w-24">DPO:</span>
                    <span className="text-slate-600 dark:text-slate-400">dpo@lincognito.com</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Updates */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                Changes to This Privacy Policy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-slate-600 dark:text-slate-400">
                  We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}