const express = require('express');
const path = require('path');

const app = express();
const port = 8000;

// Serve static files from the 'web-frontend' directory
app.use(express.static(path.join(__dirname, 'web-frontend')));

// Start the server
app.listen(port, () => {
    console.log(`Frontend is running on port ${port}`);
});