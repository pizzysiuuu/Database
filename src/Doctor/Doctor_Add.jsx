import React from 'react';
import { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Doctor_Add.css';

const Doctor_Add = () => {
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
      const formData = {
        d_ID: sessionStorage.getItem("userID"),
        p_ID: form.patientId,
        date: form.date,
        room: form.roomNumber,
        diagnosis: form.diagnosis,
        treatment: form.treatment,
      };
      fetch("http://localhost:3001/api/add-record", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.message || "Failed to add record");
          });
        }
        return response.json();
      })
      .then((data) => {
        window.alert(data.message);
        navigate("/doctor-home");
      })
      .catch((error) => {
        console.error("Error adding record:", error);
        window.alert(error.message);
      });
    };
    
    return (
      <>
      <div className='header'>
        <Link to="/doctor-home" className='doc-home'>Home</Link>
        <span>Add Record</span>
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

export default Doctor_Add;