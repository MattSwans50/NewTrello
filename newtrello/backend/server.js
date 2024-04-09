const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const userRoutes = require('./routes/userRoutes');
require('./db');
const boardRoutes = require('./routes/boardRoutes');
const listRoutes = require('./routes/listRoutes');
const cardRoutes = require('./routes/cardRoutes');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/boards', boardRoutes);
app.use('/api/lists', listRoutes);
app.use('/api/cards', cardRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello from NewTrello backend!");
});