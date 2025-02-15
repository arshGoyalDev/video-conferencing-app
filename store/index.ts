import { create } from "zustand";

import { authSlice } from "./slices";

import { Settings, UserInfo } from "@/utils/types";

interface AppStore {
  userInfo: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;

  settings: Settings;
  setSettings: (settings: Settings) => void;
}

const useAppStore = create<AppStore>((...a) => ({
  ...authSlice(...a),
}));

export default useAppStore;
