import type { Request , Response } from "express";
import { createOrder, getAllOrders, getOrderById, getUserOrders } from "../services/order.service.js";
import { AppError } from "../errors/app.error.js";



export const getAllOrdersController = async (req: Request , res: Response) => {
    const orders = await getAllOrders()
    
    res.json(orders)
}

export const createOrderController = async (req: Request, res: Response) => {
    const userId = Number(req.user?.userId)

    const {productId, quantity} = req.body;

    const order = await createOrder(userId, productId, quantity)
    res.json(order)

}

export const getOrderByIdController = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const userId = Number(req.user?.userId)

    const order = await getOrderById(id, userId)
    
    if(!order) {
        throw new AppError("Order not found", 404)
    }
    res.json(order)

}

export const getUserOrdersController = async (req: Request, res: Response) => {
    const userId = Number(req.user?.userId)
    const orders = await getUserOrders(userId)

    res.json(orders)
}
