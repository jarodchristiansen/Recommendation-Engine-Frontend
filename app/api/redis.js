import Redis from "ioredis";
import configuration from "../../cache-configuration";

// Ensure Redis client is defined globally to maintain the singleton across reloads (especially in dev mode)
let globalForRedis = global;

let redisInstance;

function getRedisConfiguration() {
  return configuration.redis;
}

export function getRedisClient() {
  if (globalForRedis.redisInstance) {
    // Reuse existing Redis instance if it exists
    return globalForRedis.redisInstance;
  }

  const config = getRedisConfiguration();
  const options = {
    host: config.host,
    lazyConnect: true,
    showFriendlyErrorStack: true,
    enableAutoPipelining: true,
    maxRetriesPerRequest: 0,
    retryStrategy: (times) => {
      if (times > 3) {
        throw new Error(`[Redis] Could not connect after ${times} attempts`);
      }
      return Math.min(times * 200, 1000);
    },
  };

  if (config.port) {
    options.port = config.port;
  }

  if (config.password) {
    options.password = config.password;
  }

  // Create new Redis instance
  redisInstance = new Redis(options);

  redisInstance.on("error", (error) => {
    console.warn("[Redis] Error connecting", error);
  });

  console.log("[Redis] Connected to Redis");

  // Store the instance globally so it can be reused
  globalForRedis.redisInstance = redisInstance;

  return redisInstance;
}
