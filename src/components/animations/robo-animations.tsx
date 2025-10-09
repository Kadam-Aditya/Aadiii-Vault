// "use client";

// import React, { Suspense, useState } from "react";
// import { Application } from "@splinetool/runtime";

// const Spline = React.lazy(() => import("@splinetool/react-spline"));

// export default function SimpleSpline() {
//   const [error, setError] = useState<string | null>(null);

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
//             scene="/assets/Test1.spline"
//             onLoad={(app: Application) => {
//               console.log("Spline scene loaded successfully");
//             }}
//             // @ts-expect-error: Spline component does not have onError prop, but we want to handle errors
//             onError={(err: Error) => {
//               console.error(err);
//               setError(err.message);
//             }}
//           />
//         </Suspense>
//       )}
//     </div>
//   );
// }


"use client";

import React, { Suspense, useState, useEffect } from "react";
import { Application } from "@splinetool/runtime";

const Spline = React.lazy(() => import("@splinetool/react-spline"));

// simple hook to check if viewport is mobile
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768); // you can adjust breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}

export default function SimpleSpline() {
  const [error, setError] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const scenePath = isMobile ? "/assets/T4.spline" : "/assets/Test1.spline";

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
            // @ts-expect-error: Spline component does not have onError prop, but we want to handle errors
            onError={(err: Error) => {
              console.error(err);
              setError(err.message);
            }}
          />
        </Suspense>
      )}
    </div>
  );
}
