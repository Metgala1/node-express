import { Router } from "express";
import { createOrderController, getAllOrdersController, getOrderByIdController } from "../controllers/order.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { asyncHandler } from "../middleware/async.middleware.js";

const router = Router()

router.get("/", authenticate, asyncHandler(getAllOrdersController))
router.get("/:id", authenticate, asyncHandler(getOrderByIdController))
router.post("/", authenticate, asyncHandler(createOrderController))


export default router