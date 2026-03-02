"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import MagneticButton from "./MagneticButton";
import FloatingOrange from "./FloatingOrange";
import ImageLightbox from "./ImageLightbox";
import { useState, useEffect } from "react";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

export default function Works() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedImage, setSelectedImage] = useState<{ src: string, alt: string } | null>(null);

  useEffect(() => {
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(data => {
        setProjects(data.projects || []);
      })
      .catch(err => {
        console.error('Failed to fetch projects:', err);
      });
  }, []);

  return (
    <section id="works" className="section-padding relative overflow-hidden" style={{ backgroundColor: 'var(--bg-color)' }}>
      {/* Decorative Oranges */}
      <FloatingOrange top="15%" right="5%" size={80} delay={0.2} duration={5} yOffset={25} className="hidden-mobile" />
      <FloatingOrange bottom="10%" left="10%" size={60} delay={0.8} duration={4} yOffset={20} className="hidden-mobile" />

      <div className="container relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <h2 className="heading-md">ผลงาน<span className="text-primary">ที่ภาคภูมิใจ</span></h2>
          <p className="text-muted" style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.125rem' }}>
            คัดสรรโปรเจกต์คุณภาพที่พิสูจน์ถึงความเชี่ยวชาญและการใส่ใจในทุกรายละเอียด
          </p>
        </motion.div>

        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem'
          }}
        >
          {projects.map((project, index) => (
            <motion.div 
              key={project.id} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
              style={{
                background: 'var(--bg-secondary)',
                borderRadius: '24px',
                overflow: 'hidden',
                border: '1px solid var(--border-color)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
            >
              <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                <div 
                  style={{ cursor: 'zoom-in', position: 'relative', width: '100%', height: '100%' }} 
                  onClick={() => setSelectedImage({ src: project.image, alt: project.title })}
                >
                  <Image 
                    src={project.image} 
                    alt={project.title} 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    className="group-hover:scale-110"
                  />
                </div>
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  display: 'flex',
                  gap: '0.5rem',
                  flexWrap: 'wrap',
                  justifyContent: 'flex-end'
                }}>
                  {(project.tags || []).slice(0, 2).map((tag, i) => (
                    <span key={i} style={{
                      padding: '0.3rem 0.8rem',
                      background: 'rgba(255, 255, 255, 0.9)',
                      color: 'var(--primary)',
                      borderRadius: '100px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      backdropFilter: 'blur(4px)',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                    }}>{tag}</span>
                  ))}
                </div>
              </div>
              
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                  {project.title}
                </h3>
                <p className="text-muted" style={{ fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem', height: '3.2rem', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                  {project.description}
                </p>
                <MagneticButton 
                  href={project.link} 
                  className="btn-outline" 
                   style={{ 
                    padding: '0.6rem 1.2rem', 
                    fontSize: '0.9rem', 
                    width: '100%',
                    justifyContent: 'center'
                  }}
                >
                  รายละเอียดโปรเจกต์ →
                </MagneticButton>
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <p className="text-muted" style={{ marginBottom: '1.5rem' }}>และยังมีผลงานอื่นๆ อีกมากมายที่พร้อมจะนำเสนอ...</p>
          <MagneticButton href="#contact" className="btn-primary" style={{ padding: '1rem 2.5rem' }}>
            เริ่มโปรเจกต์ของคุณกับผม
          </MagneticButton>
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
