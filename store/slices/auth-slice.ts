import { StateCreator } from "zustand";

import { Settings, UserInfo } from "@/utils/types";

interface AuthSlice {
  userInfo: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;

  settings: Settings;
  setSettings: (settings: Settings) => void;
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

  settings: {
    video: {
      videoFlip: false,
    },
    mic: {
      volume: 10,
    },
    speaker: {
      volume: 10,
    }
  },

  setSettings: (settings) => set({ settings }),
  setUserInfo: (userInfo) => set({ userInfo }),
});

export default authSlice;
