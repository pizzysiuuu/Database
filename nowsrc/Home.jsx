import React, { useEffect, useState } from "react";
import "./Home.css"

var flag=0;
const Home = () => {
  const [doctorsc, setDoctors] = useState([]);  // 初始化為空陣列
  const [ID, setID] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [contact_number, setNumber] = useState("");
  const [Email, setEmail] = useState("");  // 修正 Email 為小寫
  const [password, setPassword] = useState("");
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [filteredDoctors, setFilteredDoctors] = useState([]); // 篩選後的醫生列表
  const [searchTerm, setSearchTerm] = useState(""); // 搜索框輸入內容

  // 獲取所有醫生資料
  const fetchDoctors = async () => {
    try {
      const response = await fetch("http://localhost:3000/doctors");
      const data = await response.json();
      setDoctors(data); // 更新 doctorsc
    } catch (error) {
      console.error("Failed to fetch doctors:", error);
    }
  };

  // 新增醫生資料
  const addDoctor = async () => {
    if (!ID.trim().length && !name.trim().length && !gender.trim().length && !contact_number.trim().length && !Email.trim().length && !password.trim().length) {
      alert("請填寫所有欄位！");
      return;
    }
    try {
      console.log(Email);
      await fetch("http://localhost:3000/doctors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ID,name,gender,contact_number,Email,password,
        }),
      });
      fetchDoctors(); // 更新醫生列表
    } catch (error) {
      console.error("Error adding doctor:", error);
    }
  };

  // 編輯醫生資料
  const editDoctor = async () => {
    try {
      await fetch(`http://localhost:3000/doctors/${editingDoctor.ID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ID,name, gender, contact_number, Email, password }),
      });
      setEditingDoctor(null); // 退出編輯模式
      fetchDoctors(); // 刷新醫生列表
    } catch (error) {
      console.error("Failed to edit doctor:", error);
    }
  };


  // 刪除醫生資料
  const deleteDoctor = async (id) => {
    await fetch(`http://localhost:3000/doctors/${id}`, {
      method: "DELETE",
    });
    fetchDoctors(); // 刷新列表
  };


  useEffect(() => {
    fetchDoctors();  // 頁面載入時獲取醫生資料
  }, []);

  const handleSearch = (e) => {
    flag=1;
    const term = e.target.value;
    setSearchTerm(term);
    //console.log(searchTerm);
    //console.log(term);
    const filtered = doctorsc.filter((doctor) => {
      if (!term) return true;
      //console.log(doctor.NAME);
      return doctor.NAME?.includes(term);
    });
    //console.log(doctor.name);
    //console.log(filtered);
    setFilteredDoctors(filtered);
  };

  

  //console.log(doctorsc)
  return (
    <div className="container">
      <h2>在院醫生</h2>
      {/* 搜索框 */}
      <input
        type="text"
        placeholder="搜尋醫生姓名"
        value={searchTerm}
        onChange={handleSearch}
        />


      {filteredDoctors.length !== 0 ? (
        //<p>以下為符合之醫生</p>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>姓名</th>
              <th>性別</th>
              <th>電話</th>
              <th>電子郵件</th>
              <th>密碼</th>
            </tr>
          </thead>
        <tbody>{/* 使用 index 作為 key，或者使用唯一的 id */}
        {filteredDoctors.map((doctor) => (
            <tr key={doctor.ID}>
              <td>{doctor.ID}</td>
              <td>{doctor.NAME}</td>
              <td>{doctor.GENDER}</td>
              <td>{doctor.CONTACT_NUMBER}</td>
              <td>{doctor.Email}</td>
              <td>{doctor.PASSWORD}</td>
            </tr>
          ))}
        </tbody>
      </table>
      ) : (
      <div className="doctor-list">
        {doctorsc.length === 0 ? (
          <td colSpan="6">目前沒有住院醫生</td>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>姓名</th>
                <th>性別</th>
                <th>電話</th>
                <th>電子郵件</th>
                <th>密碼</th>
                <th>反悔</th>
                <th>不要拉</th>
              </tr>
            </thead>
            <tbody>{/* 使用 index 作為 key，或者使用唯一的 id */}
            {doctorsc.map((doctor,index) => (
                <tr key={index}>
                  <td>{doctor.ID}</td>
                  <td>{doctor.NAME}</td>
                  <td>{doctor.GENDER}</td>
                  <td>{doctor.CONTACT_NUMBER}</td>
                  <td>{doctor.Email}</td>
                  <td>{doctor.PASSWORD}</td>
                  <td>
                    <button onClick={() => setEditingDoctor(doctor)}>編輯</button>
                  </td>
                  <button
                      onClick={() => deleteDoctor(doctor.ID)}
                      style={{ color: "red", cursor: "pointer" }}
                    >
                      刪除
                    </button>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {filteredDoctors.length === 0 && flag === 1 ?(
          <td colSpan="6">目前沒有符合條件的醫生資料</td>
        ):null}
      </div>
      )}
      {editingDoctor ? (
        <div>
          <h3>編輯醫生資料</h3>
          <input
            type="text"
            placeholder="ID"
            value={ID}
            onChange={(e) => setID(e.target.value)}
          />
          <input
            type="text"
            placeholder="姓名"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="性別"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
          <input
            type="text"
            placeholder="電話"
            value={contact_number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <input
            type="email"
            placeholder="電子郵件"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="密碼"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={editDoctor}>保存</button>
          <button onClick={() => setEditingDoctor(null)}>取消</button>
        </div>
      ) : (
      
      <div>
        <h3>新增醫生資料</h3>
        <div className="add-doctor-form">
          <input
            type="text"
            placeholder="ID"
            value={ID}
            onChange={(e) => setID(e.target.value)}
          />
          <input
            type="text"
            placeholder="姓名"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="性別"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
          <input
            type="text"
            placeholder="電話"
            value={contact_number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <input
            type="Email"
            placeholder="電子郵件"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="密碼"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={addDoctor}>新增醫生</button>
        </div>
      </div>
      )}
    </div>
  );
};

const styles = {
  dashboard: {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },
  navbar: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  },
  homeButton: {
    marginRight: "10px",
    background: "gray",
    color: "white",
    border: "none",
    padding: "10px",
    cursor: "pointer",
  },
  searchInput: {
    flex: 1,
    padding: "10px",
    marginRight: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  addButton: {
    marginRight: "10px",
    background: "lightblue",
    color: "black",
    border: "none",
    padding: "10px",
    cursor: "pointer",
  },
  dropdown: {
    position: "relative",
  },
  dropdownButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  dropdownMenu: {
    position: "absolute",
    right: 0,
    background: "lightgray",
    border: "1px solid #ccc",
    borderRadius: "4px",
    zIndex: 10,
  },
  dropdownItem: {
    padding: "10px",
    cursor: "pointer",
    borderBottom: "1px solid #ccc",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  doctorCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    background: "#ddd",
    borderRadius: "4px",
  },
  doctorInfo: {
    display: "flex",
    flexDirection: "column",
  },
  options: {
    position: "relative",
  },
  optionsButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  optionsMenu: {
    position: "absolute",
    right: 0,
    background: "lightgray",
    border: "1px solid #ccc",
    borderRadius: "4px",
    zIndex: 10,
  },
  optionItem: {
    padding: "10px",
    cursor: "pointer",
    borderBottom: "1px solid #ccc",
  },
};

export default Home;
