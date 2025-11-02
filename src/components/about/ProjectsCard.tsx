"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import BackgroundImage from "./BackgroundImage";
import { TOP_CARD_STYLES, DARK_BG, MOTION_VARIANTS } from "./constants";

const ProjectsCard = () => (
  <motion.div
    variants={MOTION_VARIANTS}
    initial="initial"
    animate="animate"
    whileHover="hover"
    className={cn(TOP_CARD_STYLES, DARK_BG)}
  >
    <BackgroundImage imageUrl="/assets/project1.png" overlayOpacity={0.0} />
  </motion.div>
);

export default ProjectsCard;
