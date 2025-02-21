import TestMic from "./TestMic";
import TestSpeakers from "./TestSpeakers";

const AudioTab = () => {
  return (
    <div className="pt-20 pb-40 min-h-screen flex flex-col gap-10 items-center justify-center">
      <TestSpeakers />
      <TestMic />
    </div>
  );
};
export default AudioTab;
