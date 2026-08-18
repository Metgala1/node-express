import type {
    Request,
    Response,
    NextFunction
} from "express";

import { AppError } from "../errors/app.error.js";

export const requireRole = (...requiredRoles: string[]) => {
    return (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        if (!req.user) {
            throw new AppError(
                "Authentication required",
                401
            );
        }

        const hasRole = req.user.roles.some(
            role => requiredRoles.includes(role)
        );

        if (!hasRole) {
            throw new AppError(
                "Forbidden",
                403
            );
        }

        next();
    };
};