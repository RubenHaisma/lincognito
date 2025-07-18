import { prisma } from './prisma';

// LinkedIn API Configuration
const LINKEDIN_API_BASE = 'https://api.linkedin.com/v2';

interface LinkedInTokens {
  accessToken: string;
  refreshToken?: string;
  expiresAt: Date;
}

interface LinkedInProfile {
  id: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  headline?: string;
}

interface LinkedInCompany {
  id: string;
  name: string;
  logo?: string;
  followerCount?: number;
}

export class LinkedInAPI {
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  // Get user profile information
  async getProfile(): Promise<LinkedInProfile> {
    const response = await fetch(`${LINKEDIN_API_BASE}/people/~:(id,firstName,lastName,profilePicture(displayImage~:playableStreams),headline)`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`LinkedIn API error: ${response.statusText}`);
    }

    return response.json();
  }

  // Get companies the user can manage
  async getManagedCompanies(): Promise<LinkedInCompany[]> {
    const response = await fetch(`${LINKEDIN_API_BASE}/organizationAcls?q=roleAssignee&role=ADMINISTRATOR&projection=(elements*(organization~(id,name,logo)))`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`LinkedIn API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.elements?.map((element: any) => ({
      id: element.organization.id,
      name: element.organization.name,
      logo: element.organization.logo,
    })) || [];
  }

  // Create a text post
  async createPost(content: string, visibility: 'PUBLIC' | 'CONNECTIONS' = 'PUBLIC', authorId?: string): Promise<any> {
    const postData = {
      author: authorId || `urn:li:person:${await this.getPersonId()}`,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: {
            text: content,
          },
          shareMediaCategory: 'NONE',
        },
      },
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': visibility,
      },
    };

    const response = await fetch(`${LINKEDIN_API_BASE}/ugcPosts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0',
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`LinkedIn API error: ${response.statusText} - ${error}`);
    }

    return response.json();
  }

  // Create a company post
  async createCompanyPost(companyId: string, content: string): Promise<any> {
    const postData = {
      author: `urn:li:organization:${companyId}`,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: {
            text: content,
          },
          shareMediaCategory: 'NONE',
        },
      },
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
      },
    };

    const response = await fetch(`${LINKEDIN_API_BASE}/ugcPosts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0',
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`LinkedIn API error: ${response.statusText} - ${error}`);
    }

    return response.json();
  }

  // Get post analytics
  async getPostAnalytics(postId: string): Promise<any> {
    const response = await fetch(`${LINKEDIN_API_BASE}/socialActions/${postId}`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`LinkedIn API error: ${response.statusText}`);
    }

    return response.json();
  }

  private async getPersonId(): Promise<string> {
    const profile = await this.getProfile();
    return profile.id;
  }

  // Refresh access token
  static async refreshToken(refreshToken: string, clientId: string, clientSecret: string): Promise<LinkedInTokens> {
    const response = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: clientId,
        client_secret: clientSecret,
      }),
    });

    if (!response.ok) {
      throw new Error(`Token refresh failed: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresAt: new Date(Date.now() + data.expires_in * 1000),
    };
  }
}

// Helper function to get LinkedIn API instance for a client
export async function getLinkedInAPIForClient(clientId: string): Promise<LinkedInAPI | null> {
  const client = await prisma.client.findUnique({
    where: { id: clientId },
    include: { linkedinTokens: true },
  });

  if (!client?.linkedinTokens?.accessToken) {
    return null;
  }

  // Check if token needs refresh
  if (client.linkedinTokens.expiresAt < new Date()) {
    if (!client.linkedinTokens.refreshToken) {
      throw new Error('LinkedIn token expired and no refresh token available');
    }

    const newTokens = await LinkedInAPI.refreshToken(
      client.linkedinTokens.refreshToken,
      process.env.LINKEDIN_CLIENT_ID!,
      process.env.LINKEDIN_CLIENT_SECRET!
    );

    // Update tokens in database
    await prisma.linkedInTokens.update({
      where: { clientId },
      data: {
        accessToken: newTokens.accessToken,
        refreshToken: newTokens.refreshToken,
        expiresAt: newTokens.expiresAt,
      },
    });

    return new LinkedInAPI(newTokens.accessToken);
  }

  return new LinkedInAPI(client.linkedinTokens.accessToken);
}