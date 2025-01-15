// resolvers.ts
import User from '../models/User.js';
import { AuthenticationError } from 'apollo-server-express';
import { signToken } from '../services/auth.js';

const resolvers = {
  Query: {
    me: async (_parent: unknown, _args: unknown, context: { user?: { _id: string } }) => {
      if (!context.user) {
        throw new AuthenticationError('Not authenticated');
      }
      return User.findById(context.user._id).populate('savedBooks');
    },
  },
  Mutation: {
    login: async (_parent: unknown, { email, password }: { email: string; password: string }) => {
      const user = await User.findOne({ email }).exec();
      if (!user || !(await (user as any).isCorrectPassword(password))) {
        throw new AuthenticationError('Invalid credentials');
      }
      const token = signToken(user.username, user.email, user._id.toString());
      return { token, user };
    },
  },
};

export default resolvers;
