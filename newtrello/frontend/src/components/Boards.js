// Boards.js
import React, { useState, useEffect } from "react";
import Board from "./Board";
import CreateBoardForm from "./CreateBoardForm"; // Import your CreateBoardForm component
import "../css/Boards.css"; // Ensure your CSS matches the structure you want

function Boards() {
  // State for managing boards data and selection
  const [boards, setBoards] = useState([]);
  const [selectedBoardId, setSelectedBoardId] = useState(null);
  // State to manage the visibility of the CreateBoardForm
  const [showCreateBoard, setShowCreateBoard] = useState(false);

  useEffect(() => {
    fetchBoards();
  }, []);

  // Function to fetch boards data
  const fetchBoards = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/boards/all");
      const data = await response.json();
      const sortedBoards = data.sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );
      setBoards(sortedBoards);
    } catch (error) {
      console.error("Error fetching boards:", error);
    }
  };
  useEffect(() => {
    fetchBoards();
  }, []);

  // Function to handle the successful creation of a board
  const handleCreateBoardSuccess = () => {
    fetchBoards(); // Refresh the list of boards
    setShowCreateBoard(false); // Hide the create board form
  };

  return (
    <div className="boards-container">
      <div className="board-buttons-section">
        {boards.map((board) => (
          <button
            key={board._id}
            onClick={() => setSelectedBoardId(board._id)}
            style={{
              backgroundColor:
                selectedBoardId === board._id ? "lightblue" : "lightgray",
            }}
          >
            {board.title}
          </button>
        ))}
      </div>
      <div className="create-board-section">
        <button
          onClick={() => setShowCreateBoard(!showCreateBoard)}
          style={{ backgroundColor: "green", color: "white" }}
        >
          Create Board
        </button>
        {showCreateBoard && (
          <CreateBoardForm onSuccess={handleCreateBoardSuccess} />
        )}
      </div>
      <div className="selected-board-section">
        {selectedBoardId &&
          boards
            .filter((board) => board._id === selectedBoardId)
            .map((board) => (
              <Board
                key={board._id}
                lists={board.listsOrder || []}
                boardId={board._id}
              />
            ))}
      </div>
    </div>
  );
}

export default Boards;
