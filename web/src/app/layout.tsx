import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { Toaster } from "~/components/ui/sonner";
import OpenGraphImage from "./opengraph-image.png";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Kafein",
  description:
    "Sip Kafein. Kafein is a Bay Area matcha shop serving thoughtfully crafted, small-batch matcha drinks using premium Japanese green tea. Refresh, recharge, and reconnect—one sip at a time.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    title: "Sip Kafein",
    description:
      "Sip Kafein. Kafein is a Bay Area matcha shop serving thoughtfully crafted, small-batch matcha drinks using premium Japanese green tea. Refresh, recharge, and reconnect—one sip at a time.",
    siteName: "Sip Kafein",
    url: "https://sipkafein.com",
    images: [
      {
        url: OpenGraphImage.src,
      },
    ],
  },
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} scroll-smooth`}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Toaster />
      </body>
    </html>
  );
}
