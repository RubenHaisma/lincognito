'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  MessageSquare, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Send,
  Eye,
  Edit,
  ThumbsUp,
  ThumbsDown,
  MessageCircle
} from 'lucide-react';
import { toast } from 'sonner';

interface CollaborationPanelProps {
  postId: string;
  clientId: string;
  clientName: string;
  clientAvatar?: string;
  currentStatus: 'draft' | 'pending_approval' | 'approved' | 'needs_revision' | 'published';
  onStatusChange: (newStatus: string) => void;
}

interface Comment {
  id: string;
  author: {
    name: string;
    avatar?: string;
    role: 'client' | 'ghostwriter';
  };
  content: string;
  timestamp: string;
  type: 'comment' | 'approval' | 'revision_request';
}

export function ClientCollaborationPanel({ 
  postId, 
  clientId, 
  clientName, 
  clientAvatar, 
  currentStatus, 
  onStatusChange 
}: CollaborationPanelProps) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      author: {
        name: clientName,
        avatar: clientAvatar,
        role: 'client'
      },
      content: 'This looks great! Could you make the tone a bit more conversational? Also, can we add a personal anecdote about overcoming challenges?',
      timestamp: '2025-01-15T10:30:00Z',
      type: 'revision_request'
    },
    {
      id: '2',
      author: {
        name: 'You',
        role: 'ghostwriter'
      },
      content: 'Thanks for the feedback! I\'ll adjust the tone and add a personal story. Should have the revision ready within 2 hours.',
      timestamp: '2025-01-15T10:45:00Z',
      type: 'comment'
    }
  ]);
  
  const [newComment, setNewComment] = useState('');
  const [isSubmittingForApproval, setIsSubmittingForApproval] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft':
        return <Edit className="h-4 w-4 text-slate-500" />;
      case 'pending_approval':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'needs_revision':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'published':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      default:
        return <Clock className="h-4 w-4 text-slate-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-slate-100 text-slate-800';
      case 'pending_approval':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'needs_revision':
        return 'bg-red-100 text-red-800';
      case 'published':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'draft':
        return 'Draft';
      case 'pending_approval':
        return 'Pending Approval';
      case 'approved':
        return 'Approved';
      case 'needs_revision':
        return 'Needs Revision';
      case 'published':
        return 'Published';
      default:
        return 'Unknown';
    }
  };

  const addComment = async () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: {
        name: 'You',
        role: 'ghostwriter'
      },
      content: newComment,
      timestamp: new Date().toISOString(),
      type: 'comment'
    };

    setComments([...comments, comment]);
    setNewComment('');
    toast.success('Comment added');
  };

  const submitForApproval = async () => {
    setIsSubmittingForApproval(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onStatusChange('pending_approval');
      
      const approvalComment: Comment = {
        id: Date.now().toString(),
        author: {
          name: 'You',
          role: 'ghostwriter'
        },
        content: 'Post submitted for client approval.',
        timestamp: new Date().toISOString(),
        type: 'approval'
      };
      
      setComments([...comments, approvalComment]);
      toast.success('Post submitted for approval');
      
    } catch (error) {
      toast.error('Failed to submit for approval');
    } finally {
      setIsSubmittingForApproval(false);
    }
  };

  const requestRevision = async () => {
    const revisionComment: Comment = {
      id: Date.now().toString(),
      author: {
        name: clientName,
        avatar: clientAvatar,
        role: 'client'
      },
      content: 'Revision requested. Please see feedback above.',
      timestamp: new Date().toISOString(),
      type: 'revision_request'
    };
    
    setComments([...comments, revisionComment]);
    onStatusChange('needs_revision');
    toast.success('Revision requested');
  };

  const approvePost = async () => {
    onStatusChange('approved');
    
    const approvalComment: Comment = {
      id: Date.now().toString(),
      author: {
        name: clientName,
        avatar: clientAvatar,
        role: 'client'
      },
      content: 'Post approved! Ready to publish.',
      timestamp: new Date().toISOString(),
      type: 'approval'
    };
    
    setComments([...comments, approvalComment]);
    toast.success('Post approved by client');
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            Client Collaboration
          </CardTitle>
          <div className="flex items-center space-x-2">
            {getStatusIcon(currentStatus)}
            <Badge className={getStatusColor(currentStatus)}>
              {getStatusLabel(currentStatus)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Client Info */}
        <div className="flex items-center space-x-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
          <Avatar className="h-10 w-10">
            <AvatarImage src={clientAvatar} alt={clientName} />
            <AvatarFallback>{clientName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-slate-900 dark:text-slate-100">
              {clientName}
            </div>
            <div className="text-sm text-slate-500">
              Collaborating on this post
            </div>
          </div>
        </div>

        {/* Comments Thread */}
        <div className="space-y-4">
          <h4 className="font-medium text-slate-900 dark:text-slate-100">
            Comments & Feedback
          </h4>
          
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {comments.map((comment) => (
              <div key={comment.id} className="flex space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                  <AvatarFallback className="text-xs">{comment.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      {comment.author.name}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {comment.author.role}
                    </Badge>
                    <span className="text-xs text-slate-500">
                      {new Date(comment.timestamp).toLocaleString()}
                    </span>
                  </div>
                  
                  <div className={`p-3 rounded-lg text-sm ${
                    comment.type === 'revision_request' ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800' :
                    comment.type === 'approval' ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' :
                    'bg-slate-100 dark:bg-slate-700'
                  }`}>
                    <p className="text-slate-700 dark:text-slate-300">
                      {comment.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Add Comment */}
          <div className="space-y-3">
            <Textarea
              placeholder="Add a comment or feedback..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={3}
            />
            <div className="flex justify-end">
              <Button onClick={addComment} disabled={!newComment.trim()}>
                <Send className="h-4 w-4 mr-2" />
                Add Comment
              </Button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-700">
          {currentStatus === 'draft' && (
            <div className="flex space-x-2">
              <Button 
                onClick={submitForApproval} 
                disabled={isSubmittingForApproval}
                className="flex-1"
              >
                {isSubmittingForApproval ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4 mr-2" />
                    Submit for Approval
                  </>
                )}
              </Button>
            </div>
          )}
          
          {currentStatus === 'pending_approval' && (
            <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <Clock className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                Waiting for client approval...
              </p>
            </div>
          )}
          
          {currentStatus === 'needs_revision' && (
            <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
              <p className="text-sm text-red-700 dark:text-red-300">
                Client has requested revisions. Please review the feedback above.
              </p>
            </div>
          )}
          
          {currentStatus === 'approved' && (
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className="text-sm text-green-700 dark:text-green-300">
                Post approved by client! Ready to publish to LinkedIn.
              </p>
            </div>
          )}

          {/* Demo Client Actions (in real app, these would be on client side) */}
          {currentStatus === 'pending_approval' && (
            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                Demo: Client approval actions
              </p>
              <div className="flex space-x-2">
                <Button size="sm" onClick={approvePost} className="flex-1">
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  Approve
                </Button>
                <Button size="sm" variant="outline" onClick={requestRevision} className="flex-1">
                  <ThumbsDown className="h-4 w-4 mr-2" />
                  Request Revision
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}