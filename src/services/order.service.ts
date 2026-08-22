import {prisma} from "../config/prisma.js"
import { AppError } from "../errors/app.error.js"
import { OrderStatus } from "../generated/prisma/enums.js"

export const getAllOrders = async () => {
    return prisma.order.findMany({
        include: {
            items: true
        }
    })
}

export const getOrderById = async (id: number , userId: number) => {
    return prisma.order.findFirst({
    where: {
        id: id,
        userId
        
    },

    select: {
        id: true,
        status: true,
        createdAt: true,

        user: {
            select: {
                id: true,
                name: true,
                email: true
            }
        },

        items: {
            select: {
                id: true,
                quantity: true,

                product: {
                    select: {
                        id: true,
                        name: true,
                        price: true
                    }
                }
            }
        }
    }
});
}
export const createOrder = async (
    userId: number,
    items: {
        productId: number;
        quantity: number;
    }[]
) => {

    const productIds = [
        ...new Set(
            items.map(item => item.productId)
        )
    ];

    const products =
        await prisma.product.findMany({
            where: {
                id: {
                    in: productIds
                }
            }
        });

    if (products.length !== productIds.length) {
        throw new AppError(
            "One or more products were not found",
            404
        );
    }

    return prisma.order.create({
        data: {
            userId,

            items: {
                create: items.map(item => ({
                    productId: item.productId,
                    quantity: item.quantity
                }))
            }
        },

        include: {
            items: {
                include: {
                    product: true
                }
            }
        }
    });
};


export const getUserOrders = async (
    userId: number,
    status?: OrderStatus,
    page = 1,
    limit = 10
) => {

    const skip = (page - 1) * limit;

    const where = {
        userId,
        ...(status && { status })
    };

    const [orders, total] =
        await prisma.$transaction([
            prisma.order.findMany({
                where,

                skip,
                take: limit,

                select: {
                    id: true,
                    status: true,
                    createdAt: true,

                    items: {
                        select: {
                            quantity: true,

                            product: {
                                select: {
                                    name: true,
                                    price: true
                                }
                            }
                        }
                    }
                },

                orderBy: {
                    createdAt: "desc"
                }
            }),

            prisma.order.count({
                where
            })
        ]);

    return {
        orders,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        }
    };
};

export const updateOrderStatus = async (
    orderId: number,
    userId: number,
    roles: string[],
    newStatus: OrderStatus
    ) => {
     const order = await prisma.order.findUnique({
        where: {
            id: orderId     
        }
     })

     if(!order) {
        throw new AppError("Order not found", 404)
     }

     const isAdmin = roles.includes("ADMIN");
     const isSeller = roles.includes("SELLER");
     const isCustomer = roles.includes("CUSTOMER")

     if(order.status !== OrderStatus.pending) {
        throw new AppError("Only pending orders can be updated", 400);
     }
    
     if(isAdmin) {
        return prisma.order.update({
            where: {
                id: orderId
            },
            data: {
                status: newStatus
            }
        })
     }

     if (isSeller) {

    if (newStatus !== OrderStatus.completed) {
        throw new AppError(
            "Sellers can only complete orders",
            403
        );
    }

    const sellerOwnsProduct =
        await prisma.order.findFirst({
            where: {
                id: orderId,

                items: {
                    some: {
                        product: {
                            sellerId: userId
                        }
                    }
                }
            }
        });

    if (!sellerOwnsProduct) {
        throw new AppError(
            "You are not authorized to modify this order",
            403
        );
    }
}
     if(isCustomer) {
        if(order.userId !== userId) {
            throw new AppError("You can only modify your own orders", 403)
        }

        if(newStatus !== OrderStatus.cancelled) {
            throw new AppError("Customers can only cancel orders", 403)
        }
     }


     if(!isAdmin && !isCustomer && !isSeller) {
        throw new AppError("Forbidden", 403)

     }
     return prisma.order.update({
        where: {
            id: orderId
        },
        data: {
            status: newStatus
        }
     })
}