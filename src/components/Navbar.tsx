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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 40
      }
    },
    opened: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const linkVariants = {
    closed: { opacity: 0, x: 20 },
    opened: { opacity: 1, x: 0 }
  };

  return (
    <nav className="glass" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      padding: '0.75rem 0'
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
            onClick={() => { play("click"); setIsMenuOpen(false); }}
            style={{ 
              fontWeight: 700, 
              fontSize: '1.25rem', 
              letterSpacing: '-0.02em',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            <div style={{ width: '1.8rem', height: '1.8rem', display: 'flex', alignItems: 'center' }}>
              <CuteOrange mood={logoMood} />
            </div>
            <span>Pooh<span className="text-primary">Dev</span></span>
          </Link>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden-mobile" style={{ display: 'flex', gap: '2rem', alignItems: 'center', fontWeight: 500 }}>
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
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {/* Mute toggle */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => setMuted(!muted)}
            style={{
              background: "none",
              border: "none",
              fontSize: "1.2rem",
              padding: "0.4rem",
              color: "var(--text-secondary)",
            }}
            whileHover={{ scale: 1.1, color: "var(--primary)" }}
          >
            {muted ? "🔕" : "🔔"}
          </motion.button>

          {/* Dark mode toggle */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => { toggle(); play("click"); }}
            style={{
              background: "none",
              border: "none",
              fontSize: "1.2rem",
              padding: "0.4rem",
            }}
            whileHover={{ scale: 1.1 }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={theme}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                style={{ display: "inline-block" }}
              >
                {theme === "light" ? "🍊" : "🌙"}
              </motion.span>
            </AnimatePresence>
          </motion.button>

          {/* Hamburger Menu Toggle */}
          <button
            className="only-mobile"
            onClick={() => { setIsMenuOpen(!isMenuOpen); play("click"); }}
            style={{
              background: "none",
              border: "none",
              fontSize: "1.5rem",
              color: "var(--text-primary)",
              padding: "0.4rem",
              zIndex: 110
            }}
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>

          <MagneticButton
            href="#contact"
            className="btn-primary hidden-mobile"
            style={{ padding: '0.4rem 1.25rem', fontSize: '0.9rem' }}
            onClick={() => play("click")}
          >
            จ้างงาน
          </MagneticButton>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="opened"
            exit="closed"
            variants={menuVariants}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100vh',
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(15px)',
              WebkitBackdropFilter: 'blur(15px)',
              zIndex: 105,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '2.5rem'
            }}
          >
            {['บริการ', 'ทักษะ', 'ผลงาน', 'ติดต่อ'].map((item) => (
              <motion.div key={item} variants={linkVariants}>
                <Link
                  href={`#${item === 'บริการ' ? 'services' : item === 'ทักษะ' ? 'skills' : item === 'ผลงาน' ? 'works' : 'contact'}`}
                  style={{ fontSize: '2rem', fontWeight: 600 }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </Link>
              </motion.div>
            ))}
            <motion.div variants={linkVariants}>
              <Link
                href="#contact"
                className="btn-primary"
                style={{ fontSize: '1.25rem', padding: '0.75rem 2rem' }}
                onClick={() => setIsMenuOpen(false)}
              >
                จ้างงาน
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
