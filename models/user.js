var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Song = require('./song.js');

var UserSchema = new Schema({
  name: String,
  songs: [Song.schema]
});

var User = mongoose.model('User', UserSchema);
module.exports = User;
