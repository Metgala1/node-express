import type {
    Request,
    Response,
    NextFunction
} from "express";

import jwt from "jsonwebtoken";

import { AppError } from "../errors/app.error.js";
import { JWT_SECRET } from "../config/env.js";
import { asyncHandler } from "./async.middleware.js"; // Import your asyncHandler
import { getUserById } from "../services/user.service.js";
export const authenticate = asyncHandler(async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new AppError(
            "Authentication required",
            401
        );
    }

    const [scheme, rawToken] =
        authHeader.split(" ");

    if (scheme !== "Bearer" || !rawToken) {
        throw new AppError(
            "Invalid authorization header",
            401
        );
    }

    const token = rawToken
        .replace(/^["']|["']$/g, "")
        .trim();

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

    const user = await getUserById(userId);

    if (!user) {
        throw new AppError(
            "User not found",
            404
        );
    }

    const roles = user.roles.map(
        userRole => userRole.role.name
    );

    req.user = {
        userId,
        roles
    };

    next();
});