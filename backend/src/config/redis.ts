import { Redis } from "ioredis";

let redis: Redis;

export const initRedis = () => {
  const redisUrl = process.env.REDIS_URL;

  if (!redisUrl) {
    throw new Error("REDIS_URL is not defined");
  }

  redis = new Redis(redisUrl, {
    tls: {},
    maxRetriesPerRequest: 3,
    enableReadyCheck: false,
  });

  redis.on("connect", () => {
    console.log("Redis connected");
  });

  redis.on("error", (err:any) => {
    console.error("Redis connection error:", err);
  });

  return redis;
};

export const getRedis = () => {
  if (!redis) {
    throw new Error("Redis not initialized");
  }
  return redis;
};