// @ts-check

/**
 * @type {import("next").NextConfig}
 * */
const nextConfig = {
  compiler: {
    reactRemoveProperties: process.env.NODE_ENV === "production",
    removeConsole: process.env.NODE_ENV === "production",
    styledComponents: {
      displayName: false,
      fileName: false,
      minify: process.env.NODE_ENV === "production",
      pure: true,
      ssr: true,
      transpileTemplateLiterals: true,
    },
  },
  devIndicators: false,
  output: "export",
  productionBrowserSourceMaps: false,
  reactProductionProfiling: false,
  reactStrictMode: process.env.NODE_ENV !== "production",
  turbopack: {
    resolveAlias: {
      "node:buffer": "buffer",
      "node:stream": "readable-stream",
    },
  },
};
module.exports = nextConfig;
