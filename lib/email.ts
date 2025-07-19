import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailTemplate {
  to: string;
  subject: string;
  html: string;
}

// Email Templates
export const emailTemplates = {
  welcome: (name: string, verificationUrl: string) => ({
    subject: 'Welcome to Lincognito - Verify Your Account',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Lincognito</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; padding: 20px 0; border-bottom: 1px solid #eee; }
            .logo { font-size: 24px; font-weight: bold; color: #8b5cf6; }
            .content { padding: 30px 0; }
            .button { display: inline-block; padding: 12px 24px; background: #8b5cf6; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            .footer { text-align: center; padding: 20px 0; border-top: 1px solid #eee; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">🛡️ Lincognito</div>
            </div>
            <div class="content">
              <h1>Welcome to Lincognito, ${name}!</h1>
              <p>Thank you for joining the #1 platform for LinkedIn ghostwriters. You're now part of a community of 1,200+ professional ghostwriters who trust Lincognito to manage their LinkedIn clients.</p>
              
              <p>To get started, please verify your email address by clicking the button below:</p>
              
              <a href="${verificationUrl}" class="button">Verify Email Address</a>
              
              <p>Once verified, you'll be able to:</p>
              <ul>
                <li>Create and manage client profiles</li>
                <li>Schedule LinkedIn content</li>
                <li>Track engagement analytics</li>
                <li>Collaborate with clients</li>
              </ul>
              
              <p>If you have any questions, our support team is here to help at <a href="mailto:support@lincognito.com">support@lincognito.com</a></p>
              
              <p>Best regards,<br>The Lincognito Team</p>
            </div>
            <div class="footer">
              <p>© 2025 Lincognito. All rights reserved.</p>
              <p>If you didn't create this account, you can safely ignore this email.</p>
            </div>
          </div>
        </body>
      </html>
    `
  }),

  passwordReset: (name: string, resetUrl: string) => ({
    subject: 'Reset Your Lincognito Password',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset Your Password</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; padding: 20px 0; border-bottom: 1px solid #eee; }
            .logo { font-size: 24px; font-weight: bold; color: #8b5cf6; }
            .content { padding: 30px 0; }
            .button { display: inline-block; padding: 12px 24px; background: #8b5cf6; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            .footer { text-align: center; padding: 20px 0; border-top: 1px solid #eee; color: #666; font-size: 14px; }
            .warning { background: #fef3cd; border: 1px solid #fecaca; padding: 15px; border-radius: 6px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">🛡️ Lincognito</div>
            </div>
            <div class="content">
              <h1>Reset Your Password</h1>
              <p>Hi ${name},</p>
              <p>We received a request to reset your password for your Lincognito account. Click the button below to create a new password:</p>
              
              <a href="${resetUrl}" class="button">Reset Password</a>
              
              <div class="warning">
                <strong>Security Notice:</strong> This link will expire in 1 hour for your security. If you didn't request this password reset, please ignore this email or contact our support team.
              </div>
              
              <p>If the button doesn't work, copy and paste this link into your browser:</p>
              <p style="word-break: break-all; color: #666;">${resetUrl}</p>
              
              <p>Best regards,<br>The Lincognito Team</p>
            </div>
            <div class="footer">
              <p>© 2025 Lincognito. All rights reserved.</p>
              <p>If you didn't request this password reset, you can safely ignore this email.</p>
            </div>
          </div>
        </body>
      </html>
    `
  }),

  clientAdded: (userName: string, clientName: string) => ({
    subject: 'New Client Added to Your Lincognito Account',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Client Added</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; padding: 20px 0; border-bottom: 1px solid #eee; }
            .logo { font-size: 24px; font-weight: bold; color: #8b5cf6; }
            .content { padding: 30px 0; }
            .button { display: inline-block; padding: 12px 24px; background: #8b5cf6; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            .footer { text-align: center; padding: 20px 0; border-top: 1px solid #eee; color: #666; font-size: 14px; }
            .success { background: #d1fae5; border: 1px solid #10b981; padding: 15px; border-radius: 6px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">🛡️ Lincognito</div>
            </div>
            <div class="content">
              <h1>New Client Added Successfully! 🎉</h1>
              <p>Hi ${userName},</p>
              
              <div class="success">
                <strong>Great news!</strong> You've successfully added <strong>${clientName}</strong> to your Lincognito account.
              </div>
              
              <p>Next steps to get started:</p>
              <ol>
                <li>Connect their LinkedIn account for seamless posting</li>
                <li>Set up their brand guidelines and tone preferences</li>
                <li>Create your first LinkedIn post for them</li>
                <li>Schedule content using our content calendar</li>
              </ol>
              
              <a href="${process.env.NEXTAUTH_URL}/dashboard/clients" class="button">Manage Client</a>
              
              <p>Need help getting started? Check out our <a href="${process.env.NEXTAUTH_URL}/docs">documentation</a> or contact our support team.</p>
              
              <p>Best regards,<br>The Lincognito Team</p>
            </div>
            <div class="footer">
              <p>© 2025 Lincognito. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `
  }),

  postPublished: (userName: string, clientName: string, postContent: string, linkedinUrl?: string) => ({
    subject: `LinkedIn Post Published for ${clientName}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Post Published Successfully</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; padding: 20px 0; border-bottom: 1px solid #eee; }
            .logo { font-size: 24px; font-weight: bold; color: #8b5cf6; }
            .content { padding: 30px 0; }
            .button { display: inline-block; padding: 12px 24px; background: #8b5cf6; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            .footer { text-align: center; padding: 20px 0; border-top: 1px solid #eee; color: #666; font-size: 14px; }
            .post-preview { background: #f8fafc; border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">🛡️ Lincognito</div>
            </div>
            <div class="content">
              <h1>Post Published Successfully! 🚀</h1>
              <p>Hi ${userName},</p>
              <p>Your LinkedIn post for <strong>${clientName}</strong> has been published successfully!</p>
              
              <div class="post-preview">
                <h3>Published Content:</h3>
                <p style="font-style: italic;">${postContent.substring(0, 200)}${postContent.length > 200 ? '...' : ''}</p>
              </div>
              
              ${linkedinUrl ? `<a href="${linkedinUrl}" class="button">View on LinkedIn</a>` : ''}
              
              <p>The post is now live on LinkedIn and we'll start tracking engagement metrics. You can monitor performance in your Lincognito dashboard.</p>
              
              <a href="${process.env.NEXTAUTH_URL}/dashboard/analytics" class="button">View Analytics</a>
              
              <p>Best regards,<br>The Lincognito Team</p>
            </div>
            <div class="footer">
              <p>© 2025 Lincognito. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `
  }),

  weeklyReport: (userName: string, stats: any) => ({
    subject: 'Your Weekly LinkedIn Performance Report',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Weekly Performance Report</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; padding: 20px 0; border-bottom: 1px solid #eee; }
            .logo { font-size: 24px; font-weight: bold; color: #8b5cf6; }
            .content { padding: 30px 0; }
            .button { display: inline-block; padding: 12px 24px; background: #8b5cf6; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            .footer { text-align: center; padding: 20px 0; border-top: 1px solid #eee; color: #666; font-size: 14px; }
            .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 20px; margin: 20px 0; }
            .stat-card { background: #f8fafc; border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px; text-align: center; }
            .stat-number { font-size: 24px; font-weight: bold; color: #8b5cf6; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">🛡️ Lincognito</div>
            </div>
            <div class="content">
              <h1>Your Weekly Performance Report 📊</h1>
              <p>Hi ${userName},</p>
              <p>Here's how your LinkedIn content performed this week:</p>
              
              <div class="stats">
                <div class="stat-card">
                  <div class="stat-number">${stats.postsPublished || 0}</div>
                  <div>Posts Published</div>
                </div>
                <div class="stat-card">
                  <div class="stat-number">${stats.totalEngagement || 0}</div>
                  <div>Total Engagement</div>
                </div>
                <div class="stat-card">
                  <div class="stat-number">${stats.avgEngagementRate || 0}%</div>
                  <div>Avg. Engagement Rate</div>
                </div>
                <div class="stat-card">
                  <div class="stat-number">${stats.newFollowers || 0}</div>
                  <div>New Followers</div>
                </div>
              </div>
              
              <p><strong>Top Performing Post:</strong> ${stats.topPost || 'No posts this week'}</p>
              
              <a href="${process.env.NEXTAUTH_URL}/dashboard/analytics" class="button">View Full Report</a>
              
              <p>Keep up the great work! Consistent posting and engagement are key to LinkedIn success.</p>
              
              <p>Best regards,<br>The Lincognito Team</p>
            </div>
            <div class="footer">
              <p>© 2025 Lincognito. All rights reserved.</p>
              <p><a href="${process.env.NEXTAUTH_URL}/dashboard/settings">Unsubscribe from weekly reports</a></p>
            </div>
          </div>
        </body>
      </html>
    `
  })
};

// Email sending functions
export async function sendWelcomeEmail(to: string, name: string, verificationToken: string) {
  const verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${verificationToken}`;
  const template = emailTemplates.welcome(name, verificationUrl);
  
  try {
    const { data, error } = await resend.emails.send({
      from: 'Lincognito <noreply@lincognito.com>',
      to,
      subject: template.subject,
      html: template.html,
    });

    if (error) {
      console.error('Failed to send welcome email:', error);
      throw new Error('Failed to send welcome email');
    }

    return data;
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
}

export async function sendPasswordResetEmail(to: string, name: string, resetToken: string) {
  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;
  const template = emailTemplates.passwordReset(name, resetUrl);
  
  try {
    const { data, error } = await resend.emails.send({
      from: 'Lincognito <noreply@lincognito.com>',
      to,
      subject: template.subject,
      html: template.html,
    });

    if (error) {
      console.error('Failed to send password reset email:', error);
      throw new Error('Failed to send password reset email');
    }

    return data;
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
}

export async function sendClientAddedEmail(to: string, userName: string, clientName: string) {
  const template = emailTemplates.clientAdded(userName, clientName);
  
  try {
    const { data, error } = await resend.emails.send({
      from: 'Lincognito <noreply@lincognito.com>',
      to,
      subject: template.subject,
      html: template.html,
    });

    if (error) {
      console.error('Failed to send client added email:', error);
      throw new Error('Failed to send client added email');
    }

    return data;
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
}

export async function sendPostPublishedEmail(
  to: string, 
  userName: string, 
  clientName: string, 
  postContent: string, 
  linkedinUrl?: string
) {
  const template = emailTemplates.postPublished(userName, clientName, postContent, linkedinUrl);
  
  try {
    const { data, error } = await resend.emails.send({
      from: 'Lincognito <noreply@lincognito.com>',
      to,
      subject: template.subject,
      html: template.html,
    });

    if (error) {
      console.error('Failed to send post published email:', error);
      throw new Error('Failed to send post published email');
    }

    return data;
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
}

export async function sendWeeklyReport(to: string, userName: string, stats: any) {
  const template = emailTemplates.weeklyReport(userName, stats);
  
  try {
    const { data, error } = await resend.emails.send({
      from: 'Lincognito <noreply@lincognito.com>',
      to,
      subject: template.subject,
      html: template.html,
    });

    if (error) {
      console.error('Failed to send weekly report:', error);
      throw new Error('Failed to send weekly report');
    }

    return data;
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
}

// Generic email sending function
export async function sendEmail({ to, subject, html }: EmailTemplate) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Lincognito <noreply@lincognito.com>',
      to,
      subject,
      html,
    });

    if (error) {
      console.error('Failed to send email:', error);
      throw new Error('Failed to send email');
    }

    return data;
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
}

// Utility function to validate email addresses
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Utility function to generate secure tokens
export function generateSecureToken(): string {
  return require('crypto').randomBytes(32).toString('hex');
}