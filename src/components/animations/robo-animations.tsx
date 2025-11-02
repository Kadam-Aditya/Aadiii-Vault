"use client";

import React, { Suspense, useState, useRef, useEffect } from "react";

const Spline = React.lazy(() => import("@splinetool/react-spline"));

export default function SimpleSpline() {
  const [error, setError] = useState<string | null>(null);
  const scenePath = "/assets/adiRobo.splinecode"; // Make sure this path is correct

  const appRef = useRef<any>(null);

  // 🧠 onLoad handler — runs after the Spline scene is ready
  const handleLoad = (app: any) => {
    appRef.current = app;

    const targetMovement = app.findObjectByName("Target Movement");
    const targetHead = app.findObjectByName("Target Head");
    const body = app.findObjectByName("Body");

    if (!targetMovement || !targetHead || !body) {
      console.warn("Some Spline objects not found:", {
        targetMovement,
        targetHead,
        body,
      });
      return;
    }

    // 🌀 Function to continuously update rotation based on Target Head movement
    const updateRotation = () => {
      try {
        // Equivalent to: RotateR = -TargetHeadPx / 1.5
        const rotateR = -targetMovement.position.x / 50;

        // Apply rotation to the body (assuming rotation.y is the correct axis)
        body.rotation.z = rotateR;
      } catch (e) {
        console.error("Error updating rotation:", e);
      }

      requestAnimationFrame(updateRotation);
    };

    updateRotation();
  };

  return (
    <div className="w-full h-screen overflow-hidden bg-transparent">
      {error ? (
        <div className="flex items-center justify-center h-screen text-red-500">
          ❌ Failed to load Spline scene: {error}
        </div>
      ) : (
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-screen text-gray-500">
              Loading 3D scene...
            </div>
          }
        >
          <Spline
            scene={scenePath}
            style={{ background: "transparent" }}
            // When the scene loads, run our setup function
            onLoad={handleLoad}
            // Optional error handler
            // @ts-expect-error
            onError={(err: Error) => setError(err.message)}
          />
        </Suspense>
      )}
    </div>
  );
}
