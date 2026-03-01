"use client";

import Link from "next/link";
import CuteOrange, { OrangeMood } from "./CuteOrange";
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
    <footer style={{ padding: '4rem 0 2rem', backgroundColor: 'var(--bg-color)', borderTop: '1px solid var(--border-color)' }}>
      <div className="container">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          gap: '2rem',
          textAlign: 'center' 
        }} className="md:text-left">
          
          <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', alignItems: 'center' }} className="md:items-start">
            <Link 
              href="/" 
              onClick={() => play("click")}
              style={{ 
                fontWeight: 700, 
                fontSize: '1.5rem', 
                marginBottom: '1rem', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.6rem',
                color: 'inherit',
                textDecoration: 'none'
              }}
            >
              <div style={{ width: '2rem', height: '2rem', display: 'flex', alignItems: 'center' }}>
                <CuteOrange mood={logoMood} />
              </div>
              <span>Pooh<span className="text-primary">Dev</span></span>
            </Link>
            <p className="text-muted" style={{ maxWidth: '300px', fontSize: '0.95rem' }}>
              สร้างสรรค์ระบบอัจฉริยะ เพื่อยกระดับธุรกิจของคุณสู่โลกยุคใหม่
            </p>
          </div>

          <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
            <div>
              <h4 style={{ fontWeight: 600, marginBottom: '1.25rem' }}>เมนู</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {['บริการ', 'ทักษะ', 'ผลงาน'].map(item => (
                  <li key={item}>
                    <Link href={`#${item === 'บริการ' ? 'services' : item === 'ทักษะ' ? 'skills' : 'works'}`} className="text-muted hover:text-primary transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={{ fontWeight: 600, marginBottom: '1.25rem' }}>โซเชียล</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {['GitHub', 'LinkedIn', 'Facebook'].map(item => (
                  <li key={item}>
                    <a href="#" className="text-muted hover:text-primary transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div style={{ 
          marginTop: '4rem', 
          paddingTop: '2rem', 
          borderTop: '1px solid var(--border-color)', 
          textAlign: 'center',
          color: 'var(--text-secondary)',
          fontSize: '0.875rem'
        }}>
          &copy; {new Date().getFullYear()} PoohDev. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
