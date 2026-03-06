import type { NextFunction, Request, Response } from "express";
import { registerSchema } from "./auth.schema.js";
import { loginUser, registerUser } from "./auth.service.js";

export const RegisterController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsed = registerSchema.parse(req.body);
        const result = await registerUser(parsed);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const result = await loginUser(email, password);

    return res.status(200).json({
        message: "Login successful",
        ...result,
    });
};