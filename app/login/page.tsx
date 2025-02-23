"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { Input, PasswordInput } from "@/components/auth";

import { authErrors } from "@/utils/errors";
import { apiClient, routes } from "@/lib/api";

import useAppStore from "@/store";

import { useRouter } from "next/navigation";

const LoginPage = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  useEffect(() => {
    if (userInfo.email) router.push("/app");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  const handleLogin = async () => {
    if (authErrors(email, password, setErrorEmail, setErrorPassword)) {
      try {
        const response = await apiClient.post(
          routes.LOGIN,
          {
            email,
            password,
          },
          { withCredentials: true }
        );

        if (response.status === 201) {
          setUserInfo(response.data.user);

          router.push("/app");
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.status === 404) {
          setErrorEmail("Account with the given email not found");
        } else if (error.status === 401) {
          setErrorPassword("Incorrect Password");
        } else {
          setErrorPassword("Internal server error, please try after some time");
        }
      }
    }
  };

  return (
    <main className="h-screen grid xl:grid-cols-2 select-none">
      <div className="relative h-screen flex flex-col justify-center items-center py-10 px-8 md:py-10 md:px-10">
        <Link
          href={"/"}
          className="absolute top-3 left-3 font-bold py-2 px-4 bg-neutral-900 hover:bg-opacity-30 border-2 border-neutral-800 rounded-lg transition-all duration-300"
        >
          Home
        </Link>

        <div className="grid gap-3 w-full max-w-[450px]">
          <h1 className="text-4xl md:text-5xl font-semibold">Welcome Back</h1>
          <p className="text-neutral-300 font-semibold">
            Welcome Back, enter your details.
          </p>
        </div>
        <form
          className="mt-10 w-full max-w-[450px]"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
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

            <button className="font-bold mt-6 w-full py-[10px] text-black hover:text-white bg-neutral-100 hover:bg-opacity-10 border-2 border-neutral-50 hover:border-neutral-700 rounded-lg transition-all duration-300">
              Login
            </button>
          </div>
        </form>

        <div className="mt-6 w-full max-w-[450px]">
          <div className="flex gap-1 w-full items-center mb-6">
            <span className="w-full h-1 rounded-full bg-neutral-800 dark:bg-opacity-60"></span>
            <span className="text-sm font-bold text-neutral-600">OR</span>
            <span className="w-full h-1 rounded-full bg-neutral-800 dark:bg-opacity-60"></span>
          </div>
          <button className="w-full py-[10px] bg-neutral-900 bg-opacity-50 border-2 border-neutral-800 rounded-lg">
            Continue as a Guest
          </button>
        </div>

        <div className="text-center mt-5">
          <p className="text-neutral-500 font-semibold">
            New to ChatCAM?{" "}
            <Link href="/sign-up" className="text-neutral-200 font-bold">
              Sign Up
            </Link>
          </p>
        </div>

        <div className="absolute top-3 right-3"></div>
      </div>
      <section className="hidden xl:block h-screen bg-zinc-900"></section>
    </main>
  );
};
export default LoginPage;
