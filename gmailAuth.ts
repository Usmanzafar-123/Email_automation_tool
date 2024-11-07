import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const GMAIL_CLIENT_ID = process.env.GMAIL_CLIENT_ID!;
const GMAIL_CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET!;
const REDIRECT_URI = process.env.REDIRECT_URI!;

// Define the required scopes for Gmail API
const SCOPES = [
  'https://www.googleapis.com/auth/gmail.readonly', // To read emails
  'https://www.googleapis.com/auth/gmail.send', // To send emails
];

// Create OAuth2 client
const oAuth2Client = new google.auth.OAuth2(
  GMAIL_CLIENT_ID,
  GMAIL_CLIENT_SECRET,
  REDIRECT_URI
);

// Generate the authorization URL
export function getGmailAuthUrl(): string {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline', // To get refresh token
    scope: SCOPES,
  });
  return authUrl;
}

// Function to get access token after OAuth callback
export async function getGmailTokens(code: string) {
  try {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    return tokens;
  } catch (error) {
    console.error('Error getting tokens:', error);
    throw new Error('Unable to get Gmail tokens.');
  }
}

// Export OAuth2 client for use in other files
export { oAuth2Client };
