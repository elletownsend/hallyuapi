const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
var fs = require('fs');
const path = require('path');

const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// Routing
const routes = require('./routes/routes')(app, fs);

// NOTE - run 'nodemon server' to start server (live update) or node server.js

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});

