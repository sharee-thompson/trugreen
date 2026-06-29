import { Page, TestInfo, expect } from "@playwright/test";

export async function closeCookieBanner(page: Page): Promise<void> {
  const acceptButton = page.getByRole("button", {name: "Accept All Cookies"});

  try {
    await acceptButton.waitFor({ state: "visible", timeout: 5000});
    await acceptButton.click();
    await acceptButton.waitFor({ state: "hidden", timeout: 5000})
  } catch {

  }
}


