import { Router } from "express";

import {
     getUsersController,
     getUserByIdController,
    //  createUserController,
     updateUserController,
     deleteUserController
     
    } from "../controllers/user.controller.js";

import { validate } from "../middleware/validate.middleware.js";
import { createUserSchema , updateUserSchema } from "../schemas/user.schema.js";
import { asyncHandler } from "../middleware/async.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { requirePermission } from "../middleware/permission.middleware.js";
import { requireOwnership } from "../middleware/ownership.middleware.js";

const router = Router();


router.get("/", authenticate, requirePermission("users:read"), asyncHandler(getUsersController))
router.get("/:id", authenticate, requirePermission("user:read"), asyncHandler(getUserByIdController))
// router.post("/",validate(createUserSchema), asyncHandler(createUserController))
router.patch("/:id", authenticate, requirePermission("users:update"), requireOwnership, validate(updateUserSchema), asyncHandler(updateUserController))
router.delete("/:id",authenticate, requirePermission("users:delete"), asyncHandler(deleteUserController))

export default router;