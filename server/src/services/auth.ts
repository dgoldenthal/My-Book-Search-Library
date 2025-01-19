// auth.ts
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET_KEY || 'defaultSecretKey';
const expiration = '2h';

export interface AuthTokenPayload {
  username: string;
  email: string;
  _id: string;
}

// Middleware to authenticate and attach the user data to the request
export const authMiddleware = ({ req }: { req: any }) => {
  let token = req.headers.authorization || req.query.token;

  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  if (!token) {
    return req;
  }

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration }) as { data: AuthTokenPayload };
    req.user = data;
  } catch (err) {
    console.error('Invalid token:', err);
  }

  return req;
};

// Utility function to sign a token with user data
export const signToken = ({ username, email, _id }: AuthTokenPayload): string => {
  const payload = { username, email, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};
