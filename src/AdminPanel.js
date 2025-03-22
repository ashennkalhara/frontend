import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate(); // Move inside the same component

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/students") // Adjust port if necessary
      .then((response) => setStudents(response.data))
      .catch((error) => console.error("Error fetching students:", error));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken"); // Remove admin token
    navigate("/adminLogin"); // Redirect to Admin Login page
  };

  // Function to export students data to CSV
  const exportToCSV = () => {
    // Create headers for CSV
    const headers = ["Student Name", "Phone", "Email", "Attendance"];
    
    // Create data rows
    const dataRows = students.map(student => [
      `${student.firstName} ${student.lastName}`,
      student.phone,
      student.email,
      student.attendence ? "Attended" : "Absent"
    ]);
    
    // Combine headers and data
    const csvContent = [
      headers.join(","),
      ...dataRows.map(row => row.join(","))
    ].join("\n");
    
    // Create blob and download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    
    // Create download link and trigger click
    const link = document.createElement("a");
    const date = new Date().toISOString().split('T')[0];
    link.setAttribute("href", url);
    link.setAttribute("download", `Attendance_Report_${date}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ 
      padding: "30px", 
      maxWidth: "1200px", 
      margin: "0 auto", 
      fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      backgroundColor: "#f8f9fa",
      borderRadius: "8px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
      minHeight: "100vh"
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px"
      }}>
        <h2 style={{ 
          fontSize: "28px", 
          margin: "0", 
          color: "#2c3e50",
          fontWeight: "600"
        }}>Student Management Dashboard</h2>
        
        <div style={{ display: "flex", gap: "15px" }}>
          {/* Download CSV Button */}
          <button 
            onClick={exportToCSV}
            style={{
              backgroundColor: "#27ae60",
              color: "white",
              border: "none",
              borderRadius: "4px",
              padding: "10px 20px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background-color 0.2s ease",
              display: "flex",
              alignItems: "center",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)"
            }}
          >
            <span style={{ marginRight: "6px" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            Download Attendance Report
          </button>
          
          {/* Logout Button */}
          <button 
            onClick={handleLogout}
            style={{
              backgroundColor: "#e74c3c",
              color: "white",
              border: "none",
              borderRadius: "4px",
              padding: "10px 20px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background-color 0.2s ease",
              display: "flex",
              alignItems: "center",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)"
            }}
          >
            <span style={{ marginRight: "6px" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            Logout
          </button>
        </div>
      </div>

      <div style={{ 
        backgroundColor: "white", 
        padding: "25px", 
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
        marginBottom: "20px"
      }}>
        <h3 style={{ 
          fontSize: "18px", 
          color: "#2c3e50", 
          marginTop: "0",
          marginBottom: "15px"
        }}>Student Records</h3>
        
        <div style={{ overflowX: "auto" }}>
          <table style={{ 
            width: "100%", 
            borderCollapse: "separate", 
            borderSpacing: "0",
            backgroundColor: "white",
            borderRadius: "6px",
            overflow: "hidden"
          }}>
            <thead>
              <tr style={{ backgroundColor: "#3498db", color: "white" }}>
                <th style={{ 
                  padding: "15px", 
                  textAlign: "left", 
                  fontWeight: "600",
                  borderBottom: "2px solid #2980b9"
                }}>Profile</th>
                <th style={{ 
                  padding: "15px", 
                  textAlign: "left", 
                  fontWeight: "600",
                  borderBottom: "2px solid #2980b9"
                }}>Full Name</th>
                <th style={{ 
                  padding: "15px", 
                  textAlign: "left", 
                  fontWeight: "600",
                  borderBottom: "2px solid #2980b9"
                }}>Phone</th>
                <th style={{ 
                  padding: "15px", 
                  textAlign: "left", 
                  fontWeight: "600",
                  borderBottom: "2px solid #2980b9"
                }}>Email</th>
                <th style={{ 
                  padding: "15px", 
                  textAlign: "left", 
                  fontWeight: "600", 
                  borderBottom: "2px solid #2980b9" 
                }}>
                  Attendance on {new Date().toLocaleDateString()}
                </th>
                <th style={{ 
                  padding: "15px", 
                  textAlign: "left", 
                  fontWeight: "600",
                  borderBottom: "2px solid #2980b9"
                }}>Facial Feedback Regarding the Lecture</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={student._id} style={{ 
                  backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9",
                  transition: "background-color 0.2s ease",
                  ":hover": { backgroundColor: "#f1f8ff" }
                }}>
                  <td style={{ 
                    padding: "15px", 
                    fontSize: "14px",
                    borderBottom: "1px solid #eee"
                  }}>
                    {student.profilePicture ? (
                      <img 
                        src={student.profilePicture} 
                        alt={`${student.firstName} ${student.lastName}`}
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          objectFit: "cover",
                          border: "2px solid #3498db"
                        }} 
                      />
                    ) : (
                      <div style={{ 
                        width: "40px", 
                        height: "40px", 
                        borderRadius: "50%", 
                        backgroundColor: "#3498db", 
                        color: "white", 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center", 
                        fontSize: "14px",
                        fontWeight: "bold"
                      }}>
                        {student.firstName?.[0]}{student.lastName?.[0]}
                      </div>
                    )}
                  </td>
                  <td style={{ 
                    padding: "15px", 
                    fontSize: "14px",
                    borderBottom: "1px solid #eee",
                    fontWeight: "500"
                  }}>
                    {student.firstName} {student.lastName}
                  </td>
                  <td style={{ 
                    padding: "15px", 
                    fontSize: "14px", 
                    color: "#666",
                    borderBottom: "1px solid #eee"
                  }}>{student.phone}</td>
                  <td style={{ 
                    padding: "15px", 
                    fontSize: "14px", 
                    color: "#666",
                    borderBottom: "1px solid #eee"
                  }}>{student.email}</td>
                  <td style={{ 
                    padding: "15px",
                    borderBottom: "1px solid #eee"
                  }}>
                    <div
                    style={{
                      padding: "10px 12px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "14px",
                      width: "100%",
                      boxSizing: "border-box",
                      outline: "none",
                      transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                      ":focus": {
                        borderColor: "#3498db",
                        boxShadow: "0 0 0 3px rgba(52, 152, 219, 0.2)"
                      }
                    }}
                    >
                      {student.attendence ? "Attendet" : "Pending"}
                      
                    </div>
                  </td>
                  <td style={{ 
                    padding: "15px",
                    borderBottom: "1px solid #eee"
                  }}>
                    <button
                      onClick={() => navigate("/facial-analysis", {state: {analysis_data: student.facial_analysis}})}
                      style={{
                        padding: "12px 20px",
                        backgroundColor: "#3498db",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        fontSize: "15px",
                        fontWeight: "500",
                        cursor: "pointer",
                        width: "auto", // Adjust width dynamically based on content
                        minWidth: "180px", // Ensures it's not too small
                        boxSizing: "border-box",
                        transition: "background-color 0.2s ease",
                        boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        textAlign: "center",
                        letterSpacing: "0.3px",
                        fontFamily:
                          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
                        marginLeft: "60px", // Adds left spacing
                      }}
                      onMouseOver={(e) => (e.target.style.backgroundColor = "#2980b9")}
                      onMouseOut={(e) => (e.target.style.backgroundColor = "#3498db")}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ flexShrink: 0 }}
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      View Analysis
                    </button>

                  </td>
                </tr>
              ))}
              {students.length === 0 && (
                <tr>
                  <td 
                    colSpan="6" 
                    style={{ 
                      padding: "30px", 
                      textAlign: "center", 
                      color: "#7f8c8d" 
                    }}
                  >
                    <div style={{ 
                      display: "flex", 
                      flexDirection: "column", 
                      alignItems: "center", 
                      justifyContent: "center"
                    }}>
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: "10px", color: "#bdc3c7" }}>
                        <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span style={{ fontSize: "15px", fontWeight: "500" }}>No students found</span>
                      <span style={{ fontSize: "13px", color: "#95a5a6", marginTop: "5px" }}>Students will appear here once added to the system</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <div style={{ 
        textAlign: "center", 
        padding: "15px", 
        color: "#7f8c8d", 
        fontSize: "13px",
        marginTop: "20px"
      }}>
        © 2025 Student Management System - Admin Panel
      </div>
    </div>
  );
};

export default AdminPanel;