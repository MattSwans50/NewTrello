import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import the Navbar component
import Boards from './components/Boards';
import Login from './components/Login';
import HomePage from './components/HomePage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/boards" element={<Boards />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
