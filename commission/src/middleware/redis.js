import { createClient } from "redis";

const redisClient = createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

redisClient.on("error", (err) => console.log("Redis error: " + err));
redisClient.on("connect", (err) => console.log("Connected to Redis!"));
redisClient.on("disconnect", (err) => console.log("Disconnected from Redis!"));

const closeRedisConnection = () => {
  redisClient.quit((err) => {
    if (err) console.log(err);
    console.log("Redis connection closed");
  });
};

process.on("exit", closeRedisConnection);
process.on("SIGINT", closeRedisConnection);
process.on("SIGTERM", closeRedisConnection);

export default redisClient;
