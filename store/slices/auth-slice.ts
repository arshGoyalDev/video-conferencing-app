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
    meet: [],
    adminMeets: [],
  },

  settings: {
    video: {
      videoFlip: false,
    },
    mic: {
      device: "",
      volume: 10,
    },
    speaker: {
      device: "",
      volume: 10,
    },
  },

  setSettings: (settings) => set({ settings }),
  setUserInfo: (userInfo) => set({ userInfo }),
});

export default authSlice;
