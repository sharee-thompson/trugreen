import { expect, test as base, Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { createHtmlReport } from "axe-html-reporter";
import fs from "fs";
import path from "path";

type AxeReport = {
  violations: any[];
  pageTitle: string;
  url: string;
};

type RunAxeOptions = {
  includeSelector?: string;
  rules?: string[];
};

type AxeFixtures = {
  runAxeScan: (
    page: Page,
    fullUrl: string,
    options?: RunAxeOptions,
  ) => Promise<AxeReport>;
};

export const test = base.extend<AxeFixtures>({
  runAxeScan: async ({}, use, testInfo) => {
    await use(async (page: Page, fullUrl: string, options?: RunAxeOptions) => {
      let builder = new AxeBuilder({ page })
        .exclude("")
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]);

      if (options?.includeSelector) {
        builder = builder.include(options.includeSelector);
      }

      if (options?.rules?.length) {
        builder = builder.withRules(options.rules);
      }

      const results = await builder.analyze();

      const seriousViolations = results.violations.filter(
        (v) => v.impact === "serious" || v.impact === "critical",
      );

      const baseDir = "accessibility-reports";
      const jsonDir = path.join(baseDir, "axe-json");
      const htmlDir = path.join(baseDir, "axe-html");

      fs.mkdirSync(jsonDir, { recursive: true });
      fs.mkdirSync(htmlDir, { recursive: true });

      const urlObj = new URL(fullUrl);
      const pathSlug =
        urlObj.pathname.replace(/^\/|\/$/g, "").replace(/\//g, "-") || "home";
      const projectPrefix = testInfo.project.name;
      const fileBase = `${projectPrefix}_${pathSlug}`;

      const pageTitle = await page.title();
      const axeReport: AxeReport = {
        ...results,
        pageTitle,
        url: page.url(),
      };

      const jsonPath = path.join(jsonDir, `${fileBase}.json`);
      fs.writeFileSync(jsonPath, JSON.stringify(axeReport, null, 2), "utf-8");

      const htmlFileName = `${fileBase}.html`;
      const htmlPath = path.join(htmlDir, htmlFileName);

      createHtmlReport({
        results: axeReport,
        options: {
          outputDir: htmlDir,
          reportFileName: htmlFileName,
          projectKey: "Accessibility Audit",
        },
      });

      await testInfo.attach(`axe-${fileBase}-report`, {
        path: htmlPath,
        contentType: "text/html",
      });

      expect(seriousViolations).toEqual([]);

      return axeReport;
    });
  },
});

export { expect };
