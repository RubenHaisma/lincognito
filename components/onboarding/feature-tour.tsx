'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  Users, 
  Calendar, 
  BarChart3,
  Settings,
  Lightbulb,
  Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TourStep {
  id: string;
  title: string;
  description: string;
  target: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  icon: any;
}

interface FeatureTourProps {
  isActive: boolean;
  onComplete: () => void;
  onSkip: () => void;
}

export function FeatureTour({ isActive, onComplete, onSkip }: FeatureTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const tourSteps: TourStep[] = [
    {
      id: 'dashboard',
      title: 'Welcome to Your Dashboard! 🎉',
      description: 'This is your command center for managing all LinkedIn ghostwriting activities. Here you can see key metrics, recent activity, and quick actions.',
      target: '.dashboard-main',
      position: 'bottom',
      icon: BarChart3
    },
    {
      id: 'clients',
      title: 'Manage Your Clients',
      description: 'Add and organize client profiles with unique brand guidelines, tone settings, and LinkedIn connections.',
      target: '.sidebar-clients',
      position: 'right',
      icon: Users
    },
    {
      id: 'content',
      title: 'Create & Schedule Content',
      description: 'Use our rich text editor to create engaging LinkedIn posts and schedule them across multiple client profiles.',
      target: '.sidebar-content',
      position: 'right',
      icon: Calendar
    },
    {
      id: 'analytics',
      title: 'Track Performance',
      description: 'Monitor engagement metrics, analyze trends, and generate reports to show ROI to your clients.',
      target: '.sidebar-analytics',
      position: 'right',
      icon: BarChart3
    },
    {
      id: 'quick-actions',
      title: 'Quick Actions',
      description: 'Access frequently used features instantly. Create posts, add clients, or schedule content with one click.',
      target: '.quick-actions',
      position: 'left',
      icon: Target
    },
    {
      id: 'settings',
      title: 'Customize Your Experience',
      description: 'Personalize your dashboard, manage notifications, and configure your account settings.',
      target: '.sidebar-settings',
      position: 'right',
      icon: Settings
    }
  ];

  useEffect(() => {
    if (isActive) {
      setIsVisible(true);
    }
  }, [isActive]);

  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeTour();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeTour = () => {
    setIsVisible(false);
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  const skipTour = () => {
    setIsVisible(false);
    setTimeout(() => {
      onSkip();
    }, 300);
  };

  if (!isActive) return null;

  const currentTourStep = tourSteps[currentStep];

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            style={{ pointerEvents: 'none' }}
          />
        )}
      </AnimatePresence>

      {/* Tour Tooltip */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
          >
            <Card className="border-0 shadow-2xl bg-white dark:bg-slate-900">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <currentTourStep.icon className="h-5 w-5 text-primary" />
                    </div>
                    <Badge variant="outline">
                      {currentStep + 1} of {tourSteps.length}
                    </Badge>
                  </div>
                  <Button variant="ghost" size="sm" onClick={skipTour}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                    {currentTourStep.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {currentTourStep.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-6">
                  <div className="flex space-x-2">
                    {tourSteps.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentStep ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-600'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex space-x-2">
                    {currentStep > 0 && (
                      <Button variant="outline" size="sm" onClick={prevStep}>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back
                      </Button>
                    )}
                    <Button size="sm" onClick={nextStep}>
                      {currentStep === tourSteps.length - 1 ? 'Finish' : 'Next'}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-slate-500">
                      <Lightbulb className="h-4 w-4 mr-2" />
                      Pro Tip
                    </div>
                    <Button variant="ghost" size="sm" onClick={skipTour} className="text-slate-500">
                      Skip Tour
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}