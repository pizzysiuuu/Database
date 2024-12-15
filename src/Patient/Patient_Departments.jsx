import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Patient_Departments.css';

const departmentImages = {
  Dermatology: require('./img/derma.jpeg'),
  Cardiology: require('./img/cardio.jpg'),
  Neurology: require('./img/neuro.jpg'),
  Pediatrics: require('./img/pedia.jpg'),
  Psychiatry: require('./img/psy.jpg'),
  Emergency: require('./img/emergency.jpg'),
};

const Patient_Departments = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/fetch-departments")
      .then((response) => response.json())
      .then((data) => {
        setDepartments(data);
      })
      .catch((error) => {
        console.error("Error fetching departments:", error);
      });
  }, []);

  return (
    <div className="departments-page">
      <div className="header">
        <Link to="/patient-home" className="home-link">Home</Link>
        <span>Departments</span>
      </div>

      <div className="dpt-content">
        <h2 className="department-title">All Departments</h2>
        <div className="button-container">
          {departments.map((dept, index) => {
            const departmentName = dept.dpt_name;
            return (
              <Link key={index} to={`/patient-doctors/${departmentName.toLowerCase()}`} className="department-link">
                <div className="department-card">
                  <img 
                    src={departmentImages[departmentName]}  
                    alt={departmentName} 
                    className="department-image" 
                  />
                  <div className="department-name">{departmentName} Department</div>
                </div>
              </Link>
          );
        })}
        </div>
      </div>

    </div>
  );
};

export default Patient_Departments;