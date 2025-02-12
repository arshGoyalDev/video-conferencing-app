import { useEffect, useRef, useState } from "react";

const VideoTab = () => {
  const [hasPermission, setHasPermission] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setHasPermission(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);

      setHasPermission(false);
    }
  };

  // const stopVideo = () => {
  //   if (streamRef.current) {
  //     streamRef.current.getTracks().forEach((track) => track.stop());

  //     if (videoRef.current) {
  //       videoRef.current.srcObject = null;
  //     }
  //   }
  // };

  useEffect(() => {
    startVideo();
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
