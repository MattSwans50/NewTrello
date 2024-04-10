import React, { useState , useEffect , useCallback } from 'react';
import List from './List'; // Adjust the path as necessary based on your project structure
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

function Board({ lists: initialLists = [], boardId }) {
  const [lists, setLists] = useState([]); // Define lists and setLists here
  const [showCreateListForm, setShowCreateListForm] = useState(false);
  const [newListTitle, setNewListTitle] = useState('');

  const handleCreateList = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/lists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newListTitle, boardId: boardId }), // Use the boardId prop
      });
      if (response.ok) {
        const newList = await response.json(); // Assuming the response includes the newly created list
        setLists((prevLists) => [...prevLists, newList]); // Update the lists state
        setShowCreateListForm(false);
        setNewListTitle('');
        await fetchLists(); // Ensure fetchLists is awaited
      }
    } catch (error) {
      console.error('Failed to create list:', error);
    }
  };
  const fetchLists = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/lists/board/${boardId}`);
      if (response.ok) {
        const listsData = await response.json();
        setLists(listsData);
      }
    } catch (error) {
      console.error('Failed to fetch lists:', error);
    }
  }, [boardId]);

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
  
    if (!destination) return;
  
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;
  
    // Example API call to update the backend
    const response = await fetch(`http://localhost:5000/api/cards/move`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cardId: draggableId,
        sourceListId: source.droppableId,
        destinationListId: destination.droppableId,
        newPosition: destination.index,
      }),
    });
  
    if (response.ok) {
      fetchLists(); // Refresh lists to reflect the changes
    }
  };
  useEffect(() => {
    fetchLists();
  }, [fetchLists]);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="board">
        {lists.length > 0 ? (
          lists.map((list, index) => (
            <Droppable key={list._id} droppableId={String(list._id)}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey' }}
                >
                  <List key={list._id} list={list} fetchLists={fetchLists} />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))
        ) : (
          <div>No lists found for this board.</div>
        )}
        <button onClick={() => setShowCreateListForm(!showCreateListForm)}>
          Create List
        </button>
        {showCreateListForm && (
          <form onSubmit={handleCreateList}>
            <input
              type="text"
              value={newListTitle}
              onChange={(e) => setNewListTitle(e.target.value)}
              placeholder="List Title"
              required
            />
            <button type="submit">Add List</button>
          </form>
        )}
      </div>
    </DragDropContext>
  );
}

export default Board;