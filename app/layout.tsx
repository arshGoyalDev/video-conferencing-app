import { ReactNode } from "react";

import type { Metadata } from "next";
import { Lora } from "next/font/google";

import "./globals.css";

const lora = Lora({
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
        className={`${lora.className} bg-neutral-950 text-neutral-50`}
      >
        {children}
      </body>
    </html>
  );
};

export { metadata };
export default RootLayout;
