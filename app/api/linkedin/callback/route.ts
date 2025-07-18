import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { LinkedInAPI } from '@/lib/linkedin';

const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID!;
const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET!;
const LINKEDIN_REDIRECT_URI = process.env.LINKEDIN_REDIRECT_URI!;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    if (error) {
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/dashboard/clients?error=linkedin_auth_failed`);
    }

    if (!code || !state) {
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/dashboard/clients?error=missing_parameters`);
    }

    // Decode state to get userId and clientId
    const { userId, clientId } = JSON.parse(Buffer.from(state, 'base64').toString());

    // Exchange code for access token
    const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: LINKEDIN_CLIENT_ID,
        client_secret: LINKEDIN_CLIENT_SECRET,
        redirect_uri: LINKEDIN_REDIRECT_URI,
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to exchange code for token');
    }

    const tokenData = await tokenResponse.json();

    // Get LinkedIn profile information
    const linkedinAPI = new LinkedInAPI(tokenData.access_token);
    const profile = await linkedinAPI.getProfile();

    // Store tokens in database
    await prisma.linkedInTokens.upsert({
      where: { clientId },
      update: {
        accessToken: tokenData.access_token,
        refreshToken: tokenData.refresh_token,
        expiresAt: new Date(Date.now() + tokenData.expires_in * 1000),
        scope: tokenData.scope,
      },
      create: {
        clientId,
        accessToken: tokenData.access_token,
        refreshToken: tokenData.refresh_token,
        expiresAt: new Date(Date.now() + tokenData.expires_in * 1000),
        scope: tokenData.scope,
      },
    });

    // Update client with LinkedIn profile information
    await prisma.client.update({
      where: { id: clientId },
      data: {
        linkedinProfileId: profile.id,
        name: profile.firstName && profile.lastName 
          ? `${profile.firstName} ${profile.lastName}` 
          : undefined,
      },
    });

    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/dashboard/clients?success=linkedin_connected`);
  } catch (error) {
    console.error('LinkedIn callback error:', error);
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/dashboard/clients?error=connection_failed`);
  }
}