import React from "react";
import { useNavigate } from "react-router-dom";
import TaskComponent from "./TaskComponent";
import CreateUser from "./CreateUser";
import ViewTask from "./ViewTask";
//import UserComponent from "./UserComponent";  // Assuming you have a different component for regular users

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  // Get the role from localStorage
  const userRole = localStorage.getItem("userRole");

  return (
    <div className="dashboard" style={{ display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
      {/* Sidebar */}
      <div style={{
        width: '250px',
        backgroundColor: '#333',
        color: 'white',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '8px',
        height: '100vh'
      }}>
        <h3 style={{ textAlign: 'center' }}>Dashboard</h3>
        <div>
          <p style={{ fontSize: '18px', marginBottom: '20px' }}>Welcome</p>
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              cursor: 'pointer',
              marginTop: '20px'
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        flex: 1,
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        marginLeft: '20px'
      }}>
        <h2 style={{ fontFamily: 'Arial, sans-serif', color: '#333' }}>Welcome to the Dashboard!</h2>
        <p style={{ fontSize: '16px', color: '#555' }}>Here you can manage your account, settings, and more.</p>

        {userRole === '0' ? <><TaskComponent /> <CreateUser/></> : <ViewTask/>} {/* Conditionally render based on role */}
      </div>
    </div>
  );
};

export default Dashboard;