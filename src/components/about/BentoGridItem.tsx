"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAudio } from "@/context/AudioContext"; // ✅ import the global audio context

export interface BentoGridItemProps {
  title: string;
  description: string;
  header: React.ReactNode;
  className?: string;
  onClick: () => void;
  isActive: boolean;
}

const BentoGridItem: React.FC<BentoGridItemProps> = ({
  title,
  description,
  header,
  className,
  onClick,
  isActive,
}) => {
  // 🎵 Global audio player state (shared with VoiceAssistant)
  const { isPlaying, play, pause } = useAudio();

  const handlePlayToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent triggering expand panel
    if (isPlaying) pause();
    else play();
  };

  return (
    <motion.div
      layout
      role="button"
      tabIndex={0}
      onClick={() => {
        // Prevent expanding panel for Playlist
        if (title !== "Playlist") onClick();
      }}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      aria-pressed={isActive}
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 transition-all duration-300 hover:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-400",
        isActive && "ring-2 ring-indigo-500",
        className
      )}
    >
      <div className="space-y-4">
        {/* Header (usually an image or animated element) */}
        <div className="relative">{header}</div>

        {/* Text info */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              {title}
            </h3>

            {/* 🎵 Replace Arrow with Play/Pause toggle for Playlist */}
            {title === "Playlist" ? (
              <button
                onClick={handlePlayToggle}
                className="p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 transition"
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4 text-neutral-800 dark:text-neutral-100" />
                ) : (
                  <Play className="h-4 w-4 text-neutral-800 dark:text-neutral-100" />
                )}
              </button>
            ) : (
              <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition" />
            )}
          </div>

          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default BentoGridItem;
