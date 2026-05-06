import React, { useState } from "react";
import axios from "axios";
import "./App.css"

function App() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    course: "",
    phone: ""
  });

  const [message, setMessage] = useState("");

  // Input handle
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Submit handle
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://admission-backend-beta.vercel.app/api/admission",
        formData
      );

      setMessage(res.data.message);

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        course: "",
        phone: ""
      });

    } catch (error) {
      console.error(error);
      setMessage("❌ Error submitting form");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Admission Portal</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br /><br />

        <select
          name="course"
          value={formData.course}
          onChange={handleChange}
          required
        >
          <option value="">Select Course</option>
          <option value="Web Development">Web Development</option>
          <option value="Graphic Design">Graphic Design</option>
        </select>
        <br /><br />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <br /><br />

        <button type="submit">Apply Now</button>
      </form>

      {message && <p style={{ marginTop: "20px" }}>{message}</p>}
    </div>
  );
}

export default App;
