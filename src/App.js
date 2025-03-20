import { useState, useRef } from "react";
import axios from "axios";
import Webcam from "react-webcam";
import "./App.css";

function App() {
  // Form state using a single object for better management
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    gender: "",
    // attendence: "",
    // facial_analysis: ""
  });
  
  // Photo and UI states
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // For multi-step form
  
  // Refs
  const webcamRef = useRef(null);
  const formRef = useRef(null);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle photo upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setPhotoPreview(previewUrl);
    }
  };

  // Handle capturing image from webcam
  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    // Convert base64 to a File object
    fetch(imageSrc)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "captured_photo.jpg", { type: "image/jpeg" });
        setPhoto(file);
        setPhotoPreview(imageSrc);
        setShowCamera(false);
      });
  };

  // Form validation
  const validateForm = () => {
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Phone validation regex (simple version)
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    
    if (!formData.firstName || !formData.lastName) {
      setMessage({ text: "Please enter your full name", type: "error" });
      return false;
    }
    
    if (!emailRegex.test(formData.email)) {
      setMessage({ text: "Please enter a valid email address", type: "error" });
      return false;
    }
    
    if (!phoneRegex.test(formData.phone)) {
      setMessage({ text: "Please enter a valid phone number (10-15 digits)", type: "error" });
      return false;
    }
    
    if (formData.password.length < 8) {
      setMessage({ text: "Password must be at least 8 characters", type: "error" });
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setMessage({ text: "Passwords do not match", type: "error" });
      return false;
    }
    
    if (!formData.gender) {
      setMessage({ text: "Please select your gender", type: "error" });
      return false;
    }
    
    if (!photo) {
      setMessage({ text: "Please upload or take a photo", type: "error" });
      return false;
    }
    
    return true;
  };

  // Handle next step
  const handleNextStep = (e) => {
    e.preventDefault();
    
    // Validate first step
    if (step === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
        setMessage({ text: "Please fill all fields to continue", type: "error" });
        return;
      }
      
      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setMessage({ text: "Please enter a valid email address", type: "error" });
        return;
      }
      
      setMessage({ text: "", type: "" });
      setStep(2);
      return;
    }
  };

  // Handle previous step
  const handlePrevStep = () => {
    setStep(1);
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setMessage({ text: "", type: "" });

    // Prepare form data
    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "confirmPassword") { // Don't send confirmPassword to server
        submitData.append(key, value);
      }
    });
    submitData.append("photo", photo);

    try {
      // Send POST request to backend
      const res = await axios.post("http://localhost:5000/api/students", submitData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      setMessage({ 
        text: res.data.message || "Registration successful! Redirecting to login...", 
        type: "success" 
      });

      // Reset form after successful submission
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        gender: "",
      });
      setPhoto(null);
      setPhotoPreview(null);
      setStep(1);
      
      // Simulate redirect after successful registration
      setTimeout(() => {
        // In a real app, you would navigate to login page here
        console.log("Redirecting to login page...");
      }, 3000);
      
    } catch (error) {
      console.error(error);
      const errorMsg = error.response?.data?.message || "Registration failed. Please try again.";
      setMessage({ text: errorMsg, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-wrapper">
      <div className="form-container">
        <div className="form-header">
          <h1>Student Registration</h1>
          <p>Join our academic community</p>
        </div>
        
        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <div className="progress-indicator">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>1</div>
          <div className="step-line"></div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>2</div>
        </div>

        <form ref={formRef} onSubmit={step === 1 ? handleNextStep : handleSubmit}>
          {step === 1 && (
            <div className="form-step">
              <h2>Personal Information</h2>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input 
                    id="firstName"
                    name="firstName"
                    type="text" 
                    value={formData.firstName} 
                    onChange={handleChange} 
                    placeholder="Enter your first name"
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input 
                    id="lastName"
                    name="lastName"
                    type="text" 
                    value={formData.lastName} 
                    onChange={handleChange} 
                    placeholder="Enter your last name"
                    required 
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input 
                  id="email"
                  name="email"
                  type="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="example@school.edu"
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input 
                  id="phone"
                  name="phone"
                  type="tel" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  placeholder="+1 (123) 456-7890"
                  required 
                />
              </div>

              <button type="submit" className="btn primary-btn">
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="form-step">
              <h2>Account Setup</h2>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input 
                  id="password"
                  name="password"
                  type="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  placeholder="Create a strong password"
                  required 
                  minLength={8}
                />
                <span className="input-hint">Minimum 8 characters</span>
              </div>
              
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input 
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password" 
                  value={formData.confirmPassword} 
                  onChange={handleChange} 
                  placeholder="Confirm your password"
                  required 
                  minLength={8}
                />
              </div>

              <div className="form-group">
                <label>Gender</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={formData.gender === "Male"}
                      onChange={handleChange}
                    />
                    <span className="radio-custom"></span>
                    Male
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={formData.gender === "Female"}
                      onChange={handleChange}
                    />
                    <span className="radio-custom"></span>
                    Female
                  </label>
                </div>
              </div>

              <div className="form-group photo-section">
                <label>Profile Photo</label>
                
                {!showCamera ? (
                  <div className="photo-upload-area">
                    {photoPreview ? (
                      <div className="photo-preview">
                        <img src={photoPreview} alt="Profile preview" />
                        <button 
                          type="button" 
                          className="btn remove-btn"
                          onClick={() => {
                            setPhoto(null);
                            setPhotoPreview(null);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="upload-options">
                        <label htmlFor="photo-upload" className="upload-label">
                          <span className="upload-icon">📁</span>
                          <span>Choose a file</span>
                          <input
                            id="photo-upload"
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            style={{ display: 'none' }}
                          />
                        </label>
                        
                        <div className="divider">or</div>
                        
                        <button
                          type="button"
                          className="btn camera-btn"
                          onClick={() => setShowCamera(true)}
                        >
                          Take a Photo
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="webcam-container">
                    <Webcam
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      videoConstraints={{
                        facingMode: "user",
                        width: 320,
                        height: 240,
                      }}
                      width={320}
                      height={240}
                    />
                    <div className="camera-controls">
                      <button type="button" className="btn capture-btn" onClick={handleCapture}>
                        Capture
                      </button>
                      <button type="button" className="btn cancel-btn" onClick={() => setShowCamera(false)}>
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn secondary-btn" 
                  onClick={handlePrevStep}
                >
                  Back
                </button>
                <button 
                  type="submit" 
                  className="btn primary-btn"
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Complete Registration"}
                </button>
              </div>
            </div>
          )}
        </form>
        
      </div>
    </div>
  );
}

export default App;