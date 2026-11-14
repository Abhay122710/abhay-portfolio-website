import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { LenisProvider } from "@/lib/scroll";
import { PROFILE } from "@/lib/data";

const interTight = localFont({
  src: "../fonts/InterTight-Variable.woff2",
  variable: "--font-inter-tight",
  display: "swap",
});

const instrumentSerif = localFont({
  src: [
    {
      path: "../fonts/InstrumentSerif-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/InstrumentSerif-Italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-instrument-serif",
  display: "swap",
});

const jetbrainsMono = localFont({
  src: "../fonts/JetBrainsMono-Variable.woff2",
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${PROFILE.name} — ${PROFILE.role}`,
  description: PROFILE.resumeSummary,
  openGraph: {
    title: `${PROFILE.name} — Portfolio`,
    description: PROFILE.resumeSummary,
    images: ["/og.jpg"],
    type: "website",
  },
  icons: {
    icon: "/portrait-bust.webp",
  },
};

export const viewport: Viewport = {
  themeColor: "#f4f2ee",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
