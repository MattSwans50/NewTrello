// File: /backend/controllers/listController.js
const List = require('../models/list');
const Board = require('../models/board');


// Get all lists for a board

exports.getListsByBoardId = async (req, res) => {
  try {
    const lists = await List.find({ boardId: req.params.boardId })
      .populate({
        path: 'cards',
        select: 'title description list assignees labels dueDate createdAt updatedAt' // Explicitly specify fields to populate
      });
      console.log(JSON.stringify(lists, null, 2));
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Get a single list by ID
exports.getListById = async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    if (!list) {
      return res.status(404).send('List not found');
    }
    res.status(200).json(list);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
// Get all lists
exports.getAllLists = async (req, res) => {
  try {
    const lists = await List.find({});
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Create a new list
exports.createList = async (req, res) => {
  try {
    const newList = new List({
      title: req.body.title,
      boardId: req.body.boardId,
      cards: req.body.cards || [],
    });
    const savedList = await newList.save();

    // Verify the board exists before updating
    const board = await Board.findById(req.body.boardId);
    if (!board) {
      // Handle the case where the board doesn't exist
      console.error("Board not found with id:", req.body.boardId);
      return res.status(404).send("Board not found");
    }

    // Update the board's listsOrder array
    board.listsOrder.push(savedList._id); // Add the new list's ID to the array
    await board.save();

    res.status(201).json(savedList);
  } catch (error) {
    console.error("Error creating list:", error);
    res.status(500).send(error.message);
  }
};




// Update a list
exports.updateList = async (req, res) => {
  try {
    const updatedList = await List.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedList) {
      return res.status(404).send('List not found');
    }
    res.status(200).json(updatedList);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Delete a list
exports.deleteList = async (req, res) => {
  try {
    const list = await List.findByIdAndDelete(req.params.id);
    if (!list) {
      return res.status(404).send('List not found');
    }
    res.status(200).send(`Successfully deleted list with id ${req.params.id}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
// Delete all lists
exports.deleteAllLists = async (req, res) => {
  try {
    await List.deleteMany({}); // Deletes all documents in the List collection
    res.status(200).send('All lists deleted successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
};
