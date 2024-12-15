import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Doctor_Home.css';

const Doctor_Home = () => {
    const [patients, setPatients] = useState([]);
    const [error, setError] = useState(null);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState("");
    const dropdownRefs = useRef([]);
    const doctorId = sessionStorage.getItem('userID');
    
    useEffect(() => {
          const fetchRecords = () => {
              const url = searchKeyword
                  ? `http://localhost:3001/api/search-records?doctorId=${doctorId}&keyword=${searchKeyword}`
                  : `http://localhost:3001/api/fetch-drecord?doctorId=${doctorId}`;
              fetch(url)
                  .then((response) => response.json())
                  .then((data) => {
                    setPatients(data);
                  })
                  .catch((err) => {
                    console.error("Error fetching patient data:", err);
                    setError(err.message);
                  });
          };
          fetchRecords();
      }, [doctorId, searchKeyword]);

      const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this record?")) {
          fetch(`http://localhost:3001/api/delete-record/${id}`, {
            method: "DELETE",
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.success) {
                alert("Record deleted successfully.");
                setPatients((prevPatients) => prevPatients.filter((patient) => patient.case_ID !== id));
              } else {
                alert("Error deleting record: " + data.message);
              }
            })
            .catch((error) => {
              console.error("Error deleting record:", error);
              alert("Failed to delete record.");
            });
        }
    };     

      const toggleDropdown = (id, e) => {
        e.stopPropagation();
        setActiveDropdown(prevId => (prevId === id ? null : id));
    };

    return (
        <>
        <div className="container">
            <div className="d-navbar">
                <Link to="/doctor-home" className='doc-home'>Home</Link>
                <div className="search">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)} // Update keyword on input change
                    />
                </div>
                <Link to="/doctor-add" className="add-record">
                    <span>Add record</span>
                </Link>
                <div className="dropdown">
                    <a href="#">&#x25BC;</a>
                    <div className="dropdown-menu">
                        <Link to="/doctor-settings">Settings</Link>
                        <Link to="/login" onClick={() => sessionStorage.removeItem('userID')}>Log out</Link>
                    </div>
                </div>
            </div>
        </div>

        <div className="content">
            {patients.map((patient) => (
                <div key={patient.case_ID} className="card">
                    <div className="card-content">
                        <div className='card-header'>
                            <b>Case ID: #{patient.case_ID}</b>
                            <br/>
                            Patient ID: {patient.p_ID}
                        </div>
                        Patient Name: {patient.p_name}
                        <br/>
                        Date: {new Date(patient.date).toLocaleDateString()}
                        <br/>
                        Room: {patient.room}
                        <br/>
                        Diagnosis: {patient.diagnosis}
                        <br/>
                        Treatment: {patient.treatment}
                    </div>
                    <div className="card-actions">
                        <button className="card-icon" onClick={(e) => toggleDropdown(patient.case_ID,e)}>...</button>
                        {activeDropdown === patient.case_ID && (
                            <div className="card-menu" ref={(el) => dropdownRefs.current.push(el)}>
                                <Link to={`/doctor-edit/${patient.case_ID}`} className="card-item">
                                    Edit
                                </Link>
                                <a href="#" className="card-item"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleDelete(patient.case_ID);
                                    }}>
                                    Delete
                                </a>
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