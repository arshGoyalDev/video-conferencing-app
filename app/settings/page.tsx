"use client";

import { useEffect } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { AudioTab, Navbar, ProfileTab, TestVideo } from "@/components/settings";

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
      {tab === "profile" && <ProfileTab />}
      {tab === "video" && (
        <div className="mx-auto pt-[12%] h-screen w-[85vw] max-w-[840px]">
          <TestVideo />
        </div>
      )}
      {tab === "audio" && <AudioTab />}
      <Navbar tab={tab} />
    </main>
  );
};

export default SettingsPage;
