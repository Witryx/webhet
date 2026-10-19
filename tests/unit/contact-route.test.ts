import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  send: vi.fn(),
  config: vi.fn(),
  limit: vi.fn(),
}));
vi.mock("@/lib/email", () => ({
  getEmailConfig: mocks.config,
  sendContactEmail: mocks.send,
}));
vi.mock("@/lib/rate-limit", () => ({ rateLimit: mocks.limit }));
import { POST } from "../../src/app/api/contact/route";

const lead = {
  name: "Jan Novák",
  email: "jan@example.com",
  phone: "",
  projectType: "web",
  budget: "",
  timeline: "",
  message: "Potřebuji nový web pro své podnikání.",
  consent: true,
  website: "",
};
const request = (body: unknown, extra: Record<string, string> = {}) =>
  new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "http://localhost:3000",
      ...extra,
    },
    body: JSON.stringify(body),
  });

describe("contact endpoint", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mocks.limit.mockResolvedValue({ allowed: true, retryAfter: 900 });
    mocks.config.mockReturnValue({ success: true });
    mocks.send.mockResolvedValue(undefined);
  });
  afterEach(() => vi.unstubAllEnvs());
  it("delivers valid input through server-side provider", async () => {
    const response = await POST(request(lead));
    expect(response.status).toBe(200);
    expect(mocks.send).toHaveBeenCalledWith(lead);
  });
  it("rejects cross-origin submissions", async () => {
    expect(
      (await POST(request(lead, { Origin: "https://other.example" }))).status,
    ).toBe(403);
    expect(mocks.send).not.toHaveBeenCalled();
  });
  it("rejects invalid consent and returns field errors", async () => {
    const response = await POST(request({ ...lead, consent: false }));
    expect(response.status).toBe(422);
    expect((await response.json()).errors.consent).toBeTruthy();
    expect(mocks.send).not.toHaveBeenCalled();
  });
  it("rejects honeypot instead of claiming delivery", async () => {
    expect(
      (await POST(request({ ...lead, website: "spam.example" }))).status,
    ).toBe(400);
    expect(mocks.send).not.toHaveBeenCalled();
  });
  it("honors rate limits", async () => {
    mocks.limit.mockResolvedValue({ allowed: false, retryAfter: 42 });
    const response = await POST(request(lead));
    expect(response.status).toBe(429);
    expect(response.headers.get("Retry-After")).toBe("42");
    expect(mocks.send).not.toHaveBeenCalled();
  });
  it("fails closed when spam protection is unavailable", async () => {
    mocks.limit.mockRejectedValue(new Error("offline"));
    expect((await POST(request(lead))).status).toBe(503);
    expect(mocks.send).not.toHaveBeenCalled();
  });
  it("never claims success without credentials", async () => {
    mocks.config.mockReturnValue({ success: false });
    expect((await POST(request(lead))).status).toBe(503);
    expect(mocks.send).not.toHaveBeenCalled();
  });
  it("never claims success after provider failure", async () => {
    mocks.send.mockRejectedValue(new Error("provider"));
    expect((await POST(request(lead))).status).toBe(502);
  });
  it("rejects unsupported content type", async () => {
    expect(
      (await POST(request(lead, { "Content-Type": "text/plain" }))).status,
    ).toBe(415);
  });
  it("rejects oversized streams even without content-length", async () => {
    expect((await POST(request({ message: "x".repeat(25000) }))).status).toBe(
      413,
    );
    expect(mocks.send).not.toHaveBeenCalled();
  });
  it("rejects malformed JSON", async () => {
    const response = await POST(
      new Request("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{",
      }),
    );
    expect(response.status).toBe(400);
  });
});
