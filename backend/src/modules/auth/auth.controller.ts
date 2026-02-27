import type { NextFunction, Request, Response } from "express";
import { registerSchema } from "./auth.schema.js";
import { registerUser } from "./auth.service.js";

export const RegisterController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsed = registerSchema.parse(req.body);
        const result = await registerUser(parsed);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}