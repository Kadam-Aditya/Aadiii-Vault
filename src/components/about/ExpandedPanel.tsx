"use client";

import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface ExpandedPanelProps {
  title: string;
  onClose: () => void;
  children?: React.ReactNode;
}

const ExpandedPanel: React.FC<ExpandedPanelProps> = ({
  title,
  onClose,
  children,
}) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
    className="w-full mt-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 p-6 shadow-xl"
  >
    {/* Header Row */}
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
        {title}
      </h2>
      <button
        onClick={onClose}
        className="p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 transition"
        aria-label="Close panel"
      >
        <X className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />
      </button>
    </div>

    {/* Content Area */}
    <div className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
      {children ? (
        children
      ) : (
        <p>
          This is the expanded panel for <strong>{title}</strong>.  
          You can add detailed content here — such as education info, project
          details, or tools breakdown. It expands across the full row for
          readability and a polished, premium look.
        </p>
      )}
    </div>
  </motion.div>
);

export default ExpandedPanel;
