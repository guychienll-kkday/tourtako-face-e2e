import path from "path";
import { Page } from "playwright";
interface FillPackageIntroProps {
  page: Page;
}

async function fill(params: FillPackageIntroProps) {
  const { page } = params;

  const packageContentSection = page.getByTestId("package-content");

  const packageNameInput = packageContentSection
    .getByTestId("field.name")
    .getByRole("textbox");
  await packageNameInput.clear();
  await packageNameInput.fill(`${new Date().toISOString()} 測試方案名稱`);

  const packageDescInput = packageContentSection
    .getByTestId("field.description")
    .getByRole("textbox");
  await packageDescInput.clear();
  await packageDescInput.fill("測試方案描述");

  // const selectMediaBtn = packageContentSection
  //   .getByTestId("field.cover")
  //   .getByRole("button", {
  //     name: "選擇媒體庫",
  //   });

  // await selectMediaBtn.click();

  // const mediaLibraryDialog = page.getByRole("dialog");

  // await mediaLibraryDialog
  //   .getByRole("button", {
  //     name: /.*\.(jpg|png|jpeg)/,
  //   })
  //   .first()
  //   .click();

  // await mediaLibraryDialog.getByRole("button", { name: "確定" }).click();

  const fileChooserPromise = page.waitForEvent("filechooser");

  await packageContentSection
    .getByTestId("field.cover")
    .getByRole("button", { name: "上傳圖片" })
    .click();

  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(path.join(__dirname, "assets", "test.png"));

  await page.getByRole("button", { name: "儲存" }).click();

  await page.getByRole("button", { name: "下一步" }).click();
}

export { fill };
