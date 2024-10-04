import Redis from "ioredis";
import configuration from "../../cache-configuration";

let redisInstance = null;

function getRedisConfiguration() {
  return configuration.redis;
}

export function getRedisClient() {
  console.log("IN GET REDIS CLIENT!!!!!!");

  if (redisInstance) {
    console.log("IN REDIS INSTANCE!!!!!!");

    return redisInstance; // Return the existing instance
  }

  console.log("NO REDIS INSTANCE", { redisInstance });

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

  redisInstance = new Redis(options);

  redisInstance.on("error", (error) => {
    console.warn("[Redis] Error connecting", error);
  });

  console.log("[Redis] Connected to Redis: ");

  return redisInstance;
}
