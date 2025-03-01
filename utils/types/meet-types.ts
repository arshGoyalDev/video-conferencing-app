import { UserInfo } from "./auth-types";

interface Meet {
  meetId: string;

  meetStartTime: string;
  meetEnded: boolean;

  members: UserInfo[] | [];

  meetAdminId: number;
  meetAdmin: UserInfo;

  allowVideo: boolean;
  allowMic: boolean;
  anyoneCanJoin: boolean;
}

export type { Meet };