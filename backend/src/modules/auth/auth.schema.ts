import z, { email } from "zod";

export const registerSchema = z.object({
    body: z.object({
        email: z.string().email("Invalid email address"),
        password: z.string().min(6, "Password must be at least 6 characters long"),
        businessName: z.string().min(2, "Business name is required"),
        defaultCreditDays: z.number().int().positive("Default credit days must be a positive integer"),
    })
})

export type RegisterInput = z.infer<typeof registerSchema>;