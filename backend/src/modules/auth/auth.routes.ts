import { Router } from "express";
import { validate } from "../../middleware/validate.middleware.js";
import { login, RegisterController } from "./auth.controller.js";
import { loginSchema, registerSchema } from "./auth.schema.js";

const router = Router();

router.post("/register", validate(registerSchema), RegisterController);
router.post("/login", validate(loginSchema), login);

export default router;