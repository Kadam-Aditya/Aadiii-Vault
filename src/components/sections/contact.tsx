'use client';

import React from 'react';
import { Mail, MapPin, Linkedin, Github } from 'lucide-react';

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="relative py-24 px-6 text-white dark:text-gray-100"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Get in Touch</h2>
          <p className="text-white dark:text-gray-400 max-w-xl mx-auto">
            Have a question, idea, or collaboration in mind? I'd love to hear from you.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Side — Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
              <p className="text-white dark:text-gray-400">
                Feel free to reach out via the form or through any of my socials below.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-indigo-500" />
                <a
                  href="mailto:youremail@example.com"
                  className="hover:text-indigo-500 transition-colors"
                >
                  work.adityakadam@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-indigo-500" />
                <span>Navi Mumbai, INDIA</span>
              </div>
            </div>

            <div className="flex gap-5 pt-4">
              <a
                href="https://linkedin.com/in/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900/40 hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors"
              >
                <Linkedin className="w-5 h-5 text-indigo-600 dark:text-indigo-300" />
              </a>
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900/40 hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors"
              >
                <Github className="w-5 h-5 text-indigo-600 dark:text-indigo-300" />
              </a>
            </div>
          </div>

          {/* Right Side — Contact Form */}
          <form className="bg-white text-gray-700 dark:bg-gray-900 p-8 rounded-2xl shadow-lg space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                placeholder="johndoe@email.com"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                rows={4}
                placeholder="Write your message..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
