import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const authMiddleware = ({ req }) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        const secretKey = process.env.JWT_SECRET || 'defaultsecret';
        try {
            const user = jwt.verify(token, secretKey);
            return { user };
        }
        catch (err) {
            console.error('Invalid token:', err);
        }
    }
    return {};
};
export const signToken = (username, email, _id) => {
    const payload = { username, email, _id };
    return jwt.sign(payload, process.env.JWT_SECRET || 'defaultsecret', { expiresIn: '2h' });
};
