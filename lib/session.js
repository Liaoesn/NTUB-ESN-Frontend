import { withIronSession } from 'next-iron-session';

export function withSession(handler) {
  return withIronSession(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD,
    cookieName: 'next.js/examples/with-iron-session',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  });
}