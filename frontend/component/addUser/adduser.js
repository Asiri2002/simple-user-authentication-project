import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './adduser.css';
import axios from 'axios';

function AddUser() {
    const navigate = useNavigate(); // for redirect after submit
    const [inputs, setInputs] = useState({
        name: "",
        gmail: "",
        address: "",
        age: "",
    });

    // Handle input changes
    const handleChange = (e)=>{
        setInputs((prevState)=> ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    //click the submit and handle
   const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => navigate('/user')); // use navigate here
};
    const sendRequest = async()=>{
        await axios.post("http://localhost:5000/users",{
            name: String(inputs.name),
            gmail: String(inputs.gmail),
            address: String(inputs.address),
            age: Number(inputs.age),
        }).then(res => res.data);
    }

    return (
        <div style={{ padding: "20px", fontFamily: "Arial" }}>
            <h2>Add User</h2>
            <form onSubmit={handleSubmit}>
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
                <div>
                    <label>Gmail:</label><br />
                    <input
                        type="email"
                        name="gmail"
                        value={inputs.gmail}
                        onChange={handleChange}
                        placeholder="Enter gmail"
                        required
                    />
                </div>
                <br />
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
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddUser;