"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";

type Mood = "idle" | "hover" | "dizzy" | "squish" | "held";

const SPEECH_MESSAGES = [
  "สวัสดีครับ! 👋",
  "ยินดีต้อนรับสู่โลกของ PoohDev 🍊",
  "สนใจจ้างผมมั้ยครับ? 😄",
  "ทุกอย่างเขียนได้ครับ!",
  "ผมหิวส้มแล้ว 🍊",
  "อย่าลืมกด Contact นะครับ!",
  "React & Next.js พร้อมครับ! 🚀",
  "Supabase, Firebase ทำได้ครับ 🔥",
];

const MOOD_EMOJI: Record<Mood, string> = {
  idle: "🍊",
  hover: "🍊",
  dizzy: "😵",
  squish: "🍊",
  held: "🍸",
};

export default function CustomCursor() {
  const [isTouchDevice, setIsTouchDevice] = useState(true); // assume mobile until proven otherwise
  const [mood, setMood] = useState<Mood>("idle");
  const [speechMsg, setSpeechMsg] = useState<string | null>(null);

  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);
  const springConfig = { damping: 15, stiffness: 1000, mass: 0.1 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Refs for mutable tracking state (no re-renders)
  const lastPos = useRef({ x: 0, y: 0, t: 0 });
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dizzyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isHoveringRef = useRef(false);
  const speechTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Detect touch device on mount
  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    setIsTouchDevice(isTouch);
  }, []);

  // Speech bubble scheduling
  useEffect(() => {
    if (isTouchDevice) return;

    const showBubble = () => {
      const msg = SPEECH_MESSAGES[Math.floor(Math.random() * SPEECH_MESSAGES.length)];
      setSpeechMsg(msg);
      dismissTimer.current = setTimeout(() => {
        setSpeechMsg(null);
        // Schedule next bubble in 15–25s
        const next = 15000 + Math.random() * 10000;
        speechTimer.current = setTimeout(showBubble, next);
      }, 4000);
    };

    // First bubble after 2s
    speechTimer.current = setTimeout(showBubble, 2000);

    return () => {
      if (speechTimer.current) clearTimeout(speechTimer.current);
      if (dismissTimer.current) clearTimeout(dismissTimer.current);
    };
  }, [isTouchDevice]);

  // Mouse tracking & mood detection
  useEffect(() => {
    if (isTouchDevice) return;

    const updatePos = (e: MouseEvent) => {
      const now = Date.now();
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const dt = Math.max(now - lastPos.current.t, 1);
      const velocity = Math.sqrt(dx * dx + dy * dy) / dt * 1000; // px/s

      lastPos.current = { x: e.clientX, y: e.clientY, t: now };
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      if (velocity > 900) {
        setMood("dizzy");
        if (dizzyTimer.current) clearTimeout(dizzyTimer.current);
        dizzyTimer.current = setTimeout(() => {
          setMood(isHoveringRef.current ? "hover" : "idle");
        }, 800);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive =
        target.nodeName === "A" ||
        target.nodeName === "BUTTON" ||
        target.closest("a") !== null ||
        target.closest("button") !== null;
      isHoveringRef.current = interactive;
      setMood((prev) => {
        if (prev === "dizzy" || prev === "held") return prev;
        return interactive ? "hover" : "idle";
      });
    };

    const handleMouseDown = () => {
      holdTimer.current = setTimeout(() => {
        setMood("held");
      }, 300);
      setMood("squish");
    };

    const handleMouseUp = () => {
      if (holdTimer.current) clearTimeout(holdTimer.current);
      setTimeout(() => {
        setMood(isHoveringRef.current ? "hover" : "idle");
      }, 400);
    };

    window.addEventListener("mousemove", updatePos, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });

    return () => {
      window.removeEventListener("mousemove", updatePos);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      if (holdTimer.current) clearTimeout(holdTimer.current);
      if (dizzyTimer.current) clearTimeout(dizzyTimer.current);
    };
  }, [isTouchDevice, cursorX, cursorY]);

  if (isTouchDevice) return null;

  const moodVariants = {
    idle:   { scaleX: 1,   scaleY: 1,   rotate: 0 },
    hover:  { scaleX: 1.3, scaleY: 1.3, rotate: 15 },
    dizzy:  {
      rotate: [0, 30, -30, 25, -25, 15, -10, 0],
      scaleX: [1, 0.85, 1.15, 0.9, 1.1, 1],
      scaleY: [1, 1.15, 0.85, 1.1, 0.9, 1],
      transition: { duration: 0.7, ease: "easeInOut" as const },
    },
    squish: {
      scaleX: [1, 1.6, 0.7, 1.2, 0.9, 1],
      scaleY: [1, 0.5, 1.3, 0.85, 1.1, 1],
      rotate: [0, -15, 20, -10, 5, 0],
      transition: { duration: 0.5, ease: "easeInOut" as const },
    },
    held:   {
      scaleX: [1, 0.6, 0.7, 0.65],
      scaleY: [1, 1.5, 1.4, 1.45],
      rotate: [0, -10, 10, 0],
      transition: { duration: 0.4, ease: "easeInOut" as const },
    },
  };

  const fontSize = mood === "hover" ? "2.5rem" : mood === "held" ? "2rem" : "1.6rem";

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        x: cursorXSpring,
        y: cursorYSpring,
        pointerEvents: "none",
        zIndex: 99999,
        translateX: "-50%",
        translateY: "-50%",
        transformOrigin: "center center",
        userSelect: "none",
        lineHeight: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Speech Bubble */}
      <AnimatePresence>
        {speechMsg && (
          <motion.div
            key={speechMsg}
            initial={{ opacity: 0, y: 8, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            style={{
              position: "absolute",
              bottom: "calc(100% + 10px)",
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(249,115,22,0.92)",
              color: "#fff",
              borderRadius: "12px",
              padding: "6px 12px",
              fontSize: "0.75rem",
              fontWeight: 600,
              whiteSpace: "nowrap",
              boxShadow: "0 4px 16px rgba(249,115,22,0.4)",
              pointerEvents: "none",
            }}
          >
            {speechMsg}
            {/* Tail */}
            <span style={{
              position: "absolute",
              top: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: "6px solid rgba(249,115,22,0.92)",
            }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Emoji */}
      <motion.span
        variants={moodVariants}
        animate={mood}
        transition={["dizzy", "squish", "held"].includes(mood) ? undefined : { type: "spring", stiffness: 300, damping: 20 }}
        style={{ fontSize, display: "block" }}
      >
        {MOOD_EMOJI[mood]}
      </motion.span>
    </motion.div>
  );
}
