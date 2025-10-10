// "use client";

// import React, { Suspense, useState, useEffect, useRef } from "react";
// import { Application } from "@splinetool/runtime";

// const Spline = React.lazy(() => import("@splinetool/react-spline"));

// // Simple hook to check if viewport is mobile
// function useIsMobile() {
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
//     };

//     checkMobile();
//     window.addEventListener("resize", checkMobile);

//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   return isMobile;
// }

// export default function SimpleSpline() {
//   const [error, setError] = useState<string | null>(null);
//   const [isPlaying, setIsPlaying] = useState(false); // Track playback state
//   const audioRef = useRef<HTMLAudioElement | null>(null); // Reference to audio element
//   const isMobile = useIsMobile();

//   const scenePath = isMobile ? "/assets/T4.spline" : "/assets/adiBot.spline";
//   const audioSrc = "/assets/THE WEEKND.mp3"; // 320 kbps MP3 in public/assets

//   // Handle click on Spline object to toggle audio playback
//   const handleSplineClick = () => {
//     if (audioRef.current) {
//       if (isPlaying) {
//         audioRef.current.pause();
//       } else {
//         audioRef.current.play().catch((err) => {
//           console.error("Audio playback error:", err);
//           setError("Failed to play audio. Ensure the file is accessible.");
//         });
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   return (
//     <div style={{ width: "100%", height: "100vh", position: "relative" }}>
//       {error ? (
//         <div className="flex items-center justify-center h-screen text-red-500">
//           Error: {error}
//         </div>
//       ) : (
//         <Suspense
//           fallback={
//             <div className="flex items-center justify-center h-screen">
//               Loading 3D scene...
//             </div>
//           }
//         >
//           <Spline
//             scene={scenePath}
//             onLoad={(app: Application) => {
//               console.log("Spline scene loaded successfully:", scenePath);
//             }}
//             onMouseDown={handleSplineClick} // Trigger audio on click
//             // @ts-expect-error: Spline component does not have onError prop
//             onError={(err: Error) => {
//               console.error(err);
//               setError(err.message);
//             }}
//           />
//         </Suspense>
//       )}
//       {/* Audio element (hidden) */}
//       <audio
//         ref={audioRef}
//         src={audioSrc}
//         loop // Optional: loop the audio
//         preload="auto" // Preload for fast playback
//       />
//       {/* Custom Hero Card */}
//       <div
//         className="absolute bottom-4 left-4 w-full max-w-xs h-40 bg-[#181818] rounded-xl shadow-lg p-4 flex items-center justify-between"
//         style={{ border: "none" }}
//       >
//         <div className="flex flex-col justify-center">
//           <h3 className="text-white text-lg font-semibold">Now Playing</h3>
//           <p className="text-gray-400 text-sm">Sample Track</p>
//           <p className="text-gray-500 text-xs">Artist Name</p>
//         </div>
//         <button
//           onClick={handleSplineClick} // Reuse the same toggle function for consistency
//           className="p-3 bg-green-500 rounded-full hover:bg-green-600 transition-colors"
//         >
//           {isPlaying ? (
//             <svg
//               className="w-6 h-6 text-white"
//               fill="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
//             </svg>
//           ) : (
//             <svg
//               className="w-6 h-6 text-white"
//               fill="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path d="M8 5v14l11-7L8 5z" />
//             </svg>
//           )}
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { Suspense, useState, useEffect, useRef } from "react";
import { Application } from "@splinetool/runtime";
import { useIsMobile } from "@/hooks/use-ismobile"; // Import the global useIsMobile hook
import { AudioLines } from "lucide-react";

const Spline = React.lazy(() => import("@splinetool/react-spline"));

export default function SimpleSpline() {
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false); // Track playback state
  const audioRef = useRef<HTMLAudioElement | null>(null); // Reference to audio element
  const isMobile = useIsMobile(); // Use the global hook

  const scenePath = isMobile ? "/assets/T4.spline" : "/assets/adiBot.spline";
  const audioSrc = "/assets/THE WEEKND.mp3"; // 320 kbps MP3 in public/assets

  // Handle click on Spline object to toggle audio playback
  const handleSplineClick = () => {
    if (isMobile && audioRef.current) { // Only handle audio on mobile
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((err) => {
          console.error("Audio playback error:", err);
          setError("Failed to play audio. Ensure the file is accessible.");
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      {error ? (
        <div className="flex items-center justify-center h-screen text-red-500">
          Error: {error}
        </div>
      ) : (
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-screen">
              Loading 3D scene...
            </div>
          }
        >
          <Spline
            scene={scenePath}
            onLoad={(app: Application) => {
              console.log("Spline scene loaded successfully:", scenePath);
            }}
            onMouseDown={handleSplineClick} // Trigger audio on click (mobile only)
            // @ts-expect-error: Spline component does not have onError prop
            onError={(err: Error) => {
              console.error(err);
              setError(err.message);
            }}
          />
        </Suspense>
      )}
      {isMobile && (
        <>
          {/* Audio element (hidden) */}
          <audio
            ref={audioRef}
            src={audioSrc}
            loop // Optional: loop the audio
            preload="auto" // Preload for fast playback
          />
          {/* Custom Hero Card */}
          <div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-[300px] h-[70px] bg-[#181818] rounded-xl shadow-lg p-4 flex items-center justify-between"
            style={{ border: "none" }}
          >
            <div className="flex items-center gap-4">
              <AudioLines color="#fff" size={24} />
              <div className="flex flex-col justify-center">
                <h3 className="text-white text-md font-semibold">Now Playing</h3>
                <p className="text-gray-400 text-xs">Sample Track</p>
                <p className="text-gray-500 text-[10px]">Artist Name</p>
              </div>
            </div>
            <button
              onClick={handleSplineClick} // Reuse the same toggle function
              className="p-2 bg-green-500 rounded-full hover:bg-green-600 transition-colors"
            >
              {isPlaying ? (
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7L8 5z" />
                </svg>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}