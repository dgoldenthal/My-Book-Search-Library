import { Request, Response } from 'express';
export declare const getSingleUser: (req: Request, res: Response) => Promise<void>;
export declare const createUser: (req: Request, res: Response) => Promise<void>;
export declare const loginUser: (req: Request, res: Response) => Promise<void>;
export declare const saveBook: (req: Request, res: Response) => Promise<void>;
export declare const deleteBook: (req: Request, res: Response) => Promise<void>;
