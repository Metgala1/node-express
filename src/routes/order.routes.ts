import { Router } from "express";
import { createOrderController, getAllOrdersController, getOrderByIdController, getUserOrdersController } from "../controllers/order.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { asyncHandler } from "../middleware/async.middleware.js";
import { requireOwnership } from "../middleware/ownership.middleware.js";

const router = Router()

router.post("/", authenticate, asyncHandler(createOrderController))
router.get("/", authenticate, asyncHandler(getUserOrdersController))
router.get("/:id", authenticate,  asyncHandler(getOrderByIdController))



export default router