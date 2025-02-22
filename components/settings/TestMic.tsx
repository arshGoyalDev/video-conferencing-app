import { useState, useEffect, useRef } from "react";

const TestMic = () => {
  const [micDevices, setMicDevices] = useState<MediaDeviceInfo[] | []>([]);
  const [selectedMic, setSelectedMic] = useState("");
  const [micDevicesMenu, setMicDevicesMenu] = useState(false);

  const [recording, setRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const [currentTime, setCurrentTime] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef(new Audio());

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);

        audioRef.current.src = url;
      };

      mediaRecorderRef.current.start();
      setRecording(true);
      setHasRecording(true);
    } catch (error) {
      console.error(error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
      setRecording(false);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => {
      setCurrentTime(0);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("ended", handleEnded);
      if (audioURL) {
        URL.revokeObjectURL(audioURL);
      }
    };
  }, [audioURL]);

  useEffect(() => {
    const getAudioDevices = async () => {
      try {
        const deviceList = await navigator.mediaDevices.enumerateDevices();
        const audioInputDevices = deviceList.filter(
          (device) => device.kind === "audioinput"
        );

        setMicDevices(audioInputDevices);
        console.log(audioInputDevices);

        setSelectedMic(audioInputDevices[0].deviceId);
      } catch (error) {
        console.error(error);
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

  const playRecording = () => {
    if (recording) {
      stopRecording();

      setTimeout(() => {
        audioRef.current.play();
      }, 100);
    } else {
      audioRef.current.play();
    }
  };

  return (
    <div className="flex flex-col py-5 w-[80vw] max-w-[700px] bg-neutral-900 border-2 border-neutral-800 rounded-lg">
      <h2 className="px-5 text-neutral-500 text-sm uppercase font-bold border-b-2 border-neutral-800 pb-4">
        Microphone
      </h2>

      <div className="flex px-5 pt-5 flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-0">
        <h2 className="text-neutral-500 text-sm uppercase font-bold">
          Test Microphone
        </h2>

        <div className="flex items-center gap-2">
          {audioURL !== "" && (
            <audio src={audioURL} ref={audioRef} className="hidden" />
          )}
          <button
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              !recording ? startRecording() : stopRecording();
            }}
            className="p-1.5 rounded-md bg-neutral-950 border-2 border-neutral-800"
          >
            <span className="stroke-white">
              {!recording ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.3 21H14.7C19.2 21 21 19.2 21 14.7V9.3C21 4.8 19.2 3 14.7 3H9.3C4.8 3 3 4.8 3 9.3V14.7C3 19.2 4.8 21 9.3 21Z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
          </button>
          <span>
            {currentTime.toFixed(2)}s
          </span>
          {hasRecording && (
            <button
              onClick={playRecording}
              className="p-1.5 bg-neutral-950 rounded-md border-2 border-neutral-800"
            >
              <span className="stroke-white">
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
              </span>
            </button>
          )}
        </div>
      </div>

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
                    (device.label.includes("Communications") && (
                      <div
                        className={`${
                          selectedMic === device.deviceId &&
                          "bg-neutral-700 hover:bg-neutral-700 hover:bg-opacity-100"
                        } px-3 py-2 hover:bg-neutral-800 hover:bg-opacity-40 w-full`}
                      >
                        <span>{device.label}</span>
                      </div>
                    ))}
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
