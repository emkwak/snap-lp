const mongoose = require('mongoose');
const db = require('../index.js');


const AlbumSchema = new mongoose.Schema({
  id: Number,
  style: [String],
  title: String,
  cover_image: String,
  master_url: String,
  year: String,
  genre: [String]
})

const Album = mongoose.model('Album', AlbumSchema);

let saveAlbum = (album) => {
  let newAlbum = new Album({
    id: album.id,
    style: album.style,
    title: album.title,
    cover_image: album.cover_image,
    master_url: album.master_url,
    year: album.year,
    genre: album.genre
  }).save((err, data) => {
    if (err) {
      console.log(`Error: ${err}`);
    } else {
      console.log('Album saved!');
    }
  })
}

module.exports = { Album, saveAlbum };