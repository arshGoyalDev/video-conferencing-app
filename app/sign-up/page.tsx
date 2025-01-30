"use client";

import Link from "next/link";

import { useEffect, useState } from "react";

import { Input, PasswordInput } from "@/components/auth";

import { authErrors } from "@/utils/errors";
import { apiClient, routes } from "@/utils/api";

import useAppStore from "@/store";

import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  useEffect(() => {
    if (userInfo.email) {
      router.push("/settings?tab=profile");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  const handleSignUp = async () => {
    if (
      authErrors(
        email,
        password,
        setErrorEmail,
        setErrorPassword,
        name,
        setErrorName
      )
    ) {
      try {
        const response = await apiClient.post(
          routes.SIGN_UP_ROUTE,
          {
            email,
            password,
            firstName: name.split(" ")[0],
            lastName: name.split(" ").at(-1),
          },
          { withCredentials: true }
        );

        if (response.status === 201) {
          setUserInfo(response.data.user);

          router.push("/settings?tab=profile");
        }
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <main className="h-screen grid xl:grid-cols-2 select-none">
      <div className="relative h-full flex flex-col justify-center items-center py-10 px-8 md:py-10 md:px-10 w-full">
        <Link
          href={"/"}
          className="absolute top-3 left-3 font-bold py-2 px-4 bg-neutral-900 hover:bg-opacity-30 border-2 border-neutral-800 rounded-lg transition-all duration-300"
        >
          Home
        </Link>

        <div className="grid gap-3 w-full md:w-[450px]">
          <h1 className="text-4xl md:text-5xl font-semibold">
            Create an Account
          </h1>
          <p className="text-neutral-300 font-semibold">
            Let&#39;s sign up quickly to get started.
          </p>
        </div>
        <form
          className="mt-10 w-full max-w-[450px]"
          onSubmit={(e) => {
            e.preventDefault();
            handleSignUp();
          }}
        >
          <div className="flex flex-col gap-5 items-start">
            <Input
              value={name}
              setValue={setName}
              error={errorName}
              type="name"
            />
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
              Sign Up
            </button>
          </div>
        </form>

        <div className="mt-6 w-full md:w-[450px]">
          <div className="flex gap-1 w-full items-center mb-6">
            <span className="w-full h-1 rounded-full bg-neutral-800 dark:bg-opacity-60"></span>
            <span className="text-sm font-bold text-neutral-600">OR</span>
            <span className="w-full h-1 rounded-full bg-neutral-800 bg-opacity-60"></span>
          </div>
          <button className="w-full py-[10px] bg-neutral-900 bg-opacity-50 border-2 border-neutral-800 rounded-lg">
            Continue as a Guest
          </button>
        </div>

        <div className="text-center mt-5">
          <p className="text-neutral-500 font-semibold">
            Already have an account?{" "}
            <Link href="/login" className="text-neutral-200 font-bold">
              Login
            </Link>
          </p>
        </div>
      </div>
      <section className="hidden xl:block h-screen bg-zinc-900"></section>
    </main>
  );
};
export default SignUpPage;
