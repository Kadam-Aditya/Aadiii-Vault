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

      {/* 🌈 Transition directly to dark background after Home */}
      <div
        className="
          w-full h-[20vh]
          bg-gradient-to-b
          from-[#abaaab]
          to-[#3A3A3A]
        "
      />

      {/* ℹ️ About Section */}
      <section id="about" className="relative z-10 bg-[#3A3A3A] text-white overflow-hidden">
        <About />
      </section>

      {/* 📞 Contact Section */}
      <section id="contact" className="relative z-10 bg-[#3A3A3A] text-white overflow-hidden">
        <ContactSection />
      </section>

      <VoiceAssistant />
    </main>
  );
};

export default MainPage;
