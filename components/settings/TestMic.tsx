import { useState, useEffect } from "react";

const TestMic = () => {
  const [micDevices, setMicDevices] = useState<MediaDeviceInfo[] | []>(
    []
  );
  const [selectedMic, setSelectedMic] = useState("");
  const [micDevicesMenu, setMicDevicesMenu] = useState(false);
  // const [audioPaused, setAudioPaused] = useState(false);
  // const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const getAudioDevices = async () => {
      try {
        const deviceList = await navigator.mediaDevices.enumerateDevices();
        const audioInputDevices = deviceList.filter(
          (device) => device.kind === "audioinput"
        );

        setMicDevices(audioInputDevices);
        console.log(audioInputDevices)

        setSelectedMic(audioInputDevices[0].deviceId);
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

  return (
    <div className="flex flex-col py-5 w-[80vw] max-w-[700px] bg-neutral-900 border-2 border-neutral-800 rounded-lg">
      <h2 className="px-5 text-neutral-500 text-sm uppercase font-bold border-b-2 border-neutral-800 pb-4">
        Microphone
      </h2>

      <div className="flex px-5 pt-5 flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-0">
        <h2 className="text-neutral-500 text-sm uppercase font-bold">
          Choose Microphone
        </h2>
        <div className="relative">
          <button
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              micDevicesMenu
                ? setMicDevicesMenu(false)
                : setMicDevicesMenu(true);
            }}
            className="w-fit py-2 px-3 border-2 border-neutral-800 rounded-md flex gap-3 items-center"
          >
            <span>
              {micDevices.map(
                (device) =>
                  device.deviceId === selectedMic && (
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
          {micDevicesMenu && (
            <div className="absolute flex flex-col w-fit top-20 xs:top-12 bg-neutral-900 border-2 border-neutral-800 rounded-lg overflow-hidden">
              {micDevices.map((device) => (
                <button
                  key={device.deviceId}
                  // onClick={() => handleDeviceChange(device.deviceId)}
                  className="text-left"
                >
                  {device.label.includes("Default") ||
                    device.label.includes("Communications") && (
                      <div
                        className={`${
                          selectedMic === device.deviceId &&
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
export default TestMic;
