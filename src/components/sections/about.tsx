// components/about/About.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion'; // Removed AnimatePresence
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

// Types
interface CardItem {
  title: string;
  description: string;
  header: React.ReactNode;
  className?: string;
  link: string;
  target?: string;
}

interface AboutProps {
  scrollToRoutes?: () => void;
}

// Skeleton Components
const SkeletonOne: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "flex flex-1 w-full h-full min-h-[10rem] dark:bg-[url('/dots-pattern-dark.svg')] bg-[url('/dots-pattern-light.svg')] bg-no-repeat bg-contain rounded-lg flex-col space-y-2 relative overflow-hidden"
      )}
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0.1)), url('/images/aditya.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/20" />
      <motion.div 
        className={cn("h-full w-full rounded-lg relative z-10")}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

const SkeletonTwo: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex flex-1 w-full h-full min-h-[10rem] dark:bg-[url('/dots-pattern-dark.svg')] bg-[url('/dots-pattern-light.svg')] bg-no-repeat bg-contain rounded-lg flex-col space-y-2 relative overflow-hidden"
      )}
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0.1)), url('/images/saint-gobain.png')`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/10" />
      <motion.div 
        className={cn("h-full w-full rounded-lg relative z-10")}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

const SkeletonThree: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "flex flex-1 w-full h-full min-h-[10rem] dark:bg-[url('/dots-pattern-dark.svg')] bg-[url('/dots-pattern-light.svg')] bg-no-repeat bg-contain rounded-lg flex-col space-y-2 relative overflow-hidden"
      )}
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0.1)), url('/images/cesiveroo.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/20" />
      <motion.div 
        className={cn("h-full w-full rounded-lg relative z-10")}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

const SkeletonFour: React.FC = () => {
  const techItems = [
    {
      name: "Spline",
      icon: "/icons/spline.png",
      tag: "3D",
      color: "red",
      category: "3D Modeling"
    },
    {
      name: "JavaScript",
      icon: "/icons/javascript.png",
      tag: "Interactions",
      color: "green",
      category: "Programming"
    },
    {
      name: "React JS",
      icon: "/icons/react.png",
      tag: "Library",
      color: "orange",
      category: "Framework"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileHover="hover"
      className={cn(
        "flex flex-1 w-full h-full min-h-[8rem] dark:bg-[url('/dots-pattern-dark.svg')] bg-[url('/dots-pattern-light.svg')] bg-no-repeat bg-contain flex-row space-x-2 rounded-lg p-2"
      )}
    >
      {techItems.map((item, index) => (
        <motion.div
          key={item.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={cn(
            "h-full flex-1 rounded-2xl bg-[#eeeeee] dark:bg-neutral-800 p-4 border border-neutral-400 flex flex-col items-center justify-center relative overflow-hidden",
            "hover:border-neutral-500 transition-colors duration-200"
          )}
          whileHover={{ 
            scale: 1.05, 
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)" 
          }}
        >
          <div className="mb-4">
            <Image
              src={item.icon}
              alt={item.name}
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
          </div>
          <p className={cn(
            "text-xs sm:text-sm text-center font-semibold text-neutral-700 dark:text-neutral-300 mb-2"
          )}>
            {item.name}
          </p>
          <span className={cn(
            `border text-xs font-medium rounded-full px-2 py-0.5`,
            `border-${item.color}-500 bg-${item.color}-100 dark:bg-${item.color}-900/20 text-${item.color}-600`
          )}>
            {item.tag}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
};

const SkeletonFive: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileHover="animate"
      className={cn(
        "flex flex-1 w-full h-full min-h-[10rem] dark:bg-[url('/dots-pattern-dark.svg')] bg-[url('/dots-pattern-light.svg')] bg-no-repeat bg-contain flex-col space-y-3 rounded-lg p-4"
      )}
    >
      {/* Profile Section */}
      <motion.div
        className={cn(
          "flex flex-row rounded-2xl border border-neutral-400 p-3 items-start space-x-3 bg-[#eeeeee] dark:bg-neutral-800"
        )}
        whileHover={{ x: 5 }}
      >
        <Image
          src="/images/profil.jpg"
          alt="Profile"
          width={40}
          height={40}
          className={cn("rounded-full h-10 w-10 object-cover")}
        />
        <p className={cn("text-xs text-neutral-600 dark:text-neutral-400 flex-1")}>
          I&apos;ve worked on some pretty cool projects! It&apos;s been an awesome journey.
        </p>
      </motion.div>
      
      {/* Chat Bubble */}
      <motion.div
        className={cn(
          "flex flex-row rounded-full border border-neutral-400 bg-[#eeeeee] dark:bg-neutral-800 p-3 pl-6 items-center justify-end space-x-2 w-3/4 ml-auto relative"
        )}
        whileHover={{ scale: 1.02 }}
      >
        <p className={cn("text-xs text-neutral-600 dark:text-neutral-400")}>
          Like getting coffee? That&apos;s impressive!
        </p>
        <div className={cn(
          "h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0 relative"
        )} />
        {/* Chat bubble tail */}
        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-neutral-400 border-t-4 border-t-transparent" />
      </motion.div>
    </motion.div>
  );
};

// Main BentoGridItem Component
interface BentoGridItemProps {
  title: string;
  description: React.ReactNode;
  header: React.ReactNode;
  className?: string;
  link: string;
  target?: string;
  onClick?: () => void;
}

const BentoGridItem: React.FC<BentoGridItemProps> = ({
  title,
  description,
  header,
  className,
  link,
  target,
  onClick
}) => {
  return (
    <motion.div
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 cursor-pointer transition-all duration-300 hover:border-neutral-300 dark:hover:border-neutral-700",
        "[&>p:text-lg] [&>p:font-semibold] [&>p:text-neutral-900] dark:[&>p:text-neutral-100]",
        className
      )}
      whileHover={{ 
        y: -5,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
      }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
    >
      <Link href={link} target={target}>
        <div className="space-y-4">
          <div className="relative">
            {header}
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              {title}
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {description}
            </p>
            <motion.div
              className="flex items-center text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors"
              initial={{ opacity: 0, x: -10 }}
              whileHover={{ opacity: 1, x: 0 }}
            >
              <span>Learn more</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

// Main About Component
const About: React.FC<AboutProps> = ({ scrollToRoutes }) => {
  const items: CardItem[] = [
    {
      title: "About Me",
      description: "Discover Aditya&apos;s personality, and his journey in tech innovation.",
      header: <SkeletonOne />,
      className: "lg:col-span-1",
      link: "/about",
    },
    {
      title: "Software engineering journey",
      description: "Discover my Work-Study journey as a Software Engineer at Mumbai University.",
      header: <SkeletonTwo />,
      className: "lg:col-span-1",
      link: "/saint-gobain",
    },
    {
      title: "Projects",
      description: "Development of a different applications",
      header: <SkeletonThree />,
      className: "lg:col-span-1",
      link: "/cesiveroo",
    },
    {
      title: "Aditya&apos;s Portfolio",
      description: "Discover how I coded my portfolio from scratch and the tools I used.",
      header: <SkeletonFour />,
      className: "lg:col-span-2",
      link: "/portfolio",
    },
    {
      title: "Aditya&apos;s Resume",
      description: "Explore my journey",
      header: <SkeletonFive />,
      className: "md:col-span-2 lg:col-span-1",
      link: "/resume",
    },
  ];

  const handleCardClick = (link: string) => {
    if (scrollToRoutes) {
      scrollToRoutes();
    }
    // Next.js handles navigation via Link component
  };

  return (
    <div className={cn('w-full flex flex-col items-center p-6')}>
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-light text-neutral-800 dark:text-neutral-200 mb-4">
            Welcome to my portfolio
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Discover the portfolio of Aditya, a AI enthusiast solving real life problems in DevOps and Development.
          </p>
        </div>
      </motion.div>

      {/* Bento Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-7xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 auto-rows-[1fr]">
          {items.map((item, index) => (
            <BentoGridItem
              key={index}
              title={item.title}
              description={item.description}
              header={item.header}
              className={item.className}
              link={item.link}
              onClick={() => handleCardClick(item.link)}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default About;