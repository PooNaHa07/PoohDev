"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import FloatingOrange from "./FloatingOrange";
import ImageLightbox from "./ImageLightbox";
import { useState } from "react";

export default function About() {
  const [selectedImage, setSelectedImage] = useState<{ src: string, alt: string } | null>(null);

  const stats = [
    { label: "ปีประสบการณ์", value: "3+" },
    { label: "โปรเจกต์ที่สำเร็จ", value: "50+" },
    { label: "ความพึงพอใจ", value: "100%" },
  ];

  return (
    <section id="about" className="section-padding relative overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      {/* Decorative Oranges */}
      <FloatingOrange top="10%" left="5%" size={60} delay={0} yOffset={20} className="hidden-mobile" />
      
      <div className="container relative z-10">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '4rem',
          alignItems: 'center'
        }}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="heading-md" style={{ marginBottom: '1.5rem' }}>
              ยินดีที่ได้รู้จัก <br />
              ผมชื่อ <span className="text-primary">พัชรพล ผลสุด (ภู)</span>
            </h2>
            <div className="text-muted" style={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '1rem' }}>
              อายุ 18 ปี
            </div>
            <p className="text-muted" style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '2rem' }}>
              นักพัฒนา Full-stack ที่มีความหลงใหลในการสร้างสรรค์ระบบที่ช่วยแก้ปัญหาได้จริง 
              ไม่ว่าจะเป็น Web Application ที่ซับซ้อน หรือระบบ Automation ที่ช่วยลดขั้นตอนการทำงาน 
              ผมให้ความสำคัญกับความถูกต้อง (Reliability), ประสิทธิภาพ (Performance) 
              และประสบการณ์ผู้ใช้ที่ดี (UX)
            </p>
            
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              {stats.map((stat, i) => (
                <div key={i}>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary)' }}>{stat.value}</div>
                  <div className="text-muted" style={{ fontSize: '0.875rem' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              position: 'relative',
              background: 'var(--bg-color)',
              padding: '2.5rem',
              borderRadius: '32px',
              border: '1px solid var(--border-color)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.05)'
            }}
          >
            <div 
              style={{ 
                position: 'relative', 
                width: '120px', 
                height: '120px', 
                borderRadius: '50%', 
                overflow: 'hidden',
                margin: '-5rem auto 1.5rem',
                border: '4px solid var(--bg-color)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                cursor: 'zoom-in'
              }}
              onClick={() => setSelectedImage({ src: "/about/profile.png", alt: "พัชรพล ผลสุด" })}
            >
              <Image 
                src="/about/profile.png" 
                alt="พัชรพล ผลสุด" 
                fill 
                sizes="120px"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem', textAlign: 'center' }}>แนวคิดในการทำงาน</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { title: "User Centric", desc: "ทุกลอจิกต้องส่งเสริมให้ผู้ใช้งานทำงานได้ง่ายขึ้น" },
                { title: "Clean Code", desc: "โค้ดที่อ่านง่ายคือโค้ดที่ดูแลต่อได้ยาวนาน" },
                { title: "Continuous Learning", desc: "เทคโนโลยีเปลี่ยนไว ผมจึงไม่เคยหยุดเรียนรู้" },
              ].map((item, i) => (
                <li key={i} style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>• {item.title}</div>
                  <div className="text-muted" style={{ fontSize: '0.925rem' }}>{item.desc}</div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      <ImageLightbox 
        isOpen={!!selectedImage} 
        onClose={() => setSelectedImage(null)} 
        src={selectedImage?.src || ""} 
        alt={selectedImage?.alt || ""} 
      />
    </section>
  );
}
