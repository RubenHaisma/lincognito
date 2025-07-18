import { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  MessageSquare,
  HelpCircle,
  Users,
  Briefcase
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us | Lincognito Support & Sales',
  description: 'Get in touch with the Lincognito team. Contact our support, sales, or partnerships team for help with LinkedIn ghostwriting platform.',
  keywords: 'contact lincognito, support, sales, help, linkedin ghostwriter support',
};

const contactMethods = [
  {
    icon: Mail,
    title: 'Email Support',
    description: 'Get help from our support team',
    contact: 'support@lincognito.com',
    response: 'Response within 24 hours'
  },
  {
    icon: MessageSquare,
    title: 'Live Chat',
    description: 'Chat with us in real-time',
    contact: 'Available in dashboard',
    response: 'Instant response during business hours'
  },
  {
    icon: Phone,
    title: 'Phone Support',
    description: 'Professional plan customers only',
    contact: '+31 20 123 4567',
    response: 'Mon-Fri, 9AM-5PM CET'
  },
  {
    icon: Briefcase,
    title: 'Sales Inquiries',
    description: 'Questions about plans and pricing',
    contact: 'sales@lincognito.com',
    response: 'Response within 4 hours'
  }
];

const offices = [
  {
    city: 'Amsterdam',
    country: 'Netherlands',
    address: 'Herengracht 182, 1016 BR Amsterdam',
    type: 'Headquarters'
  },
  {
    city: 'Remote',
    country: 'Worldwide',
    address: 'Our team works from 15+ countries',
    type: 'Distributed Team'
  }
];

const faqs = [
  {
    question: 'How quickly can I get started?',
    answer: 'You can sign up and start using Lincognito immediately. Our onboarding process takes less than 5 minutes.'
  },
  {
    question: 'Do you offer training or onboarding?',
    answer: 'Yes! We provide comprehensive documentation, video tutorials, and personalized onboarding for Professional plan customers.'
  },
  {
    question: 'Can I integrate Lincognito with other tools?',
    answer: 'We offer API access and integrations with popular tools like Zapier, Slack, and more.'
  },
  {
    question: 'What if I need to cancel my subscription?',
    answer: 'You can cancel anytime from your dashboard. We also offer a 30-day money-back guarantee.'
  }
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Header onAuthOpen={() => {}} />
      
      <main className="pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Header */}
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl mb-6">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              We're here to help you succeed with LinkedIn ghostwriting. Reach out to our team for support, sales inquiries, or partnerships.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    Send us a Message
                  </CardTitle>
                  <p className="text-slate-600 dark:text-slate-400">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company">Company (Optional)</Label>
                    <Input id="company" placeholder="Your Company" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="sales">Sales Inquiry</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell us how we can help you..."
                      className="min-h-[120px]"
                    />
                  </div>
                  
                  <Button size="lg" className="w-full">
                    Send Message
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Methods */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-6">
                  Contact Methods
                </h3>
                <div className="space-y-4">
                  {contactMethods.map((method, index) => (
                    <Card key={method.title} className="p-4">
                      <div className="flex items-start space-x-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <method.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-slate-900 dark:text-slate-100">
                            {method.title}
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                            {method.description}
                          </p>
                          <p className="text-sm font-medium text-primary">
                            {method.contact}
                          </p>
                          <p className="text-xs text-slate-500">
                            {method.response}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Office Locations */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-6">
                  Our Locations
                </h3>
                <div className="space-y-4">
                  {offices.map((office, index) => (
                    <Card key={office.city} className="p-4">
                      <div className="flex items-start space-x-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900 dark:text-slate-100">
                            {office.city}, {office.country}
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {office.address}
                          </p>
                          <p className="text-xs text-primary font-medium mt-1">
                            {office.type}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Business Hours */}
              <Card className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Clock className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    Business Hours
                  </h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Monday - Friday</span>
                    <span className="text-slate-900 dark:text-slate-100">9:00 AM - 6:00 PM CET</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Saturday</span>
                    <span className="text-slate-900 dark:text-slate-100">10:00 AM - 2:00 PM CET</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Sunday</span>
                    <span className="text-slate-900 dark:text-slate-100">Closed</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Quick answers to common questions
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {faqs.map((faq, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-start space-x-3">
                    <HelpCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                        {faq.question}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Emergency Support */}
          <div className="mt-16 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-8 border border-red-200 dark:border-red-800">
            <div className="text-center">
              <h3 className="text-xl font-bold text-red-900 dark:text-red-100 mb-2">
                Need Urgent Help?
              </h3>
              <p className="text-red-700 dark:text-red-200 mb-4">
                For critical issues affecting your LinkedIn ghostwriting business, contact our emergency support line.
              </p>
              <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-50 dark:border-red-700 dark:text-red-200">
                Emergency Support: +31 20 123 4567
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}