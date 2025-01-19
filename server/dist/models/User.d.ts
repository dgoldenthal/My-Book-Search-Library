import { Document } from 'mongoose';
export interface IUser extends Document {
    _id: string;
    username: string;
    email: string;
    password: string;
    savedBooks: Array<{
        bookId: string;
        authors?: string[];
        description?: string;
        title: string;
        image?: string;
        link?: string;
    }>;
    isCorrectPassword(password: string): Promise<boolean>;
}
declare const _default: import("mongoose").Model<IUser, {}, {}, {}, Document<unknown, {}, IUser> & IUser & Required<{
    _id: string;
}> & {
    __v: number;
}, any>;
export default _default;
