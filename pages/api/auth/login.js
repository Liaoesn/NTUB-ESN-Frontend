import { OAuth2Client } from 'google-auth-library';

const { GOOGLE_CLIENT_ID, HOST } = process.env;

const client = new OAuth2Client({
  clientId: GOOGLE_CLIENT_ID,
  redirectUri: `${HOST}/api/auth/callback`,
});

export default function handler(req, res) {
  const authorizeUrl = client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
  });
  res.redirect(authorizeUrl);
}
