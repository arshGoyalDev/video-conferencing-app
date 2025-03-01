import { create } from "zustand";

import { authSlice, meetSlice } from "./slices";

import { Meet, Settings, UserInfo } from "@/utils/types";

interface AppStore {
  userInfo: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;

  settings: Settings;
  setSettings: (settings: Settings) => void;

  meetDetails: Meet;
  setMeetDetails: (meetDetails: Meet) => void;
}

const useAppStore = create<AppStore>((...a) => ({
  ...authSlice(...a),
  ...meetSlice(...a),
}));

export default useAppStore;
