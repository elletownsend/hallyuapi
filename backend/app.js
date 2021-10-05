const fs = require('fs');
const express = require('express');

const actorRouter = require('./routes/actorRoutes');
const artistRouter = require('./routes/artistRoutes');
const groupRouter = require('./routes/groupRoutes');

const app = express();

app.use(express.json());

app.use('/api/v1/actors', actorRouter);
app.use('/api/v1/artists', artistRouter);
app.use('/api/v1/groups', groupRouter);

app.get('/api/v1/hello', (req, res) => res.send('안녕!'));

module.exports = app;
