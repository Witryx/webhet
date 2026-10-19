import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("all public routes, metadata, assets and navigation are coherent", async ({
  page,
  request,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const routes = [
    "/",
    "/sluzby",
    "/sluzby/webove-stranky",
    "/sluzby/e-shopy",
    "/sluzby/webove-aplikace",
    "/sluzby/sprava-webu",
    "/projekty",
    "/o-mne",
    "/cenik",
    "/kontakt",
    "/cookies",
    "/ochrana-osobnich-udaju",
  ];
  const titles = new Set();
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang", "cs");
    await expect(page.locator("h1")).toHaveCount(1);
    titles.add(await page.title());
    expect(
      await page.locator('link[rel="canonical"]').getAttribute("href"),
    ).toContain(route);
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
  }
  expect(titles.size).toBe(routes.length);
  expect(errors).toEqual([]);
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBe(true);
  expect(await sitemap.text()).toContain("/sluzby/sprava-webu");
  expect(await (await request.get("/robots.txt")).text()).toContain(
    "Disallow: /",
  );
  expect(
    (await request.get("/opengraph-image")).headers()["content-type"],
  ).toContain("image/png");
  expect((await request.get("/icon.svg")).ok()).toBe(true);
  expect((await request.get("/projekty/neexistuje")).status()).toBe(404);
  expect((await request.get("/sluzby/neexistuje")).status()).toBe(404);
  await page.goto("/");
  await page
    .getByRole("link", { name: "Chci nezávaznou nabídku" })
    .first()
    .click();
  await expect(page).toHaveURL(/kontakt/);
});

test("responsive layouts never overflow, mobile menu works with keyboard", async ({
  page,
}) => {
  for (const width of [320, 375, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/", "/cenik", "/kontakt", "/projekty"]) {
      await page.goto(route);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
    }
  }
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const menu = page.getByRole("button", { name: /menu/ });
  await menu.click();
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await expect(menu).toBeFocused();
  await menu.click();
  await page
    .getByRole("navigation", { name: "Hlavní navigace" })
    .getByRole("link", { name: "Ceník", exact: true })
    .click();
  await expect(page).toHaveURL(/cenik/);
  await expect(menu).toHaveAttribute("aria-expanded", "false");
});

test("mobile pages expose accessible navigation and form controls", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const path of ["/", "/kontakt", "/cenik"]) {
    await page.goto(path);
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
  }
});

test("FAQ, skip link and reduced motion support keyboard interaction", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Přeskočit na obsah" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  const question = page.locator("summary").first();
  await question.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("details").first()).toHaveAttribute("open", "");
  expect(
    await page
      .locator(".hero-copy")
      .evaluate((element) => getComputedStyle(element).animationName),
  ).toBe("none");
});

async function fillLead(page: import("@playwright/test").Page) {
  await page.getByLabel("Jméno a příjmení").fill("Jan Novák");
  await page.getByLabel("E-mail", { exact: false }).fill("jan@example.com");
  await page.getByLabel("Co pro vás mohu udělat?").selectOption("web");
  await page
    .getByLabel("Pár slov o projektu")
    .fill("Potřebuji nový prezentační web pro své podnikání.");
  await page.getByRole("checkbox").check();
}

test("contact validates, preserves inputs on errors and prevents duplicate submissions", async ({
  page,
}) => {
  await page.goto("/kontakt");
  await page
    .getByRole("button", { name: "Odeslat nezávaznou poptávku" })
    .click();
  await expect(page.getByText("Zadejte prosím alespoň 2 znaky.")).toBeVisible();
  await expect(page.getByLabel("Jméno a příjmení")).toBeFocused();
  await fillLead(page);
  let requests = 0;
  await page.route("**/api/contact", async (route) => {
    requests++;
    await new Promise((resolve) => setTimeout(resolve, 300));
    await route.fulfill({
      status: 502,
      contentType: "application/json",
      body: JSON.stringify({ message: "Zprávu se nepodařilo odeslat." }),
    });
  });
  await page
    .getByRole("button", { name: "Odeslat nezávaznou poptávku" })
    .click();
  await expect(
    page.getByRole("button", { name: "Odesílám zprávu" }),
  ).toBeDisabled();
  await expect(page.locator("form").getByRole("alert")).toContainText(
    "nepodařilo",
  );
  await expect(page.getByLabel("Jméno a příjmení")).toHaveValue("Jan Novák");
  expect(requests).toBe(1);
  await page.unroute("**/api/contact");
  await page.route("**/api/contact", async (route) => {
    const data = route.request().postDataJSON();
    expect(data.consent).toBe(true);
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        message:
          "Děkuji za zprávu. Vaše poptávka byla úspěšně předána k doručení.",
      }),
    });
  });
  await page
    .getByRole("button", { name: "Odeslat nezávaznou poptávku" })
    .click();
  await expect(page.getByRole("status")).toContainText("Děkuji");
  await expect(page.getByLabel("Jméno a příjmení")).toHaveValue("");
});

test("service and package inquiry links prefill relevant fields", async ({
  page,
}) => {
  await page.goto("/sluzby/e-shopy");
  await page.getByRole("link", { name: "Poptat e-shopy", exact: true }).click();
  await expect(page.getByLabel("Co pro vás mohu udělat?")).toHaveValue("eshop");
  await page.goto("/cenik");
  await page.getByRole("link", { name: "Probrat variantu Profi" }).click();
  await expect(page.getByLabel("Pár slov o projektu")).toHaveValue(/Profi/);
});
