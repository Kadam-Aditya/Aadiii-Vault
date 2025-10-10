// useIsMobile.ts
"use client";

import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768; // Define mobile breakpoint in pixels

export const useIsMobile = (): boolean => {
  // Initialize state based on window width
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth <= MOBILE_BREAKPOINT : false
  );

  useEffect(() => {
    // Function to update isMobile based on window width
    const handleResize = () => {
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    };

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Call handleResize immediately to set initial state
    handleResize();

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobile;
};