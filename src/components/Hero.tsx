"use client";

import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import FloatingOrange from "./FloatingOrange";

export default function Hero() {
  // Advanced text reveal variant
  const textVariant = {
    hidden: { y: "100%", opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1] as const, // Custom smooth ease
        delay: i * 0.15,
      },
    }),
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-32">
      {/* Decorative Oranges - Moved further out to avoid text overlap */}
      <FloatingOrange top="15%" left="5%" size={80} delay={0} duration={5} yOffset={30} />
      <FloatingOrange bottom="20%" right="5%" size={100} delay={1.5} duration={6} yOffset={40} />
      <FloatingOrange top="35%" right="10%" size={50} delay={0.5} duration={4.5} yOffset={25} />

      {/* Background elements */}
      <div 
        className="absolute animate-pulse rounded-full" 
        style={{ 
          top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '800px', height: '800px', 
          backgroundColor: 'rgba(249, 115, 22, 0.1)', 
          filter: 'blur(100px)', zIndex: -10 
        }} 
      />
      <div 
        className="absolute rounded-full" 
        style={{ 
          top: 0, right: 0,
          width: '500px', height: '500px', 
          backgroundColor: 'rgba(249, 115, 22, 0.1)', 
          filter: 'blur(80px)', zIndex: -10 
        }} 
      />
      
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '800px' }}>
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-primary" 
            style={{ fontWeight: 600, marginBottom: '1.5rem', letterSpacing: '0.05em', fontSize: '1.125rem' }}
          >
            ผู้เชี่ยวชาญด้านระบบอัจฉริยะแบบครบวงจร
          </motion.div>

          <div style={{ overflow: "hidden", marginBottom: "0.5rem" }}>
            <motion.h1 
              custom={1} initial="hidden" animate="visible" variants={textVariant}
              className="heading-lg"
            >
              เขียนโค้ดเน้น <span className="text-primary">แก้ปัญหา</span>
            </motion.h1>
          </div>
          <div style={{ overflow: "hidden", marginBottom: "1.5rem" }}>
            <motion.h1 
              custom={2} initial="hidden" animate="visible" variants={textVariant}
              className="heading-lg"
            >
              ออกแบบระบบให้ <span className="text-primary">ใช้งานจริง</span>
            </motion.h1>
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-muted" 
            style={{ fontSize: '1.25rem', maxWidth: '650px', marginBottom: '3rem', lineHeight: 1.6 }}
          >
            ไม่ได้รับแค่ทำเว็บให้สวย แต่รับประกันว่าระบบหลังบ้านต้องโหด! รองรับคนเข้าเยอะ ออกแบบ Database ให้ขยายง่ายแบบไม่สะดุด ด้วยประสบการณ์ตัวจริง
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}
          >
            <MagneticButton href="#contact" className="btn-primary" style={{ padding: '1.25rem 2.5rem', fontSize: '1.125rem' }}>
              คุยโปรเจกต์กันเลย
            </MagneticButton>
            <MagneticButton href="#works" className="btn-outline" style={{ padding: '1.25rem 2.5rem', fontSize: '1.125rem' }}>
              ดูผลงานที่ผ่านมา
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
