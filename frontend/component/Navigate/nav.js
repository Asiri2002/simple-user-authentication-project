import React from 'react';
import './nav.css';
import { Link } from 'react-router-dom';


function Nav() {
  return (
    <div>
        <ul className='home-ul'>
            <li className='home-ll'>
                <Link to='/register'className='active home-a'>
                <h1>Register</h1>
                </Link>
            </li>
            <li className='home-ll'>
                <Link to='/login'className='active home-a'>
                <h1>Login</h1>
                </Link>
            </li>
            <li className='home-ll'>
                <Link to='/mainhome'className='active home-a'>
                <h1>Home</h1>
                </Link>
            </li>
            <li className='home-ll'>
                <Link to='/adduser'className='active home-a'>
                <h1>Add User</h1>
                </Link>
            </li>
            <li className='home-ll'>
                <Link to='/user'className='active home-a'>
                <h1>User Details</h1>
                </Link>
            </li>
            <li className='home-ll'>
                <Link to='/contact'className='active home-a'>
                <h1>Contact Us</h1>
                </Link>
            </li>
            <li className='home-ll'>
                <Link to='/pdf'className='active home-a'>
                <h1>Send PDF</h1>
                </Link>
            </li>
            <li className='home-ll'>
                <Link to='/image'className='active home-a'>
                <h1>Image Upload</h1>
                </Link>
            </li>
        </ul>
    </div>
  );
}

export default Nav
