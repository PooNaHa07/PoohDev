"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "./MagneticButton";
import { useTheme } from "./ThemeProvider";
import { useSoundManager } from "@/hooks/useSoundManager";
import CuteOrange, { OrangeMood } from "./CuteOrange";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const { muted, setMuted, play } = useSoundManager();
  const [logoMood, setLogoMood] = useState<OrangeMood>("happy");

  useEffect(() => {
    const moods: OrangeMood[] = ["happy", "surprised", "wink", "excited", "neutral"];
    setLogoMood(moods[Math.floor(Math.random() * moods.length)]);
  }, []);

  return (
    <nav className="glass" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      padding: '1rem 0'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link 
            href="/" 
            className="hover:opacity-80 transition-opacity"
            onClick={() => play("click")}
            style={{ 
              fontWeight: 700, 
              fontSize: '1.5rem', 
              letterSpacing: '-0.02em',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            <div style={{ width: '2.2rem', height: '2.2rem', display: 'flex', alignItems: 'center' }}>
              <CuteOrange mood={logoMood} />
            </div>
            <span>Pooh<span className="text-primary">Dev</span></span>
          </Link>
        </motion.div>

        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', fontWeight: 500 }}>
          {['บริการ', 'ทักษะ', 'ผลงาน', 'ติดต่อ'].map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={`#${item === 'บริการ' ? 'services' : item === 'ทักษะ' ? 'skills' : item === 'ผลงาน' ? 'works' : 'contact'}`}
                className="nav-link hover:text-primary transition-colors"
                onMouseEnter={() => play("hover")}
              >
                {item}
              </Link>
            </motion.div>
          ))}

          {/* Mute toggle */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            onClick={() => setMuted(!muted)}
            style={{
              background: "none",
              border: "none",
              fontSize: "1.3rem",
              lineHeight: 1,
              padding: "0.4rem",
              borderRadius: "50%",
              color: "var(--text-secondary)",
            }}
            whileHover={{ scale: 1.2, color: "var(--primary)" }}
            title={muted ? "เปิดเสียง" : "ปิดเสียง"}
          >
            {muted ? "🔕" : "🔔"}
          </motion.button>

          {/* Dark mode toggle */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            onClick={() => { toggle(); play("click"); }}
            style={{
              background: "none",
              border: "none",
              fontSize: "1.5rem",
              lineHeight: 1,
              padding: "0.4rem",
              borderRadius: "50%",
            }}
            whileHover={{ scale: 1.2 }}
            title={theme === "light" ? "สลับโหมดมืด" : "สลับโหมดสว่าง"}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={theme}
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 90 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ display: "inline-block" }}
              >
                {theme === "light" ? "🍊" : "🌙"}
              </motion.span>
            </AnimatePresence>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            <MagneticButton
              href="#contact"
              className="btn-primary"
              style={{ padding: '0.5rem 1.5rem', fontSize: '1rem' }}
              onMouseEnter={() => play("hover")}
              onClick={() => play("click")}
            >
              จ้างงาน
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </nav>
  );
}
