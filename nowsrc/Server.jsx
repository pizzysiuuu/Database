import useState from "react";
import mysql from "mysql2";
import cors from "cors";
import express from "express";

const app = express();
app.use(cors());
app.use(express.json());


const Server = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "0970779206",
    port: 3306,
    database: "doctors",
});

Server.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL database.");
    }
});

// 取得所有醫生資料 id,name,gender,number,mail,password
app.get("/doctors", (req, res) => {
    Server.query("SELECT * FROM doctors", (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

// 新增醫生資料
app.post("/doctors", (req, res) => {
    console.log(req.body);
    if (!req.body) {
        return res.status(400).send("Request body is missing");
    }
    const {ID, name, gender, contact_number, Email, password } = req.body; // 從前端獲取資料
    const query = "INSERT INTO doctors (ID, name, gender, contact_number, email, password) VALUES (?, ?, ?, ?, ?, ?)";
    
    Server.query(query, [ID, name, gender, contact_number, Email, password], (err, rees) => {
      if (err) {
        console.error("Error inserting doctor:", err); // 如果有錯誤，回傳錯誤訊息
      } else {
        // 回傳插入成功後的結果
        res.status(201).json({ message: "Doctor added successfully." });
      }
    });
});

app.put("/doctors/:id", (req, res) => {
  const doctorID = req.params.id;
  const { ID,name, gender, contact_number, Email, password } = req.body;
  console.log(req.body,doctorID);
  const query = "UPDATE doctors SET ID = ?, name = ?, gender = ?, contact_number = ?, Email = ?, password = ? WHERE ID = ?";
  Server.query(query, [ID,name, gender, contact_number, Email, password, doctorID], (err, results) => {
    if (err) {
      console.error("Error updating doctor:", err);
      res.status(500).send("Failed to update doctor.");
    } else {
      res.status(200).json({ message: "Doctor updated successfully." });
    }
  });
});

app.delete("/doctors/:id", (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM doctors WHERE ID = ?";
  Server.query(query, [id], (err, results) => {
      if (err) {
          console.error("Error deleting doctor:", err);
          return res.status(500).send("Failed to delete doctor.");
      }

      if (results.affectedRows === 0) {
          return res.status(404).send("Doctor not found.");
      }

      res.status(200).json({ message: "Doctor deleted successfully." });
  });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000.");
});