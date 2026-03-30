import { useState, useEffect } from "react";

const BACKEND_URL = "http://127.0.0.1:5000";

export default function Admin() {
  const [videos, setVideos] = useState([]);
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [uploadName, setUploadName] = useState("");
  const [uploadFile, setUploadFile] = useState(null);
  const [modalVideo, setModalVideo] = useState(null);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name"); // "name" or "uploader"

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
    if (loggedIn) fetchVideos();
  }, [loggedIn]);

  const handleLogin = () => {
    if (password === "admin123") setLoggedIn(true);
    else alert("Wrong password ❌");
  };

  const handleUpload = async () => {
    if (!uploadFile || !uploadName) return alert("Enter name and select a file");

    const formData = new FormData();
    formData.append("file", uploadFile);
    formData.append("name", uploadName);

    try {
      const res = await fetch(`${BACKEND_URL}/upload`, { method: "POST", body: formData });
      const data = await res.json();
      alert(data.message);
      setUploadFile(null);
      setUploadName("");
      fetchVideos();
    } catch (err) {
      alert("Upload failed ❌");
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

  // Filter & sort videos
  const filteredVideos = videos
    .filter((v) => v.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "uploader") {
        const uploaderA = a.split("_")[0].toLowerCase();
        const uploaderB = b.split("_")[0].toLowerCase();
        return uploaderA.localeCompare(uploaderB);
      } else {
        return a.toLowerCase().localeCompare(b.toLowerCase());
      }
    });

  if (!loggedIn) {
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
          <button
            onClick={handleLogin}
            className="bg-sky-400 px-6 py-3 rounded-xl hover:bg-sky-500"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Upload Section */}
      <div className="bg-slate-800 p-6 rounded-xl mb-6 max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Upload New Video</h2>
        <input
          type="text"
          placeholder="Uploader Name"
          value={uploadName}
          onChange={(e) => setUploadName(e.target.value)}
          className="w-full p-2 mb-2 rounded bg-slate-700"
        />
        <input
          type="file"
          onChange={(e) => setUploadFile(e.target.files[0])}
          className="w-full p-2 mb-4 rounded bg-slate-700"
        />
        <button
          onClick={handleUpload}
          className="bg-green-500 px-6 py-2 rounded-xl hover:bg-green-600"
        >
          Upload Video
        </button>
      </div>

      {/* Search & Sort */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search by filename or uploader..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 p-2 rounded bg-slate-700"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full md:w-1/4 p-2 rounded bg-slate-700"
        >
          <option value="name">Sort by Filename</option>
          <option value="uploader">Sort by Uploader</option>
        </select>
      </div>

      {/* Video Thumbnails */}
      {filteredVideos.length === 0 ? (
        <p>No videos found.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {filteredVideos.map((v, i) => (
            <div key={i} className="bg-slate-800 p-4 rounded-xl relative cursor-pointer">
              <h3 className="font-semibold mb-2">
                Uploader: {v.split("_")[0]} <br /> File: {v.split("_").slice(1).join("_")}
              </h3>

              <video
                src={`${BACKEND_URL}/uploads/${v}`}
                className="w-full rounded mb-2"
                onClick={() => setModalVideo(`${BACKEND_URL}/uploads/${v}`)}
                muted
                preload="metadata"
              />

              <button
                onClick={() => handleDelete(v)}
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal Preview */}
      {modalVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setModalVideo(null)}
        >
          <video src={modalVideo} controls autoPlay className="max-h-[80%] max-w-[80%] rounded" />
        </div>
      )}
    </div>
  );
}