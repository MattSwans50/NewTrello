import React, { useState } from "react";
import Card from "./Card";
import "../css/List.css";
import { Draggable, Droppable } from 'react-beautiful-dnd';

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
        body: JSON.stringify({ title: newCardTitle, listId: list._id }), // Ensure this matches the backend's expected fields
      });
      if (response.ok) {
        fetchLists(); // Refresh lists to include the new card
        setNewCardTitle("");
        setShowCreateCardForm(false);
      } else {
        // Handle non-OK responses
        const errorResponse = await response.json();
        console.error("Error creating card:", errorResponse);
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
      <Droppable droppableId={String(list._id)}>
        {(provided) => (
          <div className="cards" ref={provided.innerRef} {...provided.droppableProps}>
            {(list.cards || []).map((card, index) => (
              <Draggable key={card._id} draggableId={String(card._id)} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {/* Ensure fetchLists is passed down here */}
                    <Card card={card} fetchCards={fetchLists} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default List;