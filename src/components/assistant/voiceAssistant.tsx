"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useAudio } from "@/context/AudioContext";
import AIBlob from "../animations/AIBlob";
import AIPanel from "../animations/AIPanel";

const VoiceAssistantButton: React.FC = () => {
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [speechReady, setSpeechReady] = useState(false);
  const { play, pause } = useAudio();

  /* ----------------------- Speech Recognition ------------------------ */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const rec = new SpeechRecognition();
    rec.lang = "en-US";
    rec.continuous = true;
    rec.interimResults = false;
    rec.maxAlternatives = 1;

    rec.onstart = () => setIsListening(true);
    rec.onend = () => setIsListening(false);
    rec.onerror = () => setIsListening(false);
    rec.onresult = (e: any) => {
      const transcript = e.results[e.results.length - 1][0].transcript
        .trim()
        .toLowerCase();
      handleCommand(transcript);
    };

    recognitionRef.current = rec;
    return () => {
      rec.stop();
      recognitionRef.current = null;
    };
  }, []);

  /* ----------------------- Speech Synthesis ------------------------ */
  const speak = useCallback((text: string) => {
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "en-US";
      window.speechSynthesis.speak(u);
    } catch (err) {
      console.error("Speech synthesis failed:", err);
    }
  }, []);

  /* ----------------------- Command Handling ------------------------ */
  const handleCommand = useCallback(
    (cmd: string) => {
      if (cmd.includes("play") && cmd.includes("playlist")) {
        play();
        speak("Playing your playlist.");
        return;
      }
      if (cmd.includes("pause") || cmd.includes("stop the music")) {
        pause();
        speak("Music paused.");
        return;
      }
      if (cmd.includes("resume") && cmd.includes("playlist")) {
        play();
        speak("Resuming your playlist.");
        return;
      }
      if (cmd.includes("stop listening") || cmd.includes("goodbye robo")) {
        speak("Goodbye!");
        stopListening();
        return;
      }
      if (cmd.includes("navigate") || cmd.includes("go to")) {
        const match = cmd.match(/about|skills|projects|contact|home/i)?.[0];
        if (match) {
          const el = document.getElementById(match.toLowerCase());
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
            speak(`Going to ${match}.`);
          } else speak(`Can't find ${match}.`);
        }
        return;
      }
      if (cmd.includes("hello") || cmd.includes("hi")) {
        speak("Hello!");
        return;
      }
      if (cmd.includes("how are you")) {
        speak("I'm doing great!");
        return;
      }
      speak("Sorry, I didn’t catch that.");
    },
    [play, pause, speak]
  );

  /* ----------------------- Voice Controls ------------------------ */
  const startListening = () => {
    if (!recognitionRef.current) return;
    if (!speechReady) {
      const unlock = new SpeechSynthesisUtterance("Voice assistant activated.");
      unlock.onend = () => {
        setSpeechReady(true);
        beginRecognition();
      };
      window.speechSynthesis.speak(unlock);
    } else beginRecognition();
  };

  const beginRecognition = () => {
    try {
      recognitionRef.current?.start();
      speak("How may I help you?");
    } catch (e: any) {
      if (e.name !== "InvalidStateError") console.error(e);
    }
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  const handleClick = () => (isListening ? stopListening() : startListening());

  /* ---------------------------- Render ----------------------------- */
  return (
    <>
      {/* Floating Button in Top-Right */}
      <div
        onClick={handleClick}
        className="fixed top-4 right-6 z-[70] w-22 h-22 rounded-full hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center overflow-visible"
      >
        <div className="relative flex items-center justify-center w-full h-full">
          <AIBlob size={80} />
        </div>
      </div>

      {/* Slide-up Listening Panel */}
      <AIPanel isOpen={isListening} onClose={stopListening} />
    </>
  );
};

export default VoiceAssistantButton;
