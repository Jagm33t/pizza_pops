const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');  // Adjust the path as needed

const app = express();
app.use(cors());
app.use(bodyParser.json());  // Middleware to parse JSON bodies


app.use('/api', authRoutes);

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
