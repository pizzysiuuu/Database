import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Patient_Doctors.css';


const Patient_Doctors = () => {
  const { department } = useParams();
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/api/department-doctors/${department}`)
      .then((response) => response.json())
      .then((data) => {
        const doctorsList = data.map((doctor) => ({
          name: doctor.name,
          image: doctor.image,
        }));
        setDoctors(doctorsList);
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
      });
  }, [department]);

  return (
    <div className="doc-page">
      <div className="header">
        <Link to="/patient-home" className="home-link">Home</Link>
        <Link to="/patient-departments" className="home-link">All Departments</Link>
        <span>Doctors</span>
      </div>

      <div className="doc-content">
        <h2 className="department-title">
          {department.charAt(0).toUpperCase() + department.slice(1)} Department
        </h2>
        <div className="doc-container">
          {doctors.map((doctor, index) => (
            <div key={index} className="doc-card">
              <img src={doctor.image} alt={doctor.name} className="doc-image" />
              <h3>Dr. {doctor.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Patient_Doctors;