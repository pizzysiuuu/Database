import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Patient_Settings.css';

const Patient_Settings = () => {
    const [form, setForm] = useState({
        patientId: "",
        name: "",
        gender: "",
        contactNumber: "",
        email: "",
        oldPassword: "",
        newPassword: "",
    });

    const navigate = useNavigate();

    useEffect(() => {
      const patientId = sessionStorage.getItem("userID");
      console.log(sessionStorage.getItem("userID"));
      if (patientId) {
        fetch(`http://localhost:3001/api/fetch-patient/${patientId}`)
          .then((response) => response.json())
          .then((data) => {
            setForm({
              patientId: data.p_ID || "",
              name: data.p_name || "",
              gender: data.p_gender || "",
              contactNumber: data.p_num || "",
              email: data.p_email || "",
              oldPassword: "",
              newPassword: "",
            });
          })
          .catch((error) => {
            console.error("Error fetching patient data:", error);
            window.alert("Failed to fetch patient data");
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
      const { patientId, name, gender, contactNumber, email, oldPassword, newPassword } = form;
      const updateData = {
        p_ID: patientId,
        name,
        gender,
        contactNumber,
        email,
        oldPassword,
        newPassword,
      };
  
      fetch(`http://localhost:3001/api/patient-settings`, {
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
            navigate("/patient-home");
          } else {
            window.alert("Error updating data: " + data.message);
          }
        })
        .catch((error) => {
          console.error("Error updating patient data:", error);
          window.alert("Failed to update data");
        });
    };

    return (
      <>
        <div className='header'>
          <Link to="/patient-home" className="home-link">Home</Link>
          <span>Settings</span>
        </div>

        <div className='container'>
          <form onSubmit={handleSubmit}>
            <div className='label'>
              <label>Patient ID</label>
              <input
                type="text"
                name="patientId"
                value={form.patientId}
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
                required
              />
            </div>
            <div className="label">
              <label>Gender</label>
              <div className="gender-options">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="F"
                    checked={form.gender === "F"}
                    onChange={handleChange}
                    required
                  />
                  Female
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="M"
                    checked={form.gender === "M"}
                    onChange={handleChange}
                    required
                  />
                  Male
                </label>
              </div>
            </div>
            <div className='label'>
              <label>Contact Number</label>
              <input
                type="text"
                name="contactNumber"
                value={form.contactNumber}
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

export default Patient_Settings;