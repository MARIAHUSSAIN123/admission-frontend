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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Deployed Backend ka URL env variable se aayega
      const apiUrl = import.meta.env.VITE_API_URL;
      const res = await axios.post(`${apiUrl}/api/admission`, formData);
      
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
              className="input-style" type="text" name="fullName" required 
              placeholder="Enter your name" value={formData.fullName} onChange={handleChange} 
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input 
              className="input-style" type="email" name="email" required 
              placeholder="your@email.com" value={formData.email} onChange={handleChange} 
            />
          </div>

          <div className="form-group">
            <label>Course Name</label>
            <select className="input-style" name="course" required value={formData.course} onChange={handleChange}>
              <option value="">Select Course</option>
              <option value="Web Development">Web Development</option>
              <option value="Graphic Design">Graphic Design</option>
            </select>
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input 
              className="input-style" type="text" name="phone" required 
              placeholder="+92 XXX XXXXXXX" value={formData.phone} onChange={handleChange} 
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