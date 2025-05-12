import React from 'react';
import { Routes, Route } from "react-router-dom";
import Scroll from './pages/Scroll';
import HomeNav from './layout/HomeNav';
import Main from './pages/Main';
import AuthNav from '../src/layout/AuthNav';
import Gallery from './pages/Gallery';
import Support from './pages/Support';
import Register from './pages/Register';
import End from './pages/End';
import Login from './pages/Login';
import { useState, useEffect } from 'react';
import axios from 'axios';




function App() {
  const [username , setUsername ] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect (() => {
    const checkLoggedInUser = async () => {
      try 
      {
        const token = localStorage.getItem("accessToken");
        if (token)
        {
          const config = {
            headers : {
              "Authorization" : `Bearer ${token}`
            }
          };
          const response = await axios.get("http://localhost:8000/api/user/info/", config);
          setLoggedIn(true);
          setUsername(response.data.username)
        }

        else 
        {
          setLoggedIn(false);
          setUsername("");
        }
      }
      catch (error) {
        setLoggedIn(false);
        setUsername("");
      }
    };
    checkLoggedInUser();
  }, [])
  
  return (
    <>
      <Scroll />
      {isLoggedIn ? (
        <AuthNav username = {username} />
      ) :
       (  <HomeNav />)}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/support" element={<Support />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <End />
    </>
  );
}

export default App;
