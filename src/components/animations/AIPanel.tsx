"use client";

import { motion, AnimatePresence } from "framer-motion";
import AIBlob from "../animations/AIBlob";

interface AIPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIPanel({ isOpen, onClose }: AIPanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-40 flex items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Background overlay with smoother gradient */}
          <motion.div
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute bottom-0 left-0 right-0 h-full 
                       bg-gradient-to-b 
                       from-transparent 
                       via-black/40 
                       to-black/80 
                       backdrop-blur-[2px]" // optional blur adds subtle diffusion
          />

          {/* Panel */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 25,
              mass: 0.8,
            }}
            className="relative w-full max-w-2xl h-[45vh] rounded-t-[3rem] flex flex-col items-center justify-center overflow-hidden"
          >
            {/* AI Blob center animation */}
            <div className="flex flex-col items-center justify-center space-y-6">
              {/* 👇 Slight left and upward shift */}
              <div className="translate-x-[-60px] translate-y-[-40px]">
                <AIBlob size={220} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
