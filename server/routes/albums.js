const router = require('express').Router();
require('dotenv').config()

var Discogs = require('disconnect').Client;

var db = new Discogs({ userToken: process.env.TOKEN }).database();

router.route('/search/:id').get((req, res) => {
  let artistTitle = req.params.id
  db.search(`title=${artistTitle}`)
    .then(function (data) {
      artistTitle = artistTitle.split('-')
      const album = data.results.filter(album =>
        album.title.toLowerCase().includes(artistTitle.pop())
      )[0]
      res.status(200).json(album)
    })
    .catch(err => res.status(404).json(`Error: ${err}`));
})

module.exports = router;
