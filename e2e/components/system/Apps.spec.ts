import { test } from "@playwright/test";
import {
  DESKTOP_ENTRIES_SELECTOR,
  DRAG_HEADLESS_NOT_SUPPORTED_BROWSERS,
  TEST_APP_CONTAINER_APP,
  TEST_APP_CONTAINER_APP_TITLE,
} from "e2e/constants";
import {
  captureConsoleLogs,
  desktopEntriesAreVisible,
  disableWallpaper,
  dragFirstDesktopEntryToWindow,
  loadContainerTestApp,
  windowTitlebarTextIsVisible,
  windowsAreVisible,
} from "e2e/functions";

test.beforeEach(async ({ browserName, page }) => {
  const fixtures = { browserName, page };
  captureConsoleLogs()(fixtures);
  await disableWallpaper(fixtures);
});

test.describe("app container", () => {
  test.beforeEach(async ({ browserName, page }) => {
    const fixtures = { browserName, page };
    await loadContainerTestApp(fixtures);
    await windowsAreVisible(fixtures);
  });

  test("can drop", async ({ browserName, headless, page }) => {
    test.skip(
      headless && DRAG_HEADLESS_NOT_SUPPORTED_BROWSERS.has(browserName),
      "no headless drag support"
    );

    await windowTitlebarTextIsVisible(TEST_APP_CONTAINER_APP, { page });

    await desktopEntriesAreVisible({ page });
    await dragFirstDesktopEntryToWindow({ page });

    await windowTitlebarTextIsVisible(
      TEST_APP_CONTAINER_APP_TITLE(
        await page.locator(DESKTOP_ENTRIES_SELECTOR).first().textContent()
      ),
      { page }
    );
  });
});
