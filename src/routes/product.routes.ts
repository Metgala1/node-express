import { Router } from "express";
import { getProductsController , getProductByIdController, deleteProductController } from "../controllers/product.controller.js";
import { asyncHandler } from "../middleware/async.middleware.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";
import { requirePermission } from "../middleware/permission.middleware.js";


const router = Router()


router.get("/", authenticate, requirePermission("products:read"), asyncHandler(getProductsController))
router.get("/:id",authenticate, requirePermission("products:read"), asyncHandler(getProductByIdController))
router.delete("/:id", authenticate, requirePermission("products:delete"), deleteProductController)

export default router