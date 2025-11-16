"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

export interface AIBlobProps {
  size?: number;
}

export default function AIBlob({ size = 256 }: AIBlobProps) {
  const controls = useAnimation();

  useEffect(() => {
    let audioCtx: AudioContext | null = null;
    let analyser: AnalyserNode | null = null;
    let dataArray: Uint8Array | null = null;
    let mounted = true;

    async function setupAudio() {
      try {
        audioCtx = new (window.AudioContext ||
          (window as any).webkitAudioContext)();

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        if (!mounted) return;

        const source = audioCtx.createMediaStreamSource(stream);
        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 128;

        source.connect(analyser);

        const bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);

        const animate = () => {
          if (!mounted || !analyser || !dataArray) return;

          analyser.getByteFrequencyData(dataArray);
          const avg =
            dataArray.reduce((a, b) => a + b, 0) / dataArray.length / 255;
          const scale = 1 + avg * 0.6;

          controls.start({ scale });
          requestAnimationFrame(animate);
        };

        animate();
      } catch (err) {
        console.warn("Microphone permission denied:", err);
      }
    }

    setupAudio();

    return () => {
      mounted = false;
      audioCtx?.close();
    };
  }, [controls]);

  const offsetX = -40;
  const offsetY = -40;

  const moveSmall = size * 0.08;
  const moveLarge = size * 0.2;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* SVG Filter */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 20 -10
            "
            result="goo"
          />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </svg>

      <div style={{ filter: "url(#goo)" }} className="relative">

        {/* Main Blob */}
        <motion.div
          animate={controls}
          transition={{ type: "spring", stiffness: 120, damping: 12 }}
          className="absolute rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 mix-blend-screen opacity-90"
          style={{
            width: size,
            height: size,
            top: offsetY,
            left: offsetX,
          }}
        />

        {/* Secondary Blob */}
        <motion.div
          animate={{
            x: [0, moveSmall, -moveSmall, 0],
            y: [0, -moveSmall, moveSmall, 0],
            transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-80 mix-blend-screen"
          style={{
            width: size * 0.9,
            height: size * 0.9,
            top: offsetY + size * 0.05,
            left: offsetX + size * 0.05,
          }}
        />

        {/* Third Blob */}
        <motion.div
          animate={{
            x: [0, -moveLarge, moveLarge, 0],
            y: [0, moveSmall, -moveSmall, 0],
            transition: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute rounded-full bg-gradient-to-r from-pink-500 to-indigo-500 opacity-70 mix-blend-screen"
          style={{
            width: size * 0.8,
            height: size * 0.8,
            top: offsetY + size * 0.1,
            left: offsetX + size * 0.1,
          }}
        />
      </div>
    </div>
  );
}
