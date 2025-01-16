import { Document } from 'mongoose';
export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    isCorrectPassword: (password: string) => Promise<boolean>;
}
declare const _default: import("mongoose").Model<IUser, {}, {}, {}, Document<unknown, {}, IUser> & IUser & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
