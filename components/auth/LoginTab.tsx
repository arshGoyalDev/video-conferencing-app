import { apiClient, routes } from "@/lib/api";
import { authErrors } from "@/utils/errors";

import useAppStore from "@/store";

import { useRouter } from "next/navigation";

import { useState } from "react";

const LoginTab = () => {
  const router = useRouter();
  const { setUserInfo } = useAppStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (authErrors(email, password, setErrorEmail, setErrorPassword)) {
      try {
        setLoading(true);

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
          setLoading(false);
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

        setLoading(false);
      }
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={`py-4 px-4 w-full bg-neutral-900  ${
          errorEmail
            ? "placeholder:text-red-600 text-red-600"
            : "placeholder:text-neutral-600 text-white"
        } rounded-se-lg`}
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
          <span className="">Logging in ...</span>
        ) : (
          <span>Login</span>
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
export default LoginTab;
