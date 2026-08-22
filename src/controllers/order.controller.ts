import type { Request , Response } from "express";
import { createOrder, getAllOrders, getOrderById, getUserOrders, updateOrderStatus } from "../services/order.service.js";
import { AppError } from "../errors/app.error.js";
import { OrderStatus } from "../generated/prisma/enums.js";
import { prisma } from "../config/prisma.js";



export const getAllOrdersController = async (req: Request , res: Response) => {
    const orders = await getAllOrders()
    
    res.json(orders)
}

export const createOrderController = async (
    req: Request,
    res: Response
) => {

    const userId = Number(
        req.user?.userId
    );

    const order = await createOrder(
        userId,
        req.body.items
    );

    res.status(201).json(order);
};

export const getOrderByIdController = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const userId = Number(req.user?.userId)

    const order = await getOrderById(id, userId)
    
    if(!order) {
        throw new AppError("Order not found", 404)
    }
    res.json(order)

}

export const getUserOrdersController = async (
    req: Request,
    res: Response
) => {

    const userId = Number(req.user?.userId);

    const status =
        typeof req.query.status === "string"
            ? req.query.status as OrderStatus
            : undefined;

    const page =
        Number(req.query.page) || 1;

    const limit =
        Number(req.query.limit) || 10;

    const result = await getUserOrders(
        userId,
        status,
        page,
        limit
    );

    res.json(result);
};

export const updateOrderStatusController = async (
    req: Request,
    res: Response
) => {

    const orderId = Number(req.params.id);

    if (!Number.isInteger(orderId)) {
        throw new AppError(
            "Invalid order ID",
            400
        );
    }

    const { status } = req.body;

    const order = await updateOrderStatus(
        orderId,
        req.user!.userId,
        req.user!.roles,
        status
    );

    res.json(order);
};