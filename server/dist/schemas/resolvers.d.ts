interface Context {
    user: {
        _id: string;
        email: string;
        username: string;
    } | null;
}
interface SaveBookArgs {
    book: {
        bookId: string;
        authors?: string[];
        description?: string;
        title: string;
        image?: string;
        link?: string;
    };
}
interface RemoveBookArgs {
    bookId: string;
}
declare const resolvers: {
    Query: {
        me: (_parent: unknown, _args: unknown, context: Context) => Promise<(import("mongoose").Document<unknown, {}, import("../models/User.js").IUser> & import("../models/User.js").IUser & Required<{
            _id: string;
        }> & {
            __v: number;
        }) | null>;
    };
    Mutation: {
        login: (_parent: unknown, { email, password }: {
            email: string;
            password: string;
        }) => Promise<{
            token: string;
            user: import("mongoose").Document<unknown, {}, import("../models/User.js").IUser> & import("../models/User.js").IUser & Required<{
                _id: string;
            }> & {
                __v: number;
            };
        }>;
        addUser: (_parent: unknown, { username, email, password }: {
            username: string;
            email: string;
            password: string;
        }) => Promise<{
            token: string;
            user: import("mongoose").Document<unknown, {}, import("../models/User.js").IUser> & import("../models/User.js").IUser & Required<{
                _id: string;
            }> & {
                __v: number;
            };
        }>;
        saveBook: (_parent: unknown, { book }: SaveBookArgs, context: Context) => Promise<(import("mongoose").Document<unknown, {}, import("../models/User.js").IUser> & import("../models/User.js").IUser & Required<{
            _id: string;
        }> & {
            __v: number;
        }) | null>;
        removeBook: (_parent: unknown, { bookId }: RemoveBookArgs, context: Context) => Promise<(import("mongoose").Document<unknown, {}, import("../models/User.js").IUser> & import("../models/User.js").IUser & Required<{
            _id: string;
        }> & {
            __v: number;
        }) | null>;
    };
};
export default resolvers;
