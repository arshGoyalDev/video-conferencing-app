"use client";

// import { useSearchParams } from "next/navigation";

import { ControlsBar } from "@/components/meet";

const MeetPage = () => {
  // const searchParams = useSearchParams();

  // const meedId = searchParams.get("meet-id");

  return (
    <main className="h-screen">
      <ControlsBar />
    </main>
  );
};
export default MeetPage;
