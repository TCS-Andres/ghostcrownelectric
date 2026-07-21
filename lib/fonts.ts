import { Archivo, Inter } from "next/font/google";

// Heading font with real presence. Loaded via next/font/google only, self
// hosted at build time so there is no render-blocking network request and no
// silent fallback to a system font.
export const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
  weight: ["500", "600", "700", "800"],
});

// Highly readable body font.
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});
