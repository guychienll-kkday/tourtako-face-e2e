import { Locator, Page } from "playwright";

async function createPackage(page: Page) {
  await page.getByRole("button", { name: "新增方案" }).click();

  const createPackageDialog = page.getByRole("dialog");

  await createPackageDialog
    .getByRole("radio", { name: "出發日期＋時段" })
    .click({ force: true });

  await createPackageDialog.getByRole("button", { name: "下一步" }).click();

  await createPackageDialog
    .getByRole("radio", { name: "無數量上限" })
    .click({ force: true });

  await createPackageDialog.getByRole("button", { name: "下一步" }).click();

  await createPackageDialog
    .getByRole("radio", { name: "否，我要自定義選購單位" })
    .click({ force: true });

  await createPackageDialog.getByRole("button", { name: "下一步" }).click();

  await createPackageDialog.getByRole("button", { name: "下一步" }).click();

  await createPackageDialog
    .getByTestId("field.packageName")
    .getByRole("textbox")
    .fill(`${new Date().toISOString()}`);

  await createPackageDialog.getByRole("button", { name: "新增方案" }).click();
}

async function deletePackage(page: Page) {
  await page.getByRole("button", { name: "more-actions" }).click();

  const actionList = page.getByRole("list");

  await actionList.getByRole("button", { name: "刪除方案" }).click();

  const deleteDialog = page.getByRole("dialog");

  await deleteDialog.getByRole("button", { name: "刪除" }).click();
}

interface SelectDurationProps {
  field: Locator;
  hours: string;
  minutes: string;
  page: Page;
}

async function selectDuration(params: SelectDurationProps) {
  const { field, hours, minutes, page } = params;

  // 打開小時選單
  await field
    .getByRole("list", { name: "hours" })
    .getByRole("combobox")
    .getByRole("button", {
      name: "arrow-drop-down",
    })
    .click();

  await page.getByRole("menuitem", { name: hours, exact: true }).click();

  // 打開分鐘選單
  await field
    .getByRole("list", { name: "minutes" })
    .getByRole("combobox")
    .getByRole("button", {
      name: "arrow-drop-down",
    })
    .click();

  await page.getByRole("menuitem", { name: minutes, exact: true }).click();
}

interface SelectDatesProps {
  page: Page;
  dates: string[];
}

async function selectDates(params: SelectDatesProps) {
  const { page, dates } = params;
  const selectableCalendar = page.getByRole("dialog");

  for (const date of dates) {
    await selectableCalendar
      .getByRole("option", {
        name: date.padStart(2, "0"),
        disabled: false,
        exact: true,
      })
      .first()
      .click();
  }

  await selectableCalendar
    .getByRole("button", {
      name: "確認",
    })
    .click();
}

interface SelectTimeProps {
  field: Locator;
  page: Page;
  hours: string;
  minutes: string;
}

async function selectTime(params: SelectTimeProps) {
  const { field, page, hours, minutes } = params;

  await field.getByRole("combobox").click();

  const timePicker = page.getByRole("dialog");

  await timePicker
    .getByRole("list", { name: "hours" })
    .getByLabel(hours)
    .click();

  await timePicker
    .getByRole("list", { name: "minutes" })
    .getByLabel(minutes)
    .click();

  await timePicker.getByRole("button", { name: "確認" }).click();
}

export {
  createPackage,
  deletePackage,
  selectDates,
  selectDuration,
  selectTime,
};
