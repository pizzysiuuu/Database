import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import './SignUp.css'

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactnumber, setContactNumber] = useState("");
  const [gender, setGender] = useState("");
  const [errors, setErrors] = useState({ name: "", gender: "", email: "", password1: "", password2: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      p_name: name,
      p_gender: gender,
      p_num: contactnumber,
      p_email: email,
      p_pass: password,
    };
    fetch("http://localhost:3001/api/add-patient", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.p_ID) {
        window.alert("Patient added successfully, patient ID: " + data.p_ID);
        navigate('/login');
      } else {
        window.alert("Error: No patient ID received");
      }
    })
    .catch((error) => {
      console.error("Error adding patient:", error);
      window.alert("Error adding patient");
    });
  };

  return (
    <div className='outer-container'>
      <div className="signup-container">
        <h2 className="signup-title">Sign Up</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              className='txt'
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your Name"
              required
            />
            {errors.username && <div className="error-message">{errors.username}</div>}
          </div>

          <div className="form-group">
            <label>Gender</label>
            <div className="gender-options">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="F"
                  checked={gender === "F"}
                  onChange={() => setGender("F")}
                  required
                />
                Female
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="M"
                  checked={gender === "M"}
                  onChange={() => setGender("M")}
                  required
                />
                Male
              </label>
            </div>
            {errors.gender && <div className="error-message">{errors.gender}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="contactnumber">Contact Number</label>
            <input
              className='txt'
              type="text"
              id="contactnumber"
              value={contactnumber}
              onChange={(e) => setContactNumber(e.target.value)}
              placeholder="Enter your contact number"
              required
            />
            {errors.password && <div className="error-message">{errors.contactnumber}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              className='txt'
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email"
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

          <div className="login-link">
            Already have an account? <Link to="../login">Log In</Link>
          </div>

          <button className="signup-button" type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
