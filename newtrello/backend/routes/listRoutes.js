const express = require('express');
const listController = require('../controllers/listController');
const router = new express.Router();

router.delete('/deleteAll', listController.deleteAllLists);
router.post('/', listController.createList);
router.get('/all', listController.getAllLists); // This route is for fetching all lists
router.get('/board/:boardId', listController.getListsByBoardId);
router.patch('/:id', listController.updateList);
router.delete('/:id', listController.deleteList);

module.exports = router;
