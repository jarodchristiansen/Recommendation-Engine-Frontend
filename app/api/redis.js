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

  // Prefer REDIS_URL (e.g. from Redis Labs: rediss://default:password@host:port) so host/port stay in sync
  if (config.url) {
    redisInstance = new Redis(config.url, {
      lazyConnect: true,
      showFriendlyErrorStack: true,
      enableAutoPipelining: true,
      maxRetriesPerRequest: 0,
      connectTimeout: 5000,
      retryStrategy: (times) => {
        if (times > 3) {
          console.warn("[Redis] Could not connect after", times, "attempts; giving up");
          return null;
        }
        return Math.min(times * 200, 1000);
      },
    });
  } else {
    const options = {
      host: config.host ?? "127.0.0.1",
      lazyConnect: true,
      showFriendlyErrorStack: true,
      enableAutoPipelining: true,
      maxRetriesPerRequest: 0,
      connectTimeout: 5000,
      retryStrategy: (times) => {
        if (times > 3) {
          console.warn("[Redis] Could not connect after", times, "attempts; giving up");
          return null;
        }
        return Math.min(times * 200, 1000);
      },
    };
    if (config.port) options.port = Number(config.port);
    if (config.password) options.password = config.password;
    redisInstance = new Redis(options);
  }

  redisInstance.on("error", (error) => {
    console.warn("[Redis]", error.message || error);
  });
  redisInstance.on("connect", () => {
    console.log("[Redis] Connected");
  });

  // Store the instance globally so it can be reused
  globalForRedis.redisInstance = redisInstance;

  return redisInstance;
}
/** lazyConnect clients stay in wait until connect(); improves reliability in serverless. */
export async function ensureRedisConnected(client) {
  try {
    if (client.status === "wait" || client.status === "end") {
      await client.connect();
    }
  } catch (err) {
    console.warn("[Redis] ensureRedisConnected:", err?.message || err);
    throw err;
  }
}
const REDIS_GET_MS = 3000;
const REDIS_SET_MS = 2500;
export async function redisGetCached(client, key) {
  try { await ensureRedisConnected(client); } catch { return null; }
  try {
    return await Promise.race([
      client.get(key),
      new Promise((resolve) => setTimeout(() => resolve(null), REDIS_GET_MS)),
    ]);
  } catch { return null; }
}
export async function redisSetCache(client, key, value, ttlSec) {
  try { await ensureRedisConnected(client); } catch { return; }
  try {
    await Promise.race([
      client.set(key, value, "EX", ttlSec),
      new Promise((resolve) => setTimeout(resolve, REDIS_SET_MS)),
    ]);
  } catch (err) { console.warn("[Redis] SET failed:", err?.message || err); }
}

