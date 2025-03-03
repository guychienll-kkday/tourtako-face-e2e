import { BrowserContext, test } from "@playwright/test";
import path from "path";
import { chromium } from "playwright";
import * as packageCalendar from "./packageCalendar";
import * as pacakgeIntro from "./packageIntro";
import * as packageItems from "./packageItems";
import * as packagePrice from "./packagePrice";
import * as packageQuota from "./packageQuota";
import * as packageSession from "./packageSession";
import { createPackage, deletePackage } from "./utils";

async function beforeAll(context: BrowserContext) {
  await context.addInitScript({
    path: path.join(__dirname, "init.js"),
  });
  await context.addCookies([
    {
      name: "token",
      value: JSON.stringify(
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50Ijp7InV1aWQiOiJhNzY4Nzk1NC1kNTQyLTRkMTgtYjNhOS1kZTcxMDcwYTE4Y2MiLCJhY2NvdW50IjoiZ3V5Y2hpZW5sbC1ra2RheSIsImVtYWlsIjoiZ3V5LmxpbkBra2RheS5jb20iLCJwaG9uZUlUSSI6bnVsbCwicGhvbmUiOiIiLCJmaXJzdE5hbWUiOiJHdXkiLCJsYW5ndWFnZVV1aWQiOiIzMGVlZTgyZS1lY2NiLTQzMGItOTc3NC05YTIzMWE1ZjZiNTEiLCJ0aW1lem9uZVV1aWQiOiJlMWI2NzRkZC05ZTA5LTRmMTAtYjM4YS01ODY1MDg1ODA4ZDgiLCJ2ZXJpZnlTdGF0dXMiOjAsImFjdGl2ZVN0YXR1cyI6MSwiY3JlYXRlZEF0IjoiMjAyNC0wNC0xMCAwODoxNzo1MSswMCIsInVwZGF0ZWRBdCI6IjIwMjUtMDItMjRUMDI6MjI6MjQuMDAwMDAwWiIsImxhc3ROYW1lIjoiTGluIiwiam9iVGl0bGUiOiIiLCJwaG90byI6bnVsbCwibGFzdExvZ2luVGltZSI6IjIwMjUtMDItMjRUMDI6MjI6MjQrMDA6MDAiLCJzeXN0ZW1QZXJtaXNzaW9uIjowLCJpc1JvYm90IjpmYWxzZSwiZ29vZ2xlSWQiOiIxMTM2OTg2MzIzODIzMTU4NTExNzkiLCJpZCI6MzkyMywiaXNSZWNlbnRseVVzZWQiOnRydWUsImZhaWxlZExvZ2luVGltZXMiOjB9LCJzdG9yZVV1aWQiOiI4YTAyMjAyZS02MTE5LTRhMmYtODQzYy1jMTg1MGIwZmEwYTQiLCJvd25lclV1aWQiOiIzNTFlMGQwYi0yMDk4LTQxOWQtYTdlMy1kZmE2MjcwNWZjMzciLCJzdG9yZU1haW5BY2NvdW50VXVpZCI6IjFkODNhMTUzLTAxNDEtNDdhZi1hZDM5LWFkMzQ5NDNhODk4MyIsIm93bmVyTWFpbkFjY291bnRVdWlkIjoiMWQ4M2ExNTMtMDE0MS00N2FmLWFkMzktYWQzNDk0M2E4OTgzIiwicGVybWlzc2lvbkdyb3VwVXVpZCI6IjljN2JhZjVkLTc1MTAtNDY4Yi1iMWUxLTgyZjE2ZWJlZTQzNCIsInByaWNlVGllciI6IlNVUEVSIiwicHJpY2VUaWVyVGl0bGUiOiJTVVBFUiIsInN1YnNjcmlwdGlvblN0YXR1cyI6NCwiY291bnRyeVV1aWQiOiIyM2ZkYjRiOC0wYThhLTQ2YWEtOTU3YS1lNGQ5MzhkOTg2NmQiLCJleHAiOjE3NDI5NTU3NDQsInBsYW5QZXJtaXNzaW9uIjpbIlJFWklPX0JBU0lDIiwiQVBJX1RPS0VOIiwiT05MSU5FX1BBWU1FTlQiLCJDVVNUT01fVk9VQ0hFUl9URU1QTEFURSIsIlZPVUNIRVJfT1RBX0tLREFZIiwiVk9VQ0hFUl9HRU5fTVVMVElQTEVfVElNRVMiLCJWT1VDSEVSX1JFREVFTV9NVUxUSVBMRV9USU1FUyIsIlZPVUNIRVJfU0VORF9SVUxFX1NFVFRJTkciLCJBTEdPTElBIiwiRElTVFJJQlVUSU9OIiwiQ0hBTk5FTCIsIkNIQU5ORUxfTVlTSVRFIiwiQ0hBTk5FTF9LS0RBWSIsIlNIT1BQSU5HX0NBUlQiLCJUSUNLRVQiLCJSRVpJT19FWFRSQSIsIlJFWklPX0FQUCIsIkNIQU5ORUxfS0tEQVlNS1AiLCJWT1VDSEVSX0NVU1RPTUVSX1JFREVFTSIsIkNIQU5ORUxfVFREIiwiQ0hBTk5FTF9WSUFUT1IiLCJDSEFOTkVMX0dZRyIsIkRJU1RSSUJVVElPTl9BUElfVE9LRU4iLCJLS0RBWV9TQ00iLCJDSEFOTkVMX0FDVElWSVRZSkFQQU4iLCJDSEFOTkVMX0pBTEFOIiwiT1JERVJfQkNDU0VUVElORyIsIlJFREVFTV9QRVJNSVNTSU9OIiwiQ1VSUkVOQ1lfT1BUSU9OUyIsIkxBTkdVQUdFX01FTlUiXX0.-DfAsUlXi3XneYr6UwlPmPBO9CX23Yio5ofzAQ7Za9I"
      ),
      domain: "localhost",
      path: "/",
    },
  ]);
}

const BASE_URL = "http://localhost:8081";
const PRODUCT_ID = "8718574b-d621-4f9f-b12b-4cf59a814a96";
// const PACKAGE_ID = "135002b0-f26d-11ef-9d46-b7b35c09a44a";

test("create a package - happy path", async () => {
  test.setTimeout(120_000);
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await beforeAll(context);

  await page.goto(BASE_URL);

  // await page.goto(
  //   `${BASE_URL}/product/add?packageId=${PACKAGE_ID}&packageStep=intro&productId=${PRODUCT_ID}&step=package`
  // );

  await page.goto(
    `${BASE_URL}/product/add?productId=${PRODUCT_ID}&step=package`
  );

  await createPackage(page);

  const packageDetail = page.getByTestId("package-content");
  await packageDetail.waitFor({ state: "visible" });

  await pacakgeIntro.fill({ page });

  await packageItems.fill({ page });

  await packageCalendar.fill({ page });

  await packageSession.fill({ page });

  await packagePrice.fill({ page });

  await packageQuota.fill({ page });

  await page.getByRole("button", { name: "準備就緒" }).click();

  await page.getByRole("button", { name: "暫停銷售" }).click();

  await page
    .getByRole("dialog")
    .getByRole("button", {
      name: /確定/,
    })
    .click();

  await page.getByRole("button", { name: "編輯" }).click();

  await deletePackage(page);
});
