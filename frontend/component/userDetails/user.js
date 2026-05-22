import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";

const URL = "http://localhost:5000/users";

const fetchHandler = async () => {
  try {
    const res = await axios.get(URL);
    return res.data;
  } catch (err) {
    console.log("Fetch error:", err);
    return { users: [] };
  }
};

function Users() {
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  const navigate = useNavigate();

  // Fetch users
  useEffect(() => {
    fetchHandler().then((data) => {
      if (data && data.users) {
        setUsers(data.users);
        setAllUsers(data.users);
      }
    });
  }, []);

  // Delete user
  const deleteHandler = async (id) => {
    try {
      await axios.delete(`${URL}/${id}`);
      alert("User deleted");

      const updatedUsers = users.filter((user) => user._id !== id);
      setUsers(updatedUsers);
      setAllUsers(updatedUsers);
    } catch (err) {
      console.log(err);
    }
  };

  // Search users
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setUsers(allUsers);
      setNoResults(false);
      return;
    }

    const filteredUsers = allUsers.filter((user) => {
      return (
        user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.gmail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.age?.toString().includes(searchQuery) ||
        user.address?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

    setUsers(filteredUsers);
    setNoResults(filteredUsers.length === 0);
  };

  // Download PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Users Report", 20, 20);
    let y = 30;

    users.forEach((user, index) => {
      doc.setFontSize(12);
      doc.text(`User ${index + 1}`, 20, y); y += 8;
      doc.text(`ID: ${index + 1}`, 20, y); y += 8;
      doc.text(`Name: ${user.name}`, 20, y); y += 8;
      doc.text(`Email: ${user.gmail}`, 20, y); y += 8;
      doc.text(`Age: ${user.age}`, 20, y); y += 8;
      doc.text(`Address: ${user.address}`, 20, y); y += 12;
    });

    doc.save("Users_Report.pdf");
  };

  // WhatsApp message
  const handleSendReport = () => {
    const phoneNumber = "+94713670587";
    const message = "select the drug report from here";
    const whatsappUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", background: "#f8f9fa", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", color: "#343a40", marginBottom: "30px" }}>User Details</h1>

      {/* Search Bar */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "30px" }}>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          placeholder="🔍 Search Users by Name, Email, Age or Address"
          style={{
            width: "60%",
            height: "50px",
            fontSize: "18px",
            padding: "10px 20px",
            borderRadius: "25px",
            border: "1px solid #ccc",
            outline: "none",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            transition: "all 0.3s ease",
          }}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          onClick={handleSearch}
          style={{
            marginLeft: "15px",
            padding: "12px 25px",
            fontSize: "16px",
            borderRadius: "12px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            transition: "background 0.3s",
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = "#0056b3"}
          onMouseLeave={(e) => e.target.style.backgroundColor = "#007bff"}
        >
          Search
        </button>
      </div>

      {/* Users List */}
      {noResults ? (
        <p style={{ textAlign: "center", color: "#dc3545", fontWeight: "bold" }}>No Users Found.</p>
      ) : users.length > 0 ? (
        users.map((user, index) => (
          <div key={user._id} style={{
            border: "1px solid #dee2e6",
            margin: "15px auto",
            padding: "20px",
            width: "60%",
            borderRadius: "15px",
            backgroundColor: "#fff",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            transition: "transform 0.3s, box-shadow 0.3s",
          }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)";
            }}
          >
            <p><strong>ID:</strong> {index + 1}</p>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.gmail}</p>
            <p><strong>Age:</strong> {user.age}</p>
            <p><strong>Address:</strong> {user.address}</p>

            <div style={{ marginTop: "15px" }}>
              <button
                onClick={() => navigate(`/update/${user._id}`)}
                style={{
                  marginRight: "10px",
                  padding: "8px 15px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: "#28a745",
                  color: "#fff",
                  cursor: "pointer",
                  transition: "background 0.3s"
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = "#1e7e34"}
                onMouseLeave={(e) => e.target.style.backgroundColor = "#28a745"}
              >
                Update
              </button>

              <button
                onClick={() => deleteHandler(user._id)}
                style={{
                  padding: "8px 15px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  cursor: "pointer",
                  transition: "background 0.3s"
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = "#a71d2a"}
                onMouseLeave={(e) => e.target.style.backgroundColor = "#dc3545"}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p style={{ textAlign: "center", color: "#6c757d" }}>Loading users...</p>
      )}

      {/* PDF & WhatsApp Buttons */}
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button
          onClick={downloadPDF}
          style={{
            padding: "12px 25px",
            marginRight: "15px",
            fontSize: "16px",
            borderRadius: "12px",
            border: "none",
            backgroundColor: "#17a2b8",
            color: "#fff",
            cursor: "pointer",
            transition: "background 0.3s"
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = "#117a8b"}
          onMouseLeave={(e) => e.target.style.backgroundColor = "#17a2b8"}
        >
          Download PDF
        </button>

        <button
          onClick={handleSendReport}
          style={{
            padding: "12px 25px",
            fontSize: "16px",
            borderRadius: "12px",
            border: "none",
            backgroundColor: "#25d366",
            color: "#fff",
            cursor: "pointer",
            transition: "background 0.3s"
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = "#128c7e"}
          onMouseLeave={(e) => e.target.style.backgroundColor = "#25d366"}
        >
          Send WhatsApp Message
        </button>
      </div>
    </div>
  );
}

export default Users;