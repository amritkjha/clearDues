import jwt from "jsonwebtoken";
import { prisma } from "../../config/prisma.js";
import type { RegisterInput } from "./auth.schema.js";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export const registerUser = async (userData: RegisterInput) => {
    const { email, password, businessName, defaultCreditDays } = userData.body;
    
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });
    if (existingUser) {
        const error:any = new Error("User with this email already exists");
        error.status = 400;
        throw error;
    }
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create the user
    const newUser = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            businessName,
            defaultCreditDays,
        },
    });
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET!, { expiresIn: "7d" });

    return {token};
}
export const loginUser = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        const error: any = new Error("Invalid credentials");
        error.statusCode = 400;
        throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        const error: any = new Error("Invalid credentials");
        error.statusCode = 400;
        throw error;
    }

    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET not configured");
    }

    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    return {
        token,
    };
};