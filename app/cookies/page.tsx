'use client';

import { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Cookie, Shield, BarChart3, Settings, Eye } from 'lucide-react';

const cookieTypes = [
  {
    icon: Shield,
    title: 'Essential Cookies',
    description: 'Required for basic platform functionality and security',
    required: true,
    examples: [
      'Authentication tokens',
      'Session management',
      'Security features',
      'Load balancing'
    ]
  },
  {
    icon: BarChart3,
    title: 'Analytics Cookies',
    description: 'Help us understand how you use our platform to improve it',
    required: false,
    examples: [
      'Google Analytics',
      'Usage statistics',
      'Performance monitoring',
      'Error tracking'
    ]
  },
  {
    icon: Settings,
    title: 'Preference Cookies',
    description: 'Remember your settings and preferences',
    required: false,
    examples: [
      'Theme preferences',
      'Language settings',
      'Dashboard layout',
      'Notification preferences'
    ]
  },
  {
    icon: Eye,
    title: 'Marketing Cookies',
    description: 'Used to deliver relevant advertisements (with your consent)',
    required: false,
    examples: [
      'Ad targeting',
      'Conversion tracking',
      'Social media pixels',
      'Remarketing tags'
    ]
  }
];

const thirdPartyServices = [
  {
    name: 'Google Analytics',
    purpose: 'Website analytics and user behavior tracking',
    dataCollected: 'Page views, session duration, user interactions',
    retention: '26 months',
    optOut: 'https://tools.google.com/dlpage/gaoptout'
  },
  {
    name: 'Stripe',
    purpose: 'Payment processing and fraud prevention',
    dataCollected: 'Payment information, transaction data',
    retention: '7 years (legal requirement)',
    optOut: 'Required for payment processing'
  },
  {
    name: 'Intercom',
    purpose: 'Customer support and communication',
    dataCollected: 'Support conversations, user identification',
    retention: 'Until account deletion',
    optOut: 'Disable in account settings'
  },
  {
    name: 'Hotjar',
    purpose: 'User experience analysis and heatmaps',
    dataCollected: 'Mouse movements, clicks, scrolling behavior',
    retention: '365 days',
    optOut: 'https://www.hotjar.com/legal/compliance/opt-out'
  }
];

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Header onAuthOpen={() => {}} />
      
      <main className="pt-32 pb-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl mb-6">
              Cookie <span className="gradient-text">Policy</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-4">
              Learn about how we use cookies and similar technologies to improve your experience on Lincognito.
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Last updated: January 15, 2025
            </p>
          </div>

          {/* Introduction */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  This Cookie Policy explains how Lincognito ("we," "our," or "us") uses cookies and similar tracking technologies when you visit our website and use our LinkedIn ghostwriting platform.
                </p>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Cookies are small text files that are stored on your device when you visit a website. They help us provide you with a better experience by remembering your preferences, analyzing how you use our platform, and improving our services.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Cookie Types */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8 text-center">
              Types of Cookies We Use
            </h2>
            
            <div className="space-y-6">
              {cookieTypes.map((type, index) => (
                <Card key={type.title} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center text-lg font-semibold text-slate-900 dark:text-slate-100">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mr-4">
                          <type.icon className="h-5 w-5 text-primary" />
                        </div>
                        {type.title}
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        {type.required ? (
                          <span className="text-sm text-slate-500 dark:text-slate-400">Required</span>
                        ) : (
                          <Switch />
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                      {type.description}
                    </p>
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">Examples:</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {type.examples.map((example, exampleIndex) => (
                          <li key={exampleIndex} className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0"></div>
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Cookie Management */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                Managing Your Cookie Preferences
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  You have several options for managing cookies and your privacy preferences:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Browser Settings</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                      Most browsers allow you to control cookies through their settings.
                    </p>
                    <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                      <li>• Block all cookies</li>
                      <li>• Block third-party cookies</li>
                      <li>• Delete existing cookies</li>
                      <li>• Get notified when cookies are set</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Platform Settings</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                      Manage your preferences directly in your Lincognito account.
                    </p>
                    <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                      <li>• Analytics preferences</li>
                      <li>• Marketing communications</li>
                      <li>• Personalization settings</li>
                      <li>• Data sharing options</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    <strong>Note:</strong> Disabling certain cookies may affect the functionality of our platform. Essential cookies cannot be disabled as they are necessary for the platform to work properly.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Third-Party Services */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8 text-center">
              Third-Party Services
            </h2>
            
            <div className="space-y-4">
              {thirdPartyServices.map((service, index) => (
                <Card key={service.name} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                          {service.name}
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {service.purpose}
                        </p>
                      </div>
                      <div>
                        <h5 className="font-medium text-slate-900 dark:text-slate-100 mb-1 text-sm">
                          Data Collected
                        </h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {service.dataCollected}
                        </p>
                      </div>
                      <div>
                        <h5 className="font-medium text-slate-900 dark:text-slate-100 mb-1 text-sm">
                          Retention
                        </h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {service.retention}
                        </p>
                      </div>
                      <div>
                        <h5 className="font-medium text-slate-900 dark:text-slate-100 mb-1 text-sm">
                          Opt-Out
                        </h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {service.optOut.startsWith('http') ? (
                            <a href={service.optOut} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                              Opt-out link
                            </a>
                          ) : (
                            service.optOut
                          )}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Browser-Specific Instructions */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                Browser-Specific Cookie Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: 'Chrome', link: 'https://support.google.com/chrome/answer/95647' },
                  { name: 'Firefox', link: 'https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop' },
                  { name: 'Safari', link: 'https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac' },
                  { name: 'Edge', link: 'https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09' },
                  { name: 'Opera', link: 'https://help.opera.com/en/latest/web-preferences/' },
                  { name: 'Internet Explorer', link: 'https://support.microsoft.com/en-us/topic/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d' }
                ].map((browser) => (
                  <div key={browser.name} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg text-center">
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                      {browser.name}
                    </h4>
                    <a 
                      href={browser.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-sm"
                    >
                      Cookie Settings Guide
                    </a>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact and Updates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Questions About Cookies?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                  If you have any questions about our use of cookies or this Cookie Policy, please contact us:
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <span className="font-medium text-slate-900 dark:text-slate-100 w-16">Email:</span>
                    <span className="text-slate-600 dark:text-slate-400">privacy@lincognito.com</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium text-slate-900 dark:text-slate-100 w-16">Support:</span>
                    <span className="text-slate-600 dark:text-slate-400">support@lincognito.com</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Policy Updates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                  We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Subscribe to Updates
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}