// Import the Express module
const express = require('express');

// Initialize the Express app
const app = express();

// Define a port
const PORT = 3000;

// Middleware to log each request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Route for the home page
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Route for an about page
app.get('/about', (req, res) => {
  res.send('This is the About page!');
});

app.get('/yuraj', (req, res) => {
    res.send('this side !');
  });

// Route to handle 404 errors (not found)
app.use((req, res) => {
  res.status(404).send('404: Page Not Found');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
