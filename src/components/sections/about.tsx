"use client";

import React, { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

// Constants
const TOP_CARD_STYLES =
  "flex flex-1 w-full h-full min-h-[16rem] rounded-lg relative overflow-hidden";
const BOTTOM_CARD_STYLES =
  "flex flex-1 w-full h-full min-h-[26rem] rounded-lg relative overflow-hidden";
const SKELETON_FIVE_STYLES =
  "flex flex-1 w-full h-full min-h-[26rem] rounded-lg relative overflow-hidden";
const TOP_BG_STYLES = "bg-no-repeat bg-contain";
const BOTTOM_BG_STYLES = "bg-no-repeat bg-cover";
const DARK_BG = 'dark:bg-[url("/dots-pattern-dark.svg")]';

const MOTION_VARIANTS = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  hover: { scale: 1.02, transition: { duration: 0.3 } },
};

// Types
interface CardItem {
  title: string;
  description: string;
  header: React.ReactNode;
  className?: string;
  link: string;
}

interface AboutProps {
  scrollToRoutes?: () => void;
}

// Shared Background Component
const BackgroundImage: React.FC<{
  imageUrl: string;
  overlayOpacity: number;
  backgroundSize?: "cover" | "contain";
}> = memo(({ imageUrl, overlayOpacity, backgroundSize = "cover" }) => (
  <>
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,${overlayOpacity}), rgba(255,255,255,${overlayOpacity})), url(${imageUrl})`,
        backgroundSize,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
    <div className={`absolute inset-0 bg-black/${overlayOpacity * 100}`} />
  </>
));

// Skeleton Components
const SkeletonOne = memo(() => (
  <motion.div
    variants={MOTION_VARIANTS}
    initial="initial"
    animate="animate"
    whileHover="hover"
    className={cn(TOP_CARD_STYLES, DARK_BG, TOP_BG_STYLES)}
  >
    <BackgroundImage imageUrl="/assets/VE3.jpeg" overlayOpacity={0.0} />
  </motion.div>
));

const SkeletonTwo = memo(() => (
  <motion.div
    variants={MOTION_VARIANTS}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover="hover"
    className={cn(TOP_CARD_STYLES, DARK_BG, TOP_BG_STYLES)}
  >
    <BackgroundImage
      imageUrl="/assets/mumbai_university.jpg"
      overlayOpacity={0.0}
    />
  </motion.div>
));

const SkeletonThree = memo(() => (
  <motion.div
    variants={MOTION_VARIANTS}
    initial="initial"
    animate="animate"
    whileHover="hover"
    className={cn(TOP_CARD_STYLES, DARK_BG, TOP_BG_STYLES)}
  >
    <BackgroundImage imageUrl="/assets/ImgifAi.png" overlayOpacity={0.0} />
  </motion.div>
));

const SkeletonFour = memo(() => {
  const techItems = [
    {
      name: "Spline",
      icon: "/assets/ss.jpg",
      tag: "3D",
      color: "red",
      category: "3D Modeling",
    },
    {
      name: "JavaScript",
      icon: "/assets/ss.jpg",
      tag: "Interactions",
      color: "green",
      category: "Programming",
    },
    {
      name: "React JS",
      icon: "/assets/ss.jpg",
      tag: "Library",
      color: "orange",
      category: "Framework",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={cn(
        BOTTOM_CARD_STYLES,
        DARK_BG,
        BOTTOM_BG_STYLES,
        "flex-row space-x-2 p-2"
      )}
    >
      {techItems.map((item, index) => (
        <motion.div
          key={item.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={cn(
            "h-full flex-1 rounded-2xl bg-[#eeeeee] dark:bg-neutral-800 p-4 border border-neutral-400 flex flex-col items-center justify-center",
            "hover:border-neutral-500 transition-colors duration-200"
          )}
        >
          <Image
            src={item.icon}
            alt={`${item.name} icon`}
            width={40}
            height={40}
            className="h-10 w-10 object-contain mb-4"
            priority
          />
          <p className="text-xs sm:text-sm text-center font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
            {item.name}
          </p>
          <span
            className={cn(
              `border text-xs font-medium rounded-full px-2 py-0.5`,
              `border-${item.color}-500 bg-${item.color}-100 dark:bg-${item.color}-900/20 text-${item.color}-600`
            )}
          >
            {item.tag}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
});

const SkeletonFive = memo(() => (
  <motion.div
    variants={MOTION_VARIANTS}
    initial="initial"
    animate="animate"
    whileHover="hover"
    className={cn(SKELETON_FIVE_STYLES, DARK_BG, BOTTOM_BG_STYLES)}
  >
    <BackgroundImage
      imageUrl="/assets/aadiiiSpotify.jpeg"
      overlayOpacity={0.0}
    />
  </motion.div>
));

// Main BentoGridItem Component
interface BentoGridItemProps {
  title: string;
  description: React.ReactNode;
  header: React.ReactNode;
  className?: string;
  link: string;
  onClick?: () => void;
}

const BentoGridItem = memo<BentoGridItemProps>(
  ({ title, description, header, className, link, onClick }) => {
    const [isPlaying, setIsPlaying] = React.useState(false);
    const audioRef = React.useRef<HTMLAudioElement | null>(null);

    React.useEffect(() => {
      if (title === "Playlist") {
        audioRef.current = new Audio("/assets/THE WEEKND.mp3");

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        const handleEnded = () => setIsPlaying(false);

        audioRef.current.addEventListener("play", handlePlay);
        audioRef.current.addEventListener("pause", handlePause);
        audioRef.current.addEventListener("ended", handleEnded);

        return () => {
          if (audioRef.current) {
            audioRef.current.removeEventListener("play", handlePlay);
            audioRef.current.removeEventListener("pause", handlePause);
            audioRef.current.removeEventListener("ended", handleEnded);
            audioRef.current.pause();
          }
        };
      }
    }, [title]);

    const togglePlay = (e?: React.MouseEvent) => {
      e?.stopPropagation();
      e?.preventDefault();
      if (!audioRef.current) return;
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    };

    const isPlaylist = title === "Playlist";

    return (
      <motion.div
        className={cn(
          "group relative overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 transition-all duration-300 hover:border-neutral-300 dark:hover:border-neutral-700",
          "[&>p:text-lg] [&>p:font-semibold] [&>p:text-neutral-900] dark:[&>p:text-neutral-100]",
          className
        )}
        whileHover={{
          y: -5,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        }}
        transition={{ duration: 0.3 }}
      >
        {isPlaylist ? (
          <div
            onClick={togglePlay}
            className="block h-full cursor-pointer select-none"
          >
            <div className="space-y-4">
              <div className="relative">{header}</div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                    {title}
                  </h3>

                  <button
                    onClick={togglePlay}
                    className={cn(
                      "relative flex items-center justify-center",
                      "h-11 w-11 rounded-full shadow-md",
                      "bg-gradient-to-br from-gray-700 to-gray-900",
                      "hover:scale-110 hover:shadow-lg active:scale-95 transition-all duration-200",
                      "dark:from-gray-600 dark:to-gray-800"
                    )}
                  >
                    {isPlaying ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-9 w-9 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 9v6m4-6v6"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-white ml-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M14.752 11.168l-5.197-3.027A1 1 0 008 9.027v5.946a1 1 0 001.555.832l5.197-3.027a1 1 0 000-1.71z"
                        />
                      </svg>
                    )}
                  </button>
                </div>

                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {description}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <Link href={link} onClick={onClick} className="block h-full">
            <div className="space-y-4">
              <div className="relative">{header}</div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                    {title}
                  </h3>
                </div>

                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {description}
                </p>

                <motion.div
                  className="flex items-center text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <span>Learn more</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </motion.div>
              </div>
            </div>
          </Link>
        )}
      </motion.div>
    );
  }
);

// Main About Component
const About: React.FC<AboutProps> = ({ scrollToRoutes }) => {
  const items: CardItem[] = [
    {
      title: "About Me",
      description:
        "Discover Aditya's personality, and his journey in tech innovation.",
      header: <SkeletonOne />,
      className: "lg:col-span-1",
      link: "/about",
    },
    {
      title: "University of Mumbai",
      description:
        "Discover my Work-Study journey as a Software Engineer at Mumbai University.",
      header: <SkeletonTwo />,
      className: "lg:col-span-1",
      link: "/saint-gobain",
    },
    {
      title: "Projects",
      description: "Development of different applications",
      header: <SkeletonThree />,
      className: "lg:col-span-1",
      link: "/cesiveroo",
    },
    {
      title: "Aditya's Portfolio",
      description:
        "Discover how I coded my portfolio from scratch and the tools I used.",
      header: <SkeletonFour />,
      className: "lg:col-span-2",
      link: "/portfolio",
    },
    {
      title: "Playlist",
      description: "Explore my favorite tracks and musical tastes.",
      header: <SkeletonFive />,
      className: "md:col-span-2 lg:col-span-1",
      link: "/playlist",
    },
  ];

  return (
    <div className={cn("w-full flex flex-col items-center p-6")}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-7xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 auto-rows-auto">
          {items.map((item, index) => (
            <BentoGridItem
              key={index}
              title={item.title}
              description={item.description}
              header={item.header}
              className={item.className}
              link={item.link}
              onClick={() => scrollToRoutes?.()}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default About;
