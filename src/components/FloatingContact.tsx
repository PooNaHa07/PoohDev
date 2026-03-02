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
    <div className="fixed bottom-8 right-8 z-[9999] flex flex-col items-center gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col gap-3"
          >
            {/* Email */}
            <motion.a
              variants={itemVariants}
              href="mailto:pucharapon.poo@gmail.com"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-[#EA4335] text-white shadow-lg hover:scale-110 transition-transform relative group"
              title="Email: pucharapon.poo@gmail.com"
            >
              <Mail size={20} />
              <div className="absolute right-14 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Email
              </div>
            </motion.a>

            {/* Line */}
            <motion.a
              variants={itemVariants}
              href="https://line.me/ti/p/~0649149413"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-[#00B900] text-white shadow-lg hover:scale-110 transition-transform relative group"
              title="LINE ID / Phone: 0649149413"
            >
              <LineIcon size={22} />
              <div className="absolute right-14 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                0649149413
              </div>
            </motion.a>

            {/* Facebook */}
            <motion.a
              variants={itemVariants}
              href="https://www.facebook.com/profile.php?id=61587585403600"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-[#1877F2] text-white shadow-lg hover:scale-110 transition-transform relative group"
              title="Facebook Fanpage"
            >
              <Facebook size={24} fill="currentColor" stroke="none" />
              <div className="absolute right-14 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Facebook
              </div>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={toggleMenu}
        aria-label="Contact Submenu"
        className="flex items-center justify-center w-14 h-14 rounded-full bg-[#f97316] text-[#fff] shadow-[0_0_20px_rgba(249,115,22,0.5)] hover:bg-[#ea580c] transition-colors relative"
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {isOpen ? <X size={26} /> : <MessageCircle size={26} fill="white" />}
        </motion.div>
      </button>
    </div>
  );
}
