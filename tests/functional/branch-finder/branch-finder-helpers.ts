import { expect, type BrowserContext, type Page } from "@playwright/test";

export type BranchFinderSelectors = {
  trigger: string;
  zipInput: string;
  searchButton: string;
  dialog: string;
};

export const REACT_HEADER_SELECTORS: BranchFinderSelectors = {
  trigger: "#react-header-zipcode-data",
  zipInput: ".zipcode.d-s",
  searchButton: ".d-search-zip-click",
  dialog: ".zip-section",
};

export const DRUPAL_HEADER_SELECTORS: BranchFinderSelectors = {
  trigger: "#header-zipcode-data, #react-header-zipcode-data",
  zipInput: ".zipcode.d-s",
  searchButton: ".d-search-zip-click",
  dialog: ".zip-section",
};

type SubmitMethod = "click" | "enter";

export const openBranchFinder = async (
  page: Page,
  selectors: BranchFinderSelectors,
) => {
  const trigger = page.locator(selectors.trigger).first();
  const dialog = page.locator(selectors.dialog).first();
  await trigger.waitFor({ state: "visible" });

  await expect
    .poll(
      async () => {
        await trigger.click();
        return dialog.isVisible();
      },
      { timeout: 15_000, intervals: [100, 250, 500] },
    )
    .toBe(true);
};

export const submitZip = async (
  page: Page,
  selectors: BranchFinderSelectors,
  zip: string,
  expectedBranchPath: string,
  submitMethod: SubmitMethod,
) => {
  const startingUrl = page.url();
  const zipInput = page.locator(selectors.zipInput).first();
  let dialogOpened = false;
  const branchDetailRequests: string[] = [];
  const failedRequests: string[] = [];
  const branchFinderConsoleErrors: string[] = [];
  page.on("response", (response) => {
    if (response.url().includes("GetBranchDetails")) {
      branchDetailRequests.push(`${response.status()} ${response.url()}`);
    }
  });
  page.on("requestfailed", (request) => {
    failedRequests.push(
      `${request.failure()?.errorText ?? "unknown error"} ${request.url()}`,
    );
  });
  page.on("console", (message) => {
    const text = message.text();
    if (
      message.type() === "error" &&
      /GetBranchDetails|qa2api|branchProducts|CORS|zip.?code/i.test(text)
    ) {
      branchFinderConsoleErrors.push(text);
    }
  });

  try {
    await openBranchFinder(page, selectors);
    dialogOpened = true;
    await zipInput.fill(zip);

    if (submitMethod === "enter") {
      await zipInput.press("Enter");
    } else {
      await page
        .locator(selectors.searchButton)
        .first()
        .evaluate((element) => {
          (element as HTMLElement).click();
        });
    }
    await expect(page).toHaveURL(
      new RegExp(`${escapeRegExp(expectedBranchPath)}(?:\\?.*)?$`),
      { timeout: 20_000 },
    );
  } catch (error) {
    const dialogState = await page
      .locator(selectors.dialog)
      .first()
      .evaluate((element) => {
        const style = window.getComputedStyle(element);
        return `display=${style.display}, visibility=${style.visibility}`;
      })
      .catch(() => "not found");

    const diagnostics = [
      "[branch-finder] ZIP submission diagnostics",
      `  entered ZIP: ${zip}`,
      `  submission: ${submitMethod}`,
      `  expected branch path: ${expectedBranchPath}`,
      `  actual URL: ${page.url()}`,
      `  input value: ${await zipInput.inputValue().catch(() => "not readable")}`,
      `  dialog: ${dialogState}`,
      `  GetBranchDetails responses: ${branchDetailRequests.join(" | ") || "none"}`,
      `  failed requests: ${failedRequests.join(" | ") || "none"}`,
      `  relevant browser errors: ${branchFinderConsoleErrors.join(" | ") || "none"}`,
      `  likely cause: ${getLikelyFailureCause(
        branchDetailRequests,
        failedRequests,
        branchFinderConsoleErrors,
      )}`,
    ].join("\n");

    const expectedResult = [
      "Branch Finder dialog becomes visible",
      `ZIP ${zip} is accepted`,
      "GetBranchDetails returns successfully",
      `browser redirects to ${expectedBranchPath}`,
    ].join("; ");

    console.log(
      [
        "[branch-finder] ZIP lookup failed",
        `  starting page: ${startingUrl}`,
        `  action attempted: Open Branch Finder, enter ZIP ${zip}, then submit with ${submitMethod === "enter" ? "Enter" : "the Search button"}`,
        `  expected result: ${expectedResult}`,
        "  actual result:",
        `    dialog visible: ${dialogOpened}`,
        `    current URL: ${page.url()}`,
        `    ZIP input value: ${await zipInput.inputValue().catch(() => "not available because the dialog did not open")}`,
        `    GetBranchDetails responses: ${branchDetailRequests.join(" | ") || "none"}`,
        `    failed requests: ${failedRequests.join(" | ") || "none"}`,
        `    relevant browser errors: ${branchFinderConsoleErrors.join(" | ") || "none"}`,
        `  failure point: ${dialogOpened ? "ZIP submission or redirect" : "Branch Finder dialog did not become visible after clicking the header trigger"}`,
        `  likely cause: ${getLikelyFailureCause(
          branchDetailRequests,
          failedRequests,
          branchFinderConsoleErrors,
        )}`,
        diagnostics,
      ].join("\n"),
    );
    throw error;
  }
};

export const expectPersistedZip = async (
  page: Page,
  selectors: BranchFinderSelectors,
  zip: string,
) => {
  await expect
    .poll(async () => {
      const trigger = page.locator(selectors.trigger).first();
      return trigger.evaluate((element) => {
        const input = element as HTMLInputElement;
        return `${element.textContent ?? ""} ${input.value ?? ""}`;
      });
    })
    .toContain(zip);

  await expect
    .poll(() =>
      page.evaluate((expectedZip) => {
        return Array.from({ length: localStorage.length }, (_, index) => {
          const key = localStorage.key(index);
          return key ? (localStorage.getItem(key) ?? "") : "";
        }).some((value) => value.includes(expectedZip));
      }, zip),
    )
    .toBe(true);
};

export const expectZipInNewTab = async (
  context: BrowserContext,
  route: string,
  selectors: BranchFinderSelectors,
  zip: string,
) => {
  const newTab = await context.newPage();
  await newTab.goto(route, { waitUntil: "domcontentloaded" });
  await expectPersistedZip(newTab, selectors, zip);
  await newTab.close();
};

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const getLikelyFailureCause = (
  branchDetailRequests: string[],
  failedRequests: string[],
  consoleErrors: string[],
) => {
  const observedMessages = [
    ...branchDetailRequests,
    ...failedRequests,
    ...consoleErrors,
  ].join(" ");

  if (/qa2api|CORS|branchProducts/i.test(observedMessages)) {
    return "The branch lookup API was blocked or reached the wrong endpoint; inspect the qa2api/CORS error above.";
  }
  if (!branchDetailRequests.length) {
    return "No GetBranchDetails response was observed after submission; the ZIP action did not start the branch lookup.";
  }
  return "The branch lookup responded, but the page did not navigate to the expected local branch path.";
};
