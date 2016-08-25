var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/discoverfy');

var User = require('./user');
var Song = require('./song');

module.exports.Song = Song;
module.exports.User = User;
