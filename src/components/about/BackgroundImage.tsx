"use client";
import React, { memo } from "react";

interface BackgroundImageProps {
  imageUrl: string;
  overlayOpacity: number;
}

const BackgroundImage = memo(({ imageUrl, overlayOpacity }: BackgroundImageProps) => (
  <>
    {/* The actual background image */}
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,${overlayOpacity}), rgba(255,255,255,${overlayOpacity})), url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />

    {/* Optional black overlay for contrast */}
    <div
      className="absolute inset-0"
      style={{ backgroundColor: `rgba(0,0,0,${overlayOpacity})` }}
    />
  </>
));

export default BackgroundImage;
