"use client";

import { ReactElement, useEffect } from "react";

import { usePathname, useRouter } from "next/navigation";

import useAppStore from "@/store";

import { apiClient, routes } from "@/lib/api";

const Template = ({ children }: { children: ReactElement }) => {
  const router = useRouter();
  const pathname = usePathname();

  const { setUserInfo } = useAppStore();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await apiClient.get(routes.USER_INFO, {
          withCredentials: true,
        });

        if (response.status === 200) {
          setUserInfo(response.data.user);

          if (pathname === "/auth") {
            router.push("/app");
          }
        } else {
          throw new Error("No user found");
        }
      } catch (error) {
        if (error) {
          router.push("/auth");
        }
      }
    };

    if (pathname !== "/") {
      getUserInfo();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};

export default Template;
