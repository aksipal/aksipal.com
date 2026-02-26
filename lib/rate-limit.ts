type RateEntry = {
  count: number;
  resetAt: number;
};

declare global {
  var __leadRateLimitStore: Map<string, RateEntry> | undefined;
}

const store = global.__leadRateLimitStore ?? new Map<string, RateEntry>();

if (!global.__leadRateLimitStore) {
  global.__leadRateLimitStore = store;
}

export function consumeRateLimit(key: string, limit = 4, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const current = store.get(key);

  if (!current || current.resetAt <= now) {
    store.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });

    return {
      success: true,
      remaining: limit - 1,
    };
  }

  if (current.count >= limit) {
    return {
      success: false,
      remaining: 0,
    };
  }

  current.count += 1;
  store.set(key, current);

  return {
    success: true,
    remaining: Math.max(0, limit - current.count),
  };
}
