import 'express';

declare global {
    namespace Express {
        interface Request {
            file?: {
                path: string;
                [key: string]: any;
            };
        }
    }
}
