"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import BackgroundImage from "./BackgroundImage";
import { BOTTOM_CARD_STYLES, DARK_BG, MOTION_VARIANTS } from "./constants";

const PlaylistCard = () => (
  <motion.div
    variants={MOTION_VARIANTS}
    initial="initial"
    animate="animate"
    whileHover="hover"
    className={cn(BOTTOM_CARD_STYLES, DARK_BG)}
  >
    <BackgroundImage imageUrl="/assets/aadiii_spotify.jpeg" overlayOpacity={0.0} />
  </motion.div>
);

export default PlaylistCard;
