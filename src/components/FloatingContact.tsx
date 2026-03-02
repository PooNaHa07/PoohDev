"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Facebook, Mail } from "lucide-react";

// Custom Line Icon SVG
const LineIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.119.303.079.811.038 1.14l-.164 1.028c-.05.303-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.967C23.235 14.35 24 12.43 24 10.304z" />
  </svg>
);

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 15, scale: 0.8 },
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        pointerEvents: 'auto'
      }}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            {/* Email */}
            <motion.a
              variants={itemVariants}
              href="mailto:pucharapon.poo@gmail.com"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "mailto:pucharapon.poo@gmail.com";
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '3rem',
                height: '3rem',
                borderRadius: '50%',
                backgroundColor: '#EA4335',
                color: 'white',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                transition: 'transform 0.2s',
                textDecoration: 'none',
                pointerEvents: 'auto',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
            >
              <Mail size={20} />
            </motion.a>

            {/* Line */}
            <motion.a
              variants={itemVariants}
              href="https://line.me/ti/p/~0649149413"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                window.open("https://line.me/ti/p/~0649149413", "_blank");
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '3rem',
                height: '3rem',
                borderRadius: '50%',
                backgroundColor: '#00B900',
                color: 'white',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                transition: 'transform 0.2s',
                textDecoration: 'none',
                pointerEvents: 'auto',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
            >
              <LineIcon size={22} />
            </motion.a>

            {/* Facebook */}
            <motion.a
              variants={itemVariants}
              href="https://www.facebook.com/profile.php?id=61587585403600"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                window.open("https://www.facebook.com/profile.php?id=61587585403600", "_blank");
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '3rem',
                height: '3rem',
                borderRadius: '50%',
                backgroundColor: '#1877F2',
                color: 'white',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                transition: 'transform 0.2s',
                textDecoration: 'none',
                pointerEvents: 'auto',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
            >
              <Facebook size={24} fill="currentColor" stroke="none" />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={toggleMenu}
        aria-label="Contact Submenu"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '3.5rem',
          height: '3.5rem',
          borderRadius: '50%',
          backgroundColor: '#f97316',
          color: 'white',
          boxShadow: '0 0 20px rgba(249, 115, 22, 0.5)',
          border: 'none',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
          pointerEvents: 'auto'
        }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#ea580c'; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#f97316'; }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {isOpen ? <X size={26} /> : <MessageCircle size={26} fill="white" />}
        </motion.div>
      </button>
    </div>
  );
}
