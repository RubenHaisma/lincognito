'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Linkedin, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

interface LinkedInConnectionProps {
  clientId: string;
  isConnected: boolean;
  onConnectionChange: () => void;
}

export function LinkedInConnection({ clientId, isConnected, onConnectionChange }: LinkedInConnectionProps) {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/linkedin/auth?clientId=${clientId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const { authUrl } = await response.json();
        window.location.href = authUrl;
      } else {
        throw new Error('Failed to initiate LinkedIn connection');
      }
    } catch (error) {
      toast.error('Failed to connect to LinkedIn');
      setIsConnecting(false);
    }
  };

  return (
    <Card className="border-2 border-dashed border-slate-200 dark:border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Linkedin className="h-5 w-5 mr-2 text-blue-600" />
            LinkedIn Integration
          </div>
          {isConnected ? (
            <Badge className="bg-green-100 text-green-800">
              <CheckCircle className="h-3 w-3 mr-1" />
              Connected
            </Badge>
          ) : (
            <Badge variant="outline">
              <AlertCircle className="h-3 w-3 mr-1" />
              Not Connected
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isConnected ? (
          <div className="space-y-4">
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                This client is connected to LinkedIn. You can now publish posts directly and sync engagement metrics.
              </AlertDescription>
            </Alert>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                Refresh Connection
              </Button>
              <Button variant="outline" size="sm">
                Disconnect
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Connect this client to LinkedIn to enable automatic posting and engagement tracking.
              </AlertDescription>
            </Alert>
            
            <div className="space-y-3">
              <div className="text-sm text-slate-600 dark:text-slate-400">
                <strong>What you can do after connecting:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Publish posts directly to LinkedIn</li>
                  <li>Schedule posts for automatic publishing</li>
                  <li>Sync engagement metrics automatically</li>
                  <li>Manage company pages (if authorized)</li>
                </ul>
              </div>
              
              <Button 
                onClick={handleConnect} 
                disabled={isConnecting}
                className="w-full"
              >
                <Linkedin className="h-4 w-4 mr-2" />
                {isConnecting ? 'Connecting...' : 'Connect to LinkedIn'}
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        )}
        
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="text-xs text-blue-800 dark:text-blue-200">
            <strong>LinkedIn Compliance:</strong> This integration uses LinkedIn's official API and complies with their terms of service. Only authorized content management is performed.
          </div>
        </div>
      </CardContent>
    </Card>
  );
}