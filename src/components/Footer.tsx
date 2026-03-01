"use client";

import { motion } from "framer-motion";
import CuteOrange, { OrangeMood } from "./CuteOrange";
import Link from "next/link";
import { useSoundManager } from "@/hooks/useSoundManager";
import { useEffect, useState } from "react";

export default function Footer() {
  const { play } = useSoundManager();
  const [logoMood, setLogoMood] = useState<OrangeMood>("happy");

  useEffect(() => {
    const moods: OrangeMood[] = ["happy", "surprised", "wink", "excited", "neutral"];
    setLogoMood(moods[Math.floor(Math.random() * moods.length)]);
  }, []);
  
  return (
    <footer style={{
      padding: '3rem 0',
      backgroundColor: 'var(--bg-color)',
      textAlign: 'center'
    }}>
      <div className="container" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem'
      }}>
        
        <Link 
          href="/" 
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
          className="hover:opacity-80 transition-opacity"
        >
          <div style={{ width: '2.2rem', height: '2.2rem', display: 'flex', alignItems: 'center' }}>
            <CuteOrange mood={logoMood} />
          </div>
          <span>Pooh<span className="text-primary">Dev</span></span>
        </Link>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
           {['LinkedIn', 'GitHub', 'Facebook'].map((social, i) => (
             <motion.a 
               key={social}
               href="#" 
               whileHover={{ y: -3, color: 'var(--primary)' }}
               className="text-muted transition-colors"
               style={{ fontWeight: 500 }}
             >
               {social}
             </motion.a>
           ))}
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-muted" 
          style={{ fontSize: '0.875rem', marginTop: '1rem', borderTop: '1px solid var(--border-color)', width: '100%', maxWidth: '400px', paddingTop: '1.5rem' }}
        >
          &copy; {new Date().getFullYear()} PoohDev. สงวนลิขสิทธิ์ทั้งหมด
        </motion.p>
      </div>
    </footer>
  );
}
