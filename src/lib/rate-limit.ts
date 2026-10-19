import { createHash } from "node:crypto";

const WINDOW = 15 * 60 * 1000;
const LIMIT = 5;
const buckets = new Map<string, { count: number; reset: number }>();

/** Shared Redis limiter on Vercel. Local/self-host fallback is per process. */
export async function rateLimit(
  ip: string,
): Promise<{ allowed: boolean; retryAfter: number }> {
  const now = Date.now();
  const key = `webhet:contact:${createHash("sha256").update(ip).digest("hex")}:${Math.floor(now / WINDOW)}`;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) {
    const response = await fetch(`${url.replace(/\/$/, "")}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        ["INCR", key],
        ["EXPIRE", key, 900],
      ]),
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) throw new Error("Rate limiter unavailable");
    const results = (await response.json()) as {
      result?: unknown;
      error?: string;
    }[];
    if (
      results.some((item) => item.error) ||
      typeof results[0]?.result !== "number"
    )
      throw new Error("Invalid limiter response");
    return {
      allowed: results[0].result <= LIMIT,
      retryAfter: Math.ceil((WINDOW - (now % WINDOW)) / 1000),
    };
  }
  if (process.env.VERCEL) throw new Error("Shared limiter required on Vercel");
  // Expire old keys and keep the fallback bounded even under distributed spam.
  for (const [id, bucket] of buckets)
    if (bucket.reset <= now) buckets.delete(id);
  const bucket = buckets.get(key) || { count: 0, reset: now + WINDOW };
  if (!buckets.has(key) && buckets.size >= 10000)
    return { allowed: false, retryAfter: 900 };
  bucket.count += 1;
  buckets.set(key, bucket);
  return {
    allowed: bucket.count <= LIMIT,
    retryAfter: Math.ceil((bucket.reset - now) / 1000),
  };
}
