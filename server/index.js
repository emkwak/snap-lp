const express = require('express');
const app = express();
const port = 7000;
const db = require('../database/index.js')

const albumRouter = require('./routes/albums.js');

app.use(express.static('public'));

app.use('/albums', albumRouter);

app.listen(port, () =>
  console.log(`Listening on port ${port}`)
);
