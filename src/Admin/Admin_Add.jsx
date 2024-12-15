import React from 'react';
import { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Admin_Add.css';

const Admin_Add = () => {
    const [departments, setDepartments] = useState([]);
    const [form, setForm] = useState({
        doctorName: "",
        doctorPicture: null,
        department: "",
        contactnumber: "",
        email: "",
        password: ""
      });

    const navigate = useNavigate();
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    };

    useEffect(() => {
      fetch("http://localhost:3001/api/fetch-departments")
        .then((response) => response.json())
        .then((data) => {
          setDepartments(data);
        })
        .catch((error) => {
          console.error("Error fetching departments:", error);
        });
    }, []);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(); // Use FormData to handle files
        formData.append("d_name", form.doctorName);
        if (form.doctorPicture) {
            formData.append("doctorPicture", form.doctorPicture);
        }
        formData.append("d_department", form.department);
        formData.append("d_num", form.contactnumber);
        formData.append("d_email", form.email);
        formData.append("d_pass", form.password);
      fetch("http://localhost:3001/api/add-doctor", {
        method: "POST",
        body: formData,
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.d_ID) {
          window.alert("Doctor added successfully, doctor ID: " + data.d_ID);
        } else {
          window.alert("Error: No doctor ID received");
        }
        navigate("/admin-home");
      })
      .catch((error) => {
        console.error("Error adding doctor:", error);
        window.alert("Error adding doctor");
      });
    };
    
    return (
      <>
      <div className='header'>
        <Link to="/admin-home" className='doc-home'>Home</Link>
        <span>Add Doctor</span>
      </div>
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <div className='label'>
            <label>Doctor Name</label>
            <input
              type="text"
              name="doctorName"
              value={form.doctorName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="label">
              <label>Doctor Picture</label>
              <input
                  type="file"
                  name="doctorPicture"
                  accept="image/*"
                  onChange={(e) => setForm({ ...form, doctorPicture: e.target.files[0] })}
                  required
              />
          </div>
          <div className="label">
            <label>Department</label>
              <select
                id="department"
                value={form.department}
                onChange={(e) => setForm({ ...form, department: e.target.value })}
                required
              >
                <option value="">Select Department</option>
                {departments.map((department) => (
                  <option key={department.dpt_ID} value={department.dpt_name}>
                    {department.dpt_name}
                  </option>
                ))}
              </select>
          </div>
          <div className='label'>
            <label>Contact Number</label>
            <input
              type="text"
              name="contactnumber"
              value={form.contactnumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className='label'>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className='label'>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className='save-btn'>
            Save
          </button>
        </form>
      </div>
      </>
    );
};

export default Admin_Add;