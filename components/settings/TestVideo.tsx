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
      <div
        className={`relative w-full aspect-video ${
          darkerTheme ? "bg-neutral-950" : "bg-neutral-900"
        } border-2 border-neutral-800 rounded-lg`}
      >
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
              className={`absolute bottom-3 left-1/2 -translate-x-1/2 py-1.5 px-3 lg:py-2 lg:px-5 bg-neutral-900 border-2 border-neutral-800 rounded-md `}
            >
              {videoRunning ? (
                <span className="stroke-white">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.63 7.58008C16.63 7.58008 16.66 6.63008 16.63 6.32008C16.46 4.28008 15.13 3.58008 12.52 3.58008H6.21C3.05 3.58008 2 4.63008 2 7.79008V16.2101C2 17.4701 2.38 18.7401 3.37 19.5501L4 20.0001"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16.74 10.95V16.21C16.74 19.37 15.69 20.42 12.53 20.42H7.26001"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 6.73999V15.81C22 17.48 20.88 18.06 19.52 17.1L16.74 15.15"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22.02 2.18994L2.02002 22.1899"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              ) : (
                <span className="stroke-white">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.53 20.4201H6.21C3.05 20.4201 2 18.3201 2 16.2101V7.79008C2 4.63008 3.05 3.58008 6.21 3.58008H12.53C15.69 3.58008 16.74 4.63008 16.74 7.79008V16.2101C16.74 19.3701 15.68 20.4201 12.53 20.4201Z"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M19.52 17.0999L16.74 15.1499V8.83989L19.52 6.88989C20.88 5.93989 22 6.51989 22 8.18989V15.8099C22 17.4799 20.88 18.0599 19.52 17.0999Z"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11.5 11C12.3284 11 13 10.3284 13 9.5C13 8.67157 12.3284 8 11.5 8C10.6716 8 10 8.67157 10 9.5C10 10.3284 10.6716 11 11.5 11Z"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              )}
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
