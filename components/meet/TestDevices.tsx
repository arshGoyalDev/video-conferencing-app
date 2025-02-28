import { Dispatch, SetStateAction } from "react";
import TestMic from "../settings/TestMic";
import TestSpeakers from "../settings/TestSpeakers";
import { TestVideo } from "../settings";

const TestDevices = ({
  testDevicesTab,
  setTestDevicesTab,
}: {
  testDevicesTab: string | null;
  setTestDevicesTab: Dispatch<SetStateAction<"video" | "audio" | null>>;
}) => {
  return (
    <div className="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[90vw] max-w-[720px] bg-neutral-900 border-2 border-neutral-800 rounded-lg">
      <div className="flex items-center justify-between py-4 px-5 border-b-2 border-neutral-800">
        <h2 className="font-bold">Test Devices</h2>
        <button onClick={() => setTestDevicesTab(null)}>
          <span className="stroke-white">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.16998 14.83L14.83 9.17004"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.83 14.83L9.16998 9.17004"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      </div>
      <div className="py-4 px-4">
        <div className="flex flex-col sm:flex-row items-center gap-3 px-1.5 py-1.5 bg-neutral-950 border-2 border-neutral-800 rounded-lg">
          <button
            onClick={() => setTestDevicesTab("video")}
            className={`w-full py-2 px-2 rounded-md ${
              testDevicesTab === "video" && "bg-neutral-900"
            }`}
          >
            Video
          </button>
          <button
            onClick={() => setTestDevicesTab("audio")}
            className={`w-full py-2 px-2 rounded-md ${
              testDevicesTab === "audio" && "bg-neutral-900"
            }`}
          >
            Speakers and Mic
          </button>
        </div>

        <div className="pt-4 flex flex-col gap-4">
          {testDevicesTab === "audio" && (
            <>
              <TestMic darkerTheme={true} />
              <TestSpeakers darkerTheme={true} />
            </>
          )}
        </div>

        <div className="pt-4 flex flex-col gap-4">
          {testDevicesTab === "video" && <TestVideo darkerTheme={true} />}
        </div>
      </div>
    </div>
  );
};
export default TestDevices;
