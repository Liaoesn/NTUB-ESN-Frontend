import { withSession } from '../../../lib/session';

async function handler(req, res) {
  const user = req.session.get('user');

  if (user) {
    res.json(user);
  } else {
    res.status(401).send('Unauthorized');
  }
}

export default withSession(handler);
