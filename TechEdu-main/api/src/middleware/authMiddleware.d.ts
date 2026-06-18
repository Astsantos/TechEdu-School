import { Request, Response, NextFunction } from 'express';
export interface AuthRequest extends Request {
    userId?: number;
}
export declare const autenticarToken: (req: AuthRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=authMiddleware.d.ts.map