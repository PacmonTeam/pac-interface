import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("./demo");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/PACMON/);
});

test("can connect wallet", async ({ page }) => {
  await page.goto("./demo");

  await expect(page.getByText("Connect Wallet")).toBeVisible();
  await page.getByText("Connect Wallet").click();

  await expect(page.getByText("Mock Wallet")).toBeVisible();
  await page.getByText("Mock Wallet").click();

  await expect(page.getByText("0x67…340e")).toBeVisible();
});
