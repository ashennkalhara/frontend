import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    setTimeout(() => {
      if (username === "admin" && password === "admin123") {
        localStorage.setItem("adminToken", "your_fake_jwt_token"); // Store token
        navigate("/admin"); // Redirect to Admin Panel after login
      } else {
        alert("❌ Invalid Username or Password");
      }
      setIsLoading(false);
    }, 500);
  };
  

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f5f7fa",
      fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "400px",
        padding: "40px",
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
        textAlign: "center"
      }}>
        <div style={{
          marginBottom: "30px"
        }}>
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: "#3498db" }}>
            <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
            <path d="M4 21V17C4 15.8954 4.89543 15 6 15H18C19.1046 15 20 15.8954 20 17V21" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>
        
        <h2 style={{
          fontSize: "28px",
          color: "#2c3e50",
          marginBottom: "25px",
          fontWeight: "600"
        }}>Admin Login</h2>
        
        <form onSubmit={handleLogin} style={{ textAlign: "left" }}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "block",
              fontSize: "14px",
              fontWeight: "500",
              color: "#4a5568",
              marginBottom: "8px"
            }}>
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                fontSize: "15px",
                border: "1px solid #e2e8f0",
                borderRadius: "6px",
                backgroundColor: "#f8fafc",
                transition: "all 0.2s ease",
                outline: "none",
                boxSizing: "border-box"
              }}
            />
          </div>
          
          <div style={{ marginBottom: "25px" }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "8px"
            }}>
              <label style={{
                fontSize: "14px",
                fontWeight: "500",
                color: "#4a5568"
              }}>
                Password
              </label>
              {/* <a href="#" style={{
                fontSize: "13px",
                color: "#3498db",
                textDecoration: "none"
              }}>
                Forgot password?
              </a> */}
            </div>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                fontSize: "15px",
                border: "1px solid #e2e8f0",
                borderRadius: "6px",
                backgroundColor: "#f8fafc",
                transition: "all 0.2s ease",
                outline: "none",
                boxSizing: "border-box"
              }}
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              padding: "12px",
              backgroundColor: "#3498db",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: isLoading ? "not-allowed" : "pointer",
              transition: "background-color 0.2s ease",
              opacity: isLoading ? 0.7 : 1
            }}
          >
            {isLoading ? (
              <div style={{
                display: "inline-block",
                width: "20px",
                height: "20px",
                border: "3px solid rgba(255,255,255,0.3)",
                borderRadius: "50%",
                borderTopColor: "#fff",
                animation: "spin 1s ease-in-out infinite"
              }} />
            ) : "Login"}
          </button>
        </form>
        
        <div style={{
          marginTop: "30px",
          padding: "15px",
          backgroundColor: "#f8fafc",
          borderRadius: "6px",
          fontSize: "13px",
          color: "#718096"
        }}>
          <p style={{ margin: "0" }}>For system administrators only. Unauthorized access is prohibited.</p>
        </div>
      </div>
      
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          input:focus {
            border-color: #3498db !important;
            box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.25) !important;
          }
          button:hover:not(:disabled) {
            background-color: #2980b9 !important;
          }
        `}
      </style>
    </div>
  );
};

export default AdminLogin;