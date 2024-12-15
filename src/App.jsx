import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Doctor_Home from './Doctor/Doctor_Home';
import Doctor_Add from './Doctor/Doctor_Add';
import Doctor_Edit from './Doctor/Doctor_Edit';
import Doctor_Settings from './Doctor/Doctor_Settings';
import Login from "./Login/Login";
import SignUp from "./Login/SignUp";
import Admin_Home from "./Admin/Admin_Home";
import Admin_Add from "./Admin/Admin_Add";
import Admin_Edit from "./Admin/Admin_Edit";
import Admin_Settings from "./Admin/Admin_Settings";
import Patient_Home from './Patient/Patient_Home';
import Patient_Departments from './Patient/Patient_Departments';
import Patient_Doctors from './Patient/Patient_Doctors';
import Patient_Settings from './Patient/Patient_Settings';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/admin-home" element={<Admin_Home/>}/>
          <Route path="/admin-add" element={<Admin_Add/>}/>
          <Route path="/admin-edit/:index" element={<Admin_Edit/>}/>
          <Route path="/admin-settings" element={<Admin_Settings/>}/>
          <Route path="/doctor-home" element={<Doctor_Home/>}/>
          <Route path="/doctor-add" element={<Doctor_Add/>}/>
          <Route path="/doctor-edit/:index" element={<Doctor_Edit/>}/>
          <Route path="/doctor-settings" element={<Doctor_Settings/>}/>
          <Route path="/patient-settings" element={<Patient_Settings/>}/>
          <Route path="/patient-home" element={<Patient_Home/>}/>
          <Route path="/patient-departments" element={<Patient_Departments/>}/>
          <Route path="/patient-doctors/:department" element={<Patient_Doctors/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
