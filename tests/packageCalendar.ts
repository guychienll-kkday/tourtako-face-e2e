import { Page } from "playwright";
import { selectDates, selectDuration, selectTime } from "./utils";

interface FillPackageCalendarProps {
  page: Page;
}

async function fill(params: FillPackageCalendarProps) {
  const { page } = params;

  const packageContentSection = page.getByTestId("package-content");

  const rangeField = packageContentSection.getByTestId("field.range");

  await rangeField
    .getByRole("combobox", {
      name: "date-picker",
    })
    .click();

  const [startDate, endDate] = [
    `${new Date().getDate()}`,
    `${new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0
    ).getDate()}`,
  ];

  await selectDates({
    dates: [startDate, endDate],
    page,
  });

  // 開放預約時間欄位
  const sessionOpeningRuleField = packageContentSection.getByTestId(
    "field.sessionOpeningRuleStub"
  );

  // 選擇無限制
  const allDayOption = sessionOpeningRuleField
    .getByRole("radio", {
      name: "無限制",
    })
    .locator("..");
  await allDayOption
    .getByRole("radio", {
      name: "無限制",
    })
    .click();

  // 選擇體驗開始前
  const openingBeforeSessionOption = sessionOpeningRuleField
    .getByRole("radio", {
      name: "體驗開始前",
    })
    .locator("..");
  await openingBeforeSessionOption
    .getByRole("radio", {
      name: "體驗開始前",
    })
    .click();
  await openingBeforeSessionOption.getByPlaceholder("請輸入").fill("1");
  await selectTime({
    field: openingBeforeSessionOption,
    hours: "01",
    minutes: "10",
    page,
  });

  // 選擇當日
  const onDateOption = sessionOpeningRuleField
    .getByRole("radio", {
      name: "當日",
    })
    .locator("..");
  await onDateOption.getByRole("radio").click();
  await selectTime({
    field: onDateOption,
    hours: "01",
    minutes: "10",
    page,
  });

  // 截止預約時間
  const sessionClosingRuleField = packageContentSection.getByTestId(
    "field.sessionClosingRuleStub"
  );

  // 選擇體驗開始前
  const closingBeforeSessionOption = sessionClosingRuleField
    .getByRole("radio", {
      name: "體驗開始前",
    })
    .locator("..");

  await closingBeforeSessionOption
    .getByRole("radio", {
      name: "體驗開始前",
    })
    .click();

  await closingBeforeSessionOption.getByPlaceholder("請輸入").fill("1");
  await selectTime({
    field: closingBeforeSessionOption,
    hours: "01",
    minutes: "10",
    page,
  });

  // 選擇體驗結束前
  const closingAfterSessionOption = sessionClosingRuleField
    .getByRole("radio", {
      name: "體驗結束前",
    })
    .locator("..");

  await closingAfterSessionOption
    .getByRole("radio", {
      name: "體驗結束前",
    })
    .click();

  await selectDuration({
    field: closingAfterSessionOption,
    hours: "1",
    minutes: "10",
    page,
  });

  const excludeDatesField =
    packageContentSection.getByTestId("field.excludeDates");

  await excludeDatesField
    .getByRole("combobox", {
      name: "date-picker",
    })
    .click();

  await selectDates({
    dates: ["27"],
    page,
  });

  await page.getByRole("button", { name: "儲存" }).click();

  await page.getByRole("button", { name: "下一步" }).click();
}

export { fill };
