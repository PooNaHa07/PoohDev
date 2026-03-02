"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CuteOrange, { OrangeMood } from "./CuteOrange";
import { useSoundManager } from "../hooks/useSoundManager";

interface FloatingOrangeProps {
  className?: string;
  size?: number;
  delay?: number;
  duration?: number;
  yOffset?: number;
  top?: string | number;
  left?: string | number;
  right?: string | number;
  bottom?: string | number;
}

export default function FloatingOrange({
  className = "",
  size = 60,
  delay = 0,
  duration = 4,
  yOffset = 20,
  top,
  left,
  right,
  bottom,
}: FloatingOrangeProps) {
  const [mood, setMood] = useState<OrangeMood>(() => {
    const moods: OrangeMood[] = ["happy", "surprised", "wink", "excited", "neutral"];
    return moods[Math.floor(Math.random() * moods.length)];
  });
  const [trick, setTrick] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const { play } = useSoundManager();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scale down to 50% on mobile, minimum 25px
  const currentSize = isMobile ? Math.max(25, size * 0.5) : size;
  
  // Strip hidden-mobile if it was passed, so they show up on mobile
  const finalClassName = className.replace("hidden-mobile", "").trim();

  const handleInteraction = () => {
    // 1. Play sound
    play("squish");

    // 2. Random Mood
    const moods: OrangeMood[] = ["happy", "surprised", "wink", "excited", "neutral"];
    const nextMood = moods[Math.floor(Math.random() * moods.length)];
    setMood(nextMood);

    // 3. Trigger Trick Animation
    setTrick(prev => prev + 1);
  };

  return (
    <motion.div
      className={`absolute z-0 ${finalClassName}`}
      style={{ 
        width: currentSize, 
        height: currentSize,
        top,
        left,
        right,
        bottom,
        zIndex: 5,
        cursor: 'pointer',
        pointerEvents: 'auto'
      }}
      onClick={handleInteraction}
      animate={{
        y: [0, -yOffset, 0],
        rotate: [-5, 5, -5],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: delay,
      }}
    >
      <motion.div
        key={trick}
        style={{ width: '100%', height: '100%' }}
        initial={{ scale: 1, rotate: 0 }}
        animate={trick > 0 ? {
          scale: [1, 1.3, 0.8, 1.1, 1],
          rotate: [0, 360],
          y: [0, -40, 0]
        } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <CuteOrange className="w-full h-full" mood={mood} />
      </motion.div>
    </motion.div>
  );
}
