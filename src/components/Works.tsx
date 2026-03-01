"use client";

import { motion } from "framer-motion";
import FloatingOrange from "./FloatingOrange";
import { useState, useEffect } from "react";
import { fetchGithubRepos, GithubRepo } from "@/lib/github";

export default function Works() {
  const [projects, setProjects] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRepos = async () => {
      // Fetching repos for the user PooNaHa07
      const repos = await fetchGithubRepos("PooNaHa07");
      setProjects(repos);
      setLoading(false);
    };

    getRepos();
  }, []);

  return (
    <section id="works" className="section-padding relative overflow-hidden" style={{ backgroundColor: 'var(--bg-color)' }}>
      {/* Decorative Oranges */}
      <FloatingOrange top="5%" right="5%" size={70} delay={0.3} duration={5.5} yOffset={25} />
      <FloatingOrange bottom="5%" left="10%" size={90} delay={1.5} duration={7} yOffset={35} />
      <FloatingOrange top="50%" left="5%" size={50} delay={0.8} duration={4.5} yOffset={20} />

      <div className="container">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <h2 className="heading-md">ผลงาน<span className="text-primary">ชิ้นเอก</span></h2>
          <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.125rem' }}>
            ตัวอย่างบางส่วนจากระบบจริงที่ผ่านมา สร้างความน่าเชื่อถือให้กับทุกอุตสาหกรรม
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem'
        }}>
          {loading ? (
            <div style={{ textAlign: 'center', gridColumn: '1/-1', padding: '4rem' }}>
              <p className="text-muted">กำลังดึงข้อมูลจาก GitHub...</p>
            </div>
          ) : projects.length === 0 ? (
            <div style={{ textAlign: 'center', gridColumn: '1/-1', padding: '4rem' }}>
              <p className="text-muted">ไม่พบโปรเจกต์สาธารณะ</p>
            </div>
          ) : projects.map((proj, i) => (
            <motion.div 
              key={proj.id} 
              className="work-card"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.1, type: "spring" }}
              onClick={() => window.open(proj.html_url, '_blank')}
            >
              <div 
                className="work-image-placeholder"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '3rem',
                  gap: '1rem'
                }}
              >
                <span>📦</span>
                <span style={{ fontSize: '1rem', opacity: 0.7 }}>{proj.language || 'Code'}</span>
              </div>
              <div style={{ padding: '2rem' }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--primary)', fontWeight: 600, letterSpacing: '0.02em' }}>
                  {proj.language || 'Open Source'}
                </span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginTop: '0.5rem', lineHeight: 1.4 }}>
                  {proj.name}
                </h3>
                <p style={{ marginTop: '1rem', color: 'var(--text-secondary)', fontSize: '0.95rem', lineBreak: 'anywhere' }}>
                  {proj.description}
                </p>
                <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 500, fontSize: '0.875rem' }}>
                  ดูโค้ดบน GitHub 
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
