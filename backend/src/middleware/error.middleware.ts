import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof ZodError){
        return res.status(400).json({ message: "Validation Error", errors: err.issues.map(e => ({ field: e.path.join("."), message: e.message })) });
    }
    if(err.statusCode)return res.status(err.statusCode).json({ message: err.message });
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
}
