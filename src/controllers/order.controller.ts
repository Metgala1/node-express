import type { Request , Response } from "express";
import { createOrder, getAllOrders } from "../services/order.service.js";



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
