import { ReactNode } from "react";

import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";

import "./globals.css";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
});

const metadata: Metadata = {
  title: "Video Conferencing",
  description: "A great video conferencing app",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <html lang="en">
      <body
        className={`${josefinSans.className} bg-neutral-950 text-neutral-50`}
      >
        {children}
      </body>
    </html>
  );
};

export { metadata };
export default RootLayout;
