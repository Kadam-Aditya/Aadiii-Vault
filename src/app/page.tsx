'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import Home from '@/components/sections/home';
import ContactSection from '@/components/sections/contact';
import About from '@/components/sections/about';
import VoiceAssistant from '@/components/assistant/voiceAssistant';

const MainPage: React.FC = () => {
  return (
    <main className={cn('bg-[#abaaab]')}>
      
      {/* 🏠 Home Section */}
      <section id="home">
        <Home />
      </section>

      {/* ℹ️ About Section */}
      <section id="about" className="relative z-10 overflow-hidden">
        {/* 🌈 Smooth About → Contact Gradient */}
        <div
          className="
            absolute 
            bottom-0 left-0 w-full h-[90vh]
            bg-gradient-to-b
            from-transparent
            via-[#9a9a9a]/40
            via-[#7a7a7a]/70
            to-[#3A3A3A]
            -z-10
          "
          aria-hidden="true"
        />
        <About />
      </section>

      {/* 📞 Contact Section */}
      <section id="contact" className="relative z-10 bg-[#3A3A3A] text-white overflow-hidden">
        {/* 🔽 Contact content */}
        <ContactSection />

        {/* 🌌 Smooth dark fade to black at the end */}
        <div
          className="
            absolute 
            bottom-0 left-0 w-full h-[60vh]
            bg-gradient-to-b
            from-transparent
            via-[#1f1f1f]/70
            to-black
            pointer-events-none
            -z-10
          "
          aria-hidden="true"
        />
      </section>

      <VoiceAssistant />
    </main>
  );
};

export default MainPage;
