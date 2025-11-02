'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import Home from '@/components/sections/home';
import ContactSection from '@/components/sections/contact';
import About from '@/components/sections/about';
import VoiceAssistant from '@/components/assistant/voiceAssistant';

const MainPage: React.FC = () => {
  return (
    <main className={cn('bg-[#DFDFDF] dark:bg-gray-900')}>
      <section id="home">
        <Home />
      </section>

      {/* ℹ️ About Section */}
      <section id="about" className="relative z-10">
        <About />
      </section>


      {/* 📞 Contact Section */}
      <section id="contact" className="relative z-10">
        <ContactSection />
      </section>
      <VoiceAssistant/>
    </main>
  );
};

export default MainPage;