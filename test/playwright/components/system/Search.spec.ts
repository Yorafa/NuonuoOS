import { expect, test } from "@playwright/test";
import {
  TEST_SEARCH,
  TEST_SEARCH_RESULT_TITLE,
} from "test/playwright/constants";
import {
  captureConsoleLogs,
  clickSearchButton,
  disableWallpaper,
  loadApp,
  searchMenuIsHidden,
  searchMenuIsVisible,
  searchResultEntryIsVisible,
  typeInTaskbarSearchBar,
} from "test/playwright/functions";

test.beforeEach(async ({ browserName, page }) => {
  const fixtures = { browserName, page };
  captureConsoleLogs()(fixtures);
  await disableWallpaper(fixtures);
  await loadApp()(fixtures);
  await clickSearchButton(fixtures);
  await searchMenuIsVisible(fixtures);
});

test.describe("can close", () => {
  test("via button", async ({ page }) => {
    await clickSearchButton({ page });
    await searchMenuIsHidden({ page });
  });
});

test.describe("can search", () => {
  test("via 'All' tab", async ({ page }) => {
    await typeInTaskbarSearchBar(TEST_SEARCH, { page });
    await expect(() =>
      searchResultEntryIsVisible(TEST_SEARCH_RESULT_TITLE, { page })
    ).toPass();
  });
});
