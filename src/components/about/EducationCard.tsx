"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import BackgroundImage from "./BackgroundImage";
import { TOP_CARD_STYLES, DARK_BG, MOTION_VARIANTS } from "./constants";

const EducationCard = () => (
  <motion.div
    variants={MOTION_VARIANTS}
    initial="initial"
    animate="animate"
    whileHover="hover"
    className={cn(TOP_CARD_STYLES, DARK_BG)}
  >
    <BackgroundImage imageUrl="/assets/mumbai_university.jpg" overlayOpacity={0.0} />
  </motion.div>
);

export default EducationCard;
