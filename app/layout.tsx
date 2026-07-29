import type { Metadata, Viewport } from "next";
import "./globals.css";
import { archivo, inter } from "@/lib/fonts";
import { getBusiness, SITE_URL } from "@/lib/content";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyCallBar } from "@/components/layout/StickyCallBar";
import { ExitIntentPopup } from "@/components/layout/ExitIntentPopup";

const business = getBusiness();

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${business.name} | Licensed Electrician in Broward County, FL`,
    template: `%s | ${business.name}`,
  },
  description:
    "Licensed electrical service, repair, and restoration for Broward County and South Florida. Owner led from the first call to the final inspection.",
  openGraph: {
    type: "website",
    siteName: business.name,
    locale: "en_US",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d1b2e",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.variable} ${inter.variable}`}>
      <body className="flex min-h-dvh flex-col bg-surface text-ink">
        <Header />
        <main className="flex-1 pb-16 lg:pb-0">{children}</main>
        <Footer />
        <StickyCallBar />
        <ExitIntentPopup />
      </body>
    </html>
  );
}
