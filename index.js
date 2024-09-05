// index.js

const express = require('express');  // Import express
const app = express();               // Create an express app
const emailRoutes = require('./routes/emailRoutes');  // Import the email routes

// Middleware to parse JSON request bodies
app.use(express.json());  // Important to parse incoming JSON requests

// Use the email routes; this will handle requests to /api/send-email
app.use('/api', emailRoutes);  // '/api/send-email' will use the sendEmail function

// Set up the server to listen on a specific port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
