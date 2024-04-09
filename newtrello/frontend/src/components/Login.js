import React, { useState } from 'react';
import '../css/Login.css';


function Login() {
  // State for username and password inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // State to check if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submit action
    // Simulate login check (this should be replaced with actual backend authentication)
    if (username === 'test' && password === 'testpassword') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials'); // Simple feedback for invalid login
    }
  };

  // If the user is logged in, show a simple welcome message
  if (isLoggedIn) {
    return <div>Welcome, {username}!</div>;
  }

  // Login form UI
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
