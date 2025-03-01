"use client";

import { LoginTab, SignupTab } from "@/components/auth";

import { useState } from "react";

const AuthPage = () => {
  const [tab, setTab] = useState<"signup" | "login">("login");

  return (
    <main className="h-screen grid xl:grid-cols-2">
      <div className="bg-neutral-900 w-full h-full"></div>

      <div className="flex w-[85vw] max-w-[440px] xl:w-full xl:max-w-full mx-auto xl:mx-0 xl:pl-[20%] xl:pr-[30%] 2xl:pr-[35%] justify-center flex-col">
        <h1 className="text-4xl sm:text-6xl font-extralight tracking-widest">
          MEETSpace
        </h1>

        <div className="w-full mt-10 flex flex-col gap-6">
          <button className="w-full py-4 px-4 flex items-center justify-center gap-2 bg-neutral-900 rounded-lg">
            <span>Continue as a guest</span>
            <span className="stroke-neutral-300">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.6792 3.96C16.1592 4.67 16.4392 5.52 16.4392 6.44C16.4292 8.84 14.5392 10.79 12.1592 10.87C12.0592 10.86 11.9392 10.86 11.8292 10.87C9.61922 10.8 7.82922 9.11 7.58922 6.95C7.29922 4.38 9.40922 2 11.9892 2"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.99078 14.56C4.57078 16.18 4.57078 18.82 6.99078 20.43C9.74078 22.27 14.2508 22.27 17.0008 20.43C19.4208 18.81 19.4208 16.17 17.0008 14.56C14.2708 12.73 9.76078 12.73 6.99078 14.56Z"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>

          <div className="w-full h-1 bg-neutral-900 rounded-full"></div>

          <div>
            <div className="flex">
              <div className={`${tab === "signup" && "bg-neutral-900"}`}>
                <button
                  onClick={() => setTab("login")}
                  className={`${
                    tab === "login"
                      ? "bg-neutral-900 rounded-t-lg"
                      : "bg-neutral-950 rounded-ee-lg"
                  } py-4 px-6  text-nowrap`}
                >
                  Login
                </button>
              </div>
              <div className={`${tab === "login" && "bg-neutral-900"}`}>
                <button
                  onClick={() => setTab("signup")}
                  className={`${
                    tab === "signup"
                      ? "bg-neutral-900 rounded-t-lg"
                      : "bg-neutral-950 rounded-es-lg"
                  } py-4 px-6  text-nowrap`}
                >
                  Sign up
                </button>
              </div>
              <div
                className={`${
                  tab === "signup" && "bg-neutral-900"
                } w-full h-14`}
              >
                <div className="w-full h-full bg-neutral-950 rounded-es-lg"></div>
              </div>
            </div>

            {tab === "login" && <LoginTab />}
            {tab === "signup" && <SignupTab />}
          </div>
        </div>
      </div>
    </main>
  );
};
export default AuthPage;
