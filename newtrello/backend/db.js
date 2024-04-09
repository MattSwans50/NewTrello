const mongoose = require('mongoose');

// Replace the following with your Atlas connection string
// It's a best practice to use environment variables for sensitive information like your database URI
const dbUri = "mongodb+srv://mattswans:PgYEjurIRyG20Kk0@newtrello.jirpqlg.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Successfully connected to MongoDB Atlas"))
  .catch(err => console.error("MongoDB connection error:", err));

// You don't need to export `dbConnection` anymore since Mongoose handles the connection internally
