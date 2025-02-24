"use client";

import { useEffect, useRef, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { AudioTab, Navbar, ProfileTab, VideoTab } from "@/components/settings";

const SettingsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tab = searchParams.get("tab");

  const [videoRunning, setVideoRunning] = useState(true);
  const [hasPermission, setHasPermission] = useState(true);
  
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (!tab) {
      router.push("/settings?tab=profile");
    }
  }, [tab, router]);

  const startVideo = async () => {
    setVideoRunning(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1440 },
          height: { ideal: 810 },
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setHasPermission(true);
        // setVideoRunning(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);

      setVideoRunning(false);
      setHasPermission(false);
    }
  };

  const stopVideo = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());

      if (videoRef.current) {
        videoRef.current.srcObject = null;
        setVideoRunning(false);
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
          stopVideo={stopVideo}
          videoRunning={videoRunning}
          // setVideoRunning={setVideoRunning}
        />
      )}
      {tab === "audio" && <AudioTab />}
      <Navbar tab={tab} stopVideo={stopVideo} />
    </main>
  );
};

export default SettingsPage;
