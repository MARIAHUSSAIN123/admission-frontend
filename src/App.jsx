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

  // Backend URL ko variable mein rakh rahe hain takay change karna asaan ho
  const BACKEND_URL = "https://admission-backend-beta.vercel.app/api/admission";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    console.log("Sending data to:", BACKEND_URL);
    console.log("Form Data:", formData);

    try {
      // Bilkul simple POST request baghair kisi extra header ke
      const res = await axios.post(BACKEND_URL, formData);
      
      console.log("Server Response:", res.data);
      
      setMessage({ 
        type: 'success', 
        text: res.data.message || "Form submitted successfully!" 
      });

      // Form clear karein
      setFormData({ fullName: '', email: '', course: '', phone: '' });

    } catch (err) {
      // Error ko detail mein console mein dekhein
      console.error("Submission Error Status:", err.response?.status);
      console.error("Submission Error Data:", err.response?.data);
      
      const errorText = err.response?.data?.message || "Submission failed. Please check console for details.";
      setMessage({ type: 'error', text: errorText });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admission-page">
      <div className="form-card">
        <div className="title-section">
          <h1>Admission Portal</h1>
          <p style={{color: '#64748b', marginTop: '5px'}}>MERN Stack Project</p>
        </div>

        {message.text && (
          <div className={`alert ${message.type === 'success' ? 'success' : 'error'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input 
              className="input-style" 
              type="text" 
              name="fullName" 
              required 
              placeholder="Enter your name" 
              value={formData.fullName} 
              onChange={handleChange} 
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input 
              className="input-style" 
              type="email" 
              name="email" 
              required 
              placeholder="your@email.com" 
              value={formData.email} 
              onChange={handleChange} 
            />
          </div>

          <div className="form-group">
            <label>Course Name</label>
            <select 
              className="input-style" 
              name="course" 
              required 
              value={formData.course} 
              onChange={handleChange}
            >
              <option value="">Select Course</option>
              <option value="Web Development">Web Development</option>
              <option value="Graphic Design">Graphic Design</option>
            </select>
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input 
              className="input-style" 
              type="text" 
              name="phone" 
              required 
              placeholder="+92 XXX XXXXXXX" 
              value={formData.phone} 
              onChange={handleChange} 
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Submitting..." : "Apply Now"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
