import type {
    Request,
    Response,
    NextFunction
} from "express";

import jwt from "jsonwebtoken";

import { AppError } from "../errors/app.error.js";
import { JWT_SECRET } from "../config/env.js";
import { findUserById } from "../services/auth.service.js";
import { asyncHandler } from "./async.middleware.js"; // Import your asyncHandler

export const authenticate = asyncHandler(async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log(
        "AUTH HEADER:",
        req.headers.authorization
    );

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new AppError(
            "Authentication required",
            401
        );
    }

    const [scheme, rawToken] = authHeader.split(" ");

    if (scheme !== "Bearer" || !rawToken) {
        throw new AppError(
            "Invalid authorization header",
            401
        );
    }

    const token = rawToken.replace(/^["']|["']$/g, "").trim();

    let payload: string | jwt.JwtPayload;

    try {
        payload = jwt.verify(
            token,
            JWT_SECRET
        );
    } catch {
        throw new AppError(
            "Invalid or expired token",
            401
        );
    }

    if (
        typeof payload !== "object" ||
        payload === null ||
        !("userId" in payload)
    ) {
        throw new AppError(
            "Invalid token",
            401
        );
    }

    const userId = Number(payload.userId);

    if (!Number.isInteger(userId)) {
        throw new AppError(
            "Invalid token",
            401
        );
    }

    const user = await findUserById(userId);

    if (!user) {
        throw new AppError("User not found", 404);
    }

    req.user = {
        userId: userId,
        role: user.role
    };

    next();
});
