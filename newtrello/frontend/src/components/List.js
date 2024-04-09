import React, { useState } from "react";
import Card from "./Card";
import "../css/List.css";
import { Draggable } from 'react-beautiful-dnd';

function List({ list, fetchLists }) {
  const [showCreateCardForm, setShowCreateCardForm] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState("");

  const handleCreateCard = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/cards`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newCardTitle, list: list._id }),
      });
      if (response.ok) {
        await response.json();
        // Here, you might want to update the local state if managing cards locally,
        // or re-fetch the list's data to include the new card.
        fetchLists(); // For simplicity, just re-fetch all lists to update UI
        setNewCardTitle("");
        setShowCreateCardForm(false);
      }
    } catch (error) {
      console.error("Error creating card:", error);
    }
  };

  const deleteList = async () => {
    if (window.confirm("Are you sure you want to delete this list?")) {
      const response = await fetch(`http://localhost:5000/api/lists/${list._id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchLists(); // Refresh the lists in the parent component
      }
    }
  };

  return (
    <div className="list" style={{ margin: '0 8px', padding: '8px', backgroundColor: '#e2e2e2', borderRadius: '4px' }}>
      <h3>{list.title}</h3>
      <button onClick={() => setShowCreateCardForm(!showCreateCardForm)}>
        Create Card
      </button>
      <button onClick={deleteList}>Delete List</button>
      {showCreateCardForm && (
        <form onSubmit={handleCreateCard}>
          <input
            type="text"
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
            placeholder="Card Title"
            required
          />
          <button type="submit">Add Card</button>
        </form>
      )}
      <div className="cards">
      {(list.cards || []).map((card) => (
          <Card key={card._id} card={card} fetchCards={() => fetchLists()} />
        ))}
      </div>
    </div>
  );
}

export default List;

