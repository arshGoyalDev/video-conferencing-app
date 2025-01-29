import { create } from "zustand";

import { authSlice } from "./slices";

import { UserInfo } from "@/utils/types";

interface AppStore {
  userInfo: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;
}

const useAppStore = create<AppStore>((...a) => ({
  ...authSlice(...a),
}));

export default useAppStore;
