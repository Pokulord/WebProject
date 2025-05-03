import React from 'react';
import { Routes, Route } from "react-router-dom";
import Scroll from './pages/Scroll';
import HomeNav from './layout/HomeNav';
import Main from './pages/Main';
import Gallery from './pages/Gallery';
import Support from './pages/Support';
import Register from './pages/Register';
import End from './pages/End';

function App() {
  return (
    <>
      <Scroll />
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
