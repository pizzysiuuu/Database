import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Admin_Home.css';

const Admin_Home = () => {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [doctors, setDoctors] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const dropdownRefs = useRef([]);

    useEffect(() => {
        const fetchDoctors = () => {
            const url = searchKeyword
                ? `http://localhost:3001/api/search-doctors?keyword=${searchKeyword}`
                : "http://localhost:3001/api/fetch-all-doctors";
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    const filteredDoctors = data.filter((doctor) => doctor.d_ID !== "admin");
                    setDoctors(filteredDoctors);
                })
                .catch((error) => {
                    console.error("Error fetching doctors:", error);
                });
        };
        fetchDoctors();
    }, [searchKeyword]);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this doctor?")) {
          fetch(`http://localhost:3001/api/delete-doctor/${id}`, {
            method: "DELETE",
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.success) {
                alert("Doctor deleted successfully.");
                setDoctors((prevDoctors) => prevDoctors.filter((doctor) => doctor.d_ID !== id));
              } else {
                alert("Error deleting doctor: " + data.message);
              }
            })
            .catch((error) => {
              console.error("Error deleting doctor:", error);
              alert("Failed to delete doctor.");
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
                <Link to="/admin-home" className='doc-home'>Home</Link>
                <div className="search">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)} // Update keyword on input change
                    />
                </div>
                <Link to="/admin-add" className="add-doctor">
                    <span>Add doctor</span>
                </Link>
                <div className="dropdown">
                    <a href="#">&#x25BC;</a>
                    <div className="dropdown-menu">
                        <Link to="/admin-settings">Settings</Link>
                        <Link to="/login" onClick={() => sessionStorage.removeItem('userID')}>Log out</Link>
                    </div>
                </div>
            </div>
        </div>

        <div className="a-content">
            {doctors.map((doctor) => (
                <div key={doctor.d_ID} className="a-card">
                    <div className="acard-content">
                        <div className='acard-header'>
                            Doctor ID: {doctor.d_ID}
                            <br/>
                            Dr. {doctor.d_name}
                        </div>
                        {doctor.d_department} Department<br/>
                        Contact Number: {doctor.d_num}
                        <br/>
                        Email: {doctor.d_email}
                    </div>
                    <div className="acard-actions">
                        <button className="acard-icon" onClick={(e) => toggleDropdown(doctor.d_ID,e)}>...</button>
                        {activeDropdown === doctor.d_ID && (
                            <div className="acard-menu" ref={(el) => dropdownRefs.current.push(el)}>
                                <Link to={`/admin-edit/${doctor.d_ID}`} className="acard-item">
                                    Edit
                                </Link>
                                <a href="#" className="acard-item"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleDelete(doctor.d_ID);
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

export default Admin_Home;