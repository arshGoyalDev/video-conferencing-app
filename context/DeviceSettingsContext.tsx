"use client";

import { createContext, ReactNode, RefObject, useContext, useRef, useState } from "react";

interface DeviceSettingsContextType {
  startVideo: () => void;
  stopVideo: () => void;
  videoRunning: boolean;
  hasPermission: boolean;
  videoRef?: RefObject<HTMLVideoElement | null>
}

const DeviceSettingsContext = createContext<DeviceSettingsContextType>({
  startVideo: () => {},
  stopVideo: () => {},
  videoRunning: false,
  hasPermission: false,
  // videoRef: 
});

const useDeviceSettings = () => useContext(DeviceSettingsContext);

const DeviceSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [videoRunning, setVideoRunning] = useState(true);
  const [hasPermission, setHasPermission] = useState(true);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

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
    <DeviceSettingsContext.Provider
      value={{ startVideo, stopVideo, videoRunning, hasPermission, videoRef }}
    >
      {children}
    </DeviceSettingsContext.Provider>
  );
};

export { useDeviceSettings };
export default DeviceSettingsProvider;
