declare const resolvers: {
    Query: {
        me: (_parent: unknown, _args: unknown, context: {
            user?: {
                _id: string;
            };
        }) => Promise<(import("mongoose").Document<unknown, {}, {
            username: string;
            email: string;
            password: string;
            savedBooks: import("mongoose").Types.DocumentArray<{
                bookId: string;
                authors: string[];
                description?: string | null | undefined;
                title?: string | null | undefined;
                image?: string | null | undefined;
                link?: string | null | undefined;
            }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
                bookId: string;
                authors: string[];
                description?: string | null | undefined;
                title?: string | null | undefined;
                image?: string | null | undefined;
                link?: string | null | undefined;
            }> & {
                bookId: string;
                authors: string[];
                description?: string | null | undefined;
                title?: string | null | undefined;
                image?: string | null | undefined;
                link?: string | null | undefined;
            }>;
        }> & {
            username: string;
            email: string;
            password: string;
            savedBooks: import("mongoose").Types.DocumentArray<{
                bookId: string;
                authors: string[];
                description?: string | null | undefined;
                title?: string | null | undefined;
                image?: string | null | undefined;
                link?: string | null | undefined;
            }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
                bookId: string;
                authors: string[];
                description?: string | null | undefined;
                title?: string | null | undefined;
                image?: string | null | undefined;
                link?: string | null | undefined;
            }> & {
                bookId: string;
                authors: string[];
                description?: string | null | undefined;
                title?: string | null | undefined;
                image?: string | null | undefined;
                link?: string | null | undefined;
            }>;
        } & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }) | null>;
    };
    Mutation: {
        login: (_parent: unknown, { email, password }: {
            email: string;
            password: string;
        }) => Promise<{
            token: any;
            user: import("mongoose").Document<unknown, {}, {
                username: string;
                email: string;
                password: string;
                savedBooks: import("mongoose").Types.DocumentArray<{
                    bookId: string;
                    authors: string[];
                    description?: string | null | undefined;
                    title?: string | null | undefined;
                    image?: string | null | undefined;
                    link?: string | null | undefined;
                }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
                    bookId: string;
                    authors: string[];
                    description?: string | null | undefined;
                    title?: string | null | undefined;
                    image?: string | null | undefined;
                    link?: string | null | undefined;
                }> & {
                    bookId: string;
                    authors: string[];
                    description?: string | null | undefined;
                    title?: string | null | undefined;
                    image?: string | null | undefined;
                    link?: string | null | undefined;
                }>;
            }> & {
                username: string;
                email: string;
                password: string;
                savedBooks: import("mongoose").Types.DocumentArray<{
                    bookId: string;
                    authors: string[];
                    description?: string | null | undefined;
                    title?: string | null | undefined;
                    image?: string | null | undefined;
                    link?: string | null | undefined;
                }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
                    bookId: string;
                    authors: string[];
                    description?: string | null | undefined;
                    title?: string | null | undefined;
                    image?: string | null | undefined;
                    link?: string | null | undefined;
                }> & {
                    bookId: string;
                    authors: string[];
                    description?: string | null | undefined;
                    title?: string | null | undefined;
                    image?: string | null | undefined;
                    link?: string | null | undefined;
                }>;
            } & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            };
        }>;
    };
};
export default resolvers;
