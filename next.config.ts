import type { NextConfig } from "next";

// The 16 granular service pages were consolidated into 8 general ones on
// 2026-08-07, and generators were retired as an advertised service on
// 2026-08-12 (surge protection stands alone; generator seekers land on the
// services index rather than a page we no longer offer). These permanent
// redirects keep old links and indexed URLs pointing somewhere useful.
const SERVICE_REDIRECTS: { from: string; to: string }[] = [
  { from: "zinsco-panel-replacement", to: "/services/electrical-panel-upgrade" },
  { from: "federal-pacific-panel-replacement", to: "/services/electrical-panel-upgrade" },
  { from: "meter-socket-replacement", to: "/services/electrical-service-rebuild" },
  { from: "emergency-power-restoration", to: "/services/emergency-electrician" },
  { from: "pool-grounding-bonding-inspection", to: "/services/pool-electrical" },
  { from: "pool-electrical-repair", to: "/services/pool-electrical" },
  { from: "pool-gfci-breaker-replacement", to: "/services/pool-electrical" },
  { from: "pool-electrical-service-rebuild", to: "/services/pool-electrical" },
  { from: "generator-installation", to: "/services" },
  { from: "whole-home-surge-protection", to: "/services/surge-protection" },
  { from: "generators-and-surge-protection", to: "/services/surge-protection" },
];

// Marketing site: every page is statically generated at build time.
// No CMS, no server data. Keep this config minimal so the build stays fast
// and Vercel deployment stays simple.
const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return SERVICE_REDIRECTS.map(({ from, to }) => ({
      source: `/services/${from}`,
      destination: to,
      permanent: true,
    }));
  },
};

export default nextConfig;
