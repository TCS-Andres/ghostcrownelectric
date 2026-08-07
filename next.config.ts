import type { NextConfig } from "next";

// The 16 granular service pages were consolidated into 8 general ones on
// 2026-08-07. These permanent redirects keep any old links and indexed URLs
// pointing at the right consolidated page instead of 404ing.
const SERVICE_REDIRECTS: { from: string; to: string }[] = [
  { from: "zinsco-panel-replacement", to: "electrical-panel-upgrade" },
  { from: "federal-pacific-panel-replacement", to: "electrical-panel-upgrade" },
  { from: "meter-socket-replacement", to: "electrical-service-rebuild" },
  { from: "emergency-power-restoration", to: "emergency-electrician" },
  { from: "pool-grounding-bonding-inspection", to: "pool-electrical" },
  { from: "pool-electrical-repair", to: "pool-electrical" },
  { from: "pool-gfci-breaker-replacement", to: "pool-electrical" },
  { from: "pool-electrical-service-rebuild", to: "pool-electrical" },
  { from: "generator-installation", to: "generators-and-surge-protection" },
  { from: "whole-home-surge-protection", to: "generators-and-surge-protection" },
];

// Marketing site: every page is statically generated at build time.
// No CMS, no server data. Keep this config minimal so the build stays fast
// and Vercel deployment stays simple.
const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return SERVICE_REDIRECTS.map(({ from, to }) => ({
      source: `/services/${from}`,
      destination: `/services/${to}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
