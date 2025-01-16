// resolvers.ts
import { AuthenticationError } from 'apollo-server-express';
import User, { IUser } from '../models/User.js';
import { signToken } from '../services/auth.js';

interface Context {
  user: { _id: string } | null;
}

const resolvers = {
  Query: {
    me: async (_: unknown, __: unknown, context: Context): Promise<IUser | null> => {
      if (!context.user) {
        throw new AuthenticationError('Not authenticated');
      }
      const user = await User.findById(context.user._id) as IUser;
      return user;
    },
  },
  Mutation: {
    login: async (
      _: unknown,
      { email, password }: { email: string; password: string }
    ): Promise<{ token: string; user: IUser | null }> => {
      const user = await User.findOne({ email }) as IUser;
      if (!user || !(await user.isCorrectPassword(password))) {
        throw new AuthenticationError('Invalid credentials');
      }
      const token = signToken(user.username, user.email, user._id as string);
      return { token, user };
    },
  },
};

export default resolvers;
