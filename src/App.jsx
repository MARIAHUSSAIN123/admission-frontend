import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [formData, setFormData] = useState({ fullName: '', email: '', course: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Backend URL
      const res = await axios.post("https://admission-backend-beta.vercel.app/api/admission", formData);
      setMessage({ type: 'success', text: res.data.message });
      setFormData({ fullName: '', email: '', course: '', phone: '' });
    } catch (err) {
      setMessage({ type: 'error', text: "Submission failed. Please check your connection." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admission-page">
      <div className="form-card">
        <h1>Admission Portal</h1>
        {message.text && <div className={`alert ${message.type}`}>{message.text}</div>}
        <form onSubmit={handleSubmit}>
          <input className="input-style" type="text" name="fullName" placeholder="Name" value={formData.fullName} onChange={handleChange} required />
          <input className="input-style" type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <select className="input-style" name="course" value={formData.course} onChange={handleChange} required>
            <option value="">Select Course</option>
            <option value="Web Development">Web Development</option>
            <option value="Graphic Design">Graphic Design</option>
          </select>
          <input className="input-style" type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
          <button type="submit" className="submit-btn" disabled={loading}>{loading ? "Submitting..." : "Apply Now"}</button>
        </form>
      </div>
    </div>
  );
}
export default App;
