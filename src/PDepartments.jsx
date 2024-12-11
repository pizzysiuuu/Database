import React from 'react';
import { Link } from 'react-router-dom';
import './PDepartments.css';


const Departments = () => {
  const departments = [
    { name: 'Dermatology', path: 'dermatology' },
    { name: 'Cardiology', path: 'cardiology' },
    { name: 'Neurology', path: 'neurology' },
    { name: 'Pediatrics', path: 'pediatrics' },
    { name: 'Psychiatry', path: 'psychiatry' },
    { name: 'Emergency Department', path: 'emergency' },
  ];

  return (
    <>
    <div className="departments-page">
      <div className='header'>
            {/* Change the <a> tag to a <Link> component */}
            <Link to="/" className="home-link">Home</Link>
            <span>Departments</span>
          </div>
  
          <div className="content">
            <h2>All Departments</h2>
            <div className="button-container">
              {/* Left Column */}
              <div className="button-column">
                {departments.slice(0, 3).map((dept, index) => (
                  <Link key={index} to={`/doctors/${dept.path}`} className="department-link">
                    <div className="department">{dept.name}</div>
                  </Link>
                ))}
              </div>
              {/* Right Column */}
              <div className="button-column">
                {departments.slice(3, 6).map((dept, index) => (
                  <Link key={index + 3} to={`/doctors/${dept.path}`} className="department-link">
                    <div className="department">{dept.name}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

      {/* Log Out Button positioned at top right */}
      <button className="logout-btn">Log Out</button>
      </div>
    </>
  );
};

export default Departments;
