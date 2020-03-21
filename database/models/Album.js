const mongoose = require('mongoose');
const db = require('../index.js');


const AlbumSchema = new mongoose.Schema({
  id: Number,
  style: [String],
  title: String,
  cover_image: String,
  master_url: String,
  year: String,
  genre: [String],
  tracklist: []
})

const Album = mongoose.model('Album', AlbumSchema);

module.exports = Album