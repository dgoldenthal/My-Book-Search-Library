// resolvers.ts
import { User, Book } from '../models'; // Assuming these models exist
import { AuthenticationError } from 'apollo-server-express';
import { signToken } from '../services/auth';

const resolvers = {
  Query: {
    me: async (_parent, _args, context) => {
      if (context.user) {
        return User.findById(context.user._id).populate('savedBooks');
      }
      throw new AuthenticationError('Not logged in');
    },
  },

  Mutation: {
    login: async (_parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);
      return { token, user };
    },

    addUser: async (_parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    saveBook: async (_parent, { book }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $addToSet: { savedBooks: book } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError('Not logged in');
    },

    removeBook: async (_parent, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError('Not logged in');
    },
  },
};

export default resolvers;