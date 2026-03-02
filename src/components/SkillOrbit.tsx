"use client";
// Trigger fresh build on Vercel

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CuteOrange, { OrangeMood } from "./CuteOrange";
import FloatingOrange from "./FloatingOrange";
import { useSoundManager } from "@/hooks/useSoundManager";
import { 
  Code2, 
  Terminal, 
  Database,
  Server,
  Cloud,
  Figma,
  Box,
  GitBranch,
  Wrench,
  Globe,
  FileCode
} from "lucide-react";

const innerSkills = [
  { name: "React & Next.js", icon: <Code2 size={22} /> },
  { name: "TypeScript", icon: <Terminal size={22} /> },
  { name: "Node.js", icon: <Server size={22} /> },
  { name: "Web API", icon: <Globe size={22} /> },
];

const outerSkills = [
  { name: "PostgreSQL", icon: <Database size={24} /> },
  { name: "Supabase", icon: <Cloud size={24} /> },
  { name: "Firebase", icon: <Cloud size={24} /> },
  { name: "Docker", icon: <Box size={24} /> },
  { name: "Git & Version Control", icon: <GitBranch size={24} /> },
  { name: "Figma (UI/UX)", icon: <Figma size={24} /> },
  { name: "Tailwind CSS", icon: <Wrench size={24} /> },
  { name: "Google App Script", icon: <FileCode size={24} /> },
];

