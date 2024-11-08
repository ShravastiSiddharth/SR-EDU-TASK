import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all fields.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/login",
        { email, password },
        { headers: { Accept: "application/json" } }
      );

      
      console.log(response)
      if (response.data.token.original.token) {
        localStorage.setItem("authToken", response.data.token.original.token);  // Save the token
        localStorage.setItem("userRole", response.data.token.original.user.role);  // Save the user's role
console.log("user",localStorage)
        Swal.fire("Welcome!", "You have logged in successfully.", "success");
        navigate("/dashboard");
      } else {
        throw new Error("Login failed. Please try again.");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "An unknown error occurred.";
      Swal.fire("Error!", errorMessage, "error");
    }
  };

  return (
    <div className="form-container" style={{ width: '300px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
      <h2 style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', color: '#333' }}>Login</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;