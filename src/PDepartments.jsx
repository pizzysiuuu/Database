import React from 'react';
import { Link } from 'react-router-dom';
import './PDepartments.css';
import derma from '../src/img/derma.jpeg';
import cardio from '../src/img/cardio.jpg';
import neuro from '../src/img/neuro.jpg';
import pedia from '../src/img/pedia.jpg';
import psy from '../src/img/psy.jpg';
import emergency from '../src/img/emergency.jpg';

const Departments = () => {
  const departments = [
    { name: 'Dermatology', path: 'dermatology', image: derma },
    { name: 'Cardiology', path: 'cardiology', image: cardio},
    { name: 'Neurology', path: 'neurology', image: neuro },
    { name: 'Pediatrics', path: 'pediatrics', image: pedia },
    { name: 'Psychiatry', path: 'psychiatry', image: psy},
    { name: 'Emergency Department', path: 'emergency', image: emergency },
  ];

  return (
    <div className="departments-page">
      {/* Header */}
      <div className="header">
        <Link to="/" className="home-link">Home</Link>
        <span>Departments</span>
      </div>

      {/* Content */}
      <div className="content">
        <h2 className="department-title">All Departments</h2>
        <div className="button-container">
          {departments.map((dept, index) => (
            <Link key={index} to={`/doctors/${dept.path}`} className="department-link">
              <div className="department">
                <img src={dept.image} alt={dept.name} className="department-image" />
                <div className="department-name">{dept.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Log Out Button */}
      <button className="logout-btn">Log Out</button>
    </div>
  );
};

export default Departments;
