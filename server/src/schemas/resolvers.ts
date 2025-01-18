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
      const user = await User.findById(context.user._id).select('-__v -password').populate('book') as IUser;
      return user;
    },
    users: async (): Promise<IUser[]> => {
      const users = await User.find().select('-__v -password').populate('book').lean();
      return users as IUser[];
    },
    user: async (_: unknown, { username }: { username: string }): Promise<IUser | null> => {
      const user = await User.findOne({ username }).select('-__v -password').populate('book').lean();
      return user as IUser;
    },
  },
  Mutation: {
    login: async (
      _: unknown,
      { email, password }: { email: string; password: string }
    ): Promise<{ token: string; user: IUser }> => {
      const user = await User.findOne({ email });
      if (!user || !(await user.isCorrectPassword(password))) {
        throw new AuthenticationError('Invalid credentials');
      }
      const token = signToken({
        username: user.username,
        email: user.email,
        _id: String(user._id),
      });      
  return { token, user };
    },
    addUser: async (
      _: unknown,
      args: { username: string; email: string; password: string }
    ): Promise<{ token: string; user: IUser }> => {
      const user = await User.create(args);
      const token = signToken({
        username: user.username,
        email: user.email,
        _id: String(user._id),
      });
      return { token, user };
    },
    saveBook: async (
      _: unknown,
      { bookInput }: { bookInput: any },
      context: Context
    ): Promise<IUser | null> => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }
      const updatedUser = await User.findByIdAndUpdate(
        context.user._id,
        { $push: { savedBooks: bookInput } },
        { new: true }
      ).select('-__v -password');
      return updatedUser;
    },
    removeBook: async (
      _: unknown,
      { bookId }: { bookId: string },
      context: Context
    ): Promise<IUser | null> => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }
      const updatedUser = await User.findByIdAndUpdate(
        context.user._id,
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      ).select('-__v -password');
      return updatedUser;
    },
  },
};

export default resolvers;
