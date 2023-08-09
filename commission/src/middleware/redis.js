import { createClient } from "redis";

const redisClient = createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

redisClient.on("error", (err) => console.log("Redis error: " + err));
redisClient.on("connect", (err) => console.log("Connected to Redis!"));
redisClient.on("disconnect", (err) => console.log("Disconnected from Redis!"));

export const redisGet = async (key) => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }

  const value = await redisClient.get(key);

  return value;
};

export const redisSet = async (key, value) => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }

  await redisClient.set(key, value, { EX: 600 });
};

export default redisClient;
