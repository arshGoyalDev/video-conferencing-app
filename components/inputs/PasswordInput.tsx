"use client";

import { Dispatch, SetStateAction } from "react";

import { useState } from "react";

const PasswordInput = ({
  password,
  setPassword,
  errorPassword,
}: {
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  errorPassword: string;
}) => {
  const [viewPassword, setViewPassword] = useState(false);

  return (
    <div className="relative w-full flex flex-col gap-2">
      <h2 className="text-neutral-300 dark:text-neutral-700 uppercase font-bold">password</h2>

      <input
        type={viewPassword ? "text" : "password"}
        name="password"
        id="password"
        value={password}
        autoComplete="off"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="***************"
        className={` w-full py-3 px-5 bg-neutral-100 dark:bg-neutral-900 border-2 border-transparent rounded-lg placeholder:text-neutral-300 placeholder:dark:text-neutral-700`}
      />

      {errorPassword && <p className="text-red-500 mt-3">{errorPassword}</p>}

      <button
        className={`password-toggle ${
          viewPassword && "view"
        } absolute bottom-3 right-4 stroke-white focus:outline-0 border-[1px] border-transparent focus:border-white rounded-lg`}
        onClick={(e) => {
          e.preventDefault();
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          viewPassword ? setViewPassword(false) : setViewPassword(true);
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.58 12C15.58 13.98 13.98 15.58 12 15.58C10.02 15.58 8.42004 13.98 8.42004 12C8.42004 10.02 10.02 8.42004 12 8.42004C13.98 8.42004 15.58 10.02 15.58 12Z"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 20.27C15.53 20.27 18.82 18.19 21.11 14.59C22.01 13.18 22.01 10.81 21.11 9.39997C18.82 5.79997 15.53 3.71997 12 3.71997C8.46997 3.71997 5.17997 5.79997 2.88997 9.39997C1.98997 10.81 1.98997 13.18 2.88997 14.59C5.17997 18.19 8.46997 20.27 12 20.27Z"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default PasswordInput;
