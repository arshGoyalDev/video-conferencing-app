import useAppStore from "@/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = ({
  tab,
  stopVideo,
}: {
  tab: string | null;
  stopVideo: () => void;
}) => {
  const { userInfo } = useAppStore();
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState(tab ?? "profile");

  useEffect(() => {
    const changeTab = setTimeout(() => {
      if (userInfo.email) {
        if (tab === "video") stopVideo();

        if (currentTab !== "app") router.push(`/settings?tab=${currentTab}`);
        else router.push("/app");
      }
    }, 100);

    return () => clearTimeout(changeTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTab]);

  return (
    <nav className="fixed bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 md:gap-3 py-2 px-3 bg-neutral-900 border-2 border-neutral-800 rounded-lg">
      <button
        onClick={() => setCurrentTab("profile")}
        className={`flex gap-2 items-center  ${
          tab === "profile" && "bg-neutral-800 border-2 border-neutral-800"
        } rounded-lg py-1.5 px-3`}
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
              d="M12.1601 10.87C12.0601 10.86 11.9401 10.86 11.8301 10.87C9.45006 10.79 7.56006 8.84 7.56006 6.44C7.56006 3.99 9.54006 2 12.0001 2C14.4501 2 16.4401 3.99 16.4401 6.44C16.4301 8.84 14.5401 10.79 12.1601 10.87Z"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.15997 14.56C4.73997 16.18 4.73997 18.82 7.15997 20.43C9.90997 22.27 14.42 22.27 17.17 20.43C19.59 18.81 19.59 16.17 17.17 14.56C14.43 12.73 9.91997 12.73 7.15997 14.56Z"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="hidden md:block mt-1">Profile</span>
      </button>
      <button
        onClick={() => setCurrentTab("video")}
        className={`flex gap-2 items-center  ${
          tab === "video" && "bg-neutral-800 border-2 border-neutral-800"
        } rounded-lg py-1.5 px-3`}
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
        <span className="hidden md:block mt-1">Video</span>
      </button>
      <button
        onClick={() => setCurrentTab("audio")}
        className={`flex gap-2 items-center  ${
          tab === "audio" && "bg-neutral-800 border-2 border-neutral-800"
        } rounded-lg py-1.5 px-3`}
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
              d="M12 19C15.31 19 18 16.31 18 13V8C18 4.69 15.31 2 12 2C8.69 2 6 4.69 6 8V13C6 16.31 8.69 19 12 19Z"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 11V13C3 17.97 7.03 22 12 22C16.97 22 21 17.97 21 13V11"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.11011 7.47993C10.8901 6.82993 12.8301 6.82993 14.6101 7.47993"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.03 10.4799C11.23 10.1499 12.5 10.1499 13.7 10.4799"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="hidden md:block mt-1">Audio</span>
      </button>
      <button
        onClick={() => setCurrentTab("app")}
        className={`flex gap-2 items-center rounded-lg py-1.5 px-3`}
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
              d="M12 18V15"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.07 2.81997L3.14002 8.36997C2.36002 8.98997 1.86002 10.3 2.03002 11.28L3.36002 19.24C3.60002 20.66 4.96002 21.81 6.40002 21.81H17.6C19.03 21.81 20.4 20.65 20.64 19.24L21.97 11.28C22.13 10.3 21.63 8.98997 20.86 8.36997L13.93 2.82997C12.86 1.96997 11.13 1.96997 10.07 2.81997Z"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="mt-1">Home</span>
      </button>
    </nav>
  );
};

export default Navbar;
