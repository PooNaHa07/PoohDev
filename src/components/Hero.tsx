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
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24 md:pt-32">
      {/* Decorative Oranges - Adjust sizes for mobile */}
      <FloatingOrange top="15%" left="5%" size={50} delay={0} duration={5} yOffset={20} className="hidden-mobile" />
      <FloatingOrange bottom="15%" right="5%" size={60} delay={1.5} duration={6} yOffset={30} className="hidden-mobile" />
      <FloatingOrange top="75%" right="5%" size={40} delay={0.5} duration={4.5} yOffset={15} className="hidden-mobile" />

      {/* Background elements */}
      <div 
        className="absolute animate-pulse rounded-full" 
        style={{ 
          top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 'clamp(300px, 80vw, 800px)', height: 'clamp(300px, 80vw, 800px)', 
          backgroundColor: 'rgba(249, 115, 22, 0.1)', 
          filter: 'blur(80px)', zIndex: -10 
        }} 
      />
      
      <div className="container relative z-10">
        <div style={{ maxWidth: '800px', textAlign: 'center', margin: '0 auto' }} className="md:text-left">
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-primary" 
            style={{ fontWeight: 600, marginBottom: '1rem', letterSpacing: '0.05em', fontSize: '0.9rem' }}
          >
            ผู้เชี่ยวชาญด้านระบบอัจฉริยะแบบครบวงจร
          </motion.div>

          <div style={{ marginBottom: "0.25rem" }}>
            <motion.h1 
              custom={1} initial="hidden" animate="visible" variants={textVariant}
              className="heading-lg"
            >
              รับออกแบบ <span className="text-primary">& พัฒนาระบบ</span>
            </motion.h1>
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <motion.h1 
              custom={2} initial="hidden" animate="visible" variants={textVariant}
              className="heading-lg"
            >
              ครอบคลุม <span className="text-primary">ทุกความต้องการ</span>
            </motion.h1>
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-muted" 
            style={{ fontSize: 'clamp(1rem, 4vw, 1.25rem)', maxWidth: '650px', marginBottom: '2.5rem', lineHeight: 1.6, marginLeft: 'auto', marginRight: 'auto' }}
          >
            🚀 รับทำ Web App | จัดการข้อมูล | แก้ไขบัค | พัฒนาต่อยอดระบบเดิม<br/>
            💻 PHP • MySQL • Google Apps Script • Automation<br/>
            💸 ราคานักศึกษา เริ่มต้น 300.- (คุยง่าย งานไว ใส่ใจทุกโปรเจกต์)<br/>
            📥 ยินดีรับงานทุกสเกล ปรึกษาฟรี ทักแชทได้เลยครับ!
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}
            className="md:justify-start"
          >
            <MagneticButton href="#contact" className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1rem' }}>
              คุยโปรเจกต์กันเลย
            </MagneticButton>
            <MagneticButton href="#works" className="btn-outline" style={{ padding: '1rem 2rem', fontSize: '1rem' }}>
              ดูผลงานที่ผ่านมา
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
