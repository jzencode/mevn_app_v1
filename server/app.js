// imports
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// middleware
app.use(express.static(path.join(__dirname, '/uploads')));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('uploads'));
app.set('uploads', path.join(__dirname, 'uploads'));

// database connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((error) => {
    console.log('MONGODB ERROR FOUND!');
    console.log(error);
  });

// routes prefix
app.use('/api/product', require('./routes/routes'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/dist/'));
  app.get('*', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
  });
}

// start server / port listen
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
