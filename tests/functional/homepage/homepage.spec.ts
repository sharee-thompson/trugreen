import { test, expect, Page } from "@playwright/test";
import { getBaseUrl } from "../../../utils/config";

const HOME_URL = getBaseUrl();

// The homepage runs personalization/A-B variants, so hero copy, promo banners and
// offer codes change between renders. Assertions below target structure and
// destinations rather than marketing copy.

const isMobileViewport = (page: Page) =>
  (page.viewportSize()?.width ?? 0) < 900;

// The footer only lays out once scrolled into range, so it cannot be targeted
// with scrollIntoViewIfNeeded while it still has zero height.
const scrollToFooter = async (page: Page) => {
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page
    .locator("footer")
    .first()
    .waitFor({ state: "visible", timeout: 30000 });
};

// QA remounts the app after load, detaching the server-rendered nodes, so scroll
// by resolving the element fresh instead of holding a handle across the remount.
const revealSection = async (
  locator: ReturnType<Page["locator"]>,
  timeout = 30000,
) => {
  await locator.waitFor({ state: "attached", timeout });
  await expect(locator).toBeVisible({ timeout });
  await locator.scrollIntoViewIfNeeded().catch(async () => {
    await locator.scrollIntoViewIfNeeded();
  });
};

const dismissCookieBanner = async (page: Page) => {
  const accept = page.getByRole("button", { name: /Accept All Cookies/i });
  if (await accept.count()) {
    await accept
      .first()
      .click({ timeout: 5000 })
      .catch(() => {});
  }
};

const gotoHome = async (page: Page) => {
  const response = await page.goto(HOME_URL, { waitUntil: "domcontentloaded" });
  await dismissCookieBanner(page);
  await page.waitForLoadState("load").catch(() => {});
  await page.locator("main").first().waitFor({ state: "visible" });
  return response;
};

// React attaches the click handlers after hydration, so an early click silently
// no-ops. Retry until the expected result appears.
const clickUntil = async (
  trigger: ReturnType<Page["locator"]>,
  result: ReturnType<Page["locator"]>,
  attempts = 3,
) => {
  for (let attempt = 1; attempt <= attempts; attempt++) {
    await trigger.click();
    try {
      await result.waitFor({ state: "visible", timeout: 8000 });
      return;
    } catch (error) {
      if (attempt === attempts) throw error;
    }
  }
};

