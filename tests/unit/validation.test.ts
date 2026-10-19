import { describe, expect, it } from "vitest";
import {
  contactSchema,
  fieldErrors,
  emailConfigSchema,
} from "../../src/lib/validation";
import { emailContent, escapeHtml } from "../../src/lib/email";

export const validLead = {
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

describe("contact validation", () => {
  it("accepts omitted optional API fields", () => {
    const result = contactSchema.parse({
      name: validLead.name,
      email: validLead.email,
      projectType: validLead.projectType,
      message: validLead.message,
      consent: true,
    });
    expect(result.phone).toBe("");
    expect(result.budget).toBe("");
    expect(result.timeline).toBe("");
  });
  it("accepts a complete inquiry with optional fields empty", () =>
    expect(contactSchema.safeParse(validLead).success).toBe(true));
  it.each([
    ["name", "J"],
    ["name", "x".repeat(101)],
    ["email", "invalid"],
    ["phone", "phone"],
    ["phone", "+12"],
    ["projectType", "unknown"],
    ["budget", "invalid"],
    ["timeline", "invalid"],
    ["message", "short"],
    ["message", "x".repeat(5001)],
    ["consent", false],
  ])("rejects invalid %s", (field, value) => {
    const result = contactSchema.safeParse({ ...validLead, [field]: value });
    expect(result.success).toBe(false);
    if (!result.success)
      expect(
        fieldErrors(result.error)[field as keyof typeof validLead],
      ).toBeTruthy();
  });
  it("trims names and message", () =>
    expect(
      contactSchema.parse({
        ...validLead,
        name: " Jan ",
        message: ` ${validLead.message} `,
      }).name,
    ).toBe("Jan"));
  it("accepts a Czech international phone", () =>
    expect(
      contactSchema.safeParse({ ...validLead, phone: "+420 777 123 456" })
        .success,
    ).toBe(true));
  it("requires explicit email configuration", () =>
    expect(
      emailConfigSchema.safeParse({ key: "", to: "", from: "" }).success,
    ).toBe(false));
});
describe("email rendering", () => {
  it("escapes every HTML metacharacter", () =>
    expect(escapeHtml('<script a="x">&\'</script>')).toBe(
      "&lt;script a=&quot;x&quot;&gt;&amp;&#39;&lt;/script&gt;",
    ));
  it("preserves original text but never injects HTML", () => {
    const content = emailContent({
      ...validLead,
      message: '<img src=x onerror="alert(1)"> hello there',
    });
    expect(content.html).not.toContain("<img");
    expect(content.html).toContain("&lt;img");
    expect(content.text).toContain("<img");
    expect(content.text).toContain("Webové stránky");
  });
});
