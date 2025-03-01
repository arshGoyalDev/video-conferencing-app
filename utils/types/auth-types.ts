import { Meet } from "./meet-types";

interface UserInfo {
  userId: number;

  email: string;

  firstName: string;
  lastName: string;

  guestStatus: boolean;

  profilePic: string;

  meet: Meet[] | [];
  adminMeets: Meet[] | [];
}

interface Settings {
  video: {
    videoFlip: boolean;
  };
  mic: {
    device: string;
    volume: number;
  };
  speaker: {
    device: string;
    volume: number;
  };
}

export type { UserInfo, Settings };
