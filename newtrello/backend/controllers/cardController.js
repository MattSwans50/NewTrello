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
      list: req.body.listId, // Ensure this matches the request body. It was previously `list: req.body.list`.
      // Include other fields as necessary
    });
    
    const savedCard = await newCard.save();

    // Update the list with the new card's ID
    await List.findByIdAndUpdate(
      req.body.listId, // This should match the list ID sent in the request body
      { $push: { cards: savedCard._id } },
      { new: true, useFindAndModify: false }
    );

    res.status(201).json(savedCard);
  } catch (error) {
    console.error("Error creating card:", error);
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
exports.moveCard = async (req, res) => {
  const { cardId, sourceListId, destinationListId, newPosition } = req.body;

  try {
    // Assuming a card model has a listId and position fields
    const card = await Card.findById(cardId);
    if (!card) {
      return res.status(404).send('Card not found');
    }

    // If moving to a different list, update the listId
    if (card.listId !== destinationListId) {
      card.listId = destinationListId;
    }
    // Update the card's position
    card.position = newPosition;

    await card.save();
    res.status(200).send('Card moved successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
};
