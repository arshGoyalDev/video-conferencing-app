import { ReactNode } from "react";

import type { Metadata } from "next";
import { Lora } from "next/font/google";

import "./globals.css";
import ContextContainer from "@/context";

const lora = Lora({
  // variable: "--font",
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
        className={`${lora.className} bg-neutral-50 text-neutral-950 dark:bg-neutral-950 dark:text-neutral-50`}
      >
        <ContextContainer>{children}</ContextContainer>
      </body>
    </html>
  );
};

export { metadata };
export default RootLayout;
