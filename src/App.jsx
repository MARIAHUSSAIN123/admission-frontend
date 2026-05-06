import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Base URL uthayen aur check karen ke extra slash na ho
      let baseUrl = import.meta.env.VITE_API_URL || "https://admission-backend-rouge.vercel.app";
      
      // Cleanup: Agar URL ke aakhir mein / ya /api hai toh usay hatayen taake double na ho
      baseUrl = baseUrl.replace(/\/$/, "").replace(/\/api$/, "");

      // 2. Final URL build karen (Sirf ek baar /api/admission aayega)
      const finalUrl = `${baseUrl}/api/admission`;

      const res = await axios.post(finalUrl, formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      });

      alert(res.data.message);
      setFormData({ name: '', email: '' }); // Form clear kar dega
    } catch (err) {
      console.error("Full Error Object:", err);
      // Agar backend se koi error message aaya hai toh wo dikhayega
      const errorMsg = err.response?.data?.message || "Submission Failed!";
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <form className="glass-form" onSubmit={handleSubmit}>
        <h2>Admission Form</h2>
        <input 
          type="text" 
          placeholder="Name" 
          value={formData.name}
          required
          onChange={(e) => setFormData({...formData, name: e.target.value})} 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={formData.email}
          required
          onChange={(e) => setFormData({...formData, email: e.target.value})} 
        />
        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default App;
