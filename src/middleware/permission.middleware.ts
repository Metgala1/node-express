import type {
    Request,
    Response,
    NextFunction
} from "express";

import { AppError } from "../errors/app.error.js";
import { rolePermissions } from "../auth/role-permissions.js";

export const requirePermission = (permission: string) => {
    return (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const roles = req.user?.roles;

        if (!roles) {
            throw new AppError(
                "Authentication required",
                401
            );
        }

        const hasPermission = roles.some((role) => {
            const allowedPermissions =
                rolePermissions[
                    role as keyof typeof rolePermissions
                ];

            return allowedPermissions?.includes(permission) ?? false;
        });

        if (!hasPermission) {
            throw new AppError(
                "Forbidden",
                403
            );
        }

        next();
    };
};