import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../addUser/adduser.css';

function UpdateUser() {
  const [inputs, setInputs] = useState({
    name: "",
    gmail: "",
    address: "",
    age: ""
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch user by ID
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/users/${id}`);

        console.log("Fetched Data:", res.data);

        // Handle both formats
        const userData = res.data?.user ? res.data.user : res.data;

        console.log("Processed User:", userData);

        setInputs({
          name: userData?.name ?? "",
          gmail: userData?.gmail ?? "",
          address: userData?.address ?? "",
          age: userData?.age ?? "",
        });

        setLoading(false);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch user data");
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  // Debug state
  useEffect(() => {
    console.log("Updated Inputs:", inputs);
  }, [inputs]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update user
  const sendRequest = async () => {
    try {
      await axios.put(`http://localhost:5000/users/${id}`, {
        name: inputs.name,
        gmail: inputs.gmail,
        address: inputs.address,
        age: Number(inputs.age),
      });

      alert("User updated successfully!");
      navigate('/user');
    } catch (err) {
      console.log(err);
      alert("Update failed");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest();
  };

  // Loading / Error
  if (loading) return <h3>Loading user data...</h3>;
  if (error) return <h3 style={{ color: "red" }}>{error}</h3>;

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h2>Update User</h2>
      <p><strong>User ID:</strong> {id}</p>

      <form onSubmit={handleSubmit}>

        {/* NAME */}
        <div>
          <label>Name:</label><br />
          <input
            type="text"
            name="name"
            value={inputs.name}
            onChange={handleChange}
            placeholder="Enter name"
            required
          />
        </div>

        <br />

        {/* EMAIL (gmail) */}
        <div>
          <label>Email:</label><br />
          <input
            type="email"
            name="gmail"
            value={inputs.gmail}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
        </div>

        <br />

        {/* ADDRESS */}
        <div>
          <label>Address:</label><br />
          <input
            type="text"
            name="address"
            value={inputs.address}
            onChange={handleChange}
            placeholder="Enter address"
            required
          />
        </div>

        <br />

        {/* AGE */}
        <div>
          <label>Age:</label><br />
          <input
            type="number"
            name="age"
            value={inputs.age}
            onChange={handleChange}
            placeholder="Enter age"
            required
          />
        </div>

        <br />

        <button
          type="submit"
          style={{
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer"
          }}
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default UpdateUser;
