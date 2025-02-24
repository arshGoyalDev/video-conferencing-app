import { useRouter } from "next/navigation";

import ModalHeader from "./ModalHeader";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ToggleButton } from "@/components/global";
import { generateMeetLink } from "@/lib/functions/meet";

const NewMeetModal = () => {
  const router = useRouter();

  const [meetLink, setMeetLink] = useState(
    "http://localhost:3000/meet/48389hdhdnj3enwjjsnj"
  );

  const [allowMic, setAllowMic] = useState(false);
  const [allowVideo, setAllowVideo] = useState(false);
  const [anyoneCanJoin, setAnyoneCanJoin] = useState(false);

  useEffect(() => {
    const generatedMeetLink = generateMeetLink();

    setMeetLink(generatedMeetLink);
  }, [])

  return (
    <div className="z-20 fixed top-0 left-0 grid place-content-center w-full h-full">
      <div
        onClick={() => router.push("/app")}
        className="fixed top-0 left-0 w-full h-full z-20 bg-neutral-950 bg-opacity-25 backdrop-blur-sm"
      ></div>

      <div className="z-30 w-[90vw] max-w-[680px] bg-neutral-950 border-2 border-neutral-800 rounded-lg">
        <ModalHeader title="New Meet" />

        <div className="py-4 px-4 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h2 className="text-sm uppercase font-bold text-neutral-600">
              Meet link
            </h2>
            <div className="flex flex-col md:flex-row items-end  md:items-center gap-2">
              <div className="w-full break-words text-neutral-300 py-2 px-3 bg-neutral-900 border-2 border-neutral-800 focus:border-neutral-800 rounded-md">
                {meetLink}
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(meetLink);
                }}
                className="bg-white hover:bg-neutral-200 text-nowrap text-black py-2 px-3 font-semibold border-2 border-white rounded-md"
              >
                Copy Link
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-sm uppercase font-bold text-neutral-600">
              Settings
            </h2>
            <div className="flex flex-col gap-2">
            <div className="flex flex-col items-end gap-2 md:flex-row md:items-center justify-between">
              <h3 className="uppercase w-full text-sm">Allow members to unmute</h3>
              <ToggleButton value={allowMic} setValue={setAllowMic} />
            </div>
            <div className="flex flex-col items-end gap-2 md:flex-row md:items-center justify-between">
              <h3 className="uppercase w-full text-sm">Allow members to start video</h3>
              <ToggleButton value={allowVideo} setValue={setAllowVideo} />
            </div>
            <div className="flex flex-col items-end gap-2 md:flex-row md:items-center justify-between">
              <h3 className="uppercase w-full text-sm">Anyone can join</h3>
              <ToggleButton value={anyoneCanJoin} setValue={setAnyoneCanJoin} />
            </div>

            </div>
          </div>
        </div>
        <div className="flex items-center justify-between border-t-2 border-neutral-800 py-4 px-4">
          <Link href={"/app"} className="py-2 px-4 text-red-100 font-bold bg-red-600 bg-opacity-50 border-2 border-red-600 rounded-md">
            Cancel
          </Link>
          <button className="py-2 px-4 text-black font-bold bg-white border-2 border-neutral-800 rounded-md">
            Start Meet
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewMeetModal;
