import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    gmail: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const sendRequest = async () => {
    return await axios
      .post("http://localhost:5000/login", {
        name: user.name,
        gmail: user.gmail,
        password: user.password,
      })
      .then((res) => res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.name && !user.gmail && !user.password) {
      alert("Please enter Username OR Gmail OR Password");
      return;
    }

    try {
      const data = await sendRequest();

      if (data.status === "ok") {
        alert("Login Successful");
        navigate("/user");
      } else if (data.err) {
        alert(data.err);
      } else if (data.status === "incorrect password") {
        alert("Incorrect Password");
      } else {
        alert("Login Failed");
      }
    } catch (err) {
      alert("Server Error: " + err.message);
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h1>User Login</h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <label>
          Username:
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleInputChange}
            placeholder="Enter your username"
            style={inputStyle}
          />
        </label>

        <label>
          Gmail:
          <input
            type="email"
            name="gmail"
            value={user.gmail}
            onChange={handleInputChange}
            placeholder="Enter your gmail"
            style={inputStyle}
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            style={inputStyle}
          />
        </label>

        <button type="submit" style={buttonStyle}>
          Login
        </button>

        <p style={{ color: "gray", fontSize: "12px" }}>
          *You can log in using Username OR Gmail OR Password*
        </p>
      </form>
    </div>
  );
}

const inputStyle = {
  padding: "8px",
  marginTop: "5px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  padding: "10px",
  borderRadius: "5px",
  border: "none",
  backgroundColor: "#007bff",
  color: "#fff",
  cursor: "pointer",
};

export default Login;