"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import BackgroundImage from "./BackgroundImage";
import { TOP_CARD_STYLES, DARK_BG, MOTION_VARIANTS } from "./constants"

const AboutMeCard = () => (
  <motion.div
    variants={MOTION_VARIANTS}
    initial="initial"
    animate="animate"
    whileHover="hover"
    className={cn(TOP_CARD_STYLES, DARK_BG)}
  >
    <BackgroundImage imageUrl="/assets/VE3.jpeg" overlayOpacity={0.0} />
  </motion.div>
);

export default AboutMeCard;
