import type { NextConfig } from "next";

// GitHub Pages serves this repo under /deekda-site. Set SITE_BASE_PATH="" for a custom domain.
const basePath = process.env.SITE_BASE_PATH ?? "/deekda-site";

const config: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default config;
