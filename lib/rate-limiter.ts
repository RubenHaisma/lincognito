import { NextRequest } from 'next/server';

interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
}

class RateLimiter {
  private requests: Map<string, number[]> = new Map();

  isAllowed(identifier: string, config: RateLimitConfig): boolean {
    const now = Date.now();
    const windowStart = now - config.windowMs;
    
    // Get existing requests for this identifier
    const userRequests = this.requests.get(identifier) || [];
    
    // Filter out requests outside the current window
    const recentRequests = userRequests.filter(timestamp => timestamp > windowStart);
    
    // Check if under the limit
    if (recentRequests.length >= config.maxRequests) {
      return false;
    }
    
    // Add current request
    recentRequests.push(now);
    this.requests.set(identifier, recentRequests);
    
    return true;
  }

  getRemainingRequests(identifier: string, config: RateLimitConfig): number {
    const now = Date.now();
    const windowStart = now - config.windowMs;
    const userRequests = this.requests.get(identifier) || [];
    const recentRequests = userRequests.filter(timestamp => timestamp > windowStart);
    
    return Math.max(0, config.maxRequests - recentRequests.length);
  }

  getResetTime(identifier: string, config: RateLimitConfig): number {
    const userRequests = this.requests.get(identifier) || [];
    if (userRequests.length === 0) return 0;
    
    const oldestRequest = Math.min(...userRequests);
    return oldestRequest + config.windowMs;
  }
}

// Global rate limiter instance
const rateLimiter = new RateLimiter();

// Rate limiting configurations
export const rateLimitConfigs = {
  auth: { windowMs: 15 * 60 * 1000, maxRequests: 5 }, // 5 requests per 15 minutes
  api: { windowMs: 60 * 1000, maxRequests: 100 }, // 100 requests per minute
  email: { windowMs: 60 * 60 * 1000, maxRequests: 10 }, // 10 emails per hour
};

export function checkRateLimit(
  request: NextRequest,
  config: RateLimitConfig,
  identifier?: string
): { allowed: boolean; remaining: number; resetTime: number } {
  // Use IP address as default identifier
  const clientIdentifier = identifier || 
    request.headers.get('x-forwarded-for') || 
    request.headers.get('x-real-ip') || 
    'unknown';

  const allowed = rateLimiter.isAllowed(clientIdentifier, config);
  const remaining = rateLimiter.getRemainingRequests(clientIdentifier, config);
  const resetTime = rateLimiter.getResetTime(clientIdentifier, config);

  return { allowed, remaining, resetTime };
}

export function createRateLimitResponse(remaining: number, resetTime: number) {
  return new Response(
    JSON.stringify({ 
      error: 'Rate limit exceeded',
      retryAfter: Math.ceil((resetTime - Date.now()) / 1000)
    }),
    {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': resetTime.toString(),
        'Retry-After': Math.ceil((resetTime - Date.now()) / 1000).toString(),
      },
    }
  );
}