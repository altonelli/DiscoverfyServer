var mongoose = require('mongoose');

// mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/discoverfy');


var User = require('./user');
var Song = require('./song');

module.exports.Song = Song;
module.exports.User = User;
