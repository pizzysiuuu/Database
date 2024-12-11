import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './PDoctors.css';
//import doctor1 from '../img/doctor1.jpg';
//import doctor2 from '../img/doctor2.avif';
//import doctor3 from '../img/doctor3.avif';


const Doctors = () => {
  const { department } = useParams();

  const doctorsData = {
    dermatology: [
      { name: 'Dr. Heart Specialist', specialty: 'Skin Care', image: 'doctor1' },
      { name: 'Dr. Cardio Expert', specialty: 'Acne Specialist', image: 'doctor2' }
    ],
    pediatrics: [
      { name: 'Dr. Kids Care', specialty: 'Child Health', image: 'doctor3' },
      { name: 'Dr. Little Expert', specialty: 'Pediatric Specialist', image: 'path_to_image4.jpg' }
    ],
    psychiatry: [
      { name: 'Dr. Calm Mind', specialty: 'Mental Health', image: 'path_to_image5.jpg' },
      { name: 'Dr. Peaceful Thoughts', specialty: 'Psychotherapy', image: 'path_to_image6.jpg' }
    ],
    cardiology: [
      { name: 'Dr. Heart Specialist', specialty: 'Cardiac Health', image: 'path_to_image7.jpg' },
      { name: 'Dr. Cardio Expert', specialty: 'Cardiology Expert', image: 'path_to_image8.jpg' }
    ],
    neurology: [
      { name: 'Dr. Brainy McSmart', specialty: 'Brain Health', image: 'path_to_image9.jpg' },
      { name: 'Dr. Neuro Genius', specialty: 'Neurology Specialist', image: 'path_to_image10.jpg' }
    ],
    emergency: [
      { name: 'Dr. Fast Responder', specialty: 'Critical Care', image: 'path_to_image11.jpg' },
      { name: 'Dr. Emergency Pro', specialty: 'Emergency Medicine', image: 'path_to_image12.jpg' }
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
          <h2>{department.charAt(0).toUpperCase() + department.slice(1)} Department</h2>
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
