import {
  BROWSER_ALLOWED_DOMAINS,
  DINO_GAME,
  HOME_PAGE,
  bookmarks,
  isAllowedBrowserUrl,
} from "components/apps/Browser/config";

describe("Browser URL allowlist", () => {
  test("uses the Yorafa registrable domain and keeps only the Dino bookmark", () => {
    expect(BROWSER_ALLOWED_DOMAINS).toEqual(new Set(["yorafa.com"]));
    expect(bookmarks).toEqual([DINO_GAME]);
  });

  test.each([
    [HOME_PAGE, true],
    ["https://www.yorafa.com/path", true],
    ["https://subdomain.yorafa.com/", true],
    // eslint-disable-next-line sonarjs/no-clear-text-protocols
    ["http://surf.to/misc", true],
    // eslint-disable-next-line sonarjs/no-clear-text-protocols
    ["http://surf.to/other-page", true],
    ["chrome://dino", true],
    ["http://localhost/", true],
    ["/Program Files/Browser/dino/index.html", true],
    ["https://evil.yorafa.com.example/", false],
    ["https://google.com/", false],
    ["https://www.yorafa.com:8443/", false],
    // eslint-disable-next-line sonarjs/no-clear-text-protocols
    ["ftp://yorafa.com/", false],
  ])("returns %p for %p", (url, expected) => {
    expect(isAllowedBrowserUrl(url)).toBe(expected);
  });
});
