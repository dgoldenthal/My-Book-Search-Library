import { IUser } from '../models/User.js';
interface Context {
    user: {
        _id: string;
    } | null;
}
declare const resolvers: {
    Query: {
        me: (_: unknown, __: unknown, context: Context) => Promise<IUser | null>;
        users: () => Promise<IUser[]>;
        user: (_: unknown, { username }: {
            username: string;
        }) => Promise<IUser | null>;
    };
    Mutation: {
        login: (_: unknown, { email, password }: {
            email: string;
            password: string;
        }) => Promise<{
            token: string;
            user: IUser;
        }>;
        addUser: (_: unknown, args: {
            username: string;
            email: string;
            password: string;
        }) => Promise<{
            token: string;
            user: IUser;
        }>;
        saveBook: (_: unknown, { bookInput }: {
            bookInput: any;
        }, context: Context) => Promise<IUser | null>;
        removeBook: (_: unknown, { bookId }: {
            bookId: string;
        }, context: Context) => Promise<IUser | null>;
    };
};
export default resolvers;
