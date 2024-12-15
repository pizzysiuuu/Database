import mysql from "mysql2";
import cors from "cors";
import express from "express";
import multer from "multer";

const app = express();
app.use(cors());
app.use(express.json());
const upload = multer();

const Server = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    port: 3306,
    database: "hospital_database",
});

Server.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to the database.");
    }
});

//login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  if (username === "admin") {
    const fetchAdminQuery = 'SELECT d_pass FROM doctors WHERE d_ID = "admin"';
    Server.query(fetchAdminQuery, (err, result) => {
      if (err) {
        console.error("Error fetching admin data:", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (result.length === 0 || result[0].d_pass !== password) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
      return res.status(200).json({ userID: "admin", message: "Login successful" });
    });
  } else if (username.startsWith("d")) {
    const doctorID = username;
    const fetchDoctorQuery = 'SELECT d_pass FROM doctors WHERE d_ID = ?';
    Server.query(fetchDoctorQuery, [doctorID], (err, result) => {
      if (err) {
        console.error("Error fetching doctor data:", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (result.length === 0 || result[0].d_pass !== password) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
      return res.status(200).json({ userID: doctorID, message: "Login successful" });
    });
  } else if (username.startsWith("p")) {
    const patientID = username;
    const fetchPatientQuery = 'SELECT p_pass FROM patients WHERE p_ID = ?';
    Server.query(fetchPatientQuery, [patientID], (err, result) => {
      if (err) {
        console.error("Error fetching patient data:", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (result.length === 0 || result[0].p_pass !== password) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
      return res.status(200).json({ userID: patientID, message: "Login successful" });
    });
  } else {
    return res.status(400).json({ message: "Invalid username format" });
  }
});

//fetch departments
app.get('/api/fetch-departments', (req, res) => {
  const fetchDepartmentQuery = 'SELECT dpt_ID, dpt_name FROM departments';
  Server.query(fetchDepartmentQuery, (err, result) => {
    if (err) {
      console.error("Error fetching departments:", err);
      return res.status(500).json({ message: "Failed to fetch departments" });
    }
    res.status(200).json(result);
  });
});

//admin settings
app.post('/api/admin-settings', (req, res) => {
  const { d_ID, oldPassword, newPassword } = req.body;
  if (!d_ID || !oldPassword || !newPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (oldPassword === newPassword) {
    return res.status(400).json({ message: "Current password and new password cannot be the same" });
  }
  const fetchPasswordQuery = 'SELECT d_pass FROM doctors WHERE d_ID = "admin"';
  Server.query(fetchPasswordQuery, (err, result) => {
    if (err) {
      console.error("Error fetching current password:", err);
      return res.status(500).json({ message: "Error fetching password" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Admin not found" });
    }
    const currentPassword = result[0].d_pass;
    if (oldPassword !== currentPassword) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }
    const updatePasswordQuery = 'UPDATE doctors SET d_pass = ? WHERE d_ID = "admin"';
    Server.query(updatePasswordQuery, [newPassword], (err, result) => {
      if (err) {
        console.error("Error updating password:", err);
        return res.status(500).json({ message: "Error updating password" });
      }
      return res.status(200).json({ message: "Password updated successfully" });
    });
  });
});

//add doctor
app.post('/api/add-doctor', upload.single('doctorPicture'), (req, res) => {
  const { d_name, d_department, d_num, d_email, d_pass } = req.body;
  const doctorPicture = req.file;
  if (!d_name || !d_department || !d_num || !d_email || !d_pass) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const insertDoctorQuery = 'INSERT INTO doctors (d_name, d_department, d_num, d_email, d_pass) VALUES (?, ?, ?, ?, ?)';
  Server.query(insertDoctorQuery, [d_name, d_department, d_num, d_email, d_pass], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).json({ message: "Failed to add doctor" });
    }
    const d_ID = `d${result.insertId}`;
    const updateDIdQuery = `UPDATE doctors SET d_ID = ? WHERE doc = ?`;
    Server.query(updateDIdQuery, [d_ID, result.insertId], (err) => {
      if (err) {
        console.error("Error saving picture:", err);
        return res.status(500).json({ message: "Error saving picture" });
      }
      res.status(200).json({ d_ID });
    });
    const updatePicQuery = `UPDATE doctors SET d_pic = ? WHERE doc = ?`;
    const pictureBuffer = doctorPicture.buffer;
    Server.query(updatePicQuery, [pictureBuffer, result.insertId]);
  });
});

//fetch all doctor
app.get('/api/fetch-all-doctors', (req,res) => {
  const fetchAllDoctorQuery = 'SELECT d_ID, d_name, d_department, d_num, d_email FROM doctors';
  Server.query(fetchAllDoctorQuery, (err,result) => {
    if (err) {
      console.error("Error fetching doctor data:", err);
      return res.status(500).json({ message: "Failed to fetch doctor data" });
    }
    res.status(200).json(result);
  });
});

//fetch doctor by d_id
app.get('/api/fetch-doctor/:doctorId', (req, res) => {
  const doctorId = req.params.doctorId;
  const fetchDoctorQuery = 'SELECT d_ID, d_name, d_department, d_num, d_email FROM doctors WHERE d_ID = ?';
  Server.query(fetchDoctorQuery, [doctorId], (err, result) => {
    if (err) {
      console.error("Error fetching doctor data:", err);
      return res.status(500).json({ message: "Failed to fetch doctor data" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json(result[0]);
  });
});

//edit doctor
app.put("/api/edit-doctor", (req, res) => {
  const { d_ID, d_name, d_pic, d_department, d_num, d_email } = req.body;
  if (!d_ID || !d_name || !d_department || !d_num || !d_email) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }
  if (d_pic){
    const pictureBuffer = Buffer.from(d_pic,"base64");
    const updateDoctorQuery = `UPDATE doctors SET d_name = ?, d_pic = ?, d_department = ?, d_num = ?, d_email = ? WHERE d_ID = ?`;
      Server.query(updateDoctorQuery, [d_name, pictureBuffer, d_department, d_num, d_email, d_ID], (err, result) => {
        if (err) {
          console.error("Error updating doctor data:", err);
          return res.status(500).json({ success: false, message: "Failed to update doctor data." });
        }
        res.json({ success: true, message: "Doctor data updated successfully." });
      });
  }else {
    const updateDoctorQuery = `UPDATE doctors SET d_name = ?, d_department = ?, d_num = ?, d_email = ? WHERE d_ID = ?`;
    Server.query(updateDoctorQuery, [d_name, d_department, d_num, d_email, d_ID], (err, result) => {
      if (err) {
        console.error("Error updating doctor data:", err);
        return res.status(500).json({ success: false, message: "Failed to update doctor data." });
      }
      res.json({ success: true, message: "Doctor data updated successfully." });
    });
  }
});

//delete doctor
app.delete("/api/delete-doctor/:id", (req, res) => {
  const doctorId = req.params.id;
  const deleteDoctorQuery = "DELETE FROM doctors WHERE d_ID = ?";
  Server.query(deleteDoctorQuery, [doctorId], (err, result) => {
    if (err) {
      console.error("Error deleting doctor:", err);
      return res.status(500).json({ success: false, message: "Failed to delete doctor." });
    }
    if (result.affectedRows > 0) {
      res.json({ success: true, message: "Doctor deleted successfully." });
    } else {
      res.status(404).json({ success: false, message: "Doctor not found." });
    }
  });
});

//doctor settings
app.put("/api/doctor-settings", (req, res) => {
  const { d_ID, contactnumber, email, oldPassword, newPassword } = req.body;
  if (!d_ID || !contactnumber || !email) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }
  if ((oldPassword || newPassword) && !(oldPassword && newPassword)) {
    return res.status(400).json({ success: false, message: "Both current and new passwords are required to change password." });
  }
  if (oldPassword && newPassword){
    const verifyPasswordQuery = "SELECT * FROM doctors WHERE d_ID = ? AND d_pass = ?";
    Server.query(verifyPasswordQuery, [d_ID, oldPassword], (err, results) => {
      if (err) {
        console.error("Error verifying old password:", err);
        return res.status(500).json({ success: false, message: "Server error while verifying password." });
      }
      if (results.length === 0) {
        return res.status(400).json({ success: false, message: "Current password is incorrect." });
      }

      const updateDoctorQuery = `UPDATE doctors SET d_num = ?, d_email = ?, d_pass = ? WHERE d_ID = ?`;
      Server.query(updateDoctorQuery, [contactnumber, email, newPassword, d_ID], (err, result) => {
        if (err) {
          console.error("Error updating doctor data:", err);
          return res.status(500).json({ success: false, message: "Failed to update doctor data." });
        }
        res.json({ success: true, message: "Doctor data updated successfully." });
      });
    });
  }else {
    const updateDoctorQuery = `UPDATE doctors SET d_num = ?, d_email = ? WHERE d_ID = ?`;
    Server.query(updateDoctorQuery, [contactnumber, email, d_ID], (err, result) => {
      if (err) {
        console.error("Error updating doctor data:", err);
        return res.status(500).json({ success: false, message: "Failed to update doctor data." });
      }
      res.json({ success: true, message: "Doctor data updated successfully." });
    });
  }
});

//doctor add record of patient
app.post('/api/add-record', (req, res) => {
  const { d_ID, p_ID, date, room, diagnosis, treatment } = req.body;
  if (!d_ID || !p_ID || !date || !room || !diagnosis || !treatment) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const checkPatientQuery = 'SELECT COUNT(*) AS count FROM patients WHERE p_ID = ?';
  Server.query(checkPatientQuery, [p_ID], (err, result) => {
    if (err) {
      console.error("Error checking patient:", err);
      return res.status(500).json({ message: "Error checking patient ID" });
    }
    if (result[0].count === 0) {
      return res.status(400).json({ message: "Patient ID is unidentified" });
    }
    const insertRecordQuery = 'INSERT INTO record (d_ID, p_ID, date, room, diagnosis, treatment) VALUES (?, ?, ?, ?, ?, ?)';
    Server.query(insertRecordQuery, [d_ID, p_ID, date, room, diagnosis, treatment], (err, result) => {
      if (err) {
        console.error("Error inserting data:", err);
        return res.status(500).json({ message: "Failed to add record" });
      }
      res.status(200).json({ message: "Record added successfully" });
    });
  });
});

//add patient --signup
app.post('/api/add-patient', (req, res) => {
  const { p_name, p_gender, p_num, p_email, p_pass } = req.body;
  if (!p_name || !p_gender || !p_num || !p_email || !p_pass) {
    return res.status(400).json({ message: "All fields are required" });
  }
  
  const registerPatientQuery = 'INSERT INTO patients (p_name, p_gender, p_num, p_email, p_pass) VALUES (?, ?, ?, ?, ?)';
  Server.query(registerPatientQuery, [p_name, p_gender, p_num, p_email, p_pass], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).json({ message: "Failed to add patient" });
    }
    const p_ID = `p${result.insertId}`;
    const updatePIdQuery = `UPDATE patients SET p_ID = ? WHERE pat = ?`;
    Server.query(updatePIdQuery, [p_ID, result.insertId], (err) => {
      if (err) {
        console.error("Error updating patientId:", err);
        return res.status(500).send("Error saving patientId");
      }
      res.status(200).json({ p_ID });
    });
  });
});

