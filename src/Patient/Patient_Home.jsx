import React from 'react';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Patient_Home.css';

const Patient_Home = () => {
  const [patientHistory, setPatientHistory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const patientId = sessionStorage.getItem('userID');
    if (patientId) {
      fetch(`http://localhost:3001/api/fetch-precord?patientId=${patientId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch patient history');
          }
          return response.json();
        })
        .then((data) => {
          setPatientHistory(data);
        })
        .catch((err) => {
          console.error("Error fetching patient history:", err);
          setError(err.message);
        });
    } else {
      setError("Patient ID not found in session");
    }
  }, []);

  return (
    <>
      <div className="p-container">
        <div className="p-navbar">
          <Link to="/patient-home" className="home-link">Home</Link>
          <Link to="/patient-departments" className="home-link">All Departments</Link>
          <Link to="/patient-settings" className="home-link">Settings</Link>
          <Link to="/login" className="logout-btn" onClick={() => sessionStorage.removeItem('userID')}>Log Out</Link>
        </div>
      </div>

      <div className="patient-content">
        {patientHistory.map((record) => (
            <div key={record.case_ID} className="patient-card">
              <b>Case ID: #{record.case_ID}</b>
              <br/>
              Doctor name: Dr. {record.d_name}
              <br/>
              Date: {new Date(record.date).toLocaleDateString()}
              <br/>
              Room: {record.room}
              <br/>
              Diagnosis: {record.diagnosis}
              <br/>
              Treatment: {record.treatment}
            </div>
          ))}
      </div>
    </>
  );
};

export default Patient_Home;