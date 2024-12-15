import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Doctor_Settings.css';

const Doctor_Settings = () => {
    const [form, setForm] = useState({
        doctorId: "",
        name: "",
        department: "",
        contactnumber: "",
        email: "",
        oldPassword: "",
        newPassword: "",
      });
      
    const navigate = useNavigate();
    
    useEffect(() => {
      const doctorId = sessionStorage.getItem("userID");
      console.log(sessionStorage.getItem("userID"));
      if (doctorId) {
        fetch(`http://localhost:3001/api/fetch-doctor/${doctorId}`)
          .then((response) => response.json())
          .then((data) => {
            setForm({
              doctorId: data.d_ID || "",
              name: data.d_name || "",
              department: data.d_department || "",
              contactnumber: data.d_num || "",
              email: data.d_email || "",
              oldPassword: "",
              newPassword: "",
            });
          })
          .catch((error) => {
            console.error("Error fetching doctor data:", error);
            window.alert("Failed to fetch doctor data");
          });
      }
    }, []);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const { doctorId, contactnumber, email, oldPassword, newPassword } = form;
      const updateData = {
        d_ID: doctorId,
        contactnumber,
        email,
        oldPassword,
        newPassword,
      };
  
      fetch(`http://localhost:3001/api/doctor-settings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            window.alert("Data saved successfully");
            navigate("/doctor-home");
          } else {
            window.alert("Error updating data: " + data.message);
          }
        })
        .catch((error) => {
          console.error("Error updating doctor data:", error);
          window.alert("Failed to update data");
        });
    };
  
    return (
      <>
      <div className='header'>
        <Link to='../doctor-home' className='doc-home'>Home</Link>
        <span>Settings</span>
      </div>
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <div className='label'>
            <label>Doctor ID</label>
            <input
              type="text"
              name="doctorId"
              value={form.doctorId}
              onChange={handleChange}
              readOnly
            />
          </div>
          <div className='label'>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              readOnly
            />
          </div>
          <div className='label'>
            <label>Department</label>
            <input
              type="text"
              name="department"
              value={form.department}
              onChange={handleChange}
              readOnly
            />
          </div>
          <div className='label'>
            <label>Contact Number</label>
            <input
              type="text"
              name="contactnumber"
              value={form.contactnumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className='label'>
            <label>Email</label>
            <input
              type="text"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className='label'>
            <label>Current Password</label>
            <input
              type="password"
              name="oldPassword"
              value={form.oldPassword}
              onChange={handleChange}
            />
          </div>
          <div className='label'>
            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
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

export default Doctor_Settings;