import React from 'react';
import { useState,useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './Admin_Edit.css';

const Admin_Edit = () => {
    const {index} = useParams();
    const [departments, setDepartments] = useState([]);
    const [form, setForm] = useState({
        doctorName: "",
        doctorPicture: null,
        department: "",
        contactnumber: "",
        email: "",
      });
      
    const navigate = useNavigate();

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

    useEffect(() => {
        if (index) {
        fetch(`http://localhost:3001/api/fetch-doctor/${index}`)
            .then((response) => response.json())
            .then((data) => {
              setForm({
                  doctorId: data.d_ID || "",
                  doctorName: data.d_name || "",
                  department: data.d_department || "",
                  contactnumber: data.d_num || "",
                  email: data.d_email || "",
              });
            })
            .catch((error) => {
            console.error("Error fetching doctor data:", error);
            window.alert("Failed to fetch doctor data");
            });
        }
    }, []);
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    };

const handleFileChange = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    setForm((prevForm) => ({
      ...prevForm,
      doctorPicture: reader.result.split(",")[1],
    }));
  };
  if (file) {
    reader.readAsDataURL(file);
  }
};
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const { doctorId, doctorName, doctorPicture, department, contactnumber, email} = form;
      const updateData = {
        d_ID: doctorId,
        d_name: doctorName,
        d_pic: doctorPicture,
        d_department: department,
        d_num: contactnumber,
        d_email: email,
      };
  
      fetch(`http://localhost:3001/api/edit-doctor`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            window.alert("Data saved successfully");
            navigate("/admin-home");
          } else {
            window.alert("Error updating data: " + data.message);
          }
        })
        .catch((error) => {
          console.error("Error updating doctor data:", error);
          window.alert("Failed to update data");
        });
    };
  
    return (
          <>
          <div className='header'>
            <Link to="/admin-home" className='doc-home'>Home</Link>
            <span>Edit Doctor</span>
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
                      onChange={handleFileChange}
                  />
              </div>
              <div className='label'>
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
              <button type="submit" className='save-btn'>
                Save
              </button>
            </form>
          </div>
          </>
        );
};

export default Admin_Edit;