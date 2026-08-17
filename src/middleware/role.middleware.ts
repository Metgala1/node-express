import type {
    Request,
    Response,
    NextFunction
} from "express";

import { AppError } from "../errors/app.error.js";

export const requireRole = (...roles: string[]) => {

    return (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        if (!req.user || !roles.includes(req.user.role)) {
            throw new AppError(
                "Forbidden",
                403
            );
        }

        next();
    };
};