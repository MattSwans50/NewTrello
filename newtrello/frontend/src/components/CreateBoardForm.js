// CreateBoardForm.js
import React, { useState } from 'react';

function CreateBoardForm({ onSuccess }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement the API call here
    try {
      const response = await fetch('http://localhost:5000/api/boards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });
      if (response.ok) {
        setTitle('');
        setDescription('');
        onSuccess(); // Refresh board list after successful creation
      }
    } catch (error) {
      console.error('Failed to create board:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Confirm Creation</button>
    </form>
  );
}

export default CreateBoardForm;
