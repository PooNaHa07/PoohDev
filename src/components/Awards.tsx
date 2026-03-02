"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import ImageLightbox from "./ImageLightbox";

interface Award {
  id: number;
  title: string;
  issuer: string;
  year: string;
  image: string;
}

export default function Awards() {
  const [awards, setAwards] = useState<Award[]>([]);
  const [selectedImage, setSelectedImage] = useState<{ src: string, alt: string } | null>(null);

  useEffect(() => {
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(data => {
        setAwards(data.awards || []);
      })
      .catch(err => {
        console.error('Failed to fetch awards:', err);
      });
  }, []);

  return (
    <section id="awards" className="section-padding" style={{ backgroundColor: 'var(--bg-color)' }}>
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <h2 className="heading-md">รางวัลและความสำเร็จ</h2>
          <p className="text-muted">ความภาคภูมิใจและเครื่องยืนยันในมาตรฐานการทำงาน</p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {awards.map((award) => (
            <motion.div
              key={award.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              style={{
                background: 'var(--bg-secondary)',
                borderRadius: '24px',
                padding: '1.5rem',
                border: '1px solid var(--border-color)',
                textAlign: 'center'
              }}
            >
              <div 
                style={{ 
                  position: 'relative', 
                  height: '240px', 
                  marginBottom: '1.5rem',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'zoom-in'
                }}
                onClick={() => setSelectedImage({ src: award.image, alt: award.title })}
              >
                <Image 
                  src={award.image} 
                  alt={award.title} 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                {award.title}
              </h3>
              <div className="text-primary" style={{ fontWeight: 500, fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                {award.issuer}
              </div>
              <div className="text-muted" style={{ fontSize: '0.875rem' }}>
                {award.year}
              </div>
            </motion.div>
          ))}
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
