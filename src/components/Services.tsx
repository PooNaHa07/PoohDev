"use client";

import { motion } from "framer-motion";
import FloatingOrange from "./FloatingOrange";

export default function Services() {
  const services = [
    {
      title: 'Web Application & Backend',
      desc: 'พัฒนาระบบด้วย Next.js, React หรือ PHP + MySQL ที่รองรับ Business Logic ซับซ้อน เขียนโค้ดสะอาด สเกลได้จริง พร้อมระบบหลังบ้านจัดการข้อมูล',
      icon: '💻'
    },
    {
      title: 'API & Automation',
      desc: 'เชื่อมต่อ 3rd Party API หรือจัดการข้อมูลด้วย Google Apps Script และสร้างระบบ Automation เพื่อลดขั้นตอนการทำงานที่ซ้ำซ้อน',
      icon: '⚙️'
    },
    {
      title: 'Bug Fixes & Maintenance',
      desc: 'รับแก้บัคที่หาไม่เจอ หรือพัฒนาต่อยอดระบบเดิมที่พังจนท้อ ให้กลับมาใช้งานได้ลื่นไหลและมีประสิทธิภาพสูงสุด',
      icon: '🛠️'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, bounce: 0.4, duration: 0.8 } }
  };

  return (
    <section id="services" className="section-padding relative overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      {/* Decorative Oranges */}
      <FloatingOrange top="10%" left="5%" size={60} delay={0.5} duration={5} yOffset={20} />
      <FloatingOrange bottom="10%" right="5%" size={80} delay={1.2} duration={6} yOffset={30} />
      <FloatingOrange top="40%" right="10%" size={40} delay={0} duration={4} yOffset={15} />

      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <h2 className="heading-md">บริการ<span className="text-primary">ระดับผู้เชี่ยวชาญ</span></h2>
          <p className="text-muted" style={{ maxWidth: '750px', margin: '0 auto', fontSize: '1.125rem' }}>
            ครบเครื่องเรื่องงานระบบ ตั้งแต่ Web App หลังบ้าน, Automation, ไปจนถึงการแก้บัคและพัฒนาต่อยอดระบบเดิม
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}
        >
          {services.map((srv, i) => (
            <motion.div variants={itemVariants} key={i} className="service-card">
              <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>{srv.icon}</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', lineHeight: 1.4 }}>{srv.title}</h3>
              <p className="text-muted" style={{ lineHeight: 1.6 }}>{srv.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
