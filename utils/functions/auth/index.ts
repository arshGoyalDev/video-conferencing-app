import { apiClient, routes } from "@/utils/api";
import { UserInfo } from "@/utils/types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const updateDetails = async (
  firstName: string,
  lastName: string,
  setUserInfo: (userInfo: UserInfo) => void
) => {
  try {
    const response = await apiClient.post(
      routes.UPDATE_DETAILS_ROUTE,
      {
        firstName,
        lastName,
      },
      { withCredentials: true }
    );

    if (response.status === 201) {
      setUserInfo(response.data.user[0]);
    } else {
      throw new Error("Internal Server Error");
    }
  } catch (error) {
    console.log(error);
  }
};

const logout = async (
  setUserInfo: (userInfo: UserInfo) => void,
  router: AppRouterInstance
) => {
  try {
    const response = await apiClient.post(
      routes.LOGOUT_ROUTE,
      {},
      { withCredentials: true }
    );

    if (response.status === 201) {
      setUserInfo({
        userId: 0,
        email: "",
        firstName: "",
        lastName: "",
        guestStatus: false,
        profilePic: "",
      });

      router.push("/sign-up");
    } else throw new Error("Internal Server Error");
  } catch (error) {
    console.log(error);
  }
};

export { updateDetails, logout };
