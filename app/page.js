import ParticlesBackground from "./components/ParticlesBackground";
import CustomCursor from "./components/CustomCursor";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection.jsx";

import ProjectsSection from "./components/ProjectsSection.jsx";

import SkillsSection from "./components/SkillsSection.jsx";

import ContactSection from "./components/ContactSection.jsx";

export default function Home() {
  return (
    <main className="relative bg-[#030712] text-white overflow-hidden">
      <ParticlesBackground />
      <CustomCursor />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />;
      <ContactSection />;
    </main>
  );
}
