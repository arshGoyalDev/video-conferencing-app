import TestMic from "./TestMic";
import TestSpeakers from "./TestSpeakers";

const AudioTab = () => {
  return (
    <div className="mx-auto pt-20 pb-40 w-[80vw] max-w-[700px] min-h-screen flex flex-col gap-10 items-center justify-center">
      <TestSpeakers />
      <TestMic />
    </div>
  );
};
export default AudioTab;
