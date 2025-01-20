"use client";

import { useEffect } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { Navbar } from "@/components/settings";

const SettingsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tab = searchParams.get("tab");

  useEffect(() => {
    if (!tab) {
      router.push("/settings?tab=profile");
    }
  }, [tab, router]);

  return (
    <main>
      <Navbar tab={tab} />
    </main>
  );
};
export default SettingsPage;
