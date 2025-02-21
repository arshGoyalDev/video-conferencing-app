/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";

import EditInput from "./EditInput";

import useAppStore from "@/store";
import { logout, updateDetails } from "@/utils/functions/auth";

import { useRouter } from "next/navigation";

import { apiClient, routes } from "@/utils/api";

const ProfileTab = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const router = useRouter();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [profilePic, setProfilePic] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (userInfo.email) {
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setProfilePic(userInfo.profilePic);
    }

    console.log(userInfo);
  }, [userInfo]);

  const handleFileInput = () => {
    if (!profilePic) {
      fileInputRef.current?.click();
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    if (file) {
      const formData = new FormData();
      formData.append("profile-pic", file);

      try {
        const response = await apiClient.post(
          routes.ADD_PROFILE_PIC,
          formData,
          {
            withCredentials: true,
          }
        );

        if (response.status === 201) {
          setUserInfo(response.data.user);
        }
        console.log(response.data.user);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const removeProfilePic = async () => {
    try {
      const response = await apiClient.post(
        routes.REMOVE_PROFILE_PIC,
        {},
        { withCredentials: true }
      );

      if (response.status === 201) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pt-20 pb-40 min-h-screen flex flex-col gap-10 items-center">
      <div>
        <div className="relative w-[75vw] h-[75vw] max-w-[360px] max-h-[360px] bg-neutral-900 border-2 border-neutral-800 rounded-xl">
          {userInfo.profilePic ? (
            <div className="relative">
              <img
                src={`${process.env.NEXT_PUBLIC_SERVER_URL}${userInfo.profilePic}`}
                alt={userInfo.firstName}
                className="w-full h-full rounded-xl"
              ></img>

              <button
                onClick={removeProfilePic}
                className="absolute top-1.5 right-1.5 p-1.5 rounded-md bg-neutral-800 border-2 border-neutral-700"
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
                      d="M21 5.97998C17.67 5.64998 14.32 5.47998 10.98 5.47998C9 5.47998 7.02 5.57998 5.04 5.77998L3 5.97998"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18.85 9.14001L18.2 19.21C18.09 20.78 18 22 15.21 22H8.79002C6.00002 22 5.91002 20.78 5.80002 19.21L5.15002 9.14001"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.33 16.5H13.66"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.5 12.5H14.5"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
            </div>
          ) : (
            <>
              <input
                ref={fileInputRef}
                onChange={handleImageChange}
                type="file"
                name="profile-pic"
                accept=".png, .jpg, .svg, .jpeg, .webp"
                multiple={false}
                className="hidden"
              />
              <button
                onClick={handleFileInput}
                className="grid place-content-center z-30 absolute w-full h-full"
              >
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
              </button>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="py-5 px-5 w-[80vw] max-w-[600px] bg-neutral-900 border-2 border-neutral-800 rounded-lg">
          <div className="grid gap-2 md:grid-cols-2 md:grid-rows-[16px 1fr]">
            <h2 className="text-neutral-500 text-sm uppercase md:col-span-2 font-bold">
              Name
            </h2>
            <EditInput value={firstName} setValue={setFirstName} />
            <EditInput value={lastName} setValue={setLastName} />
          </div>
        </div>

        <div className="flex justify-between px-5 py-5 items-center gap-2 w-[80vw] max-w-[600px] bg-neutral-900 border-2 border-neutral-800 rounded-lg">
          <h2 className="text-neutral-500 text-sm uppercase font-bold">
            Save Details
          </h2>
          <button
            onClick={() => updateDetails(firstName, lastName, setUserInfo)}
            className={`${
              userInfo.firstName === firstName && userInfo.lastName === lastName
                ? "bg-neutral-700 border-neutral-600 text-neutral-300 pointer-events-none"
                : "bg-white border-white text-black"
            } py-2 px-8 border-2 rounded-md `}
          >
            Save
          </button>
        </div>

        <div className="flex flex-col gap-3 w-[80vw] max-w-[600px]">
          <button
            onClick={() => logout(setUserInfo, router)}
            className="w-full py-2 px-4 text-red-200 bg-red-500 bg-opacity-40 border-2 border-red-500 border-opacity-70 rounded-md"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
