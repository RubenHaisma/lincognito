import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export async function verifyToken(request: NextRequest): Promise<string> {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('No token provided');
  }

  const token = authHeader.substring(7);

  try {
    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as { userId: string };
    return decoded.userId;
  } catch (error) {
    throw new Error('Invalid token');
  }
}

export function generateToken(userId: string): string {
  return jwt.sign(
    { userId },
    process.env.NEXTAUTH_SECRET!,
    { expiresIn: '7d' }
  );
}