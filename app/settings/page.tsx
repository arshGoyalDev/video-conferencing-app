"use client";

import { useEffect, useRef, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { Navbar, ProfileTab, VideoTab } from "@/components/settings";

const SettingsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tab = searchParams.get("tab");

  const [hasPermission, setHasPermission] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (!tab) {
      router.push("/settings?tab=profile");
    }
  }, [tab, router]);

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setHasPermission(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);

      setHasPermission(false);
    }
  };

  const stopVideo = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };

  return (
    <main>
      {tab === "profile" && <ProfileTab />}
      {tab === "video" && (
        <VideoTab
          hasPermission={hasPermission}
          videoRef={videoRef}
          startVideo={startVideo}
        />
      )}
      <Navbar tab={tab} stopVideo={stopVideo} />
    </main>
  );
};

export default SettingsPage;
