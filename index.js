const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
// Connect to Database
connectDB();

app.use(cors());
app.use(express.json({ extended: false }));

// Define Routes
app.use('/', require('./routes/index'));
app.use('/', require('./routes/url'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
