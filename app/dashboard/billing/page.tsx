'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar';
import { 
  CreditCard, 
  Download, 
  Calendar, 
  TrendingUp, 
  Users, 
  FileText,
  Crown,
  Zap,
  Rocket,
  Building,
  Check,
  X
} from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { toast } from 'sonner';

export default function BillingPage() {
  const { user } = useAuth();
  const [currentPlan] = useState('starter');
  const [isLoading, setIsLoading] = useState(false);

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      priceId: '',
      period: 'forever',
      icon: Zap,
      features: [
        { name: 'Up to 2 client profiles', included: true },
        { name: 'Basic content scheduling', included: true },
        { name: 'Manual engagement tracking', included: true },
        { name: 'Email support', included: true },
        { name: 'Advanced analytics', included: false },
        { name: 'Client collaboration tools', included: false },
        { name: 'Priority support', included: false },
        { name: 'Agency features', included: false },
      ]
    },
    {
      id: 'starter',
      name: 'Starter',
      price: '$10',
      priceId: 'price_starter',
      period: 'per month',
      icon: Crown,
      popular: true,
      features: [
        { name: 'Up to 5 client profiles', included: true },
        { name: 'Advanced content scheduling', included: true },
        { name: 'Automated engagement tracking', included: true },
        { name: 'Client collaboration tools', included: true },
        { name: 'Basic analytics dashboard', included: true },
        { name: 'Priority email support', included: true },
        { name: 'Custom branding', included: false },
        { name: 'Agency features', included: false },
      ]
    },
    {
      id: 'professional',
      name: 'Professional',
      price: '$30',
      priceId: 'price_professional',
      period: 'per month',
      icon: Rocket,
      features: [
        { name: 'Up to 20 client profiles', included: true },
        { name: 'Advanced content scheduling', included: true },
        { name: 'Automated engagement tracking', included: true },
        { name: 'Advanced client collaboration', included: true },
        { name: 'Advanced analytics & reporting', included: true },
        { name: 'Priority support + phone', included: true },
        { name: 'Custom branding', included: true },
        { name: 'Team collaboration (3 members)', included: true },
        { name: 'Agency features', included: false },
      ]
    },
    {
      id: 'agency',
      name: 'Agency',
      price: '$99',
      priceId: 'price_agency',
      period: 'per month',
      icon: Building,
      enterprise: true,
      features: [
        { name: 'Unlimited client profiles', included: true },
        { name: 'Advanced content scheduling', included: true },
        { name: 'Real-time analytics & reporting', included: true },
        { name: 'Multi-tenant architecture', included: true },
        { name: 'Team management (10 members)', included: true },
        { name: 'White-label branding', included: true },
        { name: 'Dedicated account manager', included: true },
        { name: 'API access & webhooks', included: true },
      ]
    }
  ];

  const handleUpgrade = async (planId: string, priceId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          priceId,
          planName: planId.toUpperCase(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        window.location.href = data.url;
      } else {
        toast.error(data.error || 'Failed to create checkout session');
      }
    } catch (error) {
      toast.error('Failed to upgrade plan');
    } finally {
      setIsLoading(false);
    }
  };

  const handleManageBilling = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/stripe/customer-portal', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        window.location.href = data.url;
      } else {
        toast.error(data.error || 'Failed to open billing portal');
      }
    } catch (error) {
      toast.error('Failed to open billing portal');
    } finally {
      setIsLoading(false);
    }
  };
  const usageStats = {
    clients: { current: 3, limit: 5, percentage: 60 },
    posts: { current: 24, limit: 100, percentage: 24 },
    storage: { current: 1.2, limit: 5, percentage: 24 }
  };

  const invoices = [
    {
      id: 'inv_001',
      date: '2025-01-15',
      amount: '$10.00',
      status: 'paid',
      description: 'Starter Plan - January 2025',
      downloadUrl: '#'
    },
    {
      id: 'inv_002',
      date: '2023-12-15',
      amount: '$10.00',
      status: 'paid',
      description: 'Starter Plan - December 2023',
      downloadUrl: '#'
    },
    {
      id: 'inv_003',
      date: '2023-11-15',
      amount: '$10.00',
      status: 'paid',
      description: 'Starter Plan - November 2023',
      downloadUrl: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-8 ml-64 mt-16">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                Billing & Subscription
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-2">
                Manage your subscription, usage, and billing information.
              </p>
            </div>

            {/* Current Plan */}
            <Card className="mb-8 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Crown className="h-5 w-5 mr-2 text-primary" />
                    Current Plan
                  </div>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                      Starter Plan
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      $10 per month • Billed monthly
                    </p>
                    <p className="text-sm text-slate-500 mt-1">
                      Next billing date: February 15, 2025
                    </p>
                  </div>
                  <div className="text-right">
                    <Button className="mb-2">
                      Upgrade Plan
                    </Button>
                    <br />
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleManageBilling}
                      disabled={isLoading}
                    >
                      Manage Billing
                    </Button>
                  </div>
                </div>

                {/* Usage Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">Clients</span>
                      <span className="font-medium">
                        {usageStats.clients.current} / {usageStats.clients.limit}
                      </span>
                    </div>
                    <Progress value={usageStats.clients.percentage} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">Posts this month</span>
                      <span className="font-medium">
                        {usageStats.posts.current} / {usageStats.posts.limit}
                      </span>
                    </div>
                    <Progress value={usageStats.posts.percentage} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">Storage</span>
                      <span className="font-medium">
                        {usageStats.storage.current}GB / {usageStats.storage.limit}GB
                      </span>
                    </div>
                    <Progress value={usageStats.storage.percentage} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Available Plans */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                Available Plans
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {plans.map((plan) => (
                  <Card 
                    key={plan.id} 
                    className={`relative ${
                      plan.id === currentPlan 
                        ? 'border-primary shadow-lg' 
                        : 'border-slate-200 dark:border-slate-700'
                    } ${plan.popular ? 'border-2 border-primary' : ''} ${plan.enterprise ? 'border-2 border-purple-500' : ''}`}
                  >
                    {plan.popular && (
                      <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-sm font-medium rounded-bl-lg">
                        Most Popular
                      </div>
                    )}
                    {plan.enterprise && (
                      <div className="absolute top-0 right-0 bg-purple-600 text-white px-3 py-1 text-sm font-medium rounded-bl-lg">
                        Enterprise
                      </div>
                    )}
                    
                    <CardHeader className="text-center">
                      <div className="flex justify-center mb-4">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-full ${
                          plan.id === currentPlan ? 'bg-primary' : 
                          plan.enterprise ? 'bg-purple-500' : 'bg-primary/10'
                        }`}>
                          <plan.icon className={`h-6 w-6 ${
                            plan.id === currentPlan ? 'text-white' : 
                            plan.enterprise ? 'text-white' : 'text-primary'
                          }`} />
                        </div>
                      </div>
                      <CardTitle className="text-xl">{plan.name}</CardTitle>
                      <div className="mt-2">
                        <span className="text-3xl font-bold">{plan.price}</span>
                        <span className="text-slate-500 ml-1">{plan.period}</span>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm">
                            {feature.included ? (
                              <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                            ) : (
                              <X className="h-4 w-4 text-slate-400 mr-3 flex-shrink-0" />
                            )}
                            <span className={feature.included ? '' : 'text-slate-500'}>
                              {feature.name}
                            </span>
                          </li>
                        ))}
                      </ul>
                      
                      <Button 
                        className={`w-full ${plan.enterprise ? 'bg-purple-600 hover:bg-purple-700' : ''}`}
                        variant={plan.id === currentPlan ? 'outline' : plan.enterprise ? 'default' : 'default'}
                        disabled={plan.id === currentPlan}
                        onClick={() => plan.id !== 'free' && plan.id !== currentPlan && handleUpgrade(plan.id, plan.priceId)}
                      >
                        {plan.id === currentPlan ? 'Current Plan' : 
                         plan.id === 'free' ? 'Downgrade' : 
                         plan.enterprise ? 'Contact Sales' : 'Upgrade'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-8 bg-slate-200 dark:bg-slate-700 rounded flex items-center justify-center">
                      <span className="text-xs font-medium">VISA</span>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-slate-100">
                        •••• •••• •••• 4242
                      </p>
                      <p className="text-sm text-slate-500">
                        Expires 12/2025
                      </p>
                    </div>
                  </div>
                  <Button variant="outline">
                    Update Payment Method
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Billing History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Billing History
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {invoices.map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between py-4 border-b border-slate-200 dark:border-slate-700 last:border-0">
                      <div className="flex items-center space-x-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                          <FileText className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900 dark:text-slate-100">
                            {invoice.description}
                          </p>
                          <p className="text-sm text-slate-500">
                            {new Date(invoice.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-medium text-slate-900 dark:text-slate-100">
                            {invoice.amount}
                          </p>
                          <Badge 
                            variant="outline" 
                            className={invoice.status === 'paid' ? 'text-green-600' : 'text-red-600'}
                          >
                            {invoice.status}
                          </Badge>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}