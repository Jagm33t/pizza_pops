const express = require('express');
const app = express();
const port = 3001;

app.use(express.json()); // Middleware to parse JSON request bodies

// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to the Node.js backend with Express!');
});

// Example POST route to handle order submissions
app.post('/submit-order', (req, res) => {
    const order = req.body;
    console.log('Order received:', order);
    res.status(200).send('Order placed successfully');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
