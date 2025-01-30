import React, { useEffect, useRef, useState } from "react";
import EditInput from "./EditInput";
import useAppStore from "@/store";
import { useRouter } from "next/navigation";

const ProfileTab = () => {
  const { userInfo } = useAppStore();
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
    <div className="mt-20 flex flex-col items-center">
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

      <div className="py-5 px-5 mt-10 w-[90vw] max-w-[600px] bg-neutral-900 border-2 border-neutral-800 rounded-lg">
        <div className="grid gap-2 md:grid-cols-2 md:grid-rows-[16px 1fr]">
          <h2 className="text-neutral-500 md:col-span-2 font-bold">Name</h2>
          <EditInput value={firstName} setValue={setFirstName} />
          <EditInput value={lastName} setValue={setLastName} />
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
