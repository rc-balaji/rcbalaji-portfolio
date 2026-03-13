export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold mb-4 text-cyan-400">RC Balaji</h1>

      <p className="text-xl text-gray-400 mb-2">Software Engineer</p>

      <p className="text-lg text-purple-400 mb-10">
        Code • Systems • Intelligence
      </p>

      <div className="flex gap-4">
        <button className="px-6 py-3 border border-cyan-400 rounded-lg hover:bg-cyan-400 hover:text-black transition">
          View Projects
        </button>

        <button className="px-6 py-3 border border-purple-500 rounded-lg hover:bg-purple-500 transition">
          Contact
        </button>
      </div>
    </main>
  );
}
