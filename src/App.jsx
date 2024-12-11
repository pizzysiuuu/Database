import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import PHome from './PHome'; // Home page component
import PDepartments from './PDepartments'; // Departments page component
import PDoctors from './PDoctors'; // Doctors page component
import PSettings from './PSettings'; // Settings page component

const App = () => {
  return (
    <Router>
      

      {/* Routes */}
      <Routes>
        <Route path="/" element={<PHome />} />
        <Route path="/departments" element={<PDepartments />} />
        <Route path="/doctors/:department" element={<PDoctors />} />
        <Route path="/settings" element={<PSettings />} />
      </Routes>
    </Router>
  );
};

export default App;
