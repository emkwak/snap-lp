const express = require('express');
const app = express();
const port = 7000
require('dotenv').config()

var Discogs = require('disconnect').Client;

var db = new Discogs({ userToken: process.env.TOKEN }).database();

db.search('title=nirvana - nevermind')
  .then(function (data) {
    console.log(data)
  })
  .catch(err => err)

app.use(express.static('public'));

app.listen(port, () =>
  console.log(`Listening on port ${port}`)
);
