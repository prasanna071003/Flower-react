const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 30;
const attempts = new Map();

function dropUnsafeKeys(value) {
  if (Array.isArray(value)) {
    value.forEach(dropUnsafeKeys);
    return;
  }
  if (!value || typeof value !== "object") return;
  for (const key of Object.keys(value)) {
    if (key.startsWith("$") || key.includes(".")) {
      delete value[key];
    } else {
      dropUnsafeKeys(value[key]);
    }
  }
}

/**
 * Defense in depth against NoSQL operator injection: strips any "$"-prefixed
 * or dotted key from request payloads before controllers build queries.
 */
export function sanitizeRequest(req, _res, next) {
  dropUnsafeKeys(req.body);
  dropUnsafeKeys(req.params);
  dropUnsafeKeys(req.query);
  next();
}

function pruneAttempts(now) {
  if (attempts.size < 500) return;
  for (const [ip, entry] of attempts) {
    if (now - entry.start >= RATE_LIMIT_WINDOW_MS) attempts.delete(ip);
  }
}

/**
 * Simple in-memory limiter for the auth endpoints (no external dependency).
 */
export function authRateLimiter(req, res, next) {
  const now = Date.now();
  const ip = req.ip || "unknown";
  const entry = attempts.get(ip);

  if (!entry || now - entry.start >= RATE_LIMIT_WINDOW_MS) {
    attempts.set(ip, { start: now, count: 1 });
    pruneAttempts(now);
    return next();
  }

  entry.count += 1;
  if (entry.count > RATE_LIMIT_MAX) {
    const retryAfterSeconds = Math.ceil((RATE_LIMIT_WINDOW_MS - (now - entry.start)) / 1000);
    res.set("Retry-After", String(retryAfterSeconds));
    return res.status(429).json({
      success: false,
      data: null,
      message: "Too many attempts. Please try again in a few minutes.",
    });
  }
  return next();
}
