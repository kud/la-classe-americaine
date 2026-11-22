import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const PAGES = [
  { path: "/", h1: "L'homme le plus classe du monde est mort." },
  { path: "/repliques", h1: "Les répliques." },
  { path: "/repliques/monde-de-merde", h1: "Pièce n° 1" },
  { path: "/generique", h1: "Le générique." },
];

/** The opening card is a first-visit thing; most tests start as a returning visitor. */
async function returning(page: Page) {
  await page.addInitScript(() => window.localStorage.setItem("lca-carton", "1"));
}

function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  return errors;
}

for (const { path, h1 } of PAGES) {
  test(`${path} renders, without horizontal scroll or errors`, async ({ page }) => {
    await returning(page);
    const errors = collectErrors(page);
    const res = await page.goto(path);
    expect(res?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveText(h1);
    await expect(page.locator("html")).toHaveAttribute("lang", "fr");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    expect(errors).toEqual([]);
  });
}

for (const path of ["/", "/repliques", "/generique", "/cette-page-n-existe-pas"]) {
  test(`${path} has no axe violations (WCAG 2 A/AA)`, async ({ page }) => {
    await returning(page);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(path);
    await page.waitForTimeout(400);
    const results = await new AxeBuilder({ page: page as unknown as ConstructorParameters<typeof AxeBuilder>[0]["page"] }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(", ")}`)).toEqual([]);
  });
}

test("the 404 is a real 404, titled « Monde de merde », and George says it", async ({ page }) => {
  await returning(page);
  const res = await page.goto("/nulle-part");
  expect(res?.status()).toBe(404);
  await expect(page).toHaveTitle("Monde de merde · La Classe Américaine");
  const dub = page.getByTestId("doublage");
  await expect(dub).toBeVisible({ timeout: 3000 });
  await expect(dub).toHaveAttribute("data-character", "george");
  await expect(page.getByTestId("stage-announcer")).toContainText("monde de merde");
  await page.getByRole("link", { name: "Retourner à l'enquête" }).click();
  await expect(page).toHaveURL("/");
});

test("the opening card: first visit only, any key skips it", async ({ page }) => {
  await page.goto("/");
  const carton = page.getByTestId("carton");
  await expect(carton).toBeVisible();
  await expect(carton).toContainText("ce flim n'est pas un flim sur le cyclimse.");
  await page.keyboard.press("Space");
  await expect(carton).toBeHidden();
  await page.reload();
  await page.waitForTimeout(300);
  await expect(carton).toBeHidden();
});

test("the opening card cuts out by itself after 3.2 s", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("carton")).toBeVisible();
  await expect(page.getByTestId("carton")).toBeHidden({ timeout: 4500 });
});

test("typing « cyclimse » replays the card", async ({ page }) => {
  await returning(page);
  await page.goto("/generique");
  await page.locator("body").click({ position: { x: 5, y: 300 } });
  await page.keyboard.type("cyclimse");
  await expect(page.getByTestId("carton")).toBeVisible();
});

test("a witness speaks, and never two at once", async ({ page }) => {
  await returning(page);
  await page.goto("/#temoins");
  await page.getByTestId("witness-jose").click();
  const dub = page.getByTestId("doublage");
  await expect(dub).toHaveCount(1);
  await expect(dub).toHaveAttribute("data-character", "jose");
  await expect(dub).toContainText("L'homme trop bien sapé, Abitbol");
  // a second witness while José is on stage: the tap closes him; nothing doubles up
  await page.getByTestId("witness-welles").click();
  await expect(page.getByTestId("doublage")).toHaveCount(0, { timeout: 2000 });
  await page.getByTestId("witness-welles").click();
  await expect(page.getByTestId("doublage")).toHaveCount(1);
  await expect(page.getByTestId("doublage")).toHaveAttribute("data-character", "welles");
  await page.keyboard.press("Escape");
  await expect(page.getByTestId("doublage")).toHaveCount(0);
});

test("copying a quote stamps the slip « COPIÉ »", async ({ page, context, browserName }) => {
  test.skip(browserName !== "chromium");
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await returning(page);
  await page.goto("/repliques");
  const slip = page.getByTestId("slip-monde-de-merde");
  await slip.getByRole("button", { name: "Copier" }).click();
  await expect(slip.getByTestId("stamp-copie")).toBeVisible();
  const copied = await page.evaluate(() => navigator.clipboard.readText());
  expect(copied).toContain("monde de merde");
  expect(copied).toContain("George Abitbol");
});

test("the reviews rotate by hand, and list all six under reduced motion", async ({ page }) => {
  await returning(page);
  await page.goto("/#critique");
  const reviews = page.getByTestId("reviews");
  await expect(reviews).toContainText("The Magazine");
  await reviews.getByRole("button", { name: "Critique suivante" }).click();
  await expect(reviews).toContainText("Wogue");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.getByTestId("reviews-all").locator("li")).toHaveCount(6);
});

test("Peter is pronounced « Pétaire »", async ({ page }) => {
  await returning(page);
  await page.goto("/#redaction");
  await page.getByTestId("pron-peter").first().focus();
  await expect(page.getByRole("tooltip").filter({ hasText: "Pétaire" }).first()).toBeVisible();
});

test("the case is stamped CLASSÉE", async ({ page }) => {
  await returning(page);
  await page.goto("/");
  await page.locator("#classee").scrollIntoViewIfNeeded();
  await page.getByTestId("stamp-classee").waitFor({ timeout: 3000 });
  await expect(page.getByTestId("stamp-classee")).toContainText("CLASSÉE");
});

test("sound is off until asked for", async ({ page }) => {
  await returning(page);
  await page.goto("/");
  const sw = page.getByTestId("sound-switch");
  await expect(sw).toHaveAttribute("aria-pressed", "false");
  await expect(sw).toHaveText(/Son\s*:\s*coupé/);
  await sw.click();
  await expect(sw).toHaveAttribute("aria-pressed", "true");
  await expect(sw).toHaveText(/Son\s*:\s*projecteur/);
});

test("« Les témoins se taisent » is remembered", async ({ page }) => {
  await returning(page);
  await page.goto("/generique");
  await page.getByTestId("taisent").check();
  await page.reload();
  await expect(page.getByTestId("taisent")).toBeChecked();
});

test.describe("round 1", () => {
  test("every chapter of the inquiry fills the screen", async ({ page }) => {
    await returning(page);
    await page.goto("/");
    const vh = page.viewportSize()!.height;
    const heights = await page.locator("main .chapter-screen").evaluateAll((els) => els.map((e) => e.getBoundingClientRect().height));
    expect(heights.length).toBe(7);
    for (const h of heights) expect(h).toBeGreaterThanOrEqual(vh - 1);
  });

  test("Page Down moves one screen at a time (desktop)", async ({ page, isMobile }) => {
    test.skip(isMobile, "phones snap by proximity");
    await returning(page);
    await page.goto("/");
    await page.locator("body").click({ position: { x: 5, y: 5 } });
    await page.keyboard.press("PageDown");
    await expect
      .poll(async () => page.evaluate(() => Math.abs(window.scrollY - document.getElementById("redaction")!.offsetTop)), { timeout: 3000 })
      .toBeLessThanOrEqual(2);
  });

  test("screens enter once, with their transition", async ({ page }) => {
    await returning(page);
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("data-anim", "1");
    const redaction = page.locator("#redaction .enter");
    await expect(redaction).toHaveAttribute("data-enter", "iris");
    await expect(redaction).toHaveAttribute("data-state", "waiting");
    await page.locator("#redaction").scrollIntoViewIfNeeded();
    await expect(redaction).toHaveAttribute("data-state", "in");
  });

  test("nothing waits for an entrance under reduced motion", async ({ page }) => {
    await returning(page);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await expect(page.locator("html")).not.toHaveAttribute("data-anim", "1");
    await expect(page.locator("#pieces .enter")).toHaveCSS("opacity", "1");
  });

  test("a background voice murmurs at the edge, one at a time", async ({ page, isMobile }) => {
    test.skip(isMobile, "no murmurs on phones");
    await returning(page);
    await page.emulateMedia({ reducedMotion: "reduce" }); // keeps the idle Doublage out of the way
    await page.clock.install();
    await page.goto("/");
    let seen = 0;
    for (let s = 0; s < 30 && seen === 0; s++) {
      await page.clock.runFor(1000);
      seen = await page.getByTestId("murmur").count();
    }
    expect(seen).toBe(1);
    // decorative: the layer is hidden from assistive technology
    await expect(page.getByTestId("murmur").locator("xpath=..")).toHaveAttribute("aria-hidden", "true");
  });
});