export default function SkillOrbit() {
  const [pausedInner, setPausedInner] = useState<number | null>(null);
  const [pausedOuter, setPausedOuter] = useState<number | null>(null);
  const [tooltip, setTooltip] = useState<string | null>(null);
  const [innerRadius, setInnerRadius] = useState(140);
  const [outerRadius, setOuterRadius] = useState(240);
  const [iconSize, setIconSize] = useState(56);
  const { play } = useSoundManager();
  const [centerMoodIndex, setCenterMoodIndex] = useState(0);
  const moods: OrangeMood[] = ["excited", "happy", "surprised", "wink", "neutral"];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 480) {
        setInnerRadius(90);
        setOuterRadius(150);
        setIconSize(40);
      } else if (window.innerWidth < 768) {
        setInnerRadius(120);
        setOuterRadius(190);
        setIconSize(48);
      } else {
        setInnerRadius(140);
        setOuterRadius(240);
        setIconSize(56);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="skills" className="section-padding relative overflow-hidden" style={{ backgroundColor: "var(--bg-color)", overflow: "hidden" }}>
      {/* Decorative Oranges */}
      <FloatingOrange top="10%" left="5%" size={50} delay={0} duration={5} yOffset={20} />
      <FloatingOrange bottom="15%" right="8%" size={70} delay={2} duration={6} yOffset={25} />
      <FloatingOrange top="85%" left="15%" size={40} delay={1} duration={4} yOffset={15} />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <h2 className="heading-md">
            เครื่องมือที่ <span className="text-primary">ผมใช้งานจริง</span>
          </h2>
          <p className="text-muted" style={{ maxWidth: 650, margin: "0 auto", fontSize: "1.125rem", lineHeight: 1.6 }}>
            ผมเลือกใช้เทคโนโลยีที่ทันสมัยและได้มาตรฐานอุตสาหกรรมในทุกๆ โปรเจกต์ ตั้งแต่การออกแบบโครงสร้าง (Architecture) ไปจนถึงการขึ้นระบบจริง (Deployment)
          </p>
        </motion.div>

        {/* Orbit canvas */}
        <div
          style={{
            position: "relative",
            width: outerRadius * 2 + 120,
            height: outerRadius * 2 + 120,
            margin: "0 auto",
          }}
        >
          {/* Center Glow */}
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: innerRadius * 2,
            height: innerRadius * 2,
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(249,115,22,0) 70%)",
            borderRadius: "50%",
            zIndex: 0,
            pointerEvents: "none"
          }} />

          {/* Center orange */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: iconSize * 2,
              height: iconSize * 2,
              transform: "translate(-50%, -50%)",
              zIndex: 30,
              cursor: "pointer",
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              play("click");
              setCenterMoodIndex((prev) => (prev + 1) % moods.length);
            }}
          >
            <CuteOrange className="w-full h-full" mood={moods[centerMoodIndex]} />
          </motion.div>

          {/* Inner Orbit ring */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: innerRadius * 2,
              height: innerRadius * 2,
              borderRadius: "50%",
              border: "1px dashed rgba(249,115,22,0.4)",
              transform: "translate(-50%, -50%)",
            }}
          />

          {/* Outer Orbit ring */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: outerRadius * 2,
              height: outerRadius * 2,
              borderRadius: "50%",
              border: "1px dashed rgba(249,115,22,0.2)",
              transform: "translate(-50%, -50%)",
            }}
          />

          {/* Inner Orbiting skill icons */}
          {innerSkills.map((skill, i) => {
            const angle = (i / innerSkills.length) * 360;
            const isHovered = pausedInner === i;

            return (
              <motion.div
                key={skill.name}
                animate={{ rotate: [angle, angle + 360] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: 0,
                  height: 0,
                  transformOrigin: "0 0",
                  zIndex: 20
                }}
              >
                <motion.div
                  animate={{ rotate: [-angle, -(angle + 360)] }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  style={{
                    position: "absolute",
                    left: innerRadius,
                    top: 0,
                    transform: "translate(-50%, -50%)",
                  }}
                  onMouseEnter={() => { setPausedInner(i); setTooltip(skill.name); }}
                  onMouseLeave={() => { setPausedInner(null); setTooltip(null); }}
                  whileHover={{ scale: 1.25 }}
                >
                  <div
                    className="glass"
                    style={{
                      width: iconSize,
                      height: iconSize,
                      borderRadius: "50%",
                      border: "2px solid rgba(249,115,22,0.8)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--primary)",
                      boxShadow: "0 4px 15px rgba(249,115,22,0.3)",
                      cursor: "pointer",
                      backgroundColor: "var(--bg-secondary)",
                    }}
                  >
                    {skill.icon}
                  </div>

                  {/* Tooltip */}
                  {isHovered && tooltip === skill.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 4, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      style={{
                        position: "absolute",
                        top: "110%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "var(--primary)",
                        color: "#fff",
                        padding: "6px 14px",
                        borderRadius: 12,
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                        pointerEvents: "none",
                        boxShadow: "0 4px 15px rgba(249,115,22,0.4)"
                      }}
                    >
                      {skill.name}
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}

          {/* Outer Orbiting skill icons */}
          {outerSkills.map((skill, i) => {
            const angle = (i / outerSkills.length) * 360;
            const isHovered = pausedOuter === i;

            return (
              <motion.div
                key={skill.name}
                animate={{ rotate: [-angle, -(angle + 360)] }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: 0,
                  height: 0,
                  transformOrigin: "0 0",
                  zIndex: 15
                }}
              >
                <motion.div
                  animate={{ rotate: [angle, angle + 360] }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  style={{
                    position: "absolute",
                    left: outerRadius,
                    top: 0,
                    transform: "translate(-50%, -50%)",
                  }}
                  onMouseEnter={() => { setPausedOuter(i); setTooltip(skill.name); }}
                  onMouseLeave={() => { setPausedOuter(null); setTooltip(null); }}
                  whileHover={{ scale: 1.25 }}
                >
                  <div
                    className="glass"
                    style={{
                      width: iconSize,
                      height: iconSize,
                      borderRadius: "50%",
                      border: "2px solid rgba(249,115,22,0.5)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--text-secondary)",
                      boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                      cursor: "pointer",
                      backgroundColor: "var(--bg-secondary)",
                    }}
                  >
                    {skill.icon}
                  </div>

                  {/* Tooltip */}
                  {isHovered && tooltip === skill.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 4, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      style={{
                        position: "absolute",
                        top: "110%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "var(--bg-secondary)",
                        color: "var(--text-primary)",
                        padding: "6px 14px",
                        borderRadius: 12,
                        border: "1px solid var(--border-color)",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                        pointerEvents: "none",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
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