//fetch patient by p_id
app.get('/api/fetch-patient/:patientId', (req, res) => {
  const patientId = req.params.patientId;
  const fetchPatientQuery = 'SELECT p_ID, p_name, p_gender, p_num, p_email FROM patients WHERE p_ID = ?';
  Server.query(fetchPatientQuery, [patientId], (err, result) => {
    if (err) {
      console.error("Error fetching patient data:", err);
      return res.status(500).json({ message: "Failed to fetch patient data" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(result[0]);
  });
});

//fetch doctors for a specified department
app.get('/api/department-doctors/:department', (req, res) => {
  const department = req.params.department;
  const fetchDoctorsQuery = `
    SELECT d_name, d_pic
    FROM doctors
    JOIN departments ON doctors.d_department = departments.dpt_name
    WHERE departments.dpt_name = ?`;

  Server.query(fetchDoctorsQuery, [department], (err, result) => {
    if (err) {
      console.error("Error fetching doctors:", err);
      return res.status(500).json({ message: "Failed to fetch doctors" });
    }
    const doctorsWithImages = result.map(doctor => {
      const base64Image = doctor.d_pic.toString('base64');
      return {
        name: doctor.d_name,
        image: `data:image/jpeg;base64,${base64Image}`
      };
    });
    res.status(200).json(doctorsWithImages);
  });
});

//patient settings
app.put("/api/patient-settings", (req, res) => {
  const { p_ID, name, gender, contactNumber, email, oldPassword, newPassword } = req.body;
  if (!p_ID || !name || !gender || !contactNumber || !email) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }
  if ((oldPassword || newPassword) && !(oldPassword && newPassword)) {
    return res.status(400).json({ success: false, message: "Both current and new passwords are required to change password." });
  }
  if (oldPassword && newPassword){
    const verifyPasswordQuery = "SELECT * FROM patients WHERE p_ID = ? AND p_pass = ?";
    Server.query(verifyPasswordQuery, [p_ID, oldPassword], (err, results) => {
      if (err) {
        console.error("Error verifying old password:", err);
        return res.status(500).json({ success: false, message: "Server error while verifying password." });
      }
      if (results.length === 0) {
        return res.status(400).json({ success: false, message: "Current password is incorrect." });
      }

      const updatePatientQuery = `UPDATE patients SET p_name =?, p_gender = ?, p_num = ?, p_email = ?, p_pass = ? WHERE p_ID = ?`;
      Server.query(updatePatientQuery, [name, gender, contactNumber, email, newPassword, p_ID], (err, result) => {
        if (err) {
          console.error("Error updating patient data:", err);
          return res.status(500).json({ success: false, message: "Failed to update patient data." });
        }

        res.json({ success: true, message: "Patient data updated successfully." });
      });
    });
  }else {
    const updatePatientQuery = `UPDATE patients SET p_name = ?, p_gender = ?, p_num = ?, p_email = ? WHERE p_ID = ?`;
    Server.query(updatePatientQuery, [name, gender, contactNumber, email, p_ID], (err, result) => {
      if (err) {
        console.error("Error updating patient data:", err);
        return res.status(500).json({ success: false, message: "Failed to update patient data." });
      }
      res.json({ success: true, message: "Patient data updated successfully." });
    });
  }
});

//fetch record
app.get('/api/fetch-record/:caseId',(req,res) => {
  const caseId = req.params.caseId;
  const fetchRecordQuery = "SELECT p_ID, date, room, diagnosis, treatment FROM record WHERE case_ID = ?"
  Server.query(fetchRecordQuery,[caseId], (err, result) => {
    if (err) {
      console.error("Error fetching record:", err);
      return res.status(500).json({ message: "Failed to fetch record" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Record not found" });
    }
    res.status(200).json(result[0]);
  });
});

//edit record
app.put("/api/edit-record", (req, res) => {
  const { p_ID, date, room, diagnosis, treatment, case_ID } = req.body;
  if (!p_ID || !date || !room || !diagnosis || !treatment) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }
  const updateRecordQuery = `UPDATE record SET p_ID = ?, date = ?, room = ?, diagnosis = ?, treatment = ? WHERE case_ID = ?`;
    Server.query(updateRecordQuery, [p_ID, date, room, diagnosis, treatment, case_ID], (err, result) => {
      if (err) {
        console.error("Error updating doctor data:", err);
        return res.status(500).json({ success: false, message: "Failed to update record data." });
      }
      res.json({ success: true, message: "Record data updated successfully." });
    });
});

//fetch record by patient ID
app.get('/api/fetch-precord', (req, res) => {
  const patientId = req.query.patientId;
  const fetchPatientQuery = `
    SELECT 
      record.case_ID, doctors.d_name, record.date, record.room, record.diagnosis, record.treatment 
    FROM 
      record 
    JOIN 
      doctors 
    ON 
      record.d_ID = doctors.d_ID 
    WHERE 
      record.p_ID = ?`;
  Server.query(fetchPatientQuery, [patientId], (err, result) => {
    if (err) {
      console.error("Error fetching patient data:", err);
      return res.status(500).json({ message: "Failed to fetch patient data" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(result);
  });
});

//fetch record by doctor ID
app.get('/api/fetch-drecord', (req, res) => {
  const doctorId = req.query.doctorId;
  const fetchDoctorQuery = `
    SELECT 
      record.case_ID, record.p_ID, patients.p_name, record.date, record.room, record.diagnosis, record.treatment 
    FROM 
      record 
    JOIN 
      patients 
    ON 
      record.p_ID = patients.p_ID 
    WHERE 
      record.d_ID = ?`;
  Server.query(fetchDoctorQuery, [doctorId], (err, result) => {
    if (err) {
      console.error("Error fetching patient data:", err);
      return res.status(500).json({ message: "Failed to fetch patient data" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(result);
  });
});

//delete record
app.delete("/api/delete-record/:id", (req, res) => {
  const caseId = req.params.id;
  const deleteRecordQuery = "DELETE FROM record WHERE case_ID = ?";
  Server.query(deleteRecordQuery, [caseId], (err, result) => {
    if (err) {
      console.error("Error deleting record:", err);
      return res.status(500).json({ success: false, message: "Failed to delete record." });
    }
    if (result.affectedRows > 0) {
      res.json({ success: true, message: "Record deleted successfully." });
    } else {
      res.status(404).json({ success: false, message: "Record not found." });
    }
  });
});

//search doctors
app.get("/api/search-doctors", (req, res) => {
  const { keyword } = req.query;
  if (!keyword) {
    return res.status(400).json({ error: "Keyword is required for search." });
  }
  const searchDoctorsQuery = `SELECT * FROM doctors WHERE d_name LIKE ? OR d_department LIKE ? OR d_num LIKE ? OR d_email LIKE ? OR d_ID LIKE ?`;
  const searchTerm = `%${keyword}%`;
  Server.query(searchDoctorsQuery, [searchTerm, searchTerm, searchTerm, searchTerm, searchTerm], (err, results) => {
    if (err) {
      console.error("Error executing search query:", err.message);
      return res.status(500).json({ error: "Database query failed." });
    }
    res.json(results);
  });
});

//search records
app.get("/api/search-records", (req, res) => {
  const { doctorId, keyword } = req.query;
  if (!keyword) {
    return res.status(400).json({ error: "Keyword is required for search." });
  }
  const searchRecordsQuery = `
    SELECT record.case_ID, record.p_ID, patients.p_name, record.room, record.diagnosis, record.treatment, record.date
    FROM record
    LEFT JOIN patients ON record.p_ID = patients.p_ID
    WHERE record.d_ID = ? AND (
      record.case_ID LIKE ?
      OR record.p_id LIKE ?
      OR patients.p_name LIKE ?
      OR record.room LIKE ?
      OR record.diagnosis LIKE ?
      OR record.treatment LIKE ?
      OR record.date LIKE ?)
  `;
  const searchTerm = `%${keyword}%`;
  Server.query(searchRecordsQuery, [doctorId, searchTerm, searchTerm, searchTerm, searchTerm, searchTerm, searchTerm, searchTerm], (err, results) => {
    if (err) {
      console.error("Error executing search query:", err.message);
      return res.status(500).json({ error: "Database query failed." });
    }
    res.json(results);
  });
});

app.listen(3001, () => {
    console.log("Server is running on port 3001.");
});