import type { Metadata, Viewport } from "next";
import "./globals.css";
import { archivo, inter } from "@/lib/fonts";
import { getBusiness, SITE_URL } from "@/lib/content";
import { Header } from "@/components/layout/Header";
import { TopBar } from "@/components/layout/TopBar";
import { Footer } from "@/components/layout/Footer";
import { StickyCallBar } from "@/components/layout/StickyCallBar";
import { PlanSection } from "@/components/sections/PlanSection";
import { PlanGate } from "@/components/sections/PlanGate";
import { ExitIntentPopup } from "@/components/layout/ExitIntentPopup";
import { Preloader } from "@/components/ui/Preloader";

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
        <Preloader />
        <TopBar />
        <Header />
        <main className="flex-1 pb-16 lg:pb-0">
          {children}
          {/* The Master Brain three step plan closes every page before the footer.
              The home page renders its own inline (between the emergency strip and
              the FAQ), so PlanGate hides this copy there to avoid a duplicate. */}
          <PlanGate>
            <PlanSection />
          </PlanGate>
        </main>
        <Footer />
        <StickyCallBar />
        <ExitIntentPopup />
      </body>
    </html>
  );
}
