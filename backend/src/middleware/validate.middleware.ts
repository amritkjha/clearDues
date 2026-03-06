import type { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod/v3";

export const validate = (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            next();
        }
        catch (error) {
            next(error);
        }
    }
}