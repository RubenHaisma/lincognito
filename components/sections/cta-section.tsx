'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface CTASectionProps {
  onGetStarted: () => void;
}

export function CTASection({ onGetStarted }: CTASectionProps) {
  return (
    <section className="py-24 bg-gradient-to-r from-primary to-blue-600 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl animate-fade-in">
            Ready to Scale Your Ghostwriting Business?
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/90 animate-slide-up">
            Join 1,200+ successful ghostwriters who trust Lincognito to manage their LinkedIn clients. 
            Start your free trial today and see the difference.
          </p>
          
          <div className="mt-10 flex items-center justify-center gap-x-6 animate-slide-up">
            <Button 
              size="lg" 
              onClick={onGetStarted}
              className="bg-white text-primary hover:bg-white/90 group font-semibold"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white/10"
            >
              Schedule Demo
            </Button>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-x-6 text-sm animate-slide-up">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-300 mr-2" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-300 mr-2" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-300 mr-2" />
              <span>Setup in 5 minutes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}