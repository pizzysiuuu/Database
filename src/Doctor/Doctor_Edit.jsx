import React from 'react';
import { useState,useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './Doctor_Edit.css';

const Doctor_Edit = () => {
    const {index} = useParams();
    const [form, setForm] = useState({
        patientId: "",
        date: "",
        room: "",
        diagnosis: "",
        treatment: "",
      });
    const navigate = useNavigate();

    useEffect (() => {
      if (index) {
        fetch(`http://localhost:3001/api/fetch-record/${index}`)
            .then((response) => response.json())
            .then((data) => {
              const formattedDate = data.date
                ? new Date(data.date).toISOString().split('T')[0]
                : "";

              setForm({
                caseId: data.case_ID || "",
                patientId: data.p_ID || "",
                date: formattedDate,
                room: data.room || "",
                diagnosis: data.diagnosis || "",
                treatment: data.treatment || "",
              });
            })
            .catch((error) => {
            console.error("Error fetching record:", error);
            window.alert("Failed to fetch record");
            });
        }
    }, [index]);
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const { patientId, date, room, diagnosis, treatment } = form;
      const updateData = {
        p_ID: patientId,
        date: date,
        room: room,
        diagnosis: diagnosis,
        treatment: treatment,
        case_ID: index,
      };
  
      fetch(`http://localhost:3001/api/edit-record`, {
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
          console.error("Error updating record data:", error);
          window.alert("Failed to update data");
        });
    };
  
    return (
      <>
      <div className='header'>
        <Link to='../doctor-home' className='doc-home'>Home</Link>
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
              type="number"
              name="room"
              value={form.room}
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