import { Schema } from 'mongoose';
declare const User: import("mongoose").Model<{
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
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
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
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
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
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
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
}>> & import("mongoose").FlatRecord<{
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
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
export default User;
