import z from "zod";

export const createUserSchema = z.object({
    name: z
            .string()
            .min(2, "Name must be at least 2 characters"),
    
     email: z
            .email("Invalid email address"),
    
    password: z
            .string()
            .min(8, "Password must be at least 8 characters")
    
})

export const updateUserSchema = z.object({
    name: z
        .string()
        .min(1)
        .max(50)
    
})

