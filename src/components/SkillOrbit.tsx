"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import CuteOrange from "./CuteOrange";
import FloatingOrange from "./FloatingOrange";

const skills = [
  { name: "React",       icon: "⚛️" },
  { name: "Next.js",     icon: "▲" },
  { name: "TypeScript",  icon: "TS" },
  { name: "Node.js",     icon: "🟢" },
  { name: "PostgreSQL",  icon: "🐘" },
  { name: "Docker",      icon: "🐳" },
  { name: "REST API",    icon: "🔌" },
  { name: "Firebase",    icon: "🔥" },
];

export default function SkillOrbit() {
  const [paused, setPaused] = useState<number | null>(null);
  const [tooltip, setTooltip] = useState<string | null>(null);

  const orbitRadius = 200;   // px – radius of orbit circle
  const itemCount = skills.length;

  return (
    <section id="skills" className="section-padding relative overflow-hidden" style={{ backgroundColor: "var(--bg-color)", overflow: "hidden" }}>
      {/* Decorative Oranges */}
      <FloatingOrange top="15%" left="15%" size={50} delay={0} duration={5} yOffset={20} />
      <FloatingOrange bottom="20%" right="10%" size={70} delay={2} duration={6} yOffset={25} />
      
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          <h2 className="heading-md">
            เครื่องมือที่ <span className="text-primary">ผมใช้งานจริง</span>
          </h2>
          <p className="text-muted" style={{ maxWidth: 600, margin: "0 auto", fontSize: "1.125rem" }}>
            ทุกเทคโนโลยีที่เลือกใช้ มาจากประสบการณ์โปรเจกต์จริง ไม่ใช่แค่เรียนในคลาส
          </p>
        </motion.div>

        {/* Orbit canvas */}
        <div
          style={{
            position: "relative",
            width: orbitRadius * 2 + 120,
            height: orbitRadius * 2 + 120,
            margin: "0 auto",
          }}
        >
          {/* Center orange */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 120,
              height: 120,
              transform: "translate(-50%, -50%)",
              zIndex: 10,
            }}
          >
            <CuteOrange className="w-full h-full" />
          </motion.div>

          {/* Orbit ring */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: orbitRadius * 2,
              height: orbitRadius * 2,
              borderRadius: "50%",
              border: "1px dashed rgba(249,115,22,0.3)",
              transform: "translate(-50%, -50%)",
            }}
          />

          {/* Orbiting skill icons */}
          {skills.map((skill, i) => {
            const angle = (i / itemCount) * 360;
            const isPaused = paused === i;

            return (
              <motion.div
                key={skill.name}
                animate={isPaused ? { rotate: angle } : { rotate: [angle, angle + 360] }}
                transition={
                  isPaused
                    ? { duration: 0 }
                    : { duration: 18, repeat: Infinity, ease: "linear", delay: 0 }
                }
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: 0,
                  height: 0,
                  transformOrigin: "0 0",
                }}
              >
                <motion.div
                  animate={isPaused ? { rotate: -angle } : { rotate: [- angle, -(angle + 360)] }}
                  transition={
                    isPaused
                      ? { duration: 0 }
                      : { duration: 18, repeat: Infinity, ease: "linear" }
                  }
                  style={{
                    position: "absolute",
                    left: orbitRadius,
                    top: 0,
                    transform: "translate(-50%, -50%)",
                  }}
                  onMouseEnter={() => { setPaused(i); setTooltip(skill.name); }}
                  onMouseLeave={() => { setPaused(null); setTooltip(null); }}
                  whileHover={{ scale: 1.4 }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      background: "var(--bg-secondary)",
                      border: "2px solid var(--primary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      color: "var(--primary)",
                      boxShadow: "0 4px 20px rgba(249,115,22,0.25)",
                      cursor: "default",
                    }}
                  >
                    {skill.icon}
                  </div>

                  {/* Tooltip */}
                  {isPaused && tooltip === skill.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        position: "absolute",
                        top: "110%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "var(--primary)",
                        color: "#fff",
                        padding: "4px 10px",
                        borderRadius: 8,
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                        pointerEvents: "none",
                      }}
                    >
                      {skill.name}
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
