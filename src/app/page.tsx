"use client";

import React from "react";
import { cn } from "@/lib/utils";
import SkillsSection from "@/components/sections/skills";
import ProjectsSection from "@/components/sections/projects";
import ContactSection from "@/components/sections/contact";
import HeroSection from "@/components/sections/hero";
import SimpleSpline from "@/components/animations/robo-animations";

function MainPage() {
  return (
    <>
        <main className={cn("bg-slate-100 dark:bg-transparent")}>
        <div className="top-0 z-0 fixed w-full h-screen">
            <SimpleSpline />
          </div>
          <HeroSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </main>
    </>
  );
}

export default MainPage;