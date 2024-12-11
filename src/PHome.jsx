import React from 'react';
import { Link } from 'react-router-dom';
import './PHome.css';

const Home = () => {
  return (
    <div className="home-page">
      <div className="header">
        <Link to="/" className="home-link">Home</Link>
        <Link to="/departments" className="home-link">All Departments</Link>
        <Link to="/settings" className="home-link">Settings</Link>
      </div>

      <div className="content">
        <h2>All History</h2>
        <div className="department">patients history</div>
        <div className="department">patients history</div>
        <div className="department">patients history</div>
      </div>

      <button className="logout-btn">Log Out</button>
    </div>
  );
};

export default Home;
