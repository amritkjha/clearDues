import z from "zod/v3";
import email from "zod/v3";

export const registerSchema = z.object({
    body: z.object({
        email: z.string().email("Invalid email address"),
        password: z.string().min(6, "Password must be at least 6 characters long"),
        businessName: z.string().min(2, "Business name is required"),
        defaultCreditDays: z.number().int().positive("Default credit days must be a positive integer"),
    })
})

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;