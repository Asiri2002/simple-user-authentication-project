import React from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Users(props) {

  if(!props.user){
    return <h3>Loading user...</h3>
  }

  const { _id, name, gmail, age, address } = props.user;

  const history = useNavigate();

  const deleteHandler = async () => {
  try {
    await axios.delete(`http://localhost:5000/users/${_id}`);
    history("/user"); // only once
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div>
        <h2>User Display</h2>
        <h3>ID: {_id}</h3>
        <h3>Name: {name}</h3>
        <h3>Gmail: {gmail}</h3>
        <h3>Address: {address}</h3>
        <h3>Age: {age}</h3>
        <Link to={`/update/${_id}`}>
          <button>Update</button>
        </Link>
        <button onClick={deleteHandler}>Delete</button>
        <br/>
        <br/>
    </div>
  );
}

export default Users;
