import { afterEach, describe, it, expect, vi } from "vitest";
import { rateLimit } from "../../src/lib/rate-limit";
describe("spam protection", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });
  it("limits repeated local requests and expires buckets", async () => {
    vi.stubEnv("VERCEL", "");
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "");
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-10-19T09:00:00Z"));
    for (let i = 0; i < 5; i++)
      expect((await rateLimit("test-local")).allowed).toBe(true);
    expect((await rateLimit("test-local")).allowed).toBe(false);
    vi.advanceTimersByTime(16 * 60 * 1000);
    expect((await rateLimit("test-local")).allowed).toBe(true);
  });
  it("requires shared protection on Vercel", async () => {
    vi.stubEnv("VERCEL", "1");
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "");
    await expect(rateLimit("test")).rejects.toThrow("Shared limiter required");
  });
  it("stores hashed keys and handles shared limits", async () => {
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "https://redis.example");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "test");
    const fetchMock = vi
      .fn()
      .mockResolvedValue(
        new Response(JSON.stringify([{ result: 6 }, { result: 1 }])),
      );
    vi.stubGlobal("fetch", fetchMock);
    expect((await rateLimit("192.0.2.1")).allowed).toBe(false);
    expect(fetchMock.mock.calls[0][1].body).not.toContain("192.0.2.1");
  });
});
