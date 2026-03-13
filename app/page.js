import ParticlesBackground from "./components/ParticlesBackground";
import CustomCursor from "./components/CustomCursor";
import HeroSection from "./components/HeroSection.js";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#030712] text-white overflow-hidden">
      <ParticlesBackground />
      <CustomCursor />
      <HeroSection />
    </main>
  );
}
