import type { Metadata } from "next";
import { Nunito, Zen_Maru_Gothic } from "next/font/google";
import "./globals.css";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Cursor from "@/components/motion/Cursor";
import SmoothScroll from "@/components/motion/SmoothScroll";
import ScrollProgress from "@/components/motion/ScrollProgress";
import MotionProvider from "@/components/motion/MotionProvider";
import RouteFlash from "@/components/motion/RouteFlash";
import PageTransition from "@/components/motion/PageTransition";
import { site } from "@/data/site";

const body = Nunito({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const display = Zen_Maru_Gothic({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable} h-full`} suppressHydrationWarning>
      <head>
        <script
          // Runs before first paint: stored choice, else the OS preference.
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("linkible-theme");if(!t){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="light"}`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <MotionProvider>
          <SmoothScroll />
          <Cursor />
          <ScrollProgress />
          <RouteFlash />
          <Nav />
          <PageTransition>{children}</PageTransition>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
