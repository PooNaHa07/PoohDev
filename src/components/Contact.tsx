"use client";

import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import FloatingOrange from "./FloatingOrange";

export default function Contact() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Decorative Oranges */}
      <FloatingOrange top="15%" right="10%" size={90} delay={0.2} duration={5.5} yOffset={35} />
      <FloatingOrange bottom="15%" left="5%" size={70} delay={1} duration={4} yOffset={25} />

      <div className="container" style={{ position: 'relative', zIndex: 1, display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
        
        <div style={{ flex: '1 1 300px' }}>
          <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
          >
            <h2 className="heading-md">มาร่วมสร้าง<br/><span className="text-primary">สิ่งที่ยิ่งใหญ่</span>ด้วยกัน</h2>
            <p className="text-muted" style={{ marginBottom: '1.5rem', fontSize: '1.125rem', lineHeight: 1.6 }}>
              ไม่ว่าจะเป็นระบบใหม่แกะกล่อง หรืออัปเกรดระบบเดิมที่พังจนท้อ ให้ผมดูแลจบครบวงจร
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
              <div>
                <strong style={{ display: 'block', fontSize: '1rem', marginBottom: '0.25rem' }}>อีเมลติดต่องานด่วน</strong>
                <a href="mailto:hello@poohdev.com" className="text-primary hover:text-primary-hover transition-colors" style={{ fontSize: '1.25rem', fontWeight: 600 }}>hello@poohdev.com</a>
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '1rem', marginBottom: '0.25rem' }}>โซนทำงาน</strong>
                <span className="text-muted" style={{ fontSize: '1.125rem' }}>กรุงเทพมหานคร (Remote ทั่วโลก)</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ flex: '1 1 300px' }}
        >
          <form style={{
            background: 'var(--bg-color)',
            padding: 'clamp(1.5rem, 5vw, 3rem)',
            borderRadius: '24px',
            border: '1px solid var(--border-color)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.05)'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>ส่งข้อความหาผม</h3>
            
            <input type="text" className="form-input" placeholder="ชื่อ-นามสกุล ของคุณ" required />
            <input type="email" className="form-input" placeholder="อีเมลสำหรับติดต่อกลับ" required />
            <select className="form-input" required defaultValue="">
              <option value="" disabled>เลือกบริการที่สนใจ...</option>
              <option value="web">Landing Page เพิ่มยอดขาย</option>
              <option value="app">Web Application ระบบหลังบ้าน</option>
              <option value="system">เชื่อมต่อ API / System Integration</option>
              <option value="other">อื่นๆ</option>
            </select>
            <textarea className="form-input" placeholder="เล่ารายละเอียดโปรเจกต์ของคุณคร่าวๆ..." required></textarea>
            
            <MagneticButton className="btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.125rem', marginTop: '1rem' }}>
              กดส่งข้อมูลเลย
            </MagneticButton>
          </form>
        </motion.div>

      </div>
    </section>
  );
}
