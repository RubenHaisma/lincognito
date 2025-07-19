'use client';

import { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Scale, Shield, AlertTriangle, Users, CreditCard } from 'lucide-react';

const sections = [
  {
    icon: FileText,
    title: 'Acceptance of Terms',
    content: `By accessing and using Lincognito ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.

These Terms of Service ("Terms") govern your use of our LinkedIn ghostwriting platform and related services provided by Lincognito B.V., a company incorporated in the Netherlands.`
  },
  {
    icon: Users,
    title: 'User Accounts and Responsibilities',
    content: `Account Creation:
• You must provide accurate and complete information when creating an account
• You are responsible for maintaining the confidentiality of your account credentials
• You must be at least 18 years old to use our services
• One person or entity may not maintain more than one account

User Responsibilities:
• Use the service in compliance with all applicable laws and regulations
• Respect intellectual property rights of others
• Maintain professional standards when representing clients
• Report any security vulnerabilities or abuse to our support team`
  },
  {
    icon: Shield,
    title: 'LinkedIn Compliance',
    content: `LinkedIn Terms Compliance:
• Users must comply with LinkedIn's User Agreement and Professional Community Policies
• Lincognito provides tools for manual content management only
• Users are responsible for ensuring their activities comply with LinkedIn's terms
• We do not automate posting or engagement on LinkedIn

Prohibited Activities:
• Automated posting or engagement
• Spam or unsolicited messages
• Misrepresentation of identity
• Violation of LinkedIn's terms of service
• Any activity that could harm LinkedIn's platform or users`
  },
  {
    icon: CreditCard,
    title: 'Payment Terms',
    content: `Subscription Plans:
• All fees are charged in Euros (EUR) unless otherwise specified
• Subscription fees are billed monthly or annually in advance
• All payments are processed securely through Stripe
• Prices may change with 30 days' notice to existing subscribers

Refunds and Cancellations:
• 30-day money-back guarantee for new subscribers
• You may cancel your subscription at any time
• Cancellations take effect at the end of the current billing period
• No refunds for partial months or unused features`
  },
  {
    icon: Scale,
    title: 'Intellectual Property',
    content: `Lincognito Platform:
• All rights, title, and interest in the Lincognito platform remain with us
• You receive a limited, non-exclusive license to use our services
• You may not reverse engineer, modify, or create derivative works

User Content:
• You retain ownership of content you create using our platform
• You grant us a license to store, process, and display your content as necessary to provide our services
• You represent that you have the right to use and share any content you upload
• We may remove content that violates these terms or applicable laws`
  },
  {
    icon: AlertTriangle,
    title: 'Limitation of Liability',
    content: `Service Availability:
• We strive for 99.9% uptime but cannot guarantee uninterrupted service
• We are not liable for any damages resulting from service interruptions
• Scheduled maintenance will be announced in advance when possible

Limitation of Damages:
• Our liability is limited to the amount you paid for the service in the 12 months preceding the claim
• We are not liable for indirect, incidental, or consequential damages
• Some jurisdictions do not allow limitation of liability, so these limitations may not apply to you

User Responsibility:
• You are solely responsible for your use of LinkedIn and compliance with their terms
• We are not responsible for actions taken by LinkedIn against your accounts
• You should maintain backups of important content and data`
  }
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Header onAuthOpen={() => {}} />
      
      <main className="pt-32 pb-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl mb-6">
              Terms of <span className="gradient-text">Service</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-4">
              Please read these terms carefully before using our LinkedIn ghostwriting platform.
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Last updated: July 19, 2025 • Effective: July 19, 2025
            </p>
          </div>

          {/* Introduction */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Welcome to Lincognito, a platform designed to help LinkedIn ghostwriters manage multiple client profiles, create content, and track engagement while maintaining compliance with LinkedIn's terms of service.
                </p>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  These Terms of Service ("Terms") constitute a legally binding agreement between you and Lincognito B.V. ("Company," "we," "us," or "our") regarding your use of our platform and services.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Terms Sections */}
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

          {/* Additional Terms */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Data Protection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                  We process your personal data in accordance with our Privacy Policy and applicable data protection laws, including GDPR.
                </p>
                <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                  <li>• Data is encrypted in transit and at rest</li>
                  <li>• Regular security audits and assessments</li>
                  <li>• You have rights to access, correct, and delete your data</li>
                  <li>• Data retention policies are clearly defined</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Service Modifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                  We reserve the right to modify or discontinue our services with appropriate notice to users.
                </p>
                <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                  <li>• 30 days' notice for major changes</li>
                  <li>• Immediate changes for security or legal reasons</li>
                  <li>• Continued use constitutes acceptance of changes</li>
                  <li>• Right to cancel if you disagree with changes</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Governing Law */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                Governing Law and Jurisdiction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  These Terms shall be governed by and construed in accordance with the laws of the Netherlands, without regard to its conflict of law provisions.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Dispute Resolution</h4>
                    <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                      <li>• First attempt: Direct negotiation</li>
                      <li>• Second attempt: Mediation</li>
                      <li>• Final resort: Dutch courts</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Jurisdiction</h4>
                    <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                      <li>• Courts of Amsterdam, Netherlands</li>
                      <li>• English language proceedings</li>
                      <li>• EU consumer rights protected</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="font-medium text-slate-900 dark:text-slate-100 w-32">Company:</span>
                    <span className="text-slate-600 dark:text-slate-400">Lincognito B.V.</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium text-slate-900 dark:text-slate-100 w-32">Email:</span>
                    <span className="text-slate-600 dark:text-slate-400">legal@lincognito.com</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium text-slate-900 dark:text-slate-100 w-32">Address:</span>
                    <span className="text-slate-600 dark:text-slate-400">Herengracht 182, 1016 BR Amsterdam, Netherlands</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium text-slate-900 dark:text-slate-100 w-32">KvK Number:</span>
                    <span className="text-slate-600 dark:text-slate-400">12345678</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Severability */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                Severability and Entire Agreement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that these Terms will otherwise remain in full force and effect.
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                  These Terms, together with our Privacy Policy and any other legal notices published by us on the platform, constitute the entire agreement between you and Lincognito concerning the use of our services.
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