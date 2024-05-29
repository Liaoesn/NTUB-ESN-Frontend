import { OAuth2Client } from 'google-auth-library';
import { withSession } from '../../../lib/session';

const { GOOGLE_CLIENT_ID, GOOGLE_SECRET_KEY, HOST } = process.env;

const client = new OAuth2Client({
  clientId: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_SECRET_KEY,
  redirectUri: `${HOST}/api/auth/callback`,
});

export default withSession(async (req, res) => {
  const { code } = req.query;

  try {
    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);

    const userInfo = await client.request({
      url: 'https://www.googleapis.com/oauth2/v3/userinfo'
    });

    const userEmail = userInfo.data.email;
    if (!userEmail.endsWith('@ntub.edu.tw')) {
      return res.status(403).send('Please log in with your school Google account');
    }

    req.session.set('user', userInfo.data);
    await req.session.save();
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(400).send('Error fetching Google user info');
  }
});
