import { Router } from "express";
import { createOrderController, getAllOrdersController, getOrderByIdController, getUserOrdersController, updateOrderStatusController } from "../controllers/order.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { asyncHandler } from "../middleware/async.middleware.js";
import { requireOwnership } from "../middleware/ownership.middleware.js";
import { validateQuery } from "../middleware/query-validation.middleware.js";
import { createOrderSchema, orderQuerySchema, updateOrderStatusSchema } from "../schemas/order.schema.js";

const router = Router()

router.post("/", authenticate, validate(createOrderSchema), asyncHandler(createOrderController))
router.get("/", authenticate, validateQuery(orderQuerySchema), asyncHandler(getUserOrdersController))
router.get("/:id", authenticate,  asyncHandler(getOrderByIdController))
router.patch("/:id", authenticate, validate(updateOrderStatusSchema), asyncHandler(updateOrderStatusController))



export default router