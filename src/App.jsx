import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    course: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await axios.post(
        "https://admission-backend-beta.vercel.app/api/admission",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          // ❌ withCredentials hata diya (important)
        }
      );

      setMessage({
        type: "success",
        text: res.data.message || "Admission successful!",
      });

      setFormData({
        fullName: "",
        email: "",
        course: "",
        phone: "",
      });

    } catch (err) {
      console.error("Full Error:", err);

      const errorMessage =
        err.response?.data?.message ||
        "Submission failed. Backend not responding.";

      setMessage({
        type: "error",
        text: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admission-page">
      <div className="form-card">
        <h1>Admission Portal</h1>

        {message.text && (
          <div
            style={{
              marginBottom: "10px",
              color: message.type === "success" ? "green" : "red",
            }}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

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

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Apply Now"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
