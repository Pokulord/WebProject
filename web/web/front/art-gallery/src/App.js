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



// function Get_Pics_list()
// {
//   const API_URL = 'http://127.0.0.1:8000/api/';
//   fetch(API_URL)
//     .then((response) => response.json())
//     .then((data) => console.log(data));
// }

function App() {
  return (
    <>
      <Scroll />
      <AuthNav />
      <HomeNav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/support" element={<Support />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <End />
    </>
  );
}

export default App;
