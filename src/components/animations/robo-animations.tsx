"use client";

import React, { Suspense, useState, useRef } from "react";
import { Application } from "@splinetool/runtime";
import { useIsMobile } from "@/hooks/use-ismobile"; // Import the global useIsMobile hook
import AudioCard from "../global/audioCard";

const Spline = React.lazy(() => import("@splinetool/react-spline"));

export default function SimpleSpline() {
  const [error, setError] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const scenePath = isMobile ? "/assets/T4.spline" : "/assets/adiBot.spline";

  const handleSplineLoad = (app: Application) => {
    console.log("Spline scene loaded successfully:", scenePath);
    const canvas = app.canvas;
    if (canvas) {
      canvas.style.background = "transparent";
    }
  };

  const splineStyle = isMobile
    ? { background: "transparent", marginTop: "-180px" }
    : { background: "transparent" };

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative", background: "transparent", overflow: "hidden" }}>
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
            onLoad={handleSplineLoad}
            // @ts-expect-error: Spline component does not have onError prop
            onError={(err: Error) => {
              console.error(err);
              setError(err.message);
            }}
            style={splineStyle}
          />
        </Suspense>
      )}
      {isMobile && <AudioCard/>}
    </div>
  );
}