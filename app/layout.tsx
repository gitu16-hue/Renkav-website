import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

const inter = localFont({
  src: "../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "100 900",
});
const manrope = localFont({
  src: "../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2",
  variable: "--font-manrope",
  display: "swap",
  weight: "200 800",
});

import "./globals.css";
import { MotionControl } from "@/components/motion-control";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
export const dynamic = "force-dynamic";
const siteUrl = "https://renkav.online";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "RENKAV Technologies | AI Software in Development",
    template: "%s | RENKAV Technologies",
  },
  description:
    "RENKAV Technologies is building AI software for ongoing digital work. Meet ELEVEN, our flagship project in development.",
  openGraph: {
    title: "RENKAV Technologies | AI Software in Development",
    description:
      "RENKAV Technologies is building AI software for ongoing digital work. Meet ELEVEN, our flagship project in development.",
    url: siteUrl,
    siteName: "RENKAV Technologies",
    type: "website",
  },
  robots: { index: false, follow: false },
};
// noindex intentionally protects draft claims until owner approves production copy + release.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#090d14",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className="dark"
      suppressHydrationWarning
    >
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} ${inter.variable} ${manrope.variable} el-grain antialiased`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:bg-white focus:p-4"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
        <MotionControl />
      </body>
    </html>
  );
}
