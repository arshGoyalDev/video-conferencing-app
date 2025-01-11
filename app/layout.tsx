import { ReactNode } from "react";

import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";

import "./globals.css";

const exo2 = Exo_2({
  variable: "--font-exo-2",
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
        className={`${exo2.className} bg-neutral-950 text-white`}
      >
        {children}
      </body>
    </html>
  );
}

export {metadata}
export default RootLayout;