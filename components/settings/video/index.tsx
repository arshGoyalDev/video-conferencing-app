import { RefObject, useEffect } from "react";

const VideoTab = ({ hasPermission, videoRef, startVideo }: { hasPermission: boolean; videoRef: RefObject<HTMLVideoElement | null> ; startVideo: () => void }) => {



  useEffect(() => {
    startVideo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if (pathname !== "/settings?tab=video") {
  //     stopVideo();
  //   }
  // }, [pathname]);

  return (
    <div className="pt-20 pb-40 min-h-screen flex flex-col gap-10 items-center">
      <div className="w-[85vw] p-4 md:max-w-[700px] aspect-video bg-neutral-900 border-2 border-neutral-800 rounded-lg">
        {hasPermission ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <div className="w-full h-full py-6 px-10 grid place-content-center text-xl text-center">
            Camera permission denied. Please enable camera access in your
            browser settings.
          </div>
        )}
      </div>

      <div className="w-[85vw] p-4 md:max-w-[700px] bg-neutral-900 border-2 border-neutral-800 rounded-lg">
        <h2 className="text-neutral-500 text-sm uppercase font-bold">
          Video Settings
        </h2>
      </div>
    </div>
  );
};
export default VideoTab;
