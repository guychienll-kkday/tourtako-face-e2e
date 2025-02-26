import { Locator, Page } from "playwright";

interface FillPackageQuotaProps {
  page: Page;
}

async function fill(params: FillPackageQuotaProps) {
  const { page } = params;

  const packageContentSection = page.getByTestId("package-content");

  await packageContentSection.getByRole("button", { name: "儲存" }).click();
}

export { fill };
