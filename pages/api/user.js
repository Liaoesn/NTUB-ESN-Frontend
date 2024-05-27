import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

export default function handler(req, res) {
  const token = req.cookies.token;

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).send('Forbidden');
      }
      res.json(user);
    });
  } else {
    res.status(401).send('Unauthorized');
  }
}
