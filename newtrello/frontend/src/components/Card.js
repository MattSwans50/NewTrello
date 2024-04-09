import React from 'react';
import '../css/Card.css'; // Assuming you'll add CSS for styling

// Card.js
function Card({ card, fetchCards }) { // Ensure fetchCards is passed down or managed accordingly
  const deleteCard = async () => {
      if (window.confirm('Are you sure you want to delete this card?')) {
          const response = await fetch(`http://localhost:5000/api/cards/${card._id}`, {
              method: 'DELETE',
          });
          if (response.ok) {
              fetchCards(); // This would be a function to refresh the cards in the list
          }
      }
  };

  return (
      <div className="card">
          <p>{card.title}</p>
          <button onClick={deleteCard}>Delete Card</button>
      </div>
  );
}


export default Card;
