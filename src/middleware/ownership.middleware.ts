import type { Request, Response, NextFunction } from "express";

import { AppError } from "../errors/app.error.js";

export const requireOwnership = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const resourceId = Number(req.params.id);

    if (!req.user) {
        throw new AppError(
            "Authentication required",
            401
        );
    }

    const isAdmin = req.user.roles.includes("ADMIN");

    const isOwner = req.user.userId === resourceId;

    if (!isAdmin && !isOwner) {
        throw new AppError(
            "You can only access your own resource",
            403
        );
    }

    next();
};