import { Page } from "playwright";

interface FillPackageItemsProps {
  page: Page;
}

async function fill(params: FillPackageItemsProps) {
  const { page } = params;

  const packageContentSection = page.getByTestId("package-content");

  const unitField = packageContentSection.getByTestId("field.unitUuid");
  await unitField
    .getByRole("button", {
      name: "張",
    })
    .click();

  const nameField = packageContentSection.getByTestId("field.itemName");

  await nameField.getByRole("textbox").fill("桌子");

  await page.getByRole("button", { name: "新增" }).click();

  await page.getByRole("button", { name: "儲存" }).click();

  await page.getByRole("button", { name: "下一步" }).click();
}

export { fill };
