var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user.js');

var SongSchema = new Schema ({
  songID: String,
  type: String,
  date: Date,
});

var Song = mongoose.model('Song',SongSchema);
module.exports = Song;
