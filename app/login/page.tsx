"use client";

import { Input, PasswordInput } from "@/components/inputs";
import Link from "next/link";
import { useState } from "react";

const LoginPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  return (
    <main className="h-screen grid xl:grid-cols-2 select-none">
      <div className="relative h-screen flex flex-col justify-center items-center py-10 px-10">
        <Link
          href={"/"}
          className="absolute top-3 left-3 font-bold py-2 px-4 text-white bg-neutral-900 hover:bg-opacity-30 border-2 border-neutral-800 rounded-lg transition-all duration-300"
        >
          Home
        </Link>

        <div className="grid gap-4 w-full max-w-[520px]">
          <h1 className="text-5xl font-semibold">Welcome Back</h1>
          <div className="flex flex-col">
            <p className="text-neutral-500 font-semibold">
              Don't have an account?{" "}
              <Link href="/sign-up" className="text-neutral-200 font-bold">
                Create an account
              </Link>
            </p>
            <p className="text-neutral-500 font-semibold">
              It takes less than a minute
            </p>
          </div>
        </div>
        <form
          className="mt-10 w-full max-w-[520px]"
          onSubmit={(e) => {
            e.preventDefault();
            // handleSignUp();
          }}
        >
          <div className="flex flex-col gap-5 items-start">
            <Input
              value={email}
              setValue={setEmail}
              error={errorEmail}
              type="email"
            />

            <PasswordInput
              password={password}
              setPassword={setPassword}
              errorPassword={errorPassword}
            />

            <button className="font-bold mt-4 w-full py-[14px] text-black hover:text-white bg-neutral-100 hover:bg-opacity-10 border-2 border-white hover:border-neutral-700 rounded-lg transition-all duration-300">
              Sign Up
            </button>
          </div>
        </form>
      </div>
      <section className="hidden xl:block h-screen bg-zinc-900"></section>
    </main>
  );
};
export default LoginPage;
