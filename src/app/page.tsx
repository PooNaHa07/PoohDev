import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import dynamic from "next/dynamic";

const Services = dynamic(() => import("@/components/Services"), { ssr: true });
const About = dynamic(() => import("@/components/About"), { ssr: true });
const SkillOrbit = dynamic(() => import("@/components/SkillOrbit"), { ssr: true });
const Works = dynamic(() => import("@/components/Works"), { ssr: true });
const Awards = dynamic(() => import("@/components/Awards"), { ssr: true });
const Contact = dynamic(() => import("@/components/Contact"), { ssr: true });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <SkillOrbit />
        <Works />
        <Awards />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
