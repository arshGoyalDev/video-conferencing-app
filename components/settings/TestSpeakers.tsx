import { useState, useEffect, useRef } from "react";

import useAppStore from "@/store";

const TestSpeakers = ({darkerTheme}: {darkerTheme?:boolean}) => {
  const { settings, setSettings } = useAppStore();

  const [speakerDevices, setSpeakerDevices] = useState<MediaDeviceInfo[] | []>(
    []
  );
  const [selectedSpeakerDevice, setSelectedSpeakerDevice] = useState("");
  const [speakerDevicesMenu, setSpeakerDevicesMenu] = useState(false);
  const [audioPaused, setAudioPaused] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const getAudioDevices = async () => {
      try {
        const deviceList = await navigator.mediaDevices.enumerateDevices();
        const audioOutputDevices = deviceList.filter(
          (device) => device.kind === "audiooutput"
        );

        setSpeakerDevices(audioOutputDevices);

        setSelectedSpeakerDevice(audioOutputDevices[0].deviceId);
      } catch (err) {
        console.error("Error accessing audio devices:", err);
      }
    };

    getAudioDevices();

    navigator.mediaDevices.addEventListener("devicechange", getAudioDevices);

    return () => {
      navigator.mediaDevices.removeEventListener(
        "devicechange",
        getAudioDevices
      );
    };
  }, []);

  const handleDeviceChange = async (deviceId: string) => {
    try {
      const audioElements = document.querySelectorAll("audio");

      audioElements.forEach((audio) => {
        audio.setSinkId(deviceId);
      });

      setSelectedSpeakerDevice(deviceId);
      setSpeakerDevicesMenu(false);
    } catch (err) {
      console.error("Error switching device:", err);
    }
  };

  useEffect(() => {
    const newSettings = {
      video: settings.video,
      mic: settings.mic,
      speaker: {
        volume: settings.speaker.volume,
        device: selectedSpeakerDevice,
      },
    };

    setSettings(newSettings);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSpeakerDevice]);

  return (
    <div className={`flex flex-col py-5 w-full ${darkerTheme ? "bg-neutral-950" : "bg-neutral-900"} border-2 border-neutral-800 rounded-lg`}>
      <h2 className="px-5 text-neutral-500 text-sm uppercase font-bold border-b-2 border-neutral-800 pb-4">
        Speakers
      </h2>
      <div className="flex px-5 pt-6 pb-2 flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-0">
        <h2 className="text-neutral-500 text-sm uppercase font-bold">
          Test Speaker
        </h2>
        <div>
          <button
            onClick={() => {
              if (!audioPaused) {
                setAudioPaused(true);
                audioRef.current?.play();
              } else {
                setAudioPaused(false);
                audioRef.current?.pause();
              }
            }}
            className="flex p-1.5 bg-neutral-950 border-2 border-neutral-800 rounded-md"
          >
            <span className="stroke-white">
              {!audioPaused ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 11.9999V8.43989C4 4.01989 7.13 2.2099 10.96 4.4199L14.05 6.1999L17.14 7.9799C20.97 10.1899 20.97 13.8099 17.14 16.0199L14.05 17.7999L10.96 19.5799C7.13 21.7899 4 19.9799 4 15.5599V11.9999Z"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.65 19.11V4.89C10.65 3.54 10.08 3 8.64 3H5.01C3.57 3 3 3.54 3 4.89V19.11C3 20.46 3.57 21 5.01 21H8.64C10.08 21 10.65 20.46 10.65 19.11Z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 19.11V4.89C21 3.54 20.43 3 18.99 3H15.36C13.93 3 13.35 3.54 13.35 4.89V19.11C13.35 20.46 13.92 21 15.36 21H18.99C20.43 21 21 20.46 21 19.11Z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
          </button>
          <audio
            id="audio"
            src="/speaker-test-sound.mp3"
            className="hidden"
            controls
            ref={audioRef}
          />
        </div>
      </div>
      <div className="flex px-5 pt-5 flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-0">
        <h2 className="text-neutral-500 text-sm uppercase font-bold">
          Choose Speaker
        </h2>
        <div className="relative">
          <button
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              speakerDevicesMenu
                ? setSpeakerDevicesMenu(false)
                : setSpeakerDevicesMenu(true);
            }}
            className="w-fit py-2 px-3 border-2 border-neutral-800 rounded-md flex gap-3 items-center"
          >
            <span>
              {speakerDevices.map(
                (device) =>
                  device.deviceId === selectedSpeakerDevice && (
                    <span key={device.deviceId}>{device.label}</span>
                  )
              )}
            </span>
            <span className="stroke-white">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.9201 8.94995L13.4001 15.47C12.6301 16.24 11.3701 16.24 10.6001 15.47L4.08008 8.94995"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
          {speakerDevicesMenu && (
            <div className="absolute flex flex-col w-fit top-20 xs:top-12 bg-neutral-900 border-2 border-neutral-800 rounded-lg overflow-hidden">
              {speakerDevices.map((device) => (
                <button
                  key={device.deviceId}
                  onClick={() => handleDeviceChange(device.deviceId)}
                  className="text-left"
                >
                  {!device.label.includes("Default") &&
                    !device.label.includes("Communications") && (
                      <div
                        className={`${
                          selectedSpeakerDevice === device.deviceId &&
                          "bg-neutral-700 hover:bg-neutral-700 hover:bg-opacity-100"
                        } px-3 py-2 hover:bg-neutral-800 hover:bg-opacity-40 w-full`}
                      >
                        <span>{device.label}</span>
                      </div>
                    )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default TestSpeakers;
