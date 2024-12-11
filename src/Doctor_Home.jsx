import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Doctor_Home.css';

const Doctor_Home = () => {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const dropdownRefs = useRef([]);

    const patients = [
        { id: 1, name: "David" },
        { id: 2, name: "Davis" },
      ];

    const toggleDropdown = (index,e) => {
        e.stopPropagation();
        setActiveDropdown(activeDropdown === index ? null : index);
    };

    return (
        <>
        <div className="container">
            <div className="navbar">
                <Link to="/doctor-home">Home</Link>
                <div className="search">
                    <input type="text" placeholder="search" />
                </div>
                <Link to="/doctor-add" className="add-record">
                    <span>Add record</span>
                </Link>
                <div className="dropdown">
                    <a href="#">&#x25BC;</a>
                    <div className="dropdown-menu">
                        <Link to="/doctor-settings">Settings</Link>
                        <a href="#">Log out</a>
                    </div>
                </div>
            </div>
        </div>

        <div className="content">
                {patients.map((patient) => (
                    <div key={patient.id} className="card">
                        <div className="card-content">
                            <div className='card-header'>
                                Patient ID: {patient.id}
                                <br/>
                                Date: dd/mm/yyyy
                            </div>
                            {patient.name}
                        </div>
                        <div className="card-actions">
                            <button className="card-icon" onClick={(e) => toggleDropdown(patient.id,e)}>...</button>
                            {activeDropdown === patient.id && (
                                <div className="card-menu" ref={(el) => dropdownRefs.current.push(el)}>
                                    <Link to={`/doctor-edit/${patient.id}`} className="card-item" onClick={()=>console.log("edit")}>
                                        Edit
                                    </Link>
                                    <a href="#" className="card-item">Delete</a>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Doctor_Home;