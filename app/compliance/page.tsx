'use client';

import { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  CheckCircle, 
  FileText, 
  Lock, 
  Globe,
  AlertTriangle,
  Users,
  Database,
  Eye,
  Scale
} from 'lucide-react';

const complianceStandards = [
  {
    icon: Shield,
    title: 'GDPR Compliance',
    status: 'Certified',
    description: 'Full compliance with European General Data Protection Regulation',
    details: [
      'Data Protection Officer appointed',
      'Privacy by design implementation',
      'Regular compliance audits',
      'User rights management system',
      'Data breach notification procedures'
    ]
  },
  {
    icon: Lock,
    title: 'SOC 2 Type II',
    status: 'Certified',
    description: 'Security, availability, and confidentiality controls audited annually',
    details: [
      'Independent third-party audit',
      'Security controls assessment',
      'Availability monitoring',
      'Confidentiality measures',
      'Processing integrity verification'
    ]
  },
  {
    icon: Globe,
    title: 'ISO 27001',
    status: 'In Progress',
    description: 'International standard for information security management',
    details: [
      'Information security management system',
      'Risk assessment procedures',
      'Security incident management',
      'Business continuity planning',
      'Continuous improvement process'
    ]
  },
  {
    icon: Users,
    title: 'LinkedIn Terms Compliance',
    status: 'Compliant',
    description: 'Adherence to LinkedIn\'s User Agreement and Professional Community Policies',
    details: [
      'Manual content management only',
      'No automated posting or engagement',
      'Respect for LinkedIn\'s rate limits',
      'Authentic representation guidelines',
      'Professional community standards'
    ]
  }
];

const securityMeasures = [
  {
    category: 'Data Encryption',
    measures: [
      'AES-256 encryption at rest',
      'TLS 1.3 for data in transit',
      'End-to-end encryption for sensitive data',
      'Encrypted database backups'
    ]
  },
  {
    category: 'Access Controls',
    measures: [
      'Multi-factor authentication (MFA)',
      'Role-based access control (RBAC)',
      'Principle of least privilege',
      'Regular access reviews'
    ]
  },
  {
    category: 'Infrastructure Security',
    measures: [
      'AWS security best practices',
      'Network segmentation',
      'Intrusion detection systems',
      'Regular security patching'
    ]
  },
  {
    category: 'Monitoring & Logging',
    measures: [
      '24/7 security monitoring',
      'Comprehensive audit logging',
      'Anomaly detection',
      'Incident response procedures'
    ]
  }
];

const dataProtectionRights = [
  {
    right: 'Right to Access',
    description: 'Request a copy of your personal data we hold',
    howTo: 'Contact support or use account settings'
  },
  {
    right: 'Right to Rectification',
    description: 'Correct inaccurate or incomplete personal data',
    howTo: 'Update directly in your account or contact support'
  },
  {
    right: 'Right to Erasure',
    description: 'Request deletion of your personal data',
    howTo: 'Account deletion option or contact support'
  },
  {
    right: 'Right to Portability',
    description: 'Receive your data in a structured, machine-readable format',
    howTo: 'Data export feature in account settings'
  },
  {
    right: 'Right to Restrict Processing',
    description: 'Limit how we process your personal data',
    howTo: 'Contact our Data Protection Officer'
  },
  {
    right: 'Right to Object',
    description: 'Object to processing based on legitimate interests',
    howTo: 'Opt-out options in account settings'
  }
];

