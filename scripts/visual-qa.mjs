import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

await mkdir(".qa", { recursive: true });
const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  for (const [name, path, width, height] of [
    ["home-desktop", "/", 1440, 1000],
    ["home-mobile", "/", 375, 812],
    ["contact-desktop", "/kontakt", 1440, 1000],
    ["contact-mobile", "/kontakt", 320, 812],
  ]) {
    await page.setViewportSize({ width, height });
    await page.goto(`http://127.0.0.1:3000${path}`);
    await page.evaluate(() => document.fonts.ready);
    await page.emulateMedia({ reducedMotion: "reduce" });
    const overflow = await page.evaluate(() => ({
      width: innerWidth,
      actual: document.documentElement.scrollWidth,
      elements: [...document.querySelectorAll("body *")]
        .filter(
          (element) => element.getBoundingClientRect().right > innerWidth + 1,
        )
        .map((element) => ({ tag: element.tagName, class: element.className }))
        .slice(0, 20),
    }));
    console.log(name, JSON.stringify(overflow));
    await page.screenshot({ path: `.qa/${name}.png`, fullPage: true });
    if (name === "home-desktop" || name === "home-mobile") {
      await page.screenshot({ path: `.qa/${name}-top.png`, fullPage: false });
    }
  }
} finally {
  await browser.close();
}
