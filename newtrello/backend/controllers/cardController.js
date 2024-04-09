// File: /backend/controllers/cardController.js
const Card = require('../models/card');
const List = require('../models/list');


// Get all cards for a list
exports.getCardsByListId = async (req, res) => {
  try {
    const cards = await Card.find({ list: req.params.listId });
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Get a single card by ID
exports.getCardById = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).send('Card not found');
    }
    res.status(200).json(card);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Create a new card
exports.createCard = async (req, res) => {
  try {
    const newCard = new Card({
      title: req.body.title,
      description: req.body.description,
      list: req.body.list, // Assuming this is the ObjectId of the list
      assignees: req.body.assignees || [],
      labels: req.body.labels || [],
      dueDate: req.body.dueDate,
    });
    
    // Save the new Card document in the Cards collection
    const savedCard = await newCard.save();

    // Now, find the corresponding List document and add the new card's _id to its cards array
    await List.findByIdAndUpdate(
      savedCard.list, // ObjectId of the list to which this card belongs
      { $push: { cards: savedCard._id } }, // Add the new card's _id to the list's cards array
      { new: true, useFindAndModify: false } // Options for findByIdAndUpdate
    );

    // Respond with the saved card
    res.status(201).json(savedCard);
  } catch (error) {
    console.error(error); // Log the error to the console for debugging
    res.status(500).send(error.message);
  }
};

// Update a card
exports.updateCard = async (req, res) => {
  try {
    const updatedCard = await Card.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCard) {
      return res.status(404).send('Card not found');
    }
    res.status(200).json(updatedCard);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Delete a card
exports.deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.id);
    if (!card) {
      return res.status(404).send('Card not found');
    }
    res.status(200).send(`Successfully deleted card with id ${req.params.id}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
// Get all cards
exports.getAllCards = async (req, res) => {
    try {
      const cards = await Card.find({});
      res.status(200).json(cards);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  
// Delete all cards
exports.deleteAllCards = async (req, res) => {
  try {
    await Card.deleteMany({}); // Deletes all documents in the Card collection
    res.status(200).send('All cards deleted successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
};
