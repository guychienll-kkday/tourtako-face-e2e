import { Locator, Page } from "playwright";

interface FillPackagePriceProps {
  page: Page;
}

async function fill(params: FillPackagePriceProps) {
  const { page } = params;

  const packageContentSection = page.getByTestId("package-content");

  const priceTableField = packageContentSection.getByTestId("field.priceTable");

  const firstRow = priceTableField.getByTestId("row-0");
  const [_header, ...cells] = await firstRow.getByRole("cell").all();

  for (const cell of cells) {
    await cell.getByRole("textbox").fill("100");
  }

  await page.getByRole("button", { name: "儲存" }).click();

  await page.getByRole("button", { name: "下一步" }).click();
}

export { fill };
