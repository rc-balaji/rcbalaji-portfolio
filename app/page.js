import ParticlesBackground from "./components/ParticlesBackground";
import CustomCursor from "./components/CustomCursor";
import MagneticEffect from "./components/MagneticEffect";
export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white flex items-center justify-center ">
      <ParticlesBackground />
      <CustomCursor />
      <MagneticEffect />
      <div className="hero-focus"></div>

      <div className="relative z-10 text-center backdrop-blur-sm bg-black/30 px-10 py-8 rounded-xl">
        <div className="relative w-28 h-28 mx-auto mb-6">
          <div className="profile-ring"></div>

          <img
            src="/profile2.png"
            alt="RC Balaji"
            className="w-28 h-28 rounded-full object-cover"
          />
        </div>

        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient drop-shadow-[0_0_20px_rgba(0,255,255,0.6)]">
          RC Balaji
        </h1>
        <p className="text-xl text-gray-400 mb-2">Software Engineer</p>
        <p className="text-lg text-purple-400 mb-10">
          Code • Systems • Intelligence
        </p>
        <div className="flex gap-4 justify-center">
          <button className="magnetic-btn px-6 py-3 border border-cyan-400 rounded-lg hover:bg-cyan-400 hover:text-black transition-all duration-300 shadow-[0_0_12px_rgba(0,255,255,0.5)] hover:-translate-y-1">
            View Projects
          </button>

          <button className="magnetic-btn px-6 py-3 border border-purple-500 rounded-lg hover:bg-purple-500 hover:text-white transition-all duration-300 shadow-[0_0_12px_rgba(168,85,247,0.5)] hover:-translate-y-1">
            Contact
          </button>
        </div>
      </div>
    </main>
  );
}
