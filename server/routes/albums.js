const router = require('express').Router();
require('dotenv').config()

const Album = require('../../database/models/Album.js');

var Discogs = require('disconnect').Client;

var discogsDB = new Discogs({ userToken: process.env.TOKEN }).database();

router.route('/').get((req, res) => {
  Album.find()
    .then((result) => res.status(200).send(result))
    .catch(err => res.status(400).json(`Error: ${err}`));
})

router.route('/search/:id').post((req, res) => {
  let saveAlbum = (album, track) => {
    let newAlbum = new Album({
      id: album.id,
      style: album.style,
      title: album.title,
      cover_image: album.cover_image,
      master_url: album.master_url,
      year: album.year,
      genre: album.genre,
      tracklist: track
    }).save((err, data) => {
      if (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
          return res.redirect('/');
        }
      } else {
        return res.redirect('/');
      }
    })
  }

  let artistTitle = req.params.id
  discogsDB.search(`title=${artistTitle}`)
    .then(function (data) {
      artistTitle = artistTitle.split('-')
      const album = data.results.filter(album =>
        album.title.toLowerCase().includes(artistTitle.pop())
      )[0]

      discogsDB.getMaster(album.master_id)
        .then((result) => saveAlbum(album, result.tracklist))
        .catch(err => console.log(`Error: ${err}`))

    })
    .catch(err => err.name === 'DiscogsError' && err.code === 429 ? res.redirect('/') : res.status(404).json(`Error: ${err}`));
})

module.exports = router;
