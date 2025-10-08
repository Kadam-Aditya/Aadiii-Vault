"use client";

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import { useMouse } from "@/hooks/use-mouse";
import { useMediaQuery } from "@/hooks/use-media-query";

// Gsap Ticker Hook
function useTicker(callback: () => void, paused: boolean) {
  useEffect(() => {
    if (!paused) gsap.ticker.add(callback);
    return () => gsap.ticker.remove(callback);
  }, [callback, paused]);
}

// Generic useInstance Hook
function useInstance<T>(value: T | (() => T)) {
  const ref = useRef<T | null>(null);
  if (ref.current === null)
    ref.current = typeof value === "function" ? (value as () => T)() : value;
  return ref.current;
}

// Calculate scale based on mouse velocity
function getScale(diffX: number, diffY: number) {
  const distance = Math.sqrt(diffX ** 2 + diffY ** 2);
  return Math.min(distance / 735, 0.35);
}

// Calculate angle in degrees
function getAngle(diffX: number, diffY: number) {
  return (Math.atan2(diffY, diffX) * 180) / Math.PI;
}

// Get bounding rect of hoverable element
function getRekt(el: HTMLElement) {
  if (el.classList.contains("cursor-can-hover")) return el.getBoundingClientRect();
  if (el.parentElement?.classList.contains("cursor-can-hover"))
    return el.parentElement.getBoundingClientRect();
  if (el.parentElement?.parentElement?.classList.contains("cursor-can-hover"))
    return el.parentElement.parentElement.getBoundingClientRect();
  return null;
}

const CURSOR_DIAMETER = 50;

function ElasticCursor() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const jellyRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorMoved, setCursorMoved] = useState(false);
  const { x, y } = useMouse();

  // Position, velocity, and GSAP setter instances
  const pos = useInstance(() => ({ x: 0, y: 0 }));
  const vel = useInstance(() => ({ x: 0, y: 0 }));
  const set = useInstance<{
    x: ReturnType<typeof gsap.quickSetter>;
    y: ReturnType<typeof gsap.quickSetter>;
    r?: ReturnType<typeof gsap.quickSetter>;
    width?: ReturnType<typeof gsap.quickSetter>;
    sx?: ReturnType<typeof gsap.quickSetter>;
    sy?: ReturnType<typeof gsap.quickSetter>;
  }>({ x: () => {}, y: () => {} });

  // Initialize GSAP quick setters
  useLayoutEffect(() => {
    if (!jellyRef.current) return;
    set.x = gsap.quickSetter(jellyRef.current, "x", "px");
    set.y = gsap.quickSetter(jellyRef.current, "y", "px");
    set.r = gsap.quickSetter(jellyRef.current, "rotate", "deg");
    set.width = gsap.quickSetter(jellyRef.current, "width", "px");
    set.sx = gsap.quickSetter(jellyRef.current, "scaleX");
    set.sy = gsap.quickSetter(jellyRef.current, "scaleY");
  }, [jellyRef, set]);

  // Animation loop
  const loop = useCallback(() => {
    if (!set.width || !set.sx || !set.sy || !set.r) return;
    const rotation = getAngle(vel.x, vel.y);
    const scale = getScale(vel.x, vel.y);

    if (!isHovering) {
      set.x(pos.x);
      set.y(pos.y);
      set.width(50 + scale * 300);
      set.r(rotation);
      set.sx(1 + scale);
      set.sy(1 - scale * 2);
    } else {
      set.r(0);
    }
  }, [set, pos, vel, isHovering]);

  // Mouse movement handling
  useLayoutEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!jellyRef.current) return;
      if (!cursorMoved) setCursorMoved(true);

      const el = e.target as HTMLElement;
      const hoverElemRect = getRekt(el);
      if (hoverElemRect) {
        const rect = el.getBoundingClientRect();
        setIsHovering(true);
        gsap.set(jellyRef.current, { rotate: 0 });
        gsap.to(jellyRef.current, {
          width: rect.width + 20,
          height: rect.height + 20,
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          borderRadius: 10,
          duration: 1.5,
          ease: "elastic.out(1, 0.3)",
        });
      } else {
        gsap.to(jellyRef.current, {
          borderRadius: 50,
          width: CURSOR_DIAMETER,
          height: CURSOR_DIAMETER,
        });
        setIsHovering(false);
      }

      // Animate position and velocity
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      gsap.to(pos, {
        x: mouseX,
        y: mouseY,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
        onUpdate: () => {
          vel.x = (mouseX - pos.x) * 1.2;
          vel.y = (mouseY - pos.y) * 1.2;
        },
      });

      loop();
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorMoved, isMobile, loop, pos, vel]);

  // Start GSAP ticker
  useTicker(loop, !cursorMoved || isMobile);

  if (isMobile) return null;

  return (
    <>
      <div
        ref={jellyRef}
        id="jelly-id"
        className={cn(
          `w-[${CURSOR_DIAMETER}px] h-[${CURSOR_DIAMETER}px] border-2 border-black dark:border-white`,
          "jelly-blob fixed left-0 top-0 rounded-lg z-[999] pointer-events-none will-change-transform",
          "translate-x-[-50%] translate-y-[-50%]"
        )}
        style={{ zIndex: 100, backdropFilter: "invert(100%)" }}
      ></div>

      <div
        className="w-3 h-3 rounded-full fixed translate-x-[-50%] translate-y-[-50%] pointer-events-none transition-none duration-300"
        style={{ top: y, left: x, backdropFilter: "invert(100%)" }}
      ></div>
    </>
  );
}

export default ElasticCursor;