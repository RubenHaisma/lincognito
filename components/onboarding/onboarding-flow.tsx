'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  Users, 
  Target, 
  Rocket,
  Sparkles,
  Calendar,
  BarChart3,
  Shield,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface OnboardingFlowProps {
  isOpen: boolean;
  onComplete: () => void;
  onSkip: () => void;
}

export function OnboardingFlow({ isOpen, onComplete, onSkip }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    role: '',
    experience: '',
    clientCount: '',
    goals: [],
    firstName: '',
    company: '',
    timezone: 'UTC'
  });

  const steps = [
    {
      id: 'welcome',
      title: 'Welcome to Lincognito! 🎉',
      subtitle: 'Let\'s get you set up in just 3 minutes',
      icon: Sparkles,
      component: WelcomeStep
    },
    {
      id: 'role',
      title: 'Tell us about yourself',
      subtitle: 'This helps us personalize your experience',
      icon: Users,
      component: RoleStep
    },
    {
      id: 'goals',
      title: 'What are your goals?',
      subtitle: 'We\'ll customize your dashboard accordingly',
      icon: Target,
      component: GoalsStep
    },
    {
      id: 'setup',
      title: 'Complete your profile',
      subtitle: 'Just a few more details to get started',
      icon: Rocket,
      component: SetupStep
    },
    {
      id: 'success',
      title: 'You\'re all set! 🚀',
      subtitle: 'Welcome to your LinkedIn ghostwriting command center',
      icon: CheckCircle,
      component: SuccessStep
    }
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!isOpen) return null;

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-2xl"
      >
        <Card className="border-0 shadow-2xl bg-white dark:bg-slate-900">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg gradient-text">Lincognito</span>
              </div>
              <Button variant="ghost" size="sm" onClick={onSkip}>
                Skip Setup
              </Button>
            </div>
            
            <Progress value={progress} className="mb-6" />
            
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <steps[currentStep].icon className="h-8 w-8 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {steps[currentStep].title}
              </CardTitle>
              <p className="text-slate-600 dark:text-slate-400">
                {steps[currentStep].subtitle}
              </p>
            </motion.div>
          </CardHeader>
          
          <CardContent className="px-8 pb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <CurrentStepComponent
                  formData={formData}
                  setFormData={setFormData}
                  onNext={nextStep}
                  onPrev={prevStep}
                  isFirst={currentStep === 0}
                  isLast={currentStep === steps.length - 1}
                />
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

function WelcomeStep({ onNext, isFirst }: any) {
  return (
    <div className="text-center space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20"
        >
          <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <h3 className="font-semibold text-slate-900 dark:text-slate-100">Schedule Content</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">Plan posts across multiple clients</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20"
        >
          <BarChart3 className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <h3 className="font-semibold text-slate-900 dark:text-slate-100">Track Performance</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">Monitor engagement and ROI</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20"
        >
          <Zap className="h-8 w-8 text-purple-600 mx-auto mb-2" />
          <h3 className="font-semibold text-slate-900 dark:text-slate-100">Scale Business</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">Manage more clients efficiently</p>
        </motion.div>
      </div>
      
      <Button onClick={onNext} size="lg" className="w-full group">
        Let's Get Started
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Button>
    </div>
  );
}

