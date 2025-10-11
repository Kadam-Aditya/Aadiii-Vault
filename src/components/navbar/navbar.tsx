"use client";

import { AudioLines } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-ismobile";

interface NavItem {
  label: string;
  href: string;
  icon?: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const Navbar: React.FC = () => {
  const navRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleClick = (e: Event) => {
      e.preventDefault();
      const target = e.currentTarget as HTMLAnchorElement;
      const targetId = target.getAttribute("href")?.substring(1) || "";
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
      if (isMobile) {
        setIsOpen(false); // Close navbar on link click for mobile
      }
    };

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((anchor) => anchor.addEventListener("click", handleClick));

    return () => {
      anchors.forEach((anchor) =>
        anchor.removeEventListener("click", handleClick)
      );
    };
  }, [isMobile]);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("nav a");
    const observerOptions = { threshold: 0.6 };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => link.classList.remove("active"));
          const id = entry.target.getAttribute("id");
          const activeLink = document.querySelector(`nav a[href="#${id}"]`);
          if (activeLink) {
            activeLink.classList.add("active");
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-white/30 backdrop-blur-lg shadow-xl 
                 border-t-[1px] border-r-[1px] border-white/70 pointer-events-auto transition-all duration-300 
                 ${
                   isMobile
                     ? isOpen
                       ? "w-[90%] max-w-[300px] h-auto p-4"
                       : "w-[100px] h-[45px] flex items-center justify-center"
                     : "w-[320px] md:w-[450px] h-[45px] flex items-center justify-center"
                 }`}
      style={{ borderRadius: "30px" }}
      onClick={() => isMobile && setIsOpen(!isOpen)} // Toggle only on mobile
    >
      {isMobile && !isOpen ? (
        <div className="w-full h-full flex items-center justify-center cursor-pointer">
          <span className="text-[#333] text-lg font-roboto">
            <AudioLines color="#54545B"/>
          </span>
        </div>
      ) : (
        <div
          className={`flex ${
            isMobile
              ? "flex-col items-center justify-center space-y-2 w-full"
              : "flex-row items-center justify-center space-x-6 w-full"
          }`}
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-[#333] px-3 py-1 text-sm font-roboto tracking-wide transition-all duration-300 hover:scale-105 ${
                isMobile ? "w-full text-center" : "w-auto"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;