/* eslint-disable @next/next/no-img-element */

import { ToggleButton } from "@/components/global";

import { useDeviceSettings } from "@/context";

import useAppStore from "@/store";

import { useEffect, useState } from "react";

const TestVideo = ({ darkerTheme }: { darkerTheme?: boolean }) => {
  const { hasPermission, startVideo, stopVideo, videoRunning, videoRef } =
    useDeviceSettings();

  const { userInfo } = useAppStore();
  const [videoFlip, setVideoFlip] = useState(false);

  useEffect(() => {
    startVideo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className=" flex flex-col gap-5 items-center justify-center">
      <div className="relative aspect-video bg-neutral-900 border-2 border-neutral-800 rounded-lg">
        {hasPermission ? (
          <>
            {videoRunning ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className={`w-full h-full object-cover rounded-lg ${
                  videoFlip && "-scale-x-100 scale-y-100"
                }`}
              />
            ) : (
              <div className="w-full h-full grid place-content-center ">
                <div className="w-[100px] aspect-square md:w-[140px] overflow-hidden">
                  {userInfo.profilePic ? (
                    <img
                      src={`${process.env.NEXT_PUBLIC_SERVER_URL}${userInfo.profilePic}`}
                      alt={userInfo.firstName}
                      className="rounded-lg"
                    />
                  ) : (
                    <div>
                      <span className="fill-white">
                        <svg
                          width="120"
                          height="120"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill="#262626"
                            d="M12 2C9.38 2 7.25 4.13 7.25 6.75C7.25 9.32 9.26 11.4 11.88 11.49C11.96 11.48 12.04 11.48 12.1 11.49C12.12 11.49 12.13 11.49 12.15 11.49C12.16 11.49 12.16 11.49 12.17 11.49C14.73 11.4 16.74 9.32 16.75 6.75C16.75 4.13 14.62 2 12 2Z"
                          />
                          <path
                            fill="#262626"
                            d="M17.0809 14.1489C14.2909 12.2889 9.74094 12.2889 6.93094 14.1489C5.66094 14.9989 4.96094 16.1489 4.96094 17.3789C4.96094 18.6089 5.66094 19.7489 6.92094 20.5889C8.32094 21.5289 10.1609 21.9989 12.0009 21.9989C13.8409 21.9989 15.6809 21.5289 17.0809 20.5889C18.3409 19.7389 19.0409 18.5989 19.0409 17.3589C19.0309 16.1289 18.3409 14.9889 17.0809 14.1489Z"
                          />
                        </svg>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <button
              onClick={() => {
                if (videoRunning) stopVideo();
                else startVideo();
              }}
              className={`absolute bottom-3 lg:bottom-7 left-1/2 -translate-x-1/2 py-1.5 px-3 lg:py-2 lg:px-5 ${
                videoRunning ? "bg-red-600" : "bg-white"
              } rounded-md `}
            >
              <span
                className={`${videoRunning ? "fill-white" : "fill-red-600"}`}
              >
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.97 18.33C21.97 18.69 21.89 19.06 21.72 19.42C21.55 19.78 21.33 20.12 21.04 20.44C20.55 20.98 20.01 21.37 19.4 21.62C18.8 21.87 18.15 22 17.45 22C16.43 22 15.34 21.76 14.19 21.27C13.04 20.78 11.89 20.12 10.75 19.29C9.6 18.45 8.51 17.52 7.47 16.49C6.44 15.45 5.51 14.36 4.68 13.22C3.86 12.08 3.2 10.94 2.72 9.81C2.24 8.67 2 7.58 2 6.54C2 5.86 2.12 5.21 2.36 4.61C2.6 4 2.98 3.44 3.51 2.94C4.15 2.31 4.85 2 5.59 2C5.87 2 6.15 2.06 6.4 2.18C6.66 2.3 6.89 2.48 7.07 2.74L9.39 6.01C9.57 6.26 9.7 6.49 9.79 6.71C9.88 6.92 9.93 7.13 9.93 7.32C9.93 7.56 9.86 7.8 9.72 8.03C9.59 8.26 9.4 8.5 9.16 8.74L8.4 9.53C8.29 9.64 8.24 9.77 8.24 9.93C8.24 10.01 8.25 10.08 8.27 10.16C8.3 10.24 8.33 10.3 8.35 10.36C8.53 10.69 8.84 11.12 9.28 11.64C9.73 12.16 10.21 12.69 10.73 13.22C11.27 13.75 11.79 14.24 12.32 14.69C12.84 15.13 13.27 15.43 13.61 15.61C13.66 15.63 13.72 15.66 13.79 15.69C13.87 15.72 13.95 15.73 14.04 15.73C14.21 15.73 14.34 15.67 14.45 15.56L15.21 14.81C15.46 14.56 15.7 14.37 15.93 14.25C16.16 14.11 16.39 14.04 16.64 14.04C16.83 14.04 17.03 14.08 17.25 14.17C17.47 14.26 17.7 14.39 17.95 14.56L21.26 16.91C21.52 17.09 21.7 17.3 21.81 17.55C21.91 17.8 21.97 18.05 21.97 18.33Z"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                  />
                </svg>
              </span>
            </button>
          </>
        ) : (
          <div className="w-full h-full py-6 px-10 grid place-content-center text-xl text-center border-2 border-neutral-800 rounded-lg">
            Camera permission denied. Please enable camera access in your
            browser settings.
          </div>
        )}
      </div>

      <div
        className={`flex flex-col gap-1 w-full py-4 ${
          darkerTheme
            ? "bg-neutral-950"
            : "bg-neutral-900 mt-6 md:max-w-[600px]"
        } border-2 border-neutral-800 rounded-lg`}
      >
        <h2 className="text-neutral-500 text-sm uppercase font-bold border-b-2 border-neutral-800 pb-3 px-4">
          Video Settings
        </h2>
        <div className="flex items-center justify-between pt-2 px-4">
          <h3 className="text-neutral-500 font-bold">Flip Video</h3>
          <ToggleButton value={videoFlip} setValue={setVideoFlip} />
        </div>
      </div>
    </div>
  );
};
export default TestVideo;
