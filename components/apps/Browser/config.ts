type Bookmark = {
  icon: string;
  name: string;
  path?: string;
  url: string;
};

export const DINO_GAME = {
  icon: "/System/Icons/Favicons/dino.webp",
  name: "T-Rex Chrome Dino Game",
  path: "/Program Files/Browser/dino/index.html",
  url: "chrome://dino",
};

export const SURF_TO_MISC = {
  icon: "/Users/Public/Documents/OldSite/favicon.ico",
  name: "The Ultimate Misc Page",
  path: "/Users/Public/Documents/OldSite/index.html",
  // eslint-disable-next-line sonarjs/no-clear-text-protocols
  url: "http://surf.to/misc",
};

export const HOME_PAGE = "https://blog.yorafa.com/";

/**
 * External Browser navigation allows these registrable domains and their
 * subdomains. Local daedalOS paths and the Dino page are handled separately.
 */
export const BROWSER_ALLOWED_DOMAINS = new Set(["yorafa.com"]);

const isLocalBrowserUrl = (address: string): boolean =>
  (address.startsWith("/") && !address.startsWith("//")) ||
  /^https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?(?:\/|$)/i.test(address);

const isAllowedDomain = (hostname: string): boolean =>
  [...BROWSER_ALLOWED_DOMAINS].some(
    (domain) => hostname === domain || hostname.endsWith(`.${domain}`)
  );

export const isAllowedBrowserUrl = (address: string): boolean => {
  const trimmedAddress = address.trim();

  if (isLocalBrowserUrl(trimmedAddress) || trimmedAddress === DINO_GAME.url) {
    return true;
  }

  try {
    const url = new URL(trimmedAddress);
    const hostname = url.hostname.toLowerCase().replace(/\.$/, "");

    if (url.username || url.password || url.port) return false;
    if (url.protocol === "https:") return isAllowedDomain(hostname);

    // surf.to is an existing local-site compatibility entry that still uses HTTP.
    return url.protocol === "http:" && hostname === "surf.to";
  } catch {
    return false;
  }
};

export const BLOG = {
  icon: "/System/Icons/chromium.webp",
  name: "Yorafa Blog",
  url: "https://blog.yorafa.com",
};

export const getBrowserHistoryUrl = (url: string): string => url || HOME_PAGE;

export const bookmarks: Bookmark[] = [BLOG, DINO_GAME];

export const BLOCKED_PAGE = `
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>Access denied</title>
      <style>
        body { color: #222; font: 16px sans-serif; margin: 3rem; }
        h1 { font-size: 1.5rem; }
      </style>
    </head>
    <body>
      <h1>Access denied</h1>
      <p>This domain is not included in the Browser allowlist.</p>
    </body>
  </html>
`;

export const NOT_FOUND =
  '<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN"><html><head><title>404 Not Found</title><style>h1{display:inline;}</style></head><body><h1>Not Found</h1><p>The requested URL was not found on this server.</p></body></html>';
