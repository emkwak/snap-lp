const router = require('express').Router();
require('dotenv').config()

const save = require('../../database/models/Album.js');
const Album = require('../../database/models/Album.js');

var Discogs = require('disconnect').Client;

var discogsDB = new Discogs({ userToken: process.env.TOKEN }).database();

router.route('/search').get((req, res) => {
  Album.Album.find()
    .then((result) => res.status(200).send(result))
    .catch(err => res.status(400).json(`Error: ${err}`));
})

router.route('/search/:id').post((req, res) => {
  let artistTitle = req.params.id
  discogsDB.search(`title=${artistTitle}`)
    .then(function (data) {
      artistTitle = artistTitle.split('-')
      const album = data.results.filter(album =>
        album.title.toLowerCase().includes(artistTitle.pop())
      )[0]
      save.saveAlbum(album)
    })
    .catch(err => res.status(404).json(`Error: ${err}`));
})

module.exports = router;
