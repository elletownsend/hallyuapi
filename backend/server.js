const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
var fs = require('fs');
const path = require('path');

const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// NOTE - run 'nodemon server' to start server (live update) or node server.js

const getData = (type) => {
    switch (type) {
        case 'people':
            data = fs.readFileSync('../data/all_people.json', 'utf8');
            return JSON.parse(data);
            break;
        case 'groups':
            data = fs.readFileSync('../data/all_groups.json', 'utf8');
            return JSON.parse(data);
            break;
    }
};

app.get('/hello', (req, res) => res.send("안녕!"));

// GET .../API/GROUPS
app.get('/api/groups', function (req, res) {
    let response = [];

    response = getData('groups');

    res.json(response);
});

// GET .../API/GROUPS/:ID (?)
app.get('/api/groups/:id', function (req, res) {
    let response = [];

    let id = req.params.id;

    let data = getData('groups');

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

    response = getData('people');

    res.json(response);
});

// GET .../API/PEOPLE/:ID
app.get('/api/people/:id', function (req, res) {
    let response = [];

    let id = req.params.id;

    let data = getData('people');

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

