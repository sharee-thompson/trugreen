import { expect, test } from "@playwright/test";
import  paths  from "../../utils/paths";
import { getBaseUrl } from "../../utils";

test(
  "Regression, Link Pages Links Validation",
  { tag: ["@regression", "@link-validation", "@links"] },
  async ({ page, request }) => {
      const baseUrl = getBaseUrl();
      const checked = new Set<string>();

      for (const path of paths) {
        const pageUrl = new URL(path, baseUrl).href;
        await test.step(`Crawl & validate links on: ${pageUrl}`, async () => {
          await page.goto(pageUrl);

          const hrefs = await page
            .locator("a[href]")
            .evaluateAll((anchors) =>
              anchors.map((a) => (a as HTMLAnchorElement).getAttribute("href")),
            );

            const urls = new Set<string>();
            for (const href of hrefs) {
              if (!href) continue;
              try {
                const resolved = new URL(href, pageUrl);
                if (resolved.protocol.startsWith("http")) {
                  urls.add(resolved.href);
                }
              } catch {
                // skip malformed hrefs
              }
            }  
            for (const url of urls) {
              if (checked.has(url)) continue;
              checked.add(url);

              const response = await request.get(url, {
                failOnStatusCode: false,
              });
              await expect
                .soft(response, `Broken link "${url}" found on ${pageUrl}`)
                .toBeOK();
            }
        });
      }
  },
);