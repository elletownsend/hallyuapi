const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
var fs = require('fs');

const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// NOTE - run 'nodemon server' to start server

app.get('/', function (req, res) {
    res.send('Hello World!')
});

// GET .../API/GROUPS
app.get('/api/groups', function (req, res) {
    let response = [];

    var data = fs.readFileSync('../data/all_groups.json', 'utf8');
    response = JSON.parse(data);

    res.json(response);
});

// GET .../API/GROUPS/:ID (?)
app.get('/api/groups/:id', function (req, res) {
    let response = [];

    var data = fs.readFileSync('../data/all_groups.json', 'utf8');

    let id = req.params.id;
    data = JSON.parse(data);

    response = data.find(item => item.Id == id);

    if (response) {
        res.json(response);
    } else {
        res.sendStatus(404);
    }
});

// GET .../API/PEOPLE
app.get('/api/people', function (req, res) {
    let response = [];

    var data = fs.readFileSync('../data/all_people.json', 'utf8');

    response = JSON.parse(data);

    res.json(response);
});

// GET .../API/PEOPLE/:ID
app.get('/api/people/:id', function (req, res) {
    let response = [];

    var data = fs.readFileSync('../data/all_people.json', 'utf8');

    let id = req.params.id;
    data = JSON.parse(data);

    response = data.find(item => item.Id == id);

    if (response) {
        res.json(response);
    } else {
        res.sendStatus(404);
    }

});

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});

