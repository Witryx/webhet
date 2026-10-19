import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const targets = [
  ["midari", "https://midari.cz/"],
  ["egyptskoceska-reality", "https://www.egyptskoceskareality.cz/"],
  ["petr-pavlat-reality", "https://www.petrpavlat-reality.cz/"],
  ["fixplace", "https://www.fixplace.cz/"],
];
await mkdir("public/images/projects", { recursive: true });
const browser = await chromium.launch();
try {
  for (const [slug, url] of targets.filter(
    ([slug]) =>
      process.argv.length <= 2 || process.argv.slice(2).includes(slug),
  )) {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 1000 },
      deviceScaleFactor: 1,
    });
    try {
      const response = await page.goto(url, {
        waitUntil: "networkidle",
        timeout: 45000,
      });
      if (!response?.ok()) throw new Error(`HTTP ${response?.status()}`);
      await page.evaluate(() => document.fonts.ready);
      await page.emulateMedia({ reducedMotion: "reduce" });
      const labels = await page
        .getByRole("button")
        .evaluateAll((buttons) =>
          buttons.map((button) =>
            (
              button.getAttribute("aria-label") ||
              button.textContent ||
              ""
            ).trim(),
          ),
        );
      labels.sort(
        (a, b) =>
          Number(!/Zavřít|Close|×/i.test(a)) -
          Number(!/Zavřít|Close|×/i.test(b)),
      );
      for (const label of labels) {
        const button = page
          .getByRole("button", { name: label, exact: true })
          .first();
        if (
          /^(Odmítnout|Pouze nezbytné|Jen nezbytné|Zavřít.*|Close.*|×)$/i.test(
            label,
          ) &&
          (await button.isVisible())
        ) {
          await button.click({ timeout: 2000 });
          await button.waitFor({ state: "hidden", timeout: 10000 });
        }
      }
      console.log(
        JSON.stringify({
          slug,
          url: page.url(),
          title: await page.title(),
          headings: await page.locator("h1,h2").allTextContents(),
        }),
      );
      await page.screenshot({
        path: `public/images/projects/${slug}.jpg`,
        type: "jpeg",
        quality: 88,
        fullPage: false,
        animations: "disabled",
      });
    } catch (error) {
      console.log(JSON.stringify({ slug, error: error.message }));
    } finally {
      await page.close();
    }
  }
} finally {
  await browser.close();
}
