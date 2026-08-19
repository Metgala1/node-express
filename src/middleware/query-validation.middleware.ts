import type { Request , Response, NextFunction } from "express";

import type { ZodSchema } from "zod/v3";
import { AppError } from "../errors/app.error.js";

export const validateQuery = (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body)
        if(!result.success) {
            throw new AppError("Invalid query parameter", 400)
        }

        req.query = result.data;
        
        next()
    }
}