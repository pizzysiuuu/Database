import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import './Login.css'

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ username: "", password: "" });

    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
  
      if (response.ok) {
        sessionStorage.setItem("userID", data.userID);
        console.log(sessionStorage.getItem("userID"));
        if (username === "admin") {
          navigate("/admin-home");
        } else if (username.startsWith("d")) {
          navigate("/doctor-home");
        } else if (username.startsWith("p")) {
          navigate("/patient-home");
        }
      } else {
        window.alert(data.message || "Invalid username or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      window.alert("An error occurred while logging in. Please try again.");
    }
  };

  return (
    <div className='outer-container'>
      <div className="login-container">
        <h2 className="login-title">Log In</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">User ID</label>
            <input
              className='txt'
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your User ID"
              required
            />
            {errors.username && <div className="error-message">{errors.username}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              className='txt'
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your Password"
              required
            />
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>

          <div className="register-link">
            Don't have an account? <Link to="../signup">Register</Link>
          </div>

          <button className="login-button" type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
}
export default Login;
