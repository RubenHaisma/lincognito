'use client';

import { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Code, 
  Key, 
  Database, 
  Zap, 
  Shield,
  ArrowRight,
  Copy,
  ExternalLink
} from 'lucide-react';

const endpoints = [
  {
    method: 'GET',
    endpoint: '/api/clients',
    description: 'Retrieve all client profiles',
    auth: true,
    category: 'Clients'
  },
  {
    method: 'POST',
    endpoint: '/api/clients',
    description: 'Create a new client profile',
    auth: true,
    category: 'Clients'
  },
  {
    method: 'GET',
    endpoint: '/api/clients/{id}',
    description: 'Get specific client profile',
    auth: true,
    category: 'Clients'
  },
  {
    method: 'PUT',
    endpoint: '/api/clients/{id}',
    description: 'Update client profile',
    auth: true,
    category: 'Clients'
  },
  {
    method: 'GET',
    endpoint: '/api/posts',
    description: 'Retrieve all posts',
    auth: true,
    category: 'Content'
  },
  {
    method: 'POST',
    endpoint: '/api/posts',
    description: 'Create a new post',
    auth: true,
    category: 'Content'
  },
  {
    method: 'GET',
    endpoint: '/api/analytics',
    description: 'Get engagement analytics',
    auth: true,
    category: 'Analytics'
  },
  {
    method: 'POST',
    endpoint: '/api/analytics/engagement',
    description: 'Record engagement metrics',
    auth: true,
    category: 'Analytics'
  }
];

const codeExamples = {
  javascript: `// Initialize Lincognito API client
const lincognito = new LincognitoAPI({
  apiKey: 'your-api-key',
  baseURL: 'https://api.lincognito.com'
});

// Create a new client profile
const client = await lincognito.clients.create({
  name: 'John Doe',
  company: 'Tech Startup CEO',
  bio: 'Passionate about innovation...',
  tone: 'professional',
  industry: 'technology'
});

// Schedule a new post
const post = await lincognito.posts.create({
  clientId: client.id,
  content: 'Exciting news about our latest product...',
  scheduledFor: '2025-01-15T10:00:00Z',
  hashtags: ['#innovation', '#startup']
});`,
  
  python: `import lincognito

# Initialize client
client = lincognito.Client(api_key='your-api-key')

# Create a new client profile
new_client = client.clients.create({
    'name': 'John Doe',
    'company': 'Tech Startup CEO',
    'bio': 'Passionate about innovation...',
    'tone': 'professional',
    'industry': 'technology'
})

# Schedule a new post
post = client.posts.create({
    'client_id': new_client['id'],
    'content': 'Exciting news about our latest product...',
    'scheduled_for': '2025-01-15T10:00:00Z',
    'hashtags': ['#innovation', '#startup']
})`,

  curl: `# Create a new client profile
curl -X POST https://api.lincognito.com/api/clients \\
  -H "Authorization: Bearer your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "John Doe",
    "company": "Tech Startup CEO",
    "bio": "Passionate about innovation...",
    "tone": "professional",
    "industry": "technology"
  }'

# Schedule a new post
curl -X POST https://api.lincognito.com/api/posts \\
  -H "Authorization: Bearer your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "clientId": "client-id",
    "content": "Exciting news about our latest product...",
    "scheduledFor": "2025-01-15T10:00:00Z",
    "hashtags": ["#innovation", "#startup"]
  }'`
};

export default function APIReferencePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Header onAuthOpen={() => {}} />
      
      <main className="pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Header */}
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl mb-6">
              API <span className="gradient-text">Reference</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
              Integrate Lincognito's LinkedIn ghostwriting functionality into your applications with our powerful RESTful API.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Badge className="px-4 py-2">REST API</Badge>
              <Badge variant="outline" className="px-4 py-2">JSON Responses</Badge>
              <Badge variant="outline" className="px-4 py-2">OAuth 2.0</Badge>
              <Badge variant="outline" className="px-4 py-2">Rate Limited</Badge>
            </div>
          </div>

          {/* Quick Start */}
          <div className="mb-16">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-primary" />
                  Quick Start
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
                      <Key className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">1. Get API Key</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Generate your API key from the dashboard
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
                      <Code className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">2. Make Request</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Use your preferred HTTP client
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
                      <Database className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">3. Handle Response</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Process JSON responses in your app
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* API Endpoints */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8">
              API Endpoints
            </h2>
            
            <div className="space-y-4">
              {endpoints.map((endpoint, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <Badge 
                          variant={endpoint.method === 'GET' ? 'secondary' : 'default'}
                          className={`${
                            endpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
                            endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                            endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}
                        >
                          {endpoint.method}
                        </Badge>
                        <code className="text-sm font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                          {endpoint.endpoint}
                        </code>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{endpoint.category}</Badge>
                        {endpoint.auth && (
                          <Badge variant="outline" className="text-orange-600">
                            <Shield className="h-3 w-3 mr-1" />
                            Auth Required
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400">
                      {endpoint.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Code Examples */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8">
              Code Examples
            </h2>
            
            <Card>
              <CardContent className="p-0">
                <Tabs defaultValue="javascript" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                    <TabsTrigger value="python">Python</TabsTrigger>
                    <TabsTrigger value="curl">cURL</TabsTrigger>
                  </TabsList>
                  
                  {Object.entries(codeExamples).map(([language, code]) => (
                    <TabsContent key={language} value={language} className="p-6">
                      <div className="relative">
                        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
                          <code>{code}</code>
                        </pre>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="absolute top-2 right-2"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Authentication */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8">
              Authentication
            </h2>
            
            <Card>
              <CardContent className="p-6">
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    The Lincognito API uses Bearer token authentication. Include your API key in the Authorization header:
                  </p>
                  
                  <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg text-sm">
                    <code>Authorization: Bearer your-api-key</code>
                  </pre>
                  
                  <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      <strong>Important:</strong> Keep your API key secure and never expose it in client-side code.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Rate Limits */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8">
              Rate Limits
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Free Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary mb-2">100</div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">requests per hour</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Starter Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary mb-2">1,000</div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">requests per hour</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Professional Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary mb-2">10,000</div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">requests per hour</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Support */}
          <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Need API Support?
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
              Our developer support team is here to help you integrate successfully.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                Contact API Support
              </Button>
              <Button size="lg" variant="outline">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Examples
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}