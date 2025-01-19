export interface AuthTokenPayload {
    username: string;
    email: string;
    _id: string;
}
export declare const authMiddleware: ({ req }: {
    req: any;
}) => any;
export declare const signToken: ({ username, email, _id }: AuthTokenPayload) => string;
