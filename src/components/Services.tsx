"use client";

import { motion } from "framer-motion";
import FloatingOrange from "./FloatingOrange";

export default function Services() {
  const services = [
    {
      title: 'เว็บแอปพลิเคชันเฉพาะทาง',
      desc: 'พัฒนาระบบด้วย Next.js และ React ที่รองรับ Business Logic ที่ซับซ้อนของคุณโดยเฉพาะ เขียนโค้ดสะอาด สเกลได้จริง ไม่ใช่แค่เอา Template มาย้ำ',
      icon: '💻'
    },
    {
      title: 'เชื่อมต่อ API & System Integration',
      desc: 'ผสานระบบเก่ากับระบบใหม่ หรือเชื่อมต่อ 3rd Party API เช่น ระบบ Payment Gateway รูดบัตร สแกนจ่าย ครบจบในที่เดียว',
      icon: '⚙️'
    },
    {
      title: 'Landing Page ระดับพรีเมียม',
      desc: 'โหลดไว ดีไซน์เฉียบขาด มี Micro-interactions เหนือกว่าคู่แข่ง เพื่อเพิ่ม Conversion Rate สร้างยอดขายให้พุ่งกระฉูด',
      icon: '🚀'
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
          <h2 className="heading-md">บริการ<span className="text-primary">ระดับตัวตึง</span></h2>
          <p className="text-muted" style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.125rem' }}>
            ตั้งแต่ Landing Page ดึงดูดลูกค้า ไปจนถึงระบบหลังบ้านสุดซับซ้อน เราจัดการให้คุณแบบ End-to-End
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
