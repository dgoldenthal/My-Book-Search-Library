// resolvers.ts
import { AuthenticationError } from 'apollo-server-express';
import User from '../models/User.js';
import { signToken } from '../services/auth.js';
const resolvers = {
    Query: {
        me: async (_, __, context) => {
            if (!context.user) {
                throw new AuthenticationError('Not authenticated');
            }
            const user = await User.findById(context.user._id);
            return user;
        },
    },
    Mutation: {
        login: async (_, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user || !(await user.isCorrectPassword(password))) {
                throw new AuthenticationError('Invalid credentials');
            }
            const token = signToken(user.username, user.email, user._id);
            return { token, user };
        },
    },
};
export default resolvers;
