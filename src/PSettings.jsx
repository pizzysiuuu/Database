import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './PSettings.css';

const PSettings = () => {
    const [form, setForm] = useState({
        patientId: "",
        date: "",
        roomNumber: "",
        diagnosis: "",
        treatment: "",
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
      // Add logic to save the form data
      window.alert("Data saved successfully");
      navigate("/Phome");
    };

    return (
      <>
        <div className='header'>
          {/* Change the <a> tag to a <Link> component */}
          <Link to="/" className="home-link">Home</Link>
          <span>Settings</span>
        </div>

        <div className='container'>
          <form onSubmit={handleSubmit}>
            <div className='label'>
              <label>Patient ID</label>
              <input
                type="text"
                name="doctorId"
                value={form.doctorId}
                onChange={handleChange}
                required
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
            <div className='label'>
              <label>Gender</label>
              <input
                type="text"
                name="department"
                value={form.department}
                onChange={handleChange}
                required
              />
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
                type="text"
                name="curPass"
                value={form.curPass}
                onChange={handleChange}
                required
              />
            </div>
            <div className='label'>
              <label>New Password</label>
              <input
                type="text"
                name="newPass"
                value={form.newPass}
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

export default PSettings;
