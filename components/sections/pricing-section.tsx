'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, Zap, Crown, Rocket } from 'lucide-react';

interface PricingSectionProps {
  onGetStarted: () => void;
}

export function PricingSection({ onGetStarted }: PricingSectionProps) {
  const plans = [
    {
      name: 'Free',
      price: '€0',
      period: 'forever',
      description: 'Perfect for trying out Lincognito',
      icon: Zap,
      features: [
        { name: 'Up to 2 client profiles', included: true },
        { name: 'Basic content scheduling', included: true },
        { name: 'Manual engagement tracking', included: true },
        { name: 'Email support', included: true },
        { name: 'Advanced analytics', included: false },
        { name: 'Client collaboration tools', included: false },
        { name: 'Priority support', included: false },
        { name: 'Custom branding', included: false },
      ],
      cta: 'Start Free',
      popular: false
    },
    {
      name: 'Starter',
      price: '€10',
      period: 'per month',
      description: 'Ideal for growing ghostwriters',
      icon: Crown,
      features: [
        { name: 'Up to 5 client profiles', included: true },
        { name: 'Advanced content scheduling', included: true },
        { name: 'Automated engagement tracking', included: true },
        { name: 'Client collaboration tools', included: true },
        { name: 'Basic analytics dashboard', included: true },
        { name: 'Priority email support', included: true },
        { name: 'Custom branding', included: false },
        { name: 'API access', included: false },
      ],
      cta: 'Start Free Trial',
      popular: true
    },
    {
      name: 'Professional',
      price: '€30',
      period: 'per month',
      description: 'For established ghostwriting agencies',
      icon: Rocket,
      features: [
        { name: 'Up to 20 client profiles', included: true },
        { name: 'Advanced content scheduling', included: true },
        { name: 'Automated engagement tracking', included: true },
        { name: 'Advanced client collaboration', included: true },
        { name: 'Advanced analytics & reporting', included: true },
        { name: 'Priority support + phone', included: true },
        { name: 'Custom branding', included: true },
        { name: 'API access', included: true },
      ],
      cta: 'Start Free Trial',
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-slate-50 dark:bg-slate-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
            Simple, Transparent{' '}
            <span className="gradient-text">Pricing</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Choose the perfect plan for your ghostwriting business. All plans include a 14-day free trial.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <Card 
              key={plan.name} 
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl animate-fade-in ${
                plan.popular 
                  ? 'border-2 border-primary shadow-lg scale-105' 
                  : 'border-slate-200 dark:border-slate-700 hover:border-primary/20'
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <div className="flex justify-center mb-4">
                  <div className={`flex h-16 w-16 items-center justify-center rounded-full ${
                    plan.popular ? 'bg-primary' : 'bg-primary/10'
                  }`}>
                    <plan.icon className={`h-8 w-8 ${plan.popular ? 'text-white' : 'text-primary'}`} />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {plan.name}
                </CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-slate-900 dark:text-slate-100">
                    {plan.price}
                  </span>
                  <span className="text-slate-600 dark:text-slate-400 ml-2">
                    {plan.period}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mt-2">
                  {plan.description}
                </p>
              </CardHeader>
              
              <CardContent className="pt-0">
                <Button 
                  className={`w-full mb-6 ${plan.popular ? 'bg-primary' : ''}`}
                  variant={plan.popular ? 'default' : 'outline'}
                  onClick={onGetStarted}
                >
                  {plan.cta}
                </Button>
                
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      {feature.included ? (
                        <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                      ) : (
                        <X className="h-4 w-4 text-slate-400 mr-3 flex-shrink-0" />
                      )}
                      <span className={`text-sm ${
                        feature.included 
                          ? 'text-slate-900 dark:text-slate-100' 
                          : 'text-slate-500 dark:text-slate-400'
                      }`}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Frequently Asked Questions
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Can I change plans anytime?
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Is there a setup fee?
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                No setup fees. Start with our 14-day free trial and only pay when you're ready.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                What payment methods do you accept?
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                We accept all major credit cards through our secure Stripe integration.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Do you offer refunds?
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Yes, we offer a 30-day money-back guarantee if you're not completely satisfied.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}