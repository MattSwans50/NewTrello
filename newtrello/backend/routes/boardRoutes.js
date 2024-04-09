const express = require('express');
// const Board = require('../models/board'); // This line is no longer needed here
const boardController = require('../controllers/boardController');
const router = new express.Router();

// Fetch all boards
router.get('/all', boardController.getAllBoards);

// Delete all boards
router.delete('/deleteAll', boardController.deleteAllBoards);

// Fetch a single board by ID
router.get('/:id', boardController.getBoardById);

router.post('/boards/:boardId/lists/order', boardController.updateListsOrder);

// Create a new board - Updated to use the controller
router.post('/', boardController.createBoard); // Assume you add a createBoard method in the controller

// Update a board - Updated to use the controller
router.patch('/:id', boardController.updateBoard); // Assume you add an updateBoard method in the controller

// Delete a board - Updated to use the controller
router.delete('/:id', boardController.deleteBoard); // Assume you add a deleteBoard method in the controller

module.exports = router;
