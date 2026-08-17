import type { Request , Response, NextFunction } from "express";
import { AppError } from "../errors/app.error.js";
import { rolePermissions } from "../auth/role-permissions.js";

export const requirePermission = (permission: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const role = req.user?.role;

        if(!role) {
            throw new AppError("Authentication require", 401)
        }

        const allowedPermissions =
            rolePermissions[role as keyof typeof rolePermissions];
        
        if(!allowedPermissions || !allowedPermissions.includes(permission as never)) {
            throw new AppError ("Forbidden", 403)
        }

        next()

    }
}