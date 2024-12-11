import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import './Login.css'

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 清空錯誤訊息
    setErrors({ username: "", password: "" });
    
    let hasError = false;

    // 驗證輸入
    if (!username.trim()) {
      setErrors((prev) => ({ ...prev, username: "使用者名稱不能為空" }));
      hasError = true;
    }
    if (!password.trim()) {
      setErrors((prev) => ({ ...prev, password: "密碼不能為空" }));
      hasError = true;
    }
    
    if (!hasError) {
      alert(`登入成功！\n使用者名稱: ${username}`);
      navigate("/Home");
      // 在此處執行後端 API 請求
    }
  };

  return (

    <div style={styles.container}>
      <h2 style={styles.title}>登入</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="username">
            使用者名稱
          </label>
          <input
            style={styles.input}
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="請輸入您的使用者名稱"
          />
          {errors.username && <div style={styles.error}>{errors.username}</div>}
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="password">
            密碼
          </label>
          <input
            style={styles.input}
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="請輸入您的密碼"
          />
          {errors.password && <div style={styles.error}>{errors.password}</div>}
        </div>
        <labelr style={styles.labelr}>
          <a href="http://localhost:5173/SignUp">註冊</a>
        </labelr>
        <button style={styles.button} type="submit">
          登入
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "bold",
  },
  labelr: {
    align_content: "flex-end",
    flex: "10px",
    marginBottom: "5px",
    fontWeight: "bold",

  },
  input: {
    width: "90%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "0.9em",
    marginTop: "5px",
  },
  SignUp: {
    textAlign: "right",
    marginBottom: "5px",
  }
};

export default Login;
