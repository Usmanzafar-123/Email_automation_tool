import express from 'express';
import { google } from 'googleapis';
import * as path from 'path';
import * as fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

// Load credentials from the .env file
const GMAIL_CLIENT_ID = process.env.GMAIL_CLIENT_ID!;
const GMAIL_CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET!;
const REDIRECT_URI = process.env.REDIRECT_URI!;

// OAuth 2.0 setup for Gmail
const SCOPES = [
  'https://www.googleapis.com/auth/gmail.readonly', // Read emails
  'https://www.googleapis.com/auth/gmail.send', // Send emails
];

const oAuth2Client = new google.auth.OAuth2(
  GMAIL_CLIENT_ID,
  GMAIL_CLIENT_SECRET,
  REDIRECT_URI
);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

// Route to serve the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Route to serve the privacy policy page
app.get('/privacy-policy', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/privacy-policy.html'));
});

// Route to initiate Gmail OAuth 2.0 flow
app.get('/auth/google', (req, res) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  res.redirect(authUrl);
});

// OAuth2 callback route
app.get('/oauth2callback', async (req, res) => {
  const code = req.query.code as string;

  try {
    // Exchange the authorization code for an access token
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);

    // Save tokens to a file (optional, for persistent session)
    const tokenPath = path.join(__dirname, 'tokens.json');
    fs.writeFileSync(tokenPath, JSON.stringify(tokens));

    res.send('Authentication successful! You can now use the tool.');
  } catch (error) {
    console.error('Error while exchanging code for tokens:', error);
    res.status(500).send('Authentication failed!');
  }
});

// Route to get Gmail profile information after successful OAuth
app.get('/gmail/profile', async (req, res) => {
  try {
    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
    const profile = await gmail.users.getProfile({ userId: 'me' });

    res.json(profile.data);
  } catch (error) {
    console.error('Error fetching Gmail profile:', error);
    res.status(500).send('Failed to retrieve Gmail profile.');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// import express from 'express';
// import path from 'path';

// const app = express();
// const port = 3000;

// // Serve static files from the 'public' folder
// app.use(express.static(path.join(__dirname, 'public')));

// // Route to serve the homepage
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'home.html'));
// });

// // Route to serve the privacy policy page
// app.get('/privacy-policy', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'privacy-policy.html'));
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });

