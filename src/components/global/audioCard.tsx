"use client";

import React, { useRef, useState } from "react";

const AudioCard = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioSrc = "/assets/THE WEEKND.mp3";
  const imageSrc = "/assets/MobileSpotify.jpeg";
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggle = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0; // Optional: Reset to start when paused
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch((err) => {
          console.error("Audio playback error:", err);
        });
        setIsPlaying(true);
      }
    }
  };

  // Optional: Handle when audio ends to reset play button
  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div
      className="absolute bottom-75 left-1/2 -translate-x-1/2 w-[90%] max-w-[350px] bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl shadow-2xl p-4 flex items-center justify-between transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
    >
      <div className="flex items-center gap-4">
        <div className="relative flex items-center gap-2">
          <img
            src={imageSrc}
            alt="Album cover"
            className="w-12 h-12 rounded-md object-cover shadow-md"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="text-white text-lg font-bold tracking-tight">Aditya Kadam</h3>
          <p className="text-gray-300 text-sm font-medium">Software Engineer</p>
          <p className="text-gray-400 text-xs tracking-wide">Playlist</p>
        </div>
      </div>
      <button
        onClick={handleToggle}
        className="p-3 bg-white rounded-full hover:bg-gray-200 transition-colors duration-200 transform hover:scale-105"
      >
        {isPlaying ? (
          <svg
            className="w-6 h-6 text-gray-900"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          </svg>
        ) : (
          <svg
            className="w-6 h-6 text-gray-900"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7L8 5z" />
          </svg>
        )}
      </button>
      <audio
        ref={audioRef}
        src={audioSrc}
        loop // Remove this if you want to handle audio end
        preload="auto"
        onEnded={handleAudioEnded} // Add this to handle audio completion
      />
    </div>
  );
};

export default AudioCard;