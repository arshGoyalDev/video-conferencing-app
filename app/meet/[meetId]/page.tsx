import { ControlsBar } from "@/components/meet";

const MeetPage = async ({
  params,
}: {
  params: Promise<{ meetId: string }>;
}) => {
  const meetId = (await params).meetId;

  return (
    <main className="h-screen">
      <ControlsBar />
    </main>
  );
};
export default MeetPage;
