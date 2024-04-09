const express = require('express');
const cardController = require('../controllers/cardController');
const router = express.Router();

router.delete('/deleteAll', cardController.deleteAllCards);
router.post('/', cardController.createCard);
router.get('/all', cardController.getAllCards); // This route is for fetching all cards, adjust path as needed
router.get('/:listId', cardController.getCardsByListId); // Assuming this is meant to fetch cards for a specific list
router.get('/:id', cardController.getCardById); // Make sure this doesn't conflict with `/:listId`
router.patch('/:id', cardController.updateCard);
router.delete('/:id', cardController.deleteCard);

module.exports = router;
