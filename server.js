const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // Middleware for parsing JSON and URL-encoded data
const cors = require('cors');
app.use(cors());


// Import routes
const emailRoutes = require('./routes/emailRoutes');

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Use routes
app.use('/api', emailRoutes); // Prefix all routes in emailRoutes with /api

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
