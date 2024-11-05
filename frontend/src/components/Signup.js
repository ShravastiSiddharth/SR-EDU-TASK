import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
  const [name, setName] = useState(""); // Add state for name
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/register",
        {
          name,     
          email,
          password,
        },
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
console.log(response)
console.log(
  "heel"
)
      if (response.data.token) {
        Swal.fire("Success!", "You have signed up successfully.", "success");
        navigate("/dashboard");
      }
    } catch (error) {
      Swal.fire("Error!", error.response?.data?.message || error.message, "error");
    }
  };

  return (
    <div className="form-container" style={{ width: '300px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
  <h2 style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', color: '#333' }}>Sign Up</h2>
  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Name"
      required
      style={{
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '16px',
        fontFamily: 'Arial, sans-serif'
      }}
    />
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Email"
      required
      style={{
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '16px',
        fontFamily: 'Arial, sans-serif'
      }}
    />
    <input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Password"
      required
      style={{
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '16px',
        fontFamily: 'Arial, sans-serif'
      }}
    />
    <input
      type="password"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      placeholder="Confirm Password"
      required
      style={{
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '16px',
        fontFamily: 'Arial, sans-serif'
      }}
    />
    <button
      type="submit"
      style={{
        padding: '10px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer'
      }}
    >
      Sign Up
    </button>
  </form>
</div>
  );
};

export default Signup;
