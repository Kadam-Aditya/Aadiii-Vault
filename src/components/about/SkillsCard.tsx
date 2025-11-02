"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { BOTTOM_CARD_STYLES, DARK_BG } from "./constants";

const SkillsCard = () => {
  const techItems = [
    { name: "Spline", icon: "/assets/spline.jpg" },
    { name: "Next JS", icon: "/assets/nextjs.png" },
    { name: "Tailwind CSS", icon: "/assets/tailwindcss.png" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn(BOTTOM_CARD_STYLES, DARK_BG, "flex-row space-x-2 p-2")}
    >
      {techItems.map((item) => (
        <div
          key={item.name}
          className="flex-1 rounded-2xl bg-[#eeeeee] dark:bg-neutral-800 p-4 border border-neutral-400 flex flex-col items-center justify-center"
        >
          <Image src={item.icon} alt={item.name} width={40} height={40} className="h-10 w-10 object-contain mb-4" />
          <p className="text-xs sm:text-sm text-center font-semibold text-neutral-700 dark:text-neutral-300">
            {item.name}
          </p>
        </div>
      ))}
    </motion.div>
  );
};

export default SkillsCard;
