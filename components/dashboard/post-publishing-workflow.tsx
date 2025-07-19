'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Send, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  Calendar,
  Eye,
  Edit,
  X
} from 'lucide-react';
import { toast } from 'sonner';

interface PublishingWorkflowProps {
  postId: string;
  postTitle: string;
  postContent: string;
  clientName: string;
  onPublishComplete: () => void;
}

interface PublishingStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  duration?: number;
}

export function PostPublishingWorkflow({ 
  postId, 
  postTitle, 
  postContent, 
  clientName, 
  onPublishComplete 
}: PublishingWorkflowProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishingSteps, setPublishingSteps] = useState<PublishingStep[]>([
    {
      id: 'validation',
      title: 'Content Validation',
      description: 'Checking content for compliance and quality',
      status: 'pending'
    },
    {
      id: 'linkedin-auth',
      title: 'LinkedIn Authentication',
      description: 'Verifying LinkedIn connection',
      status: 'pending'
    },
    {
      id: 'posting',
      title: 'Publishing to LinkedIn',
      description: 'Posting content to LinkedIn profile',
      status: 'pending'
    },
    {
      id: 'verification',
      title: 'Post Verification',
      description: 'Confirming successful publication',
      status: 'pending'
    },
    {
      id: 'analytics',
      title: 'Analytics Setup',
      description: 'Setting up engagement tracking',
      status: 'pending'
    }
  ]);

  const startPublishing = async () => {
    setIsPublishing(true);
    setCurrentStep(0);

    for (let i = 0; i < publishingSteps.length; i++) {
      setCurrentStep(i);
      
      // Update current step to in-progress
      setPublishingSteps(steps => steps.map((step, index) => 
        index === i ? { ...step, status: 'in-progress' } : step
      ));

      try {
        // Simulate step processing
        await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
        
        // Simulate potential failure on LinkedIn auth (10% chance)
        if (i === 1 && Math.random() < 0.1) {
          throw new Error('LinkedIn authentication failed');
        }
        
        // Mark step as completed
        setPublishingSteps(steps => steps.map((step, index) => 
          index === i ? { ...step, status: 'completed' } : step
        ));
        
      } catch (error) {
        // Mark step as failed
        setPublishingSteps(steps => steps.map((step, index) => 
          index === i ? { ...step, status: 'failed' } : step
        ));
        
        setIsPublishing(false);
        toast.error(`Publishing failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        return;
      }
    }

    setIsPublishing(false);
    toast.success('Post published successfully!');
    
    // Wait a moment then close and callback
    setTimeout(() => {
      setIsOpen(false);
      onPublishComplete();
    }, 2000);
  };

  const getStepIcon = (step: PublishingStep, index: number) => {
    if (step.status === 'completed') {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    } else if (step.status === 'failed') {
      return <AlertCircle className="h-5 w-5 text-red-500" />;
    } else if (step.status === 'in-progress') {
      return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />;
    } else if (index <= currentStep) {
      return <Clock className="h-5 w-5 text-slate-400" />;
    } else {
      return <div className="h-5 w-5 rounded-full border-2 border-slate-300" />;
    }
  };

  const completedSteps = publishingSteps.filter(step => step.status === 'completed').length;
  const progress = (completedSteps / publishingSteps.length) * 100;

  return (
    <>
      <Button onClick={() => setIsOpen(true)} className="group">
        <Send className="h-4 w-4 mr-2" />
        Publish Now
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>Publishing Post to LinkedIn</DialogTitle>
              {!isPublishing && (
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Post Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Post Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">Client: {clientName}</Badge>
                    <Badge variant="outline">LinkedIn Post</Badge>
                  </div>
                  
                  {postTitle && (
                    <h3 className="font-medium text-slate-900 dark:text-slate-100">
                      {postTitle}
                    </h3>
                  )}
                  
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                    <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap line-clamp-6">
                      {postContent}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Publishing Progress */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Publishing Progress</CardTitle>
                  <Badge variant={isPublishing ? 'default' : completedSteps === publishingSteps.length ? 'default' : 'outline'}>
                    {isPublishing ? 'Publishing...' : completedSteps === publishingSteps.length ? 'Completed' : 'Ready'}
                  </Badge>
                </div>
                <Progress value={progress} className="mt-2" />
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {publishingSteps.map((step, index) => (
                    <div key={step.id} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 mt-0.5">
                        {getStepIcon(step, index)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className={`font-medium ${
                            step.status === 'completed' ? 'text-green-700 dark:text-green-300' :
                            step.status === 'failed' ? 'text-red-700 dark:text-red-300' :
                            step.status === 'in-progress' ? 'text-blue-700 dark:text-blue-300' :
                            'text-slate-700 dark:text-slate-300'
                          }`}>
                            {step.title}
                          </h4>
                          
                          {step.status === 'in-progress' && (
                            <Badge variant="outline" className="text-xs">
                              Processing...
                            </Badge>
                          )}
                        </div>
                        
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {step.description}
                        </p>
                        
                        {step.status === 'failed' && (
                          <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                            This step failed. Please try again or contact support.
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3">
              {!isPublishing && completedSteps < publishingSteps.length && (
                <>
                  <Button variant="outline" onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={startPublishing}>
                    <Send className="h-4 w-4 mr-2" />
                    Start Publishing
                  </Button>
                </>
              )}
              
              {completedSteps === publishingSteps.length && (
                <Button onClick={() => setIsOpen(false)}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Done
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}