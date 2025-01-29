import { StateCreator } from "zustand";

import { UserInfo } from "@/utils/types";

interface AuthSlice {
  userInfo: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;
}

const authSlice: StateCreator<AuthSlice> = (set) => ({
  userInfo: {
    userId: 0,
    email: "",
    firstName: "",
    lastName: "",
    guestStatus: false,
    profilePic: "",
  },

  setUserInfo: (userInfo) => set({ userInfo }),
});

export default authSlice;
