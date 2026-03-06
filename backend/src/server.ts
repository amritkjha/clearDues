import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
// const __dirname = path.dirname(fileURLToPath(import.meta.url));
// dotenv.config({ path: path.join(__dirname, "../../.env") });

import "./config/env.js";
// import "dotenv/config";
// dotenv.config();
import { app } from './app.js';
import { initRedis } from "./config/redis.js";

initRedis();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
