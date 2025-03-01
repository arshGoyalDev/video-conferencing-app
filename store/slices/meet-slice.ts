import { StateCreator } from "zustand";

import { Meet } from "@/utils/types";

interface MeetSlice {
  meetDetails: Meet;
  setMeetDetails: (meetDetails: Meet) => void;
}

const meetSlice: StateCreator<MeetSlice> = (set) => ({
  meetDetails: {
    meetId: "",

    meetStartTime: "",
    meetEnded: false,

    members: [],

    meetAdminId: 0,
    meetAdmin: {
      userId: 0,
      email: "",
      firstName: "",
      lastName: "",
      guestStatus: false,
      profilePic: "",
      meet: [],
      adminMeets: [],
    },

    allowVideo: true,
    allowMic: true,
    anyoneCanJoin: true,
  },

  setMeetDetails: (meetDetails) => set({ meetDetails }),
});

export default meetSlice;
