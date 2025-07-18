'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Quote } from 'lucide-react';

export function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'LinkedIn Ghostwriter',
      company: 'Freelance',
      avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
      content: 'Lincognito has completely transformed my ghostwriting business. I can now manage 15 clients effortlessly and my productivity has increased by 300%.',
      rating: 5
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Content Marketing Agency Owner',
      company: 'Growth Content Co.',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
      content: 'The client collaboration features are incredible. My clients love the approval workflow and I love how it keeps everything organized.',
      rating: 5
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      role: 'Social Media Manager',
      company: 'Digital Marketing Pro',
      avatar: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
      content: 'Finally, a platform that understands LinkedIn ghostwriting. The analytics help me prove ROI to my clients every month.',
      rating: 5
    },
    {
      id: 4,
      name: 'David Thompson',
      role: 'LinkedIn Strategist',
      company: 'Executive Presence Agency',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
      content: 'Lincognito keeps me compliant with LinkedIn\'s terms while scaling my business. The peace of mind is invaluable.',
      rating: 5
    },
    {
      id: 5,
      name: 'Lisa Park',
      role: 'Content Creator',
      company: 'B2B Content Solutions',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
      content: 'The scheduling features save me hours every week. I can plan content for all my clients in one place.',
      rating: 5
    },
    {
      id: 6,
      name: 'James Wilson',
      role: 'Marketing Consultant',
      company: 'Wilson Marketing',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
      content: 'The ROI tracking feature helped me justify a 50% rate increase to my clients. Worth every penny.',
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-white dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
            Loved by{' '}
            <span className="gradient-text">1,200+ Ghostwriters</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            See what our community of successful LinkedIn ghostwriters has to say about Lincognito.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.id} 
              className="relative overflow-hidden transition-all duration-300 hover:shadow-lg border-slate-200 dark:border-slate-700 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Quote className="h-6 w-6 text-primary/50 mr-2" />
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                
                <blockquote className="text-slate-700 dark:text-slate-300 mb-6 italic">
                  "{testimonial.content}"
                </blockquote>
                
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-slate-100">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {testimonial.role}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-500">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Social Proof */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center justify-center space-x-8 p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">4.9/5</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Average Rating</div>
            </div>
            <div className="h-8 w-px bg-slate-300 dark:bg-slate-600"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">1,200+</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Happy Users</div>
            </div>
            <div className="h-8 w-px bg-slate-300 dark:bg-slate-600"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">50K+</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Posts Managed</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}