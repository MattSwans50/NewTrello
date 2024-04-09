const Board = require('../models/board'); // Assuming you have a Board model

// Get all boards
exports.getAllBoards = async (req, res) => {
  try {
    const boards = await Board.find(); // Fetch all boards
    res.status(200).json(boards);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Get a single board by ID
exports.getBoardById = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id)
      .populate('listsOrder') // Populate the entire list documents
      .exec(); // Execute the query

    if (!board) {
      return res.status(404).send('Board not found');
    }

    res.status(200).json(board);
  } catch (error) {
    res.status(500).send(error.message);
  }
};



// Create a new board
exports.createBoard = async (req, res) => {
  const board = new Board(req.body);
  try {
    await board.save();
    res.status(201).send(board);
  } catch (error) {
    console.error("Error creating board:", error.message); // Log the error message
    res.status(400).send({ message: error.message, ...error }); // Send back detailed error
  }
};
exports.updateListsOrder = async (req, res) => {
  const { boardId } = req.params;
  const { newListOrder } = req.body;

  try {
      const board = await Board.findById(boardId);
      if (!board) {
          return res.status(404).send('Board not found');
      }

      board.listsOrder = newListOrder;
      await board.save();
      res.status(200).send(board);
  } catch (error) {
      res.status(500).send(error.message);
  }
};
// Update a board
exports.updateBoard = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['title', 'description']; // Allowable fields for update
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const board = await Board.findById(req.params.id);

    if (!board) {
      return res.status(404).send();
    }

    updates.forEach((update) => board[update] = req.body[update]);
    await board.save();
    res.send(board);
  } catch (error) {
    res.status(400).send(error);
  }
};

// In boardController.js
exports.deleteBoard = async (req, res) => {
  try {
      const board = await Board.findByIdAndDelete(req.params.id);
      if (!board) {
          return res.status(404).send('Board not found');
      }
      // Optionally, delete related lists and cards here as well
      res.status(200).send(`Board deleted successfully`);
  } catch (error) {
      res.status(500).send(error.message);
  }
};

// Delete all boards
exports.deleteAllBoards = async (req, res) => {
  try {
    await Board.deleteMany({}); // Deletes all documents in the Board collection
    res.status(200).send('All boards deleted successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
};
