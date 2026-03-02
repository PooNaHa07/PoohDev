"use client";

import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import FloatingOrange from "./FloatingOrange";
import { FacebookIcon, LineIcon, GmailIcon } from "./Icons";

export default function Contact() {

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Decorative Oranges */}
      <FloatingOrange top="15%" right="10%" size={90} delay={0.2} duration={5.5} yOffset={35} className="hidden-mobile" />
      <FloatingOrange bottom="15%" left="5%" size={70} delay={1} duration={4} yOffset={25} className="hidden-mobile" />

      <div className="container relative z-10" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
        
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '2.5rem' }}>
              <div>
                <strong style={{ display: 'block', fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>ช่องทางการติดต่อ</strong>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=pucharapon.poo@gmail.com" target="_blank" rel="noopener noreferrer" className="text-secondary hover:opacity-80 transition-opacity" style={{ fontSize: '1.15rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', backgroundColor: '#EA4335', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <GmailIcon size={18} />
                    </div>
                    <span>Email: <span className="text-primary">pucharapon.poo@gmail.com</span></span>
                  </a>
                  <a href="https://www.facebook.com/profile.php?id=61587585403600" target="_blank" rel="noopener noreferrer" className="text-secondary hover:opacity-80 transition-opacity" style={{ fontSize: '1.15rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', backgroundColor: '#1877F2', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <FacebookIcon size={18} />
                    </div>
                    <span>Facebook: <span className="text-primary">PoohDev Fanpage</span></span>
                  </a>
                  <a href="https://line.me/ti/p/~0649149413" target="_blank" rel="noopener noreferrer" className="text-secondary hover:opacity-80 transition-opacity" style={{ fontSize: '1.15rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', backgroundColor: '#00B900', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <LineIcon size={18} />
                    </div>
                    <span>Line: <span className="text-primary">0649149413</span></span>
                  </a>
                </div>
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
