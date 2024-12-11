import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Doctor_Home.css';

const Doctor_Home = () => {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const dropdownRefs = useRef([]);

    const toggleDropdown = (index) => {
        setActiveDropdown(activeDropdown === index ? null : index);
    };

    const handleClickOutside = (event) => {
        if (
            dropdownRefs.current.every(
                (ref) => ref && !ref.contains(event.target)
            )
        ) {
            setActiveDropdown(null);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
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
                {['patients history', 'patients history', 'patients history'].map((history, index) => (
                    <div key={index} className="card">
                        <div className="card-content">
                            <div className='card-header'>
                                Patient ID: xxx
                                <br/>
                                Date: dd/mm/yyyy
                            </div>
                            {history}
                        </div>
                        <div className="card-actions">
                            <button className="card-icon" onClick={() => toggleDropdown(index)}>...</button>
                            {activeDropdown === index && (
                                <div className="card-menu">
                                    <Link to="/doctor-edit" className="card-item">
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