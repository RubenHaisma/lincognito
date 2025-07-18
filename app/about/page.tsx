import { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Target, 
  Award, 
  Heart,
  Linkedin,
  Twitter,
  Mail,
  MapPin,
  Calendar
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Lincognito - LinkedIn Ghostwriter Platform',
  description: 'Learn about Lincognito\'s mission to empower LinkedIn ghostwriters with professional tools and services. Meet our team and discover our story.',
  keywords: 'about lincognito, linkedin ghostwriter company, team, mission, story',
};

const team = [
  {
    name: 'Sarah Mitchell',
    role: 'CEO & Founder',
    bio: 'Former LinkedIn ghostwriter with 8+ years of experience managing executive profiles.',
    image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
    linkedin: '#',
    twitter: '#'
  },
  {
    name: 'Michael Chen',
    role: 'CTO',
    bio: 'Full-stack developer passionate about building tools that scale creative businesses.',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
    linkedin: '#',
    twitter: '#'
  },
  {
    name: 'Emma Rodriguez',
    role: 'Head of Product',
    bio: 'UX designer and former content strategist focused on user-centered design.',
    image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
    linkedin: '#',
    twitter: '#'
  },
  {
    name: 'David Thompson',
    role: 'Head of Growth',
    bio: 'Marketing expert specializing in B2B SaaS growth and community building.',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
    linkedin: '#',
    twitter: '#'
  }
];

const values = [
  {
    icon: Users,
    title: 'Community First',
    description: 'We build for the ghostwriting community, by the ghostwriting community.'
  },
  {
    icon: Target,
    title: 'Results Driven',
    description: 'Every feature is designed to help ghostwriters achieve better outcomes for their clients.'
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We maintain the highest standards in everything we do, from code to customer service.'
  },
  {
    icon: Heart,
    title: 'Integrity',
    description: 'We operate with transparency, honesty, and respect for our users and their clients.'
  }
];

const milestones = [
  {
    year: '2022',
    title: 'Company Founded',
    description: 'Started as a side project to solve our own LinkedIn ghostwriting challenges.'
  },
  {
    year: '2023',
    title: 'First 100 Users',
    description: 'Reached our first milestone with ghostwriters from 15 countries.'
  },
  {
    year: '2023',
    title: 'Series A Funding',
    description: 'Raised $2M to accelerate product development and team growth.'
  },
  {
    year: '2024',
    title: '1,200+ Users',
    description: 'Now serving over 1,200 professional LinkedIn ghostwriters worldwide.'
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Header onAuthOpen={() => {}} />
      
      <main className="pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Header */}
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl mb-6">
              About <span className="gradient-text">Lincognito</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              We're on a mission to empower LinkedIn ghostwriters with the tools and community they need to build successful, scalable businesses.
            </p>
          </div>

          {/* Story Section */}
          <div className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                  Our Story
                </h2>
                <div className="prose prose-lg dark:prose-invert">
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    Lincognito was born from frustration. As LinkedIn ghostwriters ourselves, we struggled with managing multiple client profiles, tracking engagement, and maintaining compliance with LinkedIn's evolving terms of service.
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    We tried existing tools, but nothing was built specifically for the unique challenges of LinkedIn ghostwriting. So we decided to build our own solution.
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">
                    Today, Lincognito serves over 1,200 professional ghostwriters worldwide, helping them manage 5,000+ client profiles and create content that drives real business results.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800&h=600"
                  alt="Team working together"
                  className="rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                Our Values
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                The principles that guide everything we do
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={value.title} className="text-center border-slate-200 dark:border-slate-700 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <value.icon className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <CardTitle className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                      {value.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 dark:text-slate-400">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Team */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                Meet Our Team
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                The people behind Lincognito
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <Card key={member.name} className="text-center hover:shadow-lg transition-shadow animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-primary font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      {member.bio}
                    </p>
                    <div className="flex justify-center space-x-3">
                      <Button size="sm" variant="outline" className="p-2">
                        <Linkedin className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="p-2">
                        <Twitter className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                Our Journey
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Key milestones in our growth
              </p>
            </div>
            
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-primary/20"></div>
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={milestone.year} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                      <Card className="inline-block">
                        <CardContent className="p-6">
                          <div className="flex items-center mb-2">
                            <Calendar className="h-4 w-4 text-primary mr-2" />
                            <Badge variant="outline">{milestone.year}</Badge>
                          </div>
                          <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                            {milestone.title}
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {milestone.description}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="relative z-10 flex items-center justify-center w-8 h-8 bg-primary rounded-full">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <div className="w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-2xl p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                  Get in Touch
                </h3>
                <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
                  We'd love to hear from you. Whether you have questions, feedback, or just want to say hello.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-primary mr-3" />
                    <span className="text-slate-700 dark:text-slate-300">hello@lincognito.com</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-primary mr-3" />
                    <span className="text-slate-700 dark:text-slate-300">Amsterdam, Netherlands</span>
                  </div>
                </div>
              </div>
              <div className="text-center lg:text-right">
                <Button size="lg" className="mb-4">
                  Contact Us
                </Button>
                <div className="flex justify-center lg:justify-end space-x-4">
                  <Button variant="outline" size="sm">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Twitter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}