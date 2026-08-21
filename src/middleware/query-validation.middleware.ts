import type {
    Request,
    Response,
    NextFunction
} from "express";

import { AppError } from "../errors/app.error.js";
import type { ZodType } from "zod";

export const validateQuery = (schema: ZodType) => {
    return (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const result = schema.safeParse(req.query);

        if (!result.success) {
            throw new AppError(
                "Invalid query parameters",
                400
            );
        }

        next();
    };
};