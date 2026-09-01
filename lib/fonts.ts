import { Barlow, Saira } from "next/font/google";

// Display font. Saira is a squared, geometric sans with a width axis, which
// lets headings sit close to the logo wordmark (wide, heavy, squared counters)
// without trying to reproduce it letter for letter. Self hosted at build time
// via next/font, so there is no render-blocking request and no system fallback.
export const saira = Saira({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-saira",
  weight: "variable",
  axes: ["wdth"],
});

// Body font. Barlow shares Saira's squared skeleton at text sizes, so the two
// read as one family, and it is warmer than a neutral grotesque.
export const barlow = Barlow({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-barlow",
  weight: ["400", "500", "600", "700"],
});
