const express = require('express');
const app = require('./app');

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

// NOTE - run 'nodemon server' to start server (live update) or node server.js
const PORT = 3001;
app.listen(PORT, function () {
  console.log('Server is running on Port: ' + PORT);
});
