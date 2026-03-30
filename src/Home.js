import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [videos, setVideos] = useState([]);

  const BACKEND_URL = "http://127.0.0.1:5000";

  // Fetch uploaded videos
  const fetchVideos = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/videos`);
      const data = await res.json();
      setVideos(data.videos || []);
    } catch (err) {
      console.error("Failed to fetch videos", err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // Upload video
  const handleUpload = async () => {
    if (!file || !name) return alert("Please enter name and select file");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);

    try {
      const res = await fetch(`${BACKEND_URL}/upload`, { method: "POST", body: formData });
      const data = await res.json();
      alert(data.message);
      setFile(null);
      setName("");
      fetchVideos(); // refresh list
    } catch (err) {
      alert("Upload failed ❌");
      console.error(err);
    }
  };

  // Delete video
  const handleDelete = async (filename) => {
    if (!window.confirm(`Delete ${filename}?`)) return;

    try {
      const res = await fetch(`${BACKEND_URL}/delete/${filename}`, { method: "DELETE" });
      const data = await res.json();
      alert(data.message);
      fetchVideos(); // refresh list
    } catch (err) {
      alert("Delete failed ❌");
      console.error(err);
    }
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen">

      {/* HEADER */}
      <header className="flex justify-between items-center px-6 py-4 bg-black sticky top-0 z-50">
        <h1 className="text-xl font-bold text-sky-400">EditPro</h1>
        <div className="hidden md:flex gap-6">
          <a href="#services" className="hover:text-sky-400">Services</a>
          <a href="#portfolio" className="hover:text-sky-400">Portfolio</a>
          <a href="#pricing" className="hover:text-sky-400">Pricing</a>
          <a href="#contact" className="hover:text-sky-400">Contact</a>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">☰</button>
      </header>

      {menuOpen && (
        <div className="flex flex-col items-center gap-4 py-4 bg-black md:hidden">
          <a href="#services" className="hover:text-sky-400">Services</a>
          <a href="#portfolio" className="hover:text-sky-400">Portfolio</a>
          <a href="#pricing" className="hover:text-sky-400">Pricing</a>
          <a href="#contact" className="hover:text-sky-400">Contact</a>
        </div>
      )}

      {/* HERO */}
      <section className="text-center py-24 px-4">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Professional Video Editing That Converts 🚀
        </motion.h2>
        <p className="text-gray-400 mb-6">
          We create viral reels, YouTube videos & high-converting ads.
        </p>
        <a href="#contact" className="bg-sky-400 text-black px-6 py-3 rounded-xl">Hire Us</a>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {["Shorts Editing", "YouTube Videos", "Ads Editing"].map((item, i) => (
            <motion.div key={i} whileHover={{ scale: 1.05 }} className="bg-slate-800 p-6 rounded-2xl">
              <h3 className="text-xl font-semibold">{item}</h3>
              <p className="text-gray-400">High quality professional editing</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">Portfolio</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <iframe className="w-full h-64 rounded-xl" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="video" allowFullScreen></iframe>
          <iframe className="w-full h-64 rounded-xl" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="video" allowFullScreen></iframe>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">Pricing</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-800 p-6 rounded-2xl"><h3>Basic</h3><p className="text-gray-400">₹999 / video</p></div>
          <div className="bg-sky-400 text-black p-6 rounded-2xl scale-105"><h3>Pro</h3><p>₹2999 / video</p></div>
          <div className="bg-slate-800 p-6 rounded-2xl"><h3>Premium</h3><p className="text-gray-400">₹5999 / video</p></div>
        </div>
      </section>

      {/* CONTACT & UPLOAD */}
      <section id="contact" className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Contact & Upload</h2>
        <p className="mb-4">Email: your@email.com</p>
        <p className="mb-6">WhatsApp: +91XXXXXXXXXX</p>

        {/* Upload */}
        <div className="flex flex-col items-center gap-4 max-w-md mx-auto mb-10">
          <input type="text" placeholder="Your Name" className="w-full p-3 rounded bg-slate-800" onChange={e => setName(e.target.value)} />
          <input type="file" className="w-full p-2 bg-slate-800 rounded" onChange={e => setFile(e.target.files[0])} />
          <button onClick={handleUpload} className="bg-green-500 px-6 py-3 rounded-xl">Upload Video</button>
        </div>

        {/* Uploaded Videos */}
        <h3 className="text-2xl mb-6">Uploaded Videos</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {videos.map((v, i) => (
            <div key={i} className="relative">
              <video src={`${BACKEND_URL}/uploads/${v}`} controls className="w-full rounded" />
              <button
                onClick={() => handleDelete(v)}
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
          {videos.length === 0 && <p className="text-gray-400">No videos uploaded yet.</p>}
        </div>
      </section>

      {/* WHATSAPP */}
      <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noopener noreferrer" className="fixed bottom-5 right-5 bg-green-500 px-5 py-3 rounded-full shadow-lg">WhatsApp</a>

      {/* FOOTER */}
      <footer className="bg-black text-center py-6 mt-10">
        <p>© 2026 EditPro</p>
      </footer>
    </div>
  );
}