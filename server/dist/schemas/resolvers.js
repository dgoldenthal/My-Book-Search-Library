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
            const user = await User.findById(context.user._id).select('-__v -password').populate('book');
            return user;
        },
        users: async () => {
            const users = await User.find().select('-__v -password').populate('book').lean();
            return users;
        },
        user: async (_, { username }) => {
            const user = await User.findOne({ username }).select('-__v -password').populate('book').lean();
            return user;
        },
    },
    Mutation: {
        login: async (_, { email, password }) => {
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
        addUser: async (_, args) => {
            const user = await User.create(args);
            const token = signToken({
                username: user.username,
                email: user.email,
                _id: String(user._id),
            });
            return { token, user };
        },
        saveBook: async (_, { bookInput }, context) => {
            if (!context.user) {
                throw new AuthenticationError('You need to be logged in!');
            }
            const updatedUser = await User.findByIdAndUpdate(context.user._id, { $push: { savedBooks: bookInput } }, { new: true }).select('-__v -password');
            return updatedUser;
        },
        removeBook: async (_, { bookId }, context) => {
            if (!context.user) {
                throw new AuthenticationError('You need to be logged in!');
            }
            const updatedUser = await User.findByIdAndUpdate(context.user._id, { $pull: { savedBooks: { bookId } } }, { new: true }).select('-__v -password');
            return updatedUser;
        },
    },
};
export default resolvers;
