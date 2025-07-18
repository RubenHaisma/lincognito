'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar';
import { DashboardWidgets } from '@/components/dashboard/dashboard-widgets';
import { OnboardingFlow } from '@/components/onboarding/onboarding-flow';
import { FeatureTour } from '@/components/onboarding/feature-tour';
import { Loader2 } from 'lucide-react';

export default function Dashboard() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showTour, setShowTour] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/');
    } else if (user && isFirstTime) {
      // Check if user has completed onboarding
      const hasCompletedOnboarding = localStorage.getItem('onboarding-completed');
      if (!hasCompletedOnboarding) {
        setShowOnboarding(true);
      }
    }
  }, [user, isLoading, router, isFirstTime]);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    localStorage.setItem('onboarding-completed', 'true');
    // Start feature tour after onboarding
    setTimeout(() => {
      setShowTour(true);
    }, 1000);
  };

  const handleOnboardingSkip = () => {
    setShowOnboarding(false);
    localStorage.setItem('onboarding-completed', 'true');
  };

  const handleTourComplete = () => {
    setShowTour(false);
    localStorage.setItem('feature-tour-completed', 'true');
  };

  const handleTourSkip = () => {
    setShowTour(false);
    localStorage.setItem('feature-tour-completed', 'true');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-8 ml-64 dashboard-main">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 animate-fade-in">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                Welcome back, {user.name}! 👋
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-2">
                Here's what's happening with your LinkedIn ghostwriting business today.
              </p>
            </div>
            
            <DashboardWidgets />
          </div>
        </main>
      </div>
      
      {/* Onboarding Flow */}
      <OnboardingFlow
        isOpen={showOnboarding}
        onComplete={handleOnboardingComplete}
        onSkip={handleOnboardingSkip}
      />
      
      {/* Feature Tour */}
      <FeatureTour
        isActive={showTour}
        onComplete={handleTourComplete}
        onSkip={handleTourSkip}
      />
    </div>
  );
}