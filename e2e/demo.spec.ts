import { test, expect } from "@playwright/test";
import { PacmonDemoSDK } from "./pacmonsdk";

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

  await expect(page.getByText("Balance Pool")).toBeHidden();
});

test.describe("demo", () => {
  let pacmon: PacmonDemoSDK;

  test.beforeAll(async () => {
    pacmon = new PacmonDemoSDK(24, "http://localhost:3033");
    await pacmon.init(94);
  });

  test.beforeEach(async ({ page }) => {
    await page.goto("./demo");
    await page.getByText("Connect Wallet").click();
    await page.getByText("Mock Wallet").click();
  });

  test("can input contract address", async ({ page }) => {
    await expect(page.getByText("Balance Pool")).toBeHidden();
    await page
      .getByLabel("PacDemo Contact Address")
      .fill(pacmon.contracts.demo);
    await expect(page.getByText("Balance Pool")).toBeVisible();
  });

  test.describe("config", () => {
    test.beforeEach(async ({ page }) => {
      await pacmon.disableDeposit();
      await pacmon.disableWithdraw();
      await page
        .getByLabel("PacDemo Contact Address")
        .fill(pacmon.contracts.demo);
    });

    test("deposit enabled", async ({ page }) => {
      await expect(page.getByText("Deposit Disabled")).toBeVisible();
      await pacmon.enableDeposit();
      await expect(page.getByText("Deposit Enabled")).toBeVisible();
    });

    test("withdraw enabled", async ({ page }) => {
      await expect(page.getByText("Withdraw Disabled")).toBeVisible();
      await pacmon.enableWithdraw();
      await expect(page.getByText("Withdraw Enabled")).toBeVisible();
    });
  });
});
