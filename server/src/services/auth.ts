import type { Request } from 'express';
import jwt, { JwtPayload as BaseJwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string;
        username: string;
        email: string;
      };
    }
  }
}

interface JwtPayload extends BaseJwtPayload {
  _id: string;
  username: string;
  email: string;
}

export const authMiddleware = ({ req }: { req: Request }): { user?: JwtPayload } => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    const secretKey = process.env.JWT_SECRET || 'defaultsecret';

    try {
      const user = jwt.verify(token, secretKey) as JwtPayload;
      return { user };
    } catch (err) {
      console.error('Invalid token:', err);
    }
  }

  return {};
};

export const signToken = (username: string, email: string, _id: string): string => {
  const payload: JwtPayload = { username, email, _id };
  return jwt.sign(payload, process.env.JWT_SECRET || 'defaultsecret', { expiresIn: '2h' });
};
