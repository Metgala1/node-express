import type { Request, Response, NextFunction } from "express";

import { AppError } from "../errors/app.error.js";

export const requireOwnership = (req:Request, res: Response, next: NextFunction) => {
    const resourceId = Number(req.params.id)

    if(!req.user) {
        throw new AppError("Authentication required", 401)
    }

    if(req.user.role !== "admin" && req.user.userId !== resourceId) {
        throw new AppError("You can only accesss your own resource", 403)
    }

    next()


}