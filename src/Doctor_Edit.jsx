import React from 'react';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Doctor_Edit.css';

const Doctor_Edit = () => {
    const [form, setForm] = useState({
        patientId: "",
        date: "",
        roomNumber: "",
        diagnosis: "",
        treatment: "",
      });
      
    const navigate = useNavigate();

    useEffect(() => {
      const today = new Date().toISOString().split('T')[0];
      setForm((prevForm) => ({
        ...prevForm,
        date: today,
      }));
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
      // Add logic to edit the form data
      window.alert("Record edited successfully");
      navigate("/doctor-home");
    };
  
    return (
      <>
      <div className='header'>
        <a href='./doctor-home'>Home</a>
        <span>Edit Record</span>
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
              required
            />
          </div>
          <div className='label'>
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className='label'>
            <label>Room Number</label>
            <input
              type="text"
              name="roomNumber"
              value={form.roomNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className='biglabel'>
            <label>Diagnosis</label>
            <textarea
              type="text"
              name="diagnosis"
              value={form.diagnosis}
              onChange={handleChange}
              required
            />
          </div>
          <div className='biglabel'>
            <label>Treatment</label>
            <textarea
              type="text"
              name="treatment"
              value={form.treatment}
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

export default Doctor_Edit;