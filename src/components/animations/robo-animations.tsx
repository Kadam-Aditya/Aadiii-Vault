"use client";

import React, { Suspense, useState, useEffect } from "react";
import { Application, SPEObject } from "@splinetool/runtime";
import { useMouse } from "@/hooks/use-mouse";
import gsap from "gsap";

const Spline = React.lazy(() => import("@splinetool/react-spline"));

export default function SimpleSpline() {
  const [splineApp, setSplineApp] = useState<Application | null>(null);
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { x, y } = useMouse({ allowPage: false });


  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      {error ? (
        <div className="flex items-center justify-center h-screen text-red-500">
          Error: {error}
        </div>
      ) : (
        <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading 3D scene...</div>}>
          <Spline
            scene="/assets/Test1.spline"
            onLoad={(app: Application) => {
              console.log("Spline scene loaded successfully");
              setSplineApp(app);
              setIsSplineLoaded(true);
            }}
          />
        </Suspense>
      )}
    </div>
  );
}