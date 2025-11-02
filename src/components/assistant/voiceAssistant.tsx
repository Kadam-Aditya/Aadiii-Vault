'use client';

import { useAudio } from '@/context/AudioContext';
import React, { useEffect, useRef, useState, useCallback } from 'react';

const VoiceAssistant: React.FC = () => {
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [speechReady, setSpeechReady] = useState(false);
  const { play, pause } = useAudio();

  // ✅ Initialize SpeechRecognition once
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error('❌ SpeechRecognition not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      console.log('🎙️ Recognition started');
      setIsListening(true);
    };

    recognition.onend = () => {
      console.log('🛑 Recognition ended');
      setIsListening(false); // stop listening when recognition stops
    };

    recognition.onerror = (e: any) => {
      console.error('❌ Recognition error:', e.error);
      setIsListening(false); // stop everything on error
    };

    recognition.onresult = (e: any) => {
      const transcript = e.results[e.results.length - 1][0].transcript
        .trim()
        .toLowerCase();
      console.log('🗣️ Heard:', transcript);
      handleCommand(transcript);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
      recognitionRef.current = null;
    };
  }, []);

  // ✅ Speak helper
  const speak = useCallback((text: string) => {
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.pitch = 1;
      utterance.rate = 1;
      utterance.volume = 1;
      window.speechSynthesis.speak(utterance);
      console.log('🔊 Speaking:', text);
    } catch (err) {
      console.error('⚠️ speak() error:', err);
    }
  }, []);

  // ✅ Command Handler
  const handleCommand = useCallback(
    (command: string) => {
      if (command.includes('play') && command.includes('playlist')) {
        play();
        speak('Playing your playlist.');
        return;
      }
      if (command.includes('pause') || command.includes('stop the music')) {
        pause();
        speak('Music paused.');
        return;
      }
      if (command.includes('resume') && command.includes('playlist')) {
        play();
        speak('Resuming your playlist.');
        return;
      }
      if (command.includes('stop listening') || command.includes('goodbye robo')) {
        speak('Goodbye! I will stop listening now.');
        stopListening();
        return;
      }
      if (command.includes('navigate') || command.includes('go to')) {
        const section =
          command.match(/about|skills|projects|contact|home/i)?.[0]?.toLowerCase() || '';
        if (section) {
          const sectionEl = document.getElementById(section);
          if (sectionEl) {
            sectionEl.scrollIntoView({ behavior: 'smooth' });
            speak(`Navigating to the ${section} section.`);
          } else {
            speak(`I couldn’t find the ${section} section.`);
          }
        }
        return;
      }
      if (command.includes('hello') || command.includes('hi')) {
        speak('Hello there! How can I help you today?');
        return;
      }
      if (command.includes('how are you')) {
        speak('I am doing great! Ready to help you navigate your portfolio.');
        return;
      }

      console.log('🤔 Command not recognized.');
      speak('Sorry, I did not understand that.');
    },
    [pause, play, speak]
  );

  // ✅ Start listening
  const startListening = () => {
    if (!recognitionRef.current) return;

    if (!speechReady) {
      const unlock = new SpeechSynthesisUtterance('Voice assistant activated.');
      unlock.onend = () => {
        console.log('🔓 Speech synthesis unlocked.');
        setSpeechReady(true);
        beginRecognition();
      };
      window.speechSynthesis.speak(unlock);
    } else {
      beginRecognition();
    }
  };

  // ✅ Begin recognition safely
  const beginRecognition = () => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    try {
      recognition.start();
      speak('How may I help you?');
    } catch (err: any) {
      if (err.name === 'InvalidStateError') {
        console.warn('⚠️ Recognition already started.');
      } else {
        console.error('⚠️ Error starting recognition:', err);
      }
    }
  };

  // ✅ Stop listening
  const stopListening = () => {
    const recognition = recognitionRef.current;
    if (!recognition) return;
    recognition.stop();
    setIsListening(false);
    console.log('🧘 Stopped listening.');
  };

  return (
    <button
      onClick={isListening ? stopListening : startListening}
      className="fixed top-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer"
    >
      <div
        className={`w-8 h-8 rounded-full transition-all duration-300 ${
          isListening
            ? 'bg-green-400 animate-pulse scale-100'
            : 'bg-white opacity-80 scale-90'
        }`}
      />
    </button>
  );
};

export default VoiceAssistant;
