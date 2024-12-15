import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Admin_Settings.css';

const Admin_Settings = () => {
    const [form, setForm] = useState({
        oldPassword: "",
        newPassword: "",
      });
      
    const navigate = useNavigate();
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = {
        d_ID: 'admin',
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      };
      if (form.oldPassword === form.newPassword) {
        window.alert("Current password and new password cannot be the same");
        return;
      }
  
      fetch("http://localhost:3001/api/admin-settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "Password updated successfully") {
            window.alert("Password updated successfully");
            navigate("/admin-home");
          } else {
            window.alert(data.message || "An error occurred");
          }
        })
        .catch((error) => {
          console.error("Error changing password:", error);
          window.alert(error.message);
        });
    };
  
    return (
      <>
      <div className='header'>
        <Link to='../admin-home' className='doc-home'>Home</Link>
        <span>Settings</span>
      </div>
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <div className='label'>
            <label>Current Password</label>
            <input
              type="password"
              name="oldPassword"
              value={form.oldPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className='label'>
            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className='save-btn'>
            Save
          </button>
        </form>
      </div>
      </>
    );
};

export default Admin_Settings;