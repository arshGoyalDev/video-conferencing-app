"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { BottomNav } from "@/components/app";
import { NewMeetModal } from "@/components/app/Modals";

import { useState } from "react";

const AppPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const newMeet = searchParams.get("new-meet");

  const [meetId, setMeetId] = useState("");

  const joinMeet = () => {
    if (meetId) router.push(`/meet?meet-id=${meetId}`);
  }

  return (
    <main className="flex flex-col items-center pt-6 px-8 lg:pt-12 pb-[136px] gap-12 md:gap-20">
      <h2 className="py-2 px-3 text-lg bg-neutral-900 border-2 border-neutral-800 rounded-md">MEETSpace</h2>
      <div className="text-center flex flex-col gap-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold">
          Connect with anyone, anywhere
        </h1>

        <p className="text-lg">
          High-quality video meetings for teams and individuals.
          <br />
          Secure, reliable, and easy to use.
        </p>
      </div>

      <div className="grid w-[90vw] max-w-[700px] md:grid-cols-3 py-5 px-5 gap-4 bg-neutral-900 border-2 border-neutral-800 rounded-lg">
        <div className="md:col-span-3 px-1 flex flex-col gap-2">
          <h3 className="uppercase text-sm text-neutral-600 font-bold">Start or Join a meet</h3>
          <p className="text-neutral-400">Connect with your friends, family or team</p>
        </div>
        <div className="flex flex-col gap-4 py-5 px-4 bg-neutral-950 border-2 border-neutral-800 rounded-md">
          <Link href={"/app?new-meet=true"} className="flex flex-col gap-3">
            <div className="flex gap-3 items-center">
              <span className="stroke-[#737373]">
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
              <h2 className="uppercase pt-1 text-neutral-500 text-sm font-bold">
                New Meeting
              </h2>
            </div>
            <p>Start a new meeting instantly</p>
          </Link>
        </div>
        <div className="md:col-span-2 flex flex-col gap-4 py-5 px-4 bg-neutral-950 border-2 border-neutral-800 rounded-md">
          <h2 className="uppercase text-neutral-500 text-sm font-bold">
            Join a Meet
          </h2>
          <div className="w-full flex gap-3">
            <input
              type="text"
              name="meetId"
              value={meetId}
              onChange={(e) => setMeetId(e.target.value)}
              placeholder="Enter meet id"
              autoComplete="off"
              className="py-2 px-3 w-full bg-neutral-900 placeholder:text-neutral-600 border-2 border-neutral-800 rounded-md"
            />
            <button onClick={joinMeet} className="bg-white font-semibold w-fit text-black py-1 px-6 border-2 border-white rounded-md">
              Join
            </button>
          </div>
        </div>
      </div>

      {newMeet && <NewMeetModal />}
      <BottomNav />
    </main>
  );
};

export default AppPage;
