import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import image1 from "./image1.jfif";
import pageBackgroundImage from "./page-background.jpg";
import beeGif from "./beegif.gif";
import beeLogo from "./beelogo.png";

function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ username: "", email: "", password: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? "/api/users/login" : "/api/users/signup";
      const response = await axios.post(`http://localhost:5001${endpoint}`, formData);
      console.log("Response:", response.data);

      if (isLogin) {
        alert("Login successful");
        navigate("/testpage"); // Redirect to TestPage
      } else {
        alert("Signup successful");
        setIsLogin(true);
      }
    } catch (error) {
      console.error("Error:", error.response.data);
      alert(error.response.data.message);
    }
  };

  return (
    <div style={{ ...styles.pageBackground, backgroundImage: `url(${pageBackgroundImage})` }}>
      <div style={{ ...styles.container, backgroundImage: `url(${image1})` }}>
        <img src={beeLogo} alt="Logo" style={styles.logo} />
        <h1 style={styles.header}>{isLogin ? "Login" : "Sign Up"}</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          {!isLogin && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
              style={styles.input}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            style={styles.input}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p style={styles.toggleText}>
          {isLogin ? "Don't have an account?" : "Already have an account?"} &nbsp;
          <span onClick={toggleForm} style={styles.toggleLink}>
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
        {/* Render bees */}
        <img src={beeGif} alt="Flying Bee 1" style={styles.flyingBee1} />
        <img src={beeGif} alt="Flying Bee 2" style={styles.flyingBee2} />
        <img src={beeGif} alt="Flying Bee 3" style={styles.flyingBee3} />
      </div>
    </div>
  );
}
const styles = {
    pageBackground: {
      height: "100vh",
      width: "100vw",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      position: "absolute",
      top: "0",
      left: "0",
    },
    container: {
      maxWidth: "400px",
      margin: "50px auto",
      padding: "20px",
      textAlign: "center",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      color: "#007BFF",
      position: "relative",
      opacity: "0.9",
    },
    logo: {
      width: "100px",
      height: "100px",
      marginBottom: "20px",
      animation: "bounce 1s ease infinite",
    },
    header: {
      fontSize: "24px",
      marginBottom: "20px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
    },
    input: {
      marginBottom: "15px",
      padding: "10px",
      fontSize: "16px",
      borderRadius: "5px",
      border: "1px solid #ccc",
    },
    button: {
      padding: "10px",
      fontSize: "16px",
      color: "white",
      backgroundColor: "#007BFF",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    toggleText: {
      marginTop: "10px",
      fontSize: "14px",
    },
    toggleLink: {
      color: "#007BFF",
      cursor: "pointer",
      textDecoration: "underline",
    },
    flyingBee1: {
      position: "absolute",
      top: "-12%",
      right: "-10%",
      width: "50px",
      animation: "flyLeft 20s linear infinite",
    },
    flyingBee2: {
      position: "absolute",
      top: "100%",
      right: "-10%",
      width: "50px",
      animation: "flyLeft 10s linear infinite",
    },
    flyingBee3: {
      position: "absolute",
      top: "100%",
      right: "-10%",
      width: "50px",
      animation: "flyLeft 15s linear infinite",
    },
  };
  
  // Add animation keyframes globally
  const styleSheet = document.styleSheets[0];
  styleSheet.insertRule(
    `@keyframes flyLeft {
      0% {
        transform: translateX(100vw); /* Start off-screen to the right */
      }
      100% {
        transform: translateX(-100vw); /* Move off-screen to the left */
      }
    }`,
    styleSheet.cssRules.length
  );
  
  styleSheet.insertRule(
    `@keyframes bounce {
      0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-10px);
      }
      60% {
        transform: translateY(-10px);
      }
    }`,
    styleSheet.cssRules.length
  );
  
  export default LoginSignup;

  
