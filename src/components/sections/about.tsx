"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BentoGridItem from "../about/BentoGridItem";
import ExpandedPanel from "../about/ExpandedPanel";
import AboutMeCard from "../about/AboutMeCard";
import EducationCard from "../about/EducationCard";
import ProjectsCard from "../about/ProjectsCard";
import SkillsCard from "../about/SkillsCard";
import PlaylistCard from "../about/PlaylistCard";

const About = () => {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const expandedRef = useRef<HTMLDivElement | null>(null);

  const items = [
    {
      title: "About Me",
      description: "Discover Aditya's journey in tech innovation.",
      header: <AboutMeCard />,
      className: "lg:col-span-1",
    },
    {
      title: "University of Mumbai",
      description: "My work-study experience as a Software Engineer.",
      header: <EducationCard />,
      className: "lg:col-span-1",
    },
    {
      title: "Projects",
      description: "Development of various modern web apps.",
      header: <ProjectsCard />,
      className: "lg:col-span-1",
    },
    {
      title: "Skills",
      description: "Discover how I built this portfolio.",
      header: <SkillsCard />,
      className: "lg:col-span-2", // ✅ Wider card
    },
    {
      title: "Playlist",
      description: "Explore my favorite tracks.",
      header: <PlaylistCard />,
      className: "md:col-span-2 lg:col-span-1",
    },
  ];

  useEffect(() => {
    if (activeCard && expandedRef.current) {
      setTimeout(() => {
        expandedRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 400);
    }
  }, [activeCard]);

  return (
    <div className="w-full flex flex-col items-center p-6" id="about">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-7xl"
      >
        {/* 💡 Reference grid layout alignment */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 auto-rows-auto"
        >
          {items.map((item) => (
            <div key={item.title} className={item.className}>
              <BentoGridItem
                title={item.title}
                description={item.description}
                header={item.header}
                className="cursor-pointer"
                onClick={() => {
                  if (item.title !== "Playlist") {
                    setActiveCard(activeCard === item.title ? null : item.title);
                  }
                }}
                isActive={activeCard === item.title}
              />
            </div>
          ))}
        </motion.div>

        {/* Expanded panel below grid */}
        <AnimatePresence>
          {activeCard && (
            <div ref={expandedRef}>
              <ExpandedPanel title={activeCard} onClose={() => setActiveCard(null)} />
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default About;
