"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isSquishing, setIsSquishing] = useState(false);

  // Use MotionValues instead of React state to prevent re-renders on mouse move
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring physics for smooth follow without lag
  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.nodeName === "A" ||
        target.nodeName === "BUTTON" ||
        target.closest("a") !== null ||
        target.closest("button") !== null;
      setIsHovering(isInteractive);
    };

    const handleMouseDown = () => {
      setIsSquishing(true);
    };

    const handleMouseUp = () => {
      // Run squish-out animation briefly then reset
      setTimeout(() => setIsSquishing(false), 400);
    };

    window.addEventListener("mousemove", updateMousePosition, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY]);

  // Squish keyframes: flatten → bounce back
  const squishVariants = {
    idle: { scaleX: 1, scaleY: 1, rotate: 0 },
    hover: { scaleX: 1.2, scaleY: 1.2, rotate: 15 },
    squish: {
      scaleX: [1, 1.6, 0.7, 1.2, 0.9, 1],
      scaleY: [1, 0.5, 1.3, 0.85, 1.1, 1],
      rotate: [0, -15, 20, -10, 5, 0],
      transition: {
        duration: 0.5,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        x: cursorXSpring,
        y: cursorYSpring,
        fontSize: isHovering ? "2.5rem" : "1.6rem",
        pointerEvents: "none",
        zIndex: 9999,
        translateX: "-50%",
        translateY: "-50%",
        transformOrigin: "center center",
        userSelect: "none",
        lineHeight: 1,
      }}
      variants={squishVariants}
      animate={isSquishing ? "squish" : isHovering ? "hover" : "idle"}
      transition={
        isSquishing
          ? undefined // handled in variant
          : { type: "spring", stiffness: 300, damping: 20 }
      }
    >
      🍊
    </motion.div>
  );
}
