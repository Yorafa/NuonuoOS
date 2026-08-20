import {
  BROWSER_ALLOWED_DOMAINS,
  DINO_GAME,
  HOME_PAGE,
  bookmarks,
  isAllowedBrowserUrl,
} from "components/apps/Browser/config";

describe("Browser URL allowlist", () => {
  test("uses registrable domains and keeps only the Dino bookmark", () => {
    expect(BROWSER_ALLOWED_DOMAINS).toEqual(
      new Set([
        "dustinbrett.com",
        "google.com",
        "wikipedia.org",
        "archive.org",
        "aaronos.dev",
        "surf.to",
      ])
    );
    expect(bookmarks).toEqual([DINO_GAME]);
  });

  test.each([
    [HOME_PAGE, true],
    ["https://google.com/search?q=daedalOS", true],
    ["https://accounts.google.com/", true],
    ["https://www.wikipedia.org/wiki/Main_Page", true],
    // eslint-disable-next-line sonarjs/no-clear-text-protocols
    ["http://surf.to/misc", true],
    // eslint-disable-next-line sonarjs/no-clear-text-protocols
    ["http://surf.to/other-page", true],
    ["chrome://dino", true],
    ["http://localhost/", true],
    ["/Program Files/Browser/dino/index.html", true],
    ["https://evilgoogle.com/", false],
    ["https://google.com.evil.example/", false],
    ["https://evil.example/", false],
    // eslint-disable-next-line sonarjs/no-clear-text-protocols
    ["http://www.google.com/", false],
    ["https://www.google.com:8443/", false],
    // eslint-disable-next-line sonarjs/no-clear-text-protocols
    ["ftp://google.com/", false],
  ])("returns %p for %p", (url, expected) => {
    expect(isAllowedBrowserUrl(url)).toBe(expected);
  });
});
