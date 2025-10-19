'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import Home from '@/components/sections/home';
import SkillsSection from '@/components/sections/skills';
import ProjectsSection from '@/components/sections/projects';
import ContactSection from '@/components/sections/contact';
import About from '@/components/sections/about';

const MainPage: React.FC = () => {
  return (
    <main className={cn('bg-[#DFDFDF] dark:bg-gray-900')}>
      {/* Home Section with Spline Animation */}
      <Home />

      {/* Other Sections */}
      <section className="relative z-10">
        <About />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </section>
    </main>
  );
};

export default MainPage;