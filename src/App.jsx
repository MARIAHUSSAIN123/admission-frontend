import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // .env se URL uthayega
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/admission`, formData);
      alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert("Submission Failed!");
    }
  };

  return (
    <div className="container">
      <form className="glass-form" onSubmit={handleSubmit}>
        <h2>Admission Form</h2>
        <input 
          type="text" 
          placeholder="Name" 
          onChange={(e) => setFormData({...formData, name: e.target.value})} 
        />
        <input 
          type="email" 
          placeholder="Email" 
          onChange={(e) => setFormData({...formData, email: e.target.value})} 
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
