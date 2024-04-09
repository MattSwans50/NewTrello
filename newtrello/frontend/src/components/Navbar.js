import React from 'react';
import '../css/Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ padding: '10px', background: '#f0f0f0' }}>
      <ul style={{ listStyleType: 'none', margin: 0, padding: 0 }}>
        <li style={{ display: 'inline', marginRight: '10px' }}>
          <Link to="/">Home</Link>
        </li>
        <li style={{ display: 'inline', marginRight: '10px' }}>
          <Link to="/boards">Boards</Link>
        </li>
        {/* Placeholder for future authentication links */}
        <li style={{ display: 'inline', marginRight: '10px' }}>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
