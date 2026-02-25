import type { Response } from "express";
import { errorHandler } from './middleware/error.middleware.js';
import helmet from "helmet";
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

export const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.get('/', (_:any, res:Response) => {
    res.status(200).json({ message: 'Welcome to the ClearDues API!' });
});

app.use(errorHandler);
