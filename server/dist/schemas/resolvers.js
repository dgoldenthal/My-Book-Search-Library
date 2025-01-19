// resolvers.ts
import { AuthenticationError } from 'apollo-server-express';
import User from '../models/User.js';
import { signToken } from '../services/auth.js';
const resolvers = {
    Query: {
        me: async (_parent, _args, context) => {
            if (context.user) {
                return await User.findById(context.user._id).populate('savedBooks');
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
            const token = signToken({
                _id: user._id.toString(),
                email: user.email,
                username: user.username,
            });
            return { token, user };
        },
        addUser: async (_parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken({
                _id: user._id.toString(),
                email: user.email,
                username: user.username,
            });
            return { token, user };
        },
        saveBook: async (_parent, { book }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(context.user._id, { $addToSet: { savedBooks: book } }, { new: true }).populate('savedBooks');
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        removeBook: async (_parent, { bookId }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(context.user._id, { $pull: { savedBooks: { bookId } } }, { new: true }).populate('savedBooks');
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },
};
export default resolvers;
