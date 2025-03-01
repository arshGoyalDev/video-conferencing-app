import { apiClient, routes } from "@/lib/api";
import { authErrors } from "@/utils/errors";

import useAppStore from "@/store";

import { useRouter } from "next/navigation";

import { useState } from "react";

const SignupTab = () => {
  const router = useRouter();
  const { setUserInfo } = useAppStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const [loading, setLoading] = useState(false);

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
        setLoading(true);

        const response = await apiClient.post(
          routes.SIGN_UP,
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
          setLoading(false);
          router.push("/settings?tab=profile");
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(error);
        if (error.status === 403) {
          setErrorEmail("The email is already associated with an account");
        } else {
          setErrorPassword("Internal server error, please try after some time");
        }

        setLoading(false);
      }
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSignUp();
      }}
    >
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={`py-4 px-4 w-full bg-neutral-900  ${
          errorName
            ? "placeholder:text-red-600 text-red-600"
            : "placeholder:text-neutral-600 text-white"
        } rounded-t-lg`}
        autoComplete="off"
        placeholder="full name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={`py-4 px-4 w-full bg-neutral-900 mt-1  ${
          errorEmail
            ? "placeholder:text-red-600 text-red-600"
            : "placeholder:text-neutral-600 text-white"
        }`}
        autoComplete="off"
        placeholder="email"
      />
      <div className="relative mt-1">
        <input
          type={passwordVisible ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`py-4 px-4 w-full bg-neutral-900 ${
            errorPassword
              ? "placeholder:text-red-600 text-red-600"
              : "placeholder:text-neutral-600 text-white"
          }`}
          autoComplete="off"
          placeholder="password..."
        />

        <button
          type="button"
          onClick={() => setPasswordVisible(!passwordVisible)}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 text-neutral-300"
        >
          {passwordVisible ? "Hide" : "Show"}
        </button>
      </div>

      <button className="py-4 px-4 font-bold w-full mt-1 text-black bg-neutral-100 rounded-b-lg">
        {loading ? (
          <span className="">signing up ...</span>
        ) : (
          <span>Sign Up</span>
        )}
      </button>

      {(errorEmail || errorPassword) && (
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-center text-red-500">
          <div className="bg-neutral-900 py-1.5 pb-1 px-2 rounded-lg">
            {errorEmail}
          </div>
          <div className="bg-neutral-900 py-1.5 pb-1 px-2 rounded-lg">
            {errorPassword}
          </div>
        </div>
      )}
    </form>
  );
};
export default SignupTab;
