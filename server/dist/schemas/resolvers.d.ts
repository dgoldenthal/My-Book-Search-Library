import { IUser } from '../models/User.js';
interface Context {
    user: {
        _id: string;
    } | null;
}
declare const resolvers: {
    Query: {
        me: (_: unknown, __: unknown, context: Context) => Promise<IUser | null>;
    };
    Mutation: {
        login: (_: unknown, { email, password }: {
            email: string;
            password: string;
        }) => Promise<{
            token: string;
            user: IUser | null;
        }>;
    };
};
export default resolvers;
