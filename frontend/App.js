import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './component/Home/home.js';
import Nav from './component/Navigate/nav.js';
import AddUser from './component/addUser/adduser.js';
import UserDetails from './component/userDetails/user.js';
import UserUpdate from './component/Update/updateuser.js';
import Register from './component/Registers/register.js';
import Logins from './component/Login/login.js';
import Contacts from './component/contact/contactUs.js';
import SendPdfs from './component/SendPdf/sendPdf.js';
import ImageDisplay from './component/Image/image.js';

function App() {
  return (
    <div>
        
        <React.Fragment>
          <Nav />
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/mainhome' element={<Home /> }/>
            <Route path='/adduser' element={<AddUser /> }/>
            <Route path='/user' element={<UserDetails /> }/>
            <Route path="/update/:id" element={<UserUpdate />} />
            <Route path='/register' element={<Register /> }/>
            <Route path='/login' element={<Logins /> }/>
            <Route path='/contact' element={<Contacts /> }/>
            <Route path='/pdf' element={<SendPdfs /> }/>
            <Route path='/image' element={<ImageDisplay  /> }/>
          </Routes>
        </React.Fragment>

    </div>
  );
}

export default App;
