import {prisma} from "../config/prisma.js"
import { AppError } from "../errors/app.error.js"

export const getAllOrders = async () => {
    return prisma.order.findMany()
}

export const createOrder = async (
    userId: number,
    productId: number,
    quantity: number
) => {
    return prisma.$transaction(async (tx) => {

        if (quantity <= 0) {
            throw new AppError(
                "Quantity must be greater than zero",
                400
            );
        }

        const user = await tx.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!user) {
            throw new AppError(
                "User not found",
                404
            );
        }

        const product = await tx.product.findUnique({
            where: {
                id: productId
            }
        });

        if (!product) {
            throw new AppError(
                "Product not found",
                404
            );
        }

        const order = await tx.order.create({
            data: {
                userId
            }
        });

        
        await tx.orderItem.create({
            data: {
                orderId: order.id,
                productId: product.id,
                quantity
            }
        });

        return order;
    });
};