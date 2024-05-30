import { withSession } from '../../../lib/session';

export default withSession(async function handler(req, res) {
  req.session.destroy();
  res.redirect('user/login');
});