export default function CompliancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Header onAuthOpen={() => {}} />
      
      <main className="pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Header */}
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl mb-6">
              Compliance & <span className="gradient-text">Security</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
              Lincognito maintains the highest standards of security, privacy, and compliance to protect your data and ensure LinkedIn terms adherence.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge className="px-4 py-2">GDPR Compliant</Badge>
              <Badge variant="outline" className="px-4 py-2">SOC 2 Certified</Badge>
              <Badge variant="outline" className="px-4 py-2">LinkedIn Compliant</Badge>
              <Badge variant="outline" className="px-4 py-2">ISO 27001 (In Progress)</Badge>
            </div>
          </div>

          {/* Compliance Standards */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                Compliance Standards
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                We adhere to international standards and regulations to ensure your data is protected
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {complianceStandards.map((standard, index) => (
                <Card key={standard.title} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mr-4">
                          <standard.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                            {standard.title}
                          </CardTitle>
                          <p className="text-slate-600 dark:text-slate-400 text-sm">
                            {standard.description}
                          </p>
                        </div>
                      </div>
                      <Badge 
                        variant={standard.status === 'Certified' || standard.status === 'Compliant' ? 'default' : 'secondary'}
                        className={standard.status === 'Certified' || standard.status === 'Compliant' ? 'bg-green-100 text-green-800' : ''}
                      >
                        {standard.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {standard.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Security Measures */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                Security Measures
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Multi-layered security approach to protect your data and platform integrity
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {securityMeasures.map((category, index) => (
                <Card key={category.category} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.measures.map((measure, measureIndex) => (
                        <li key={measureIndex} className="flex items-start text-sm text-slate-600 dark:text-slate-400">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          {measure}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* LinkedIn Compliance */}
          <div className="mb-20">
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold text-slate-900 dark:text-slate-100">
                  <Users className="h-8 w-8 text-primary mr-4" />
                  LinkedIn Terms Compliance
                </CardTitle>
                <p className="text-slate-600 dark:text-slate-400">
                  Lincognito is designed to help you stay compliant with LinkedIn's terms of service
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      What We Do
                    </h4>
                    <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                      <li>• Provide manual content management tools</li>
                      <li>• Enable organized client profile management</li>
                      <li>• Offer engagement tracking capabilities</li>
                      <li>• Support compliance monitoring</li>
                      <li>• Provide educational resources</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center">
                      <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
                      What We Don't Do
                    </h4>
                    <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                      <li>• Automate posting to LinkedIn</li>
                      <li>• Automatically engage with content</li>
                      <li>• Scrape LinkedIn data</li>
                      <li>• Violate rate limits</li>
                      <li>• Misrepresent user identity</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Important:</strong> While Lincognito provides compliant tools, users are ultimately responsible for ensuring their LinkedIn activities adhere to LinkedIn's terms of service and professional community policies.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Data Protection Rights */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                Your Data Protection Rights
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Under GDPR and other privacy laws, you have specific rights regarding your personal data
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dataProtectionRights.map((right, index) => (
                <Card key={right.right} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                      {right.right}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                      {right.description}
                    </p>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      <strong>How to exercise:</strong> {right.howTo}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                Certifications & Audits
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Independent verification of our security and compliance practices
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
                      <Shield className="h-8 w-8 text-green-600" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">SOC 2 Type II</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    Annual audit by independent third-party
                  </p>
                  <Badge variant="outline">Valid until Dec 2024</Badge>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20">
                      <Scale className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">GDPR Compliance</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    Regular compliance assessments
                  </p>
                  <Badge variant="outline">Continuously Monitored</Badge>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/20">
                      <Database className="h-8 w-8 text-purple-600" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Penetration Testing</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    Quarterly security assessments
                  </p>
                  <Badge variant="outline">Last: Jan 2024</Badge>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact DPO */}
          <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-2xl p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                  Data Protection Officer
                </h3>
                <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
                  Have questions about data protection, privacy, or compliance? Contact our Data Protection Officer directly.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Eye className="h-5 w-5 text-primary mr-3" />
                    <span className="text-slate-700 dark:text-slate-300">dpo@lincognito.com</span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-primary mr-3" />
                    <span className="text-slate-700 dark:text-slate-300">Response within 72 hours</span>
                  </div>
                </div>
              </div>
              <div className="text-center lg:text-right">
                <Button size="lg" className="mb-4">
                  Contact DPO
                </Button>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Available in English, Dutch, and German
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}