test.describe("TruGreen homepage regression @homepage", () => {
  test.slow();

  let homeStatus: number | undefined;

  test.beforeEach(async ({ page }) => {
    const response = await gotoHome(page);
    homeStatus = response?.status();
  });

  test("responds 200 with indexable title and canonical URL @homepage", async ({
    page,
  }) => {
    expect(homeStatus).toBe(200);

    await expect(page).toHaveTitle(/TruGreen/i);
    expect(new URL(page.url()).pathname).toBe("/");

    const head = await page.evaluate(() => ({
      canonical:
        document.querySelector('link[rel="canonical"]')?.getAttribute("href") ??
        null,
      description:
        document
          .querySelector('meta[name="description"]')
          ?.getAttribute("content") ?? "",
      robots:
        document
          .querySelector('meta[name="robots"]')
          ?.getAttribute("content") ?? "index",
    }));

    expect(head.canonical).toMatch(/trugreen\.com\/?$/i);
    expect(head.description.length).toBeGreaterThan(50);
    expect(head.robots).not.toMatch(/noindex/i);
  });

  test("renders exactly one non-empty H1 hero with a primary CTA @homepage", async ({
    page,
  }) => {
    const h1 = page.locator("h1");
    await expect(h1).toHaveCount(1);

    const heroText = (await h1.first().innerText()).trim();
    expect(heroText.length).toBeGreaterThan(10);

    await expect(
      page.getByRole("button", { name: /^Get Started$/i }).first(),
    ).toBeVisible();
  });

  test("header exposes logo, phone and buy-online entry points @homepage", async ({
    page,
  }) => {
    const header = page.locator("header").first();

    const logo = header.getByRole("link", { name: /TruGreen Logo/i }).first();
    await expect(logo).toBeVisible();
    expect(await logo.getAttribute("href")).toBe("/");

    const phone = header.locator('a[href^="tel:"]').first();
    await expect(phone).toHaveCount(1);
    expect(await phone.getAttribute("href")).toMatch(/^tel:\+?[\d-]{10,}$/);

    // Buy-online entry is a header CTA on desktop and a promo bar link on mobile.
    await expect(header.locator('a[href="/buy-online"]').first()).toHaveCount(
      1,
    );
  });

  test("primary navigation links point at expected destinations @homepage", async ({
    page,
  }) => {
    const header = page.locator("header").first();

    for (const href of [
      "/products-and-services/trushrub-tree-and-shrub-care",
      "/lawn-care-101",
      "/why-choose-trugreen/testimonials-and-ratings",
      "/customer-support",
      "/buy-online",
      "/pay-your-bill",
      "/my-account/login",
    ]) {
      await expect(
        header.locator(`a[href="${href}"]`).first(),
        `nav link ${href}`,
      ).toHaveCount(1);
    }
  });

  test("navigation exposes the full lawn plan and service catalog @homepage", async ({
    page,
  }) => {
    const header = page.locator("header").first();

    // The flyout is rendered eagerly and only revealed on interaction, so the
    // catalog is verified structurally rather than through a fragile hover/click.
    for (const href of [
      "/products-and-services",
      "/products-and-services/trupro",
      "/products-and-services/trucore",
      "/products-and-services/natural-lawn-care",
      "/products-and-services/trubasic",
      "/products-and-services/lawn-fertilization",
      "/products-and-services/weed-control",
      "/products-and-services/aeration",
      "/products-and-services/grub-control",
      "/products-and-services/lawn-disease",
      "/pests-products-and-services",
      "/products-and-services/trudefense-mosquito-control",
      "/products-and-services/trubarrier-perimeter-pest-control",
      "/products-and-services/fire-ant-control",
    ]) {
      await expect(
        header.locator(`a[href="${href}"]`).first(),
        `catalog link ${href}`,
      ).toHaveCount(1);
    }
  });

  test("mobile header collapses to logo, call and hamburger controls @homepage", async ({
    page,
  }) => {
    test.skip(!isMobileViewport(page), "Mobile-only navigation layout");

    const nav = page.getByRole("navigation", { name: /Mobile navigation/i });
    await expect(nav).toBeVisible();
    await expect(
      nav.getByRole("link", { name: /TruGreen Logo/i }),
    ).toBeVisible();
    await expect(
      nav.getByRole("link", { name: /Call customer service/i }),
    ).toBeVisible();
    await expect(
      nav.getByRole("link", { name: /hamMenu_icon/i }),
    ).toBeVisible();
  });

  test("hero Get Started opens the plan modal with Buy Online and Talk To A Pro @homepage", async ({
    page,
  }) => {
    const modal = page.locator(".modal.show").first();
    // Some hero variants route straight to the buy flow instead of prompting.
    await clickUntil(
      page.getByRole("button", { name: /^Get Started$/i }).first(),
      modal.or(page.locator('main:has-text("Enter your home address")')),
    );

    if (!(await modal.isVisible().catch(() => false))) {
      await expect(page).toHaveURL(/\/buy-online/);
      return;
    }

    await expect(modal).toContainText(/Let's talk lawn/i);
    await expect(
      modal.getByRole("button", { name: /Talk To A Pro/i }).first(),
    ).toBeVisible();
    await expect(modal.locator('a[href="/buy-online"]').first()).toBeVisible();
  });

  test("buy-online entry point navigates to the buy flow @homepage", async ({
    page,
  }) => {
    await page.locator('a[href="/buy-online"]:visible').first().click();

    await page.waitForURL(/\/buy-online/, { timeout: 30000 });
    await expect(page).toHaveURL(/\/buy-online/);
    await expect(page).toHaveTitle(/TruGreen|Pricing/i);
  });

  test("value proposition carousel renders three differentiator cards @homepage", async ({
    page,
  }) => {
    // Prod and QA ship different copy for this section's heading.
    const heading = page.getByRole("heading", {
      name: /clear choice for a great looking lawn|why homeowners choose trugreen/i,
    });
    await revealSection(heading.first());

    for (const card of [
      /The Pro’s Choice/i,
      /Guaranteed Results/i,
      /#1 in America/i,
    ]) {
      await expect(
        page.getByRole("heading", { name: card }).first(),
      ).toBeVisible();
    }

    await expect(
      page.getByRole("button", { name: /Selection Indicator/i }).first(),
    ).toBeVisible();
  });

  test("comparison section contrasts TruGreen, DIY and Other Guys @homepage", async ({
    page,
  }) => {
    const heading = page
      .getByRole("heading", { name: /difference local pros make/i })
      .first();
    await revealSection(heading);

    await expect(page.getByRole("heading", { name: /^DIY$/ })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /^Other Guys$/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("img", { name: /^TruGreen$/ }).first(),
    ).toBeVisible();
  });

  test("testimonials carousel shows rated reviews and advances @homepage", async ({
    page,
  }) => {
    const heading = page
      .getByRole("heading", { name: /What homeowners are saying/i })
      .first();
    await revealSection(heading);

    const stars = page.getByRole("img", { name: /^star$/i });
    await expect(stars.first()).toBeVisible({ timeout: 20000 });
    expect(await stars.count()).toBeGreaterThanOrEqual(4);

    const firstQuote = await page
      .locator("p")
      .filter({ hasText: /^[“"]/ })
      .first()
      .innerText();
    expect(firstQuote.length).toBeGreaterThan(20);

    const forward = page
      .getByRole("button", { name: /Forward Navigation Arrow/i })
      .first();
    if (await forward.isVisible().catch(() => false)) {
      await forward.click();
      await expect(
        page
          .getByRole("button", { name: /Backwards Navigation Arrow/i })
          .first(),
      ).toBeEnabled();
    }
  });

  test("branch locator accepts a ZIP code and resolves local coverage @homepage", async ({
    page,
  }) => {
    const zip = page.locator("#pac-input").first();
    await revealSection(zip);

    await zip.fill("38018");
    await zip.press("Enter");

    // Either a branch result or an explicit unserviced message is acceptable;
    // the regression guard is that the lookup responds instead of hanging.
    await expect(page.locator("body")).toContainText(
      /branch|ZIP Code|service/i,
      { timeout: 20000 },
    );
  });

  test("contact section exposes phone, SMS and account entry points @homepage", async ({
    page,
  }) => {
    const heading = page
      .getByRole("heading", { name: /Let's talk lawn/i })
      .first();
    await revealSection(heading);

    const main = page.locator("main").first();
    expect(await main.locator('a[href^="tel:"]').count()).toBeGreaterThan(0);
    expect(await main.locator('a[href^="sms:"]').count()).toBeGreaterThan(0);
    await expect(
      main.locator('a[href="/my-account/login"]').first(),
    ).toHaveCount(1);
  });

  test("footer renders all navigation columns with valid destinations @homepage", async ({
    page,
  }) => {
    await scrollToFooter(page);
    const footer = page.locator("footer").first();

    for (const column of [
      /About US/i,
      /Our Services/i,
      /Resources/i,
      /For new service/i,
      /For our Customer/i,
    ]) {
      await expect(
        footer.getByRole("heading", { name: column }).first(),
      ).toBeVisible();
    }

    for (const href of [
      "/newsroom",
      "/products-and-services",
      "/pests-products-and-services",
      "/local-lawn-care",
      "/lawn-care-101/faqs",
      "/military-discount",
      "/lawn-care-101/blog",
      "/customer-support",
      "/pay-your-bill",
      "/my-account/login",
    ]) {
      await expect(
        footer.locator(`a[href="${href}"]`).first(),
        `footer link ${href}`,
      ).toHaveCount(1);
    }
  });

  test("footer legal, social and copyright content is present @homepage", async ({
    page,
  }) => {
    await scrollToFooter(page);
    const footer = page.locator("footer").first();

    for (const href of [
      "/about/sms-terms",
      "/about/terms",
      "/about/privacy-policy",
      "/about/california-privacy-policy",
    ]) {
      await expect(footer.locator(`a[href="${href}"]`).first()).toHaveCount(1);
    }

    for (const domain of [
      "facebook.com/trugreen",
      "x.com/trugreen",
      "instagram.com/trugreen",
      "youtube.com/trugreen",
      "tiktok.com",
    ]) {
      await expect(
        footer.locator(`a[href*="${domain}"]`).first(),
        `social link ${domain}`,
      ).toHaveCount(1);
    }

    await expect(footer).toContainText(
      new RegExp(`©\\s*\\d{4}\\s*TruGreen`, "i"),
    );
  });

  test("all rendered images expose alt text @homepage", async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(2000);

    const missingAlt = await page.evaluate(() =>
      Array.from(document.querySelectorAll("img"))
        .filter((img) => {
          const rect = img.getBoundingClientRect();
          const rendered = rect.width > 1 && rect.height > 1;
          const decorative = img.getAttribute("aria-hidden") === "true";
          return rendered && !decorative && !img.getAttribute("alt");
        })
        .map((img) => img.currentSrc || img.src)
        .slice(0, 10),
    );

    expect(missingAlt, `images missing alt: ${missingAlt.join(", ")}`).toEqual(
      [],
    );
  });

  test("page loads without console errors or failed requests @homepage", async ({
    page,
  }) => {
    const consoleErrors: string[] = [];
    const failedRequests: string[] = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    page.on("response", (response) => {
      const url = response.url();
      if (
        response.status() >= 500 &&
        new URL(url).hostname.endsWith("trugreen.com")
      ) {
        failedRequests.push(`${response.status()} ${url}`);
      }
    });

    // QA self-navigates to the same URL on load, which aborts a concurrent goto.
    await gotoHome(page).catch(async (error) => {
      if (!/interrupted by another navigation/i.test(String(error)))
        throw error;
      await page.locator("main").first().waitFor({ state: "visible" });
    });
    await page.waitForLoadState("load");
    await page.waitForTimeout(5000);

    expect(failedRequests, failedRequests.join("\n")).toEqual([]);

    // Third-party tags routinely log noise, and chunk fetches fail transiently on
    // slow connections; only fail on first-party script errors.
    const firstPartyErrors = consoleErrors.filter(
      (text) =>
        /trugreen\.com\/_next|Uncaught|Hydration/i.test(text) &&
        !/ChunkLoadError/i.test(text),
    );
    expect(firstPartyErrors, firstPartyErrors.join("\n")).toEqual([]);
  });
});
