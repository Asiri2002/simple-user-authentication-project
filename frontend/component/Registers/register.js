import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const history = useNavigate();

  // Your original "user" state
  const [user, setUser] = useState({
    name: "",
    gmail: "",
    password: "",
  });

  // Handle input change (your version)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  // Send API request
  const sendRequest = async () => {
    return await axios
      .post("http://localhost:5000/register", {
        name: String(user.name),
        gmail: String(user.gmail),
        password: String(user.password),
      })
      .then((res) => res.data);
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    sendRequest()
      .then(() => {
        alert("Register Success");
        history("/login");
      })
      .catch((err) => {
        alert(err.message);
      });
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
      <h1>User Register</h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <label>
          Username:
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleInputChange}
            placeholder="Enter your username"
            required
            style={{
              padding: "8px",
              marginTop: "5px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="gmail"
            value={user.gmail}
            onChange={handleInputChange}
            placeholder="Enter your email"
            required
            style={{
              padding: "8px",
              marginTop: "5px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
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
            required
            style={{
              padding: "8px",
              marginTop: "5px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </label>

        <button
          type="submit"
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#007bff",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;