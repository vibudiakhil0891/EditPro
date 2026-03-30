// src/pages/Login.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) return alert("Enter username and password");

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        navigate("/admin"); // Redirect to Admin Dashboard
      } else {
        alert("Wrong credentials ❌");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed, check server 🔌");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-950 text-white">
      <h2 className="text-2xl mb-4 font-bold">Admin Login</h2>
      <input
        placeholder="Username"
        className="p-2 mb-2 w-64 rounded bg-slate-800"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="p-2 mb-4 w-64 rounded bg-slate-800"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="bg-sky-400 px-6 py-2 rounded hover:bg-sky-500 transition"
      >
        Login
      </button>
    </div>
  );
}