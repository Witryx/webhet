import { afterEach, describe, expect, it, vi } from "vitest";
import { getPrivacyProviders, privacy } from "../../src/content/privacy";
import { site } from "../../src/config/site";

describe("privacy information", () => {
  afterEach(() => vi.unstubAllEnvs());
  it("identifies the real controller with contact and retention policy", () => {
    expect(site.business.name).toBe("Petr Hetzendorf");
    expect(site.business.registrationId).toBe("29704685");
    expect(site.business.address).not.toBe("");
    expect(site.business.retention).toContain("12 měsíců");
    expect(privacy.inquiryRetentionMonths).toBe(12);
  });
  it("does not claim unused providers process inquiries", () => {
    for (const name of [
      "VERCEL",
      "RESEND_API_KEY",
      "CONTACT_FROM_EMAIL",
      "UPSTASH_REDIS_REST_URL",
      "UPSTASH_REDIS_REST_TOKEN",
    ])
      vi.stubEnv(name, "");
    expect(getPrivacyProviders().map((provider) => provider.name)).toEqual([
      "Google — služba Gmail",
    ]);
  });
  it("discloses providers enabled for the deployment", () => {
    vi.stubEnv("VERCEL", "1");
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("CONTACT_FROM_EMAIL", "web@example.com");
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "https://redis.example");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "test");
    expect(getPrivacyProviders().map((provider) => provider.name)).toEqual([
      "Google — služba Gmail",
      "Vercel Inc.",
      "Plus Five Five, Inc. — Resend",
      "Upstash",
    ]);
  });
});
