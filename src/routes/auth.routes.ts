import { Router } from "express";
import { registerController, loginController, meController  } from "../controllers/auth.controller.js";
import { asyncHandler } from "../middleware/async.middleware.js";
import { registerSchema , loginSchema } from "../schemas/auth.schema.js";
import { validate } from "../middleware/validate.middleware.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router()

router.get("/me", authenticate, asyncHandler(meController))
router.post("/register", validate(registerSchema), asyncHandler(registerController))
router.post("/login",validate(loginSchema), asyncHandler(loginController))



export default router