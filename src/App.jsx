import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    course: '',
    phone: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Backend Link (Make sure spelling is correct)
  const API_URL = "// Is URL ko pura karein
const API_URL = "https://admission-backend-rouge.vercel.app/api/admission";";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await axios.post(API_URL, formData);
      if (response.data.success) {
        setMessage({ type: 'success', text: response.data.message });
        setFormData({ fullName: '', email: '', course: '', phone: '' });
      }
    } catch (err) {
      console.error("Submit Error:", err.response?.data || err.message);
      setMessage({ 
        type: 'error', 
        text: err.response?.data?.message || "Submission failed. Please try again." 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admission-container">
      <div className="form-box">
        <h2>Admission Portal</h2>
        
        {message.text && (
          <div className={`status-msg ${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
          <select name="course" value={formData.course} onChange={handleChange} required>
            <option value="">Select Course</option>
            <option value="Web Development">Web Development</option>
            <option value="Graphic Design">Graphic Design</option>
          </select>
          <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
          <button type="submit" disabled={loading}>
            {loading ? "Please wait..." : "Apply Now"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
