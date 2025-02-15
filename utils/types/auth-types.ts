interface UserInfo {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  guestStatus: boolean;
  profilePic: string;
}

interface Settings {
  video: {
    videoFlip: boolean;
  };
  mic: {
    volume: number;
  }
  speaker: {
    volume: number;
  }
}

export type { UserInfo, Settings };
