// TODO: understand the ratelimit logic

const lastCall = new Map<string, number>();

type RateLimitOptions = {
  windowMs?: number;
  keyPrefix?: string;
};

export function rateLimit(
  req: Request,
  options: RateLimitOptions = {},
): Response | null {
  const windowMs = options.windowMs ?? 10000;
  const keyPrefix = options.keyPrefix ?? "default";
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const key = `${keyPrefix}:${ip}`;
  const now = Date.now();
  const last = lastCall.get(key);

  if (last && now - last < windowMs) {
    return new Response("Too many requests. Try again in a few seconds.", {
      status: 429,
    });
  }

  lastCall.set(key, now);
  return null;
}
