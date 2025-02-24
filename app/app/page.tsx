"use client";

import { useSearchParams } from "next/navigation";

import { BottomNav } from "@/components/app";
import { NewMeetModal } from "@/components/app/Modals";

const AppPage = () => {
  const searchParams = useSearchParams();

  const newMeet = searchParams.get("new-meet");

  return (
    <main className="h-screen">
      {newMeet && <NewMeetModal />}

      <BottomNav />
    </main>
  );
};

export default AppPage;
