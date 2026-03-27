import { getRedisClient } from "../../api/redis"; // Use your Redis client from the helper file

export const asyncCheckRedisAndReturnValue = async (q) => {
  const redisClient = getRedisClient();
  const cacheKey = `search:${q}`; // Create a Redis key based on the query

  const cachedData = await redisClient.get(cacheKey);

  if (cachedData) {
    console.log(`Cache hit for query: ${q}`);
    return cachedData;
  }

  return null;
};
