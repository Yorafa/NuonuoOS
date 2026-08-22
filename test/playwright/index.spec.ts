import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { ACCESSIBILITY_EXCEPTION_IDS } from "test/playwright/constants";
import {
  captureConsoleLogs,
  clockCanvasMaybeIsVisible,
  desktopEntriesAreVisible,
  loadApp,
  startButtonIsVisible,
  taskbarIsVisible,
} from "test/playwright/functions";

test.beforeEach(async ({ browserName, page }) => {
  const fixtures = { browserName, page };
  captureConsoleLogs()(fixtures);
  await loadApp()(fixtures);
  await desktopEntriesAreVisible(fixtures);
  await taskbarIsVisible(fixtures);
  await startButtonIsVisible(fixtures);
  await clockCanvasMaybeIsVisible(fixtures);
});

test("can pass accessibility scan", async ({ page }) =>
  expect(
    (
      await new AxeBuilder({ page })
        .disableRules(ACCESSIBILITY_EXCEPTION_IDS)
        .analyze()
    ).violations
  ).toEqual([]));
