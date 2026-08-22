import { z } from "zod";

export const orderQuerySchema = z.object({
    status: z
        .enum([
            "pending",
            "completed",
            "cancelled"
        ])
        .optional(),

    page: z.coerce
        .number()
        .int()
        .min(1)
        .default(1),

    limit: z.coerce
        .number()
        .int()
        .min(1)
        .max(100)
        .default(10)
});

export const updateOrderStatusSchema = z.object({
    status: z.enum([
        "pending",
        "completed",
        "cancelled"
    ])
})

export const createOrderSchema = z.object({
    items: z.array(
        z.object({
            productId: z
                .number()
                .int()
                .positive(),
            
            quantity: z
                .number()
                .int()
                .positive()
            
        })
    )
    .min(1)
})