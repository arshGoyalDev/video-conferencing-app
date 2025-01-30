import React, { useEffect, useRef, useState } from "react";

import EditInput from "./EditInput";

import useAppStore from "@/store";
import { logout, updateDetails } from "@/utils/functions/auth";

import { useRouter } from "next/navigation";

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
  }, [userInfo]);

  const handleFileInput = () => {
    if (!profilePic) {
      fileInputRef.current?.click();
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    if (file) {
      setProfilePic(file.name);
    }
  };

  return (
    <div className="pt-20 pb-40 min-h-screen flex flex-col gap-10 items-center">
      <div>
        <div className="relative w-[75vw] h-[75vw] max-w-[360px] max-h-[360px] bg-neutral-900 border-2 border-neutral-800 rounded-lg">
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
            className="absolute w-full h-full bg-red-50 opacity-0"
          ></button>
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
          <button className="w-full py-2 px-4 text-red-200 bg-red-500 bg-opacity-40 border-2 border-red-500 border-opacity-70 rounded-md">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
