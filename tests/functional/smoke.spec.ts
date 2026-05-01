import { test, expect } from "@playwright/test";
import { getBaseUrl } from "../../utils/config";

test.describe("TruGreen basic smoke suite @smoke", () => {
  test.slow();

  const runWithSmokeLogging = async (
    testInfo: Parameters<Parameters<typeof test>[1]>[1],
    body: () => Promise<void>,
  ) => {
    console.log(`[SMOKE][START][${testInfo.project.name}] ${testInfo.title}`);

    const startedAt = Date.now();
    let outcome: "PASS" | "FAIL" = "PASS";
    const detailLines: string[] = [];

    try {
      await body();
    } catch (error) {
      outcome = "FAIL";

      const message =
        error instanceof Error
          ? error.message
          : String(error ?? "Unknown error");
      const errorLine = `[SMOKE][ERROR] ${message}`;
      console.error(errorLine);
      detailLines.push(errorLine);

      throw error;
    } finally {
      const duration = `${((Date.now() - startedAt) / 1000).toFixed(2)}s`;
      const summary = `[SMOKE][${outcome}][${testInfo.project.name}] ${testInfo.title} (${duration})`;

      console.log(summary);

      const reportLines = [
        summary,
        `outcome=${outcome}`,
        `duration=${duration}`,
        `project=${testInfo.project.name}`,
        ...detailLines,
      ];

      await testInfo.attach("smoke-result", {
        body: Buffer.from(`${reportLines.join("\n")}\n`, "utf-8"),
        contentType: "text/plain",
      });
    }
  };

  test("home page loads with core branding", async ({ page }, testInfo) => {
    await runWithSmokeLogging(testInfo, async () => {
      await page.goto(getBaseUrl(), { waitUntil: "domcontentloaded" });

      await expect(page).toHaveTitle(/TruGreen/i);
      await expect(
        page.getByRole("link", { name: /TruGreen Logo/i }),
      ).toBeVisible();
      await expect(page.locator("h1").first()).toContainText(/lawn|trugreen/i, {
        timeout: 15000,
      });
    });
  });

  test("buy-online entry point is available from home", async ({
    page,
  }, testInfo) => {
    await runWithSmokeLogging(testInfo, async () => {
      await page.goto(getBaseUrl(), { waitUntil: "domcontentloaded" });

      await expect(page.locator("body")).toContainText(
        /Start Today|sign up online/i,
        {
          timeout: 15000,
        },
      );
    });
  });

  test("customer support page renders key support content", async ({
    page,
  }, testInfo) => {
    await runWithSmokeLogging(testInfo, async () => {
      await page.goto(`${getBaseUrl()}/customer-support`, {
        waitUntil: "domcontentloaded",
      });

      await expect(page).toHaveURL(/\/customer-support/);
      await expect(page.locator("h1").first()).toContainText(
        /Need some help/i,
        {
          timeout: 15000,
        },
      );
      await expect(
        page.getByRole("link", { name: /Pay My Bill/i }),
      ).toBeVisible();
    });
  });

  test("lawn care 101 page renders educational content", async ({
    page,
  }, testInfo) => {
    await runWithSmokeLogging(testInfo, async () => {
      await page.goto(`${getBaseUrl()}/lawn-care-101`, {
        waitUntil: "domcontentloaded",
      });

      await expect(page).toHaveURL(/\/lawn-care-101/);
      await expect(page.locator("h1").first()).toContainText(/Lawn Care 101/i, {
        timeout: 15000,
      });
      await expect(
        page.getByRole("link", { name: /FAQs/i }).first(),
      ).toBeVisible();
    });
  });

  test("buy-online page is reachable", async ({ page }, testInfo) => {
    await runWithSmokeLogging(testInfo, async () => {
      await page.goto(`${getBaseUrl()}/buy-online`, {
        waitUntil: "domcontentloaded",
      });

      await expect(page).toHaveURL(/\/buy-online/);
      await expect(page).toHaveTitle(/Customized Lawn Care Pricing|TruGreen/i);
      await expect(page.locator("body")).toContainText(
        /Custom Web Exclusive Quote|Need help\?|Enter your address/i,
        {
          timeout: 15000,
        },
      );
    });
  });
});
