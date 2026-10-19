import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
const mocks = vi.hoisted(() => ({ send: vi.fn() }));
vi.mock("resend", () => ({
  Resend: class {
    emails = { send: mocks.send };
  },
}));
import { sendContactEmail } from "../../src/lib/email";
const lead = {
  name: "Jan Novák",
  email: "jan@example.com",
  phone: "",
  projectType: "web" as const,
  budget: "" as const,
  timeline: "" as const,
  message: "Potřebuji nový web pro své podnikání.",
  consent: true as const,
  website: "",
};
describe("Resend integration", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("CONTACT_TO_EMAIL", "owner@example.com");
    vi.stubEnv("CONTACT_FROM_EMAIL", "web@example.com");
  });
  afterEach(() => vi.unstubAllEnvs());
  it("uses configured sender and owner with visitor reply-to", async () => {
    mocks.send.mockResolvedValue({
      data: { id: "provider-test-id" },
      error: null,
    });
    await sendContactEmail(lead);
    expect(mocks.send).toHaveBeenCalledWith(
      expect.objectContaining({
        from: "web@example.com",
        to: "owner@example.com",
        replyTo: "jan@example.com",
        subject: "WebHet: nová poptávka — Webové stránky",
      }),
    );
  });
  it("throws on provider rejection", async () => {
    mocks.send.mockResolvedValue({
      data: null,
      error: { message: "rejected" },
    });
    await expect(sendContactEmail(lead)).rejects.toThrow();
  });
  it("requires provider acceptance id", async () => {
    mocks.send.mockResolvedValue({ data: {}, error: null });
    await expect(sendContactEmail(lead)).rejects.toThrow();
  });
  it("does not call the provider without configuration", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    await expect(sendContactEmail(lead)).rejects.toThrow("configuration");
    expect(mocks.send).not.toHaveBeenCalled();
  });
});
