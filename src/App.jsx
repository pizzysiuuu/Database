import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Doctor_Home from './Doctor_Home';
import Doctor_Add from './Doctor_Add';
import Doctor_Edit from './Doctor_Edit';
import Doctor_Settings from './Doctor_Settings';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Doctor_Home/>}/>
          <Route path="/doctor-home" element={<Doctor_Home/>}/>
          <Route path="/doctor-add" element={<Doctor_Add/>}/>
          <Route path="/doctor-edit" element={<Doctor_Edit/>}/>
          <Route path="/doctor-settings" element={<Doctor_Settings/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
