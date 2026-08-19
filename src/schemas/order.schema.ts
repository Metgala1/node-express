import z from "zod";

export const orderQuerySchema = z.object({
    status: z
        .enum(["pending", "completed", "cancelled"])
        .optional()
})