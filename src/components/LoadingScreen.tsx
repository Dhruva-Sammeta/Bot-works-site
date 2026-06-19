import { useAssets } from "@/contexts/AssetContext";
import { useEffect, useState, useRef } from "react";
import videoSrc from "@/assets/loadingscreenintro.webm";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const { isLoaded } = useAssets();
  const [videoReady, setVideoReady] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isLoaded && videoEnded) {
      setFadeOut(true);
    }
  }, [isLoaded, videoEnded]);

  useEffect(() => {
    if (fadeOut) {
      const t = setTimeout(onComplete, 600);
      return () => clearTimeout(t);
    }
  }, [fadeOut, onComplete]);

  // Start playing the video explicitly once it's ready and animated in
  useEffect(() => {
    if (videoReady && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Handle autoplay restrictions if any
      });
    }
  }, [videoReady]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md transition-opacity duration-500 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div
        className={`transition-all duration-700 ease-out transform bg-background/80 backdrop-blur-2xl border border-border/50 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.5)] p-2 sm:p-4 max-w-[90vw] sm:max-w-md w-full mx-auto overflow-hidden ${
          fadeOut 
            ? "translate-y-0 opacity-100 scale-100" 
            : videoReady 
              ? "translate-y-0 opacity-100 scale-100" 
              : "translate-y-12 opacity-0 scale-95"
        }`}
      >
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          playsInline
          onCanPlay={() => setVideoReady(true)}
          onEnded={() => setVideoEnded(true)}
          className={`w-full h-auto rounded-xl object-contain bg-black/40 transition-opacity duration-300 ${videoReady ? "opacity-100" : "opacity-0"}`}
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
