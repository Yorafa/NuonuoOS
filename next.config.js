// @ts-check

const path = require("path");

const isProduction = process.env.NODE_ENV === "production";

const bundleAnalyzer = process.env.npm_config_argv?.includes(
  "build:bundle-analyzer"
);

/**
 * @type {import("next").NextConfig}
 * */
const nextConfig = {
  compiler: {
    reactRemoveProperties: isProduction,
    removeConsole: isProduction,
    styledComponents: {
      displayName: false,
      fileName: false,
      minify: isProduction,
      pure: true,
      ssr: true,
      transpileTemplateLiterals: true,
    },
  },
  devIndicators: false,
  output: "export",
  productionBrowserSourceMaps: false,
  reactProductionProfiling: false,
  reactStrictMode: !isProduction,
  turbopack: {
    resolveAlias: {
      "node:buffer": "buffer",
      "node:stream": "readable-stream",
    },
  },
};

module.exports = bundleAnalyzer
  ? require("@next/bundle-analyzer")({
      enabled: isProduction,
    })(nextConfig)
  : nextConfig;