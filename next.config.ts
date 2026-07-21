import type { NextConfig } from "next";

// Marketing site: every page is statically generated at build time.
// No CMS, no server data. Keep this config minimal so the build stays fast
// and Vercel deployment stays simple.
const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
