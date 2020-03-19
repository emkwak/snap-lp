var mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost/albums';

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to DB!')
});

module.exports = db;
