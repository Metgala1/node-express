import type { Request, Response , NextFunction } from "express";
import { AppError } from "../errors/app.error.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

export const errorHandler = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message
        });
    }

    if (
        err instanceof PrismaClientKnownRequestError
    ) {

        switch (err.code) {

            case "P2002":
                return res.status(409).json({
                    message: "Emial already exist"
                });

            case "P2003":
                return res.status(400).json({
                    message: "Related record does not exist"
                });

            case "P2025":
                return res.status(404).json({
                    message: "Record not found"
                });
        }
    }

    console.error(err);

    return res.status(500).json({
        message: "Internal server error"
    });
};