import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.JWT_SECRET_KEY || 'mysecretsshhhhh';
const expiration = '2h';

export const authMiddleware = ({ req }: { req: any }) => {
  // Get token from query or headers
  let token = req.query.token || req.headers.authorization;

  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  if (!token) {
    return req;
  }

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration }) as any;
    req.user = data;
  } catch {
    console.log('Invalid token');
  }

  return req;
};

export const signToken = ({ username, email, _id }: { username: string; email: string; _id: string }) => {
  const payload = { username, email, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};
