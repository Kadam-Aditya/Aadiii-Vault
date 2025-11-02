// components/FloatingBlob.tsx
"use client";
import { motion } from "framer-motion";

interface FloatingBlobProps {
  visible: boolean;
}

export default function FloatingBlob({ visible }: FloatingBlobProps) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <motion.div
        className="w-32 h-32 bg-blue-400 rounded-full shadow-2xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.9, 1, 0.9],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
