"use client";
import React, { createContext, useContext, useRef, useState } from "react";

const AudioContext = createContext<any>(null);

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const play = () => {
    if (!audioRef.current) return;
    audioRef.current.play();
    setIsPlaying(true);
  };

  const pause = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  };

  return (
    <AudioContext.Provider value={{ isPlaying, play, pause }}>
      {children}
      <audio
        ref={audioRef}
        src="/assets/weeknd.mp3"
        onEnded={() => setIsPlaying(false)}
      />
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);