function RoleStep({ formData, setFormData, onNext, onPrev }: any) {
  const roles = [
    { id: 'freelancer', title: 'Freelance Ghostwriter', desc: 'Independent LinkedIn content creator' },
    { id: 'agency', title: 'Agency Owner', desc: 'Managing a team of ghostwriters' },
    { id: 'consultant', title: 'Marketing Consultant', desc: 'Offering LinkedIn services to clients' },
    { id: 'inhouse', title: 'In-house Marketer', desc: 'Managing executives\' LinkedIn presence' }
  ];

  const experiences = [
    { id: 'beginner', title: 'Just Starting', desc: '0-6 months' },
    { id: 'intermediate', title: 'Growing', desc: '6 months - 2 years' },
    { id: 'experienced', title: 'Experienced', desc: '2+ years' },
    { id: 'expert', title: 'Expert', desc: '5+ years' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-semibold mb-4 block">What best describes your role?</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {roles.map((role) => (
            <motion.div
              key={role.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                onClick={() => setFormData({ ...formData, role: role.id })}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  formData.role === role.id
                    ? 'border-primary bg-primary/5'
                    : 'border-slate-200 dark:border-slate-700 hover:border-primary/50'
                }`}
              >
                <h3 className="font-medium text-slate-900 dark:text-slate-100">{role.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{role.desc}</p>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-base font-semibold mb-4 block">How much LinkedIn ghostwriting experience do you have?</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {experiences.map((exp) => (
            <motion.div
              key={exp.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                onClick={() => setFormData({ ...formData, experience: exp.id })}
                className={`w-full p-3 text-center rounded-lg border-2 transition-all ${
                  formData.experience === exp.id
                    ? 'border-primary bg-primary/5'
                    : 'border-slate-200 dark:border-slate-700 hover:border-primary/50'
                }`}
              >
                <h4 className="font-medium text-sm text-slate-900 dark:text-slate-100">{exp.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">{exp.desc}</p>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex space-x-3">
        <Button variant="outline" onClick={onPrev} className="flex-1">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button 
          onClick={onNext} 
          disabled={!formData.role || !formData.experience}
          className="flex-1"
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function GoalsStep({ formData, setFormData, onNext, onPrev }: any) {
  const goals = [
    { id: 'scale', title: 'Scale My Business', desc: 'Manage more clients efficiently', icon: TrendingUp },
    { id: 'organize', title: 'Get Organized', desc: 'Better content planning and scheduling', icon: Calendar },
    { id: 'analytics', title: 'Track Performance', desc: 'Measure ROI and engagement', icon: BarChart3 },
    { id: 'collaborate', title: 'Client Collaboration', desc: 'Streamline approval workflows', icon: Users },
    { id: 'compliance', title: 'Stay Compliant', desc: 'Follow LinkedIn best practices', icon: Shield },
    { id: 'automate', title: 'Save Time', desc: 'Automate repetitive tasks', icon: Zap }
  ];

  const toggleGoal = (goalId: string) => {
    const currentGoals = formData.goals || [];
    const newGoals = currentGoals.includes(goalId)
      ? currentGoals.filter((g: string) => g !== goalId)
      : [...currentGoals, goalId];
    setFormData({ ...formData, goals: newGoals });
  };

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-semibold mb-4 block">
          What are your main goals? (Select all that apply)
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {goals.map((goal) => (
            <motion.div
              key={goal.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                onClick={() => toggleGoal(goal.id)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  formData.goals?.includes(goal.id)
                    ? 'border-primary bg-primary/5'
                    : 'border-slate-200 dark:border-slate-700 hover:border-primary/50'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <goal.icon className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium text-slate-900 dark:text-slate-100">{goal.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{goal.desc}</p>
                  </div>
                  {formData.goals?.includes(goal.id) && (
                    <CheckCircle className="h-5 w-5 text-primary ml-auto" />
                  )}
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex space-x-3">
        <Button variant="outline" onClick={onPrev} className="flex-1">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button 
          onClick={onNext} 
          disabled={!formData.goals?.length}
          className="flex-1"
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function SetupStep({ formData, setFormData, onNext, onPrev }: any) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            placeholder="Enter your first name"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="company">Company (Optional)</Label>
          <Input
            id="company"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            placeholder="Your company name"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="clientCount">How many LinkedIn clients do you currently manage?</Label>
        <Select value={formData.clientCount} onValueChange={(value) => setFormData({ ...formData, clientCount: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select client count" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Just getting started</SelectItem>
            <SelectItem value="1-2">1-2 clients</SelectItem>
            <SelectItem value="3-5">3-5 clients</SelectItem>
            <SelectItem value="6-10">6-10 clients</SelectItem>
            <SelectItem value="10+">10+ clients</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="timezone">Timezone</Label>
        <Select value={formData.timezone} onValueChange={(value) => setFormData({ ...formData, timezone: value })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="UTC">UTC</SelectItem>
            <SelectItem value="America/New_York">Eastern Time</SelectItem>
            <SelectItem value="America/Chicago">Central Time</SelectItem>
            <SelectItem value="America/Denver">Mountain Time</SelectItem>
            <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
            <SelectItem value="Europe/London">London</SelectItem>
            <SelectItem value="Europe/Paris">Paris</SelectItem>
            <SelectItem value="Europe/Berlin">Berlin</SelectItem>
            <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex space-x-3">
        <Button variant="outline" onClick={onPrev} className="flex-1">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button 
          onClick={onNext} 
          disabled={!formData.firstName}
          className="flex-1"
        >
          Complete Setup
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function SuccessStep({ onNext }: any) {
  return (
    <div className="text-center space-y-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
        className="flex justify-center"
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
      </motion.div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          Welcome to Lincognito! 🎉
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          Your account is ready. Here's what you can do next:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
        <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
          <Users className="h-6 w-6 text-blue-600 mb-2" />
          <h4 className="font-semibold text-slate-900 dark:text-slate-100">Add Your First Client</h4>
          <p className="text-sm text-slate-600 dark:text-slate-400">Set up client profiles and brand guidelines</p>
        </div>
        
        <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
          <Calendar className="h-6 w-6 text-green-600 mb-2" />
          <h4 className="font-semibold text-slate-900 dark:text-slate-100">Schedule Content</h4>
          <p className="text-sm text-slate-600 dark:text-slate-400">Plan your LinkedIn posts in advance</p>
        </div>
      </div>

      <Button onClick={onNext} size="lg" className="w-full group">
        Go to Dashboard
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Button>
    </div>
  );
}