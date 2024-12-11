import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './PDoctors.css';
import doctor1 from '../src/img/doctor1.jpg';
import doctor2 from '../src/img/doctor2.avif';
import doctor3 from '../src/img/doctor3.avif';
import doctor4 from '../src/img/doctor4.jpg';
import doctor5 from '../src/img/doctor5.jpg';
import doctor6 from '../src/img/doctor6.jpg';
import doctor7 from '../src/img/doctor7.jpg';
import doctor8 from '../src/img/doctor8.jpg';
import doctor9 from '../src/img/doctor9.jpg';
import doctor10 from '../src/img/doctor10.jpg';
import doctor11 from '../src/img/doctor11.jpg';
import doctor12 from '../src/img/doctor12.jpg';


const Doctors = () => {
  const { department } = useParams();

  const doctorsData = {
    dermatology: [
      { name: 'Dr. William', specialty: 'Skin Care', image: doctor1 },
      { name: 'Dr. Anastasya', specialty: 'Acne Specialist', image: doctor2 }
    ],
    pediatrics: [
      { name: 'Dr. Jacob', specialty: 'Child Health', image: doctor3 },
      { name: 'Dr. Erica', specialty: 'Pediatric Specialist', image: doctor4 }
    ],
    psychiatry: [
      { name: 'Dr. Nicolas', specialty: 'Mental Health', image: doctor5 },
      { name: 'Dr. Mario', specialty: 'Psychotherapy', image: doctor6 }
    ],
    cardiology: [
      { name: 'Dr. Jessica', specialty: 'Cardiac Health', image: doctor7 },
      { name: 'Dr. Maria', specialty: 'Cardiology Expert', image: doctor8 }
    ],
    neurology: [
      { name: 'Dr. Scoot', specialty: 'Brain Health', image: doctor9 },
      { name: 'Dr. Leony', specialty: 'Neurology Specialist', image: doctor10 }
    ],
    emergency: [
      { name: 'Dr. Grace', specialty: 'Critical Care', image: doctor11 },
      { name: 'Dr. Kent', specialty: 'Emergency Medicine', image: doctor12 }
    ]
  };

  const doctors = doctorsData[department] || [];

  return (
    <>
      <div className="home-page">
        <div className="header">
          <Link to="/" className="home-link">Home</Link>
          <Link to="/departments" className="home-link">All Departments</Link>
          <span>Doctors</span>
        </div>

        <div className="content">
          <h2 className="department-title">
            {department.charAt(0).toUpperCase() + department.slice(1)} Department
          </h2>
          <div className="doctors-container">
            {doctors.map((doctor, index) => (
              <div key={index} className="doctor-card">
                <img src={doctor.image} alt={doctor.name} className="doctor-image" />
                <h3>{doctor.name}</h3>
                <p>{doctor.specialty}</p>
              </div>
            ))}
          </div>
        </div>
        <button className="logout-btn">Log Out</button>
      </div>
    </>
  );
};

export default Doctors;
