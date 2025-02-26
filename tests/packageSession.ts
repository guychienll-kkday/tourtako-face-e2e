import { Page } from "@playwright/test";
import { selectDuration, selectTime } from "./utils";

interface FillPackageSessionProps {
  page: Page;
}

async function fill(params: FillPackageSessionProps) {
  const { page } = params;

  const packageContentSection = page.getByTestId("package-content");


  const weekdaysField = packageContentSection.getByTestId("field.weekdays");
  await weekdaysField
    .getByRole("button", {
      name: "週一",
    })
    .click();

  const createModeField = packageContentSection.getByTestId("field.createMode");
  await createModeField
    .getByRole("radio", {
      name: "新增自訂時段",
    })
    .click();


  const customSessionDurationField = packageContentSection.getByTestId(
    "field.customSessionDuration"
  );
  await selectDuration({
    field: customSessionDurationField,
    hours: "1",
    minutes: "10",
    page,
  });

  const startListField = packageContentSection.getByTestId("field.startList");
  await selectTime({
    field: startListField,
    hours: "01",
    minutes: "10",
    page,
  });
  await selectTime({
    field: startListField,
    hours: "02",
    minutes: "10",
    page,
  });

  await page.getByRole("button", { name: "建立場次" }).click();

  await packageContentSection.getByRole("tab", { name: "編輯與刪除" }).click();

  //update mode
  const updateModeField = packageContentSection.getByTestId("field.updateMode");
  await updateModeField
    .getByRole("radio", {
      name: "刪除場次",
    })
    .click();

  const sessionTable = packageContentSection.getByRole("table");
  await sessionTable.getByRole("option", { name: /01:10/ }).click();

  await packageContentSection.getByRole("button", { name: "刪除" }).click();

  await page.getByRole("button", { name: "儲存" }).click();

  await page.getByRole("button", { name: "下一步" }).click();
}

export { fill };
