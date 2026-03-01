import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import dynamic from "next/dynamic";

const Services = dynamic(() => import("@/components/Services"), { ssr: true });
const SkillOrbit = dynamic(() => import("@/components/SkillOrbit"), { ssr: true });
const Works = dynamic(() => import("@/components/Works"), { ssr: true });
const Contact = dynamic(() => import("@/components/Contact"), { ssr: true });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <SkillOrbit />
        <Works />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
