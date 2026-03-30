import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";

const BACKEND_URL = "http://127.0.0.1:5000";

// ---------- Home Page ----------
function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");

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
    } catch (err) {
      alert("Upload failed ❌");
      console.error(err);
    }
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen">
      {/* HEADER */}
      <header className="flex justify-between items-center px-6 py-4 bg-black sticky top-0 z-50">
        <h1 className="text-xl font-bold text-sky-400">EditPro</h1>
        <div className="hidden md:flex gap-6">
          <a href="#services" className="hover:text-sky-400 transition">Services</a>
          <a href="#portfolio" className="hover:text-sky-400 transition">Portfolio</a>
          <a href="#pricing" className="hover:text-sky-400 transition">Pricing</a>
          <a href="#contact" className="hover:text-sky-400 transition">Contact</a>
          <Link to="/login" className="hover:text-sky-400 font-semibold">Admin Login</Link>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-2xl">☰</button>
      </header>

      {menuOpen && (
        <div className="flex flex-col items-center gap-4 py-4 bg-black md:hidden">
          <a href="#services" className="hover:text-sky-400">Services</a>
          <a href="#portfolio" className="hover:text-sky-400">Portfolio</a>
          <a href="#pricing" className="hover:text-sky-400">Pricing</a>
          <a href="#contact" className="hover:text-sky-400">Contact</a>
          <Link to="/login" className="hover:text-sky-400 font-semibold">Admin Login</Link>
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
        <p className="text-gray-400 mb-6">We create viral reels, YouTube videos & high-converting ads.</p>
        <a href="#contact" className="bg-sky-400 text-black px-6 py-3 rounded-xl hover:bg-sky-500 transition">Hire Us</a>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {["Shorts Editing", "YouTube Videos", "Ads Editing"].map((item, i) => (
            <motion.div key={i} whileHover={{ scale: 1.05 }} className="bg-slate-800 p-6 rounded-2xl transition">
              <h3 className="text-xl font-semibold mb-2">{item}</h3>
              <p className="text-gray-400">High quality professional editing</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">Pricing</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-800 p-6 rounded-2xl">
            <h3 className="text-xl mb-2">Basic</h3>
            <p className="text-gray-400">₹999 / video</p>
          </div>
          <div className="bg-sky-400 text-black p-6 rounded-2xl scale-105">
            <h3 className="text-xl mb-2">Pro</h3>
            <p>₹2999 / video</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-2xl">
            <h3 className="text-xl mb-2">Premium</h3>
            <p className="text-gray-400">₹5999 / video</p>
          </div>
        </div>
      </section>

      {/* CONTACT & UPLOAD */}
      <section id="contact" className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Contact & Upload</h2>
        <div className="flex flex-col items-center gap-4 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            className="w-full p-3 rounded bg-slate-800"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="file"
            className="w-full p-2 bg-slate-800 rounded"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button onClick={handleUpload} className="bg-green-500 px-6 py-3 rounded-xl hover:bg-green-600 transition">Upload Video</button>
        </div>
      </section>

      <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noopener noreferrer" className="fixed bottom-5 right-5 bg-green-500 px-5 py-3 rounded-full shadow-lg hover:bg-green-600 transition">WhatsApp</a>
      <footer className="bg-black text-center py-6 mt-10">
        <p>© 2026 EditPro</p>
      </footer>
    </div>
  );
}

// ---------- Login Page ----------
function Login() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === "admin123") navigate("/admin");
    else alert("Wrong password ❌");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950 text-white">
      <div className="bg-slate-800 p-10 rounded-xl shadow-xl w-96 text-center">
        <h2 className="text-2xl font-bold mb-6">Admin Login</h2>
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded mb-4 bg-slate-700"
        />
        <button onClick={handleLogin} className="bg-sky-400 px-6 py-3 rounded-xl hover:bg-sky-500">Login</button>
      </div>
    </div>
  );
}

// ---------- Admin Page ----------
function Admin() {
  const [videos, setVideos] = useState([]);

  const fetchVideos = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/videos`);
      const data = await res.json();
      setVideos(data.videos || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (filename) => {
    if (!window.confirm(`Delete ${filename}?`)) return;
    try {
      const res = await fetch(`${BACKEND_URL}/delete/${filename}`, { method: "DELETE" });
      const data = await res.json();
      alert(data.message);
      fetchVideos();
    } catch (err) {
      alert("Delete failed ❌");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      {videos.length === 0 ? (
        <p>No uploaded videos yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {videos.map((v, i) => (
            <div key={i} className="bg-slate-800 p-4 rounded-xl relative">
              <h3 className="font-semibold mb-2">{v}</h3>
              <video src={`${BACKEND_URL}/uploads/${v}`} controls className="w-full rounded mb-2" />
              <button onClick={() => handleDelete(v)} className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------- App Component ----------
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/Home" element ={<Home />} />
      </Routes>
    </Router>
  );
}