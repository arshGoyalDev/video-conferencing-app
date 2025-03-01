"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface DeviceSettingsContextType {
  startVideo: () => void;
  stopVideo: () => void;
  handleSpeakerChange: (deviceId: string) => Promise<void>;
  videoRunning: boolean;
  hasPermission: boolean;
  videoRef: RefObject<HTMLVideoElement | null>;

  selectedSpeakerDevice: string;
  setSelectedSpeakerDevice: Dispatch<SetStateAction<string>>;
}

const DeviceSettingsContext = createContext<DeviceSettingsContextType>({
  startVideo: () => {},
  stopVideo: () => {},
  handleSpeakerChange: async () => {},
  videoRunning: false,
  hasPermission: true,
  videoRef: { current: null },

  selectedSpeakerDevice: "",
  setSelectedSpeakerDevice: () => {},
});

const useDeviceSettings = () => useContext(DeviceSettingsContext);

const DeviceSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [videoRunning, setVideoRunning] = useState(false);
  const [hasPermission, setHasPermission] = useState(true);

  const [selectedSpeakerDevice, setSelectedSpeakerDevice] = useState("");

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
      if (err instanceof DOMException) {
        if (err.name === "NotAllowedError") {
          console.error("Camera permission denied by user");
        } else if (err.name === "NotFoundError") {
          console.error("No camera device found");
        } else if (err.name === "NotReadableError") {
          console.error("Camera is already in use by another application");
        }
      }

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

  const handleSpeakerChange = async (deviceId: string) => {
    try {
      const audioElements = document.querySelectorAll("audio");

      audioElements.forEach((audio) => {
        audio.setSinkId(deviceId);
      });

      setSelectedSpeakerDevice(deviceId);
    } catch (err) {
      console.error("Error switching device:", err);
    }
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <DeviceSettingsContext.Provider
      value={{
        startVideo,
        stopVideo,
        videoRunning,
        hasPermission,
        videoRef,
        handleSpeakerChange,
        selectedSpeakerDevice,
        setSelectedSpeakerDevice,
      }}
    >
      {children}
    </DeviceSettingsContext.Provider>
  );
};

export { useDeviceSettings };
export default DeviceSettingsProvider;
