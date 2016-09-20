var db = require('../models');

function removeOldSongs(){

  var expirationTime = Date.now() - 86400;
  console.log("current date: " + Date.now());
  console.log("expiration time: " + expirationTime);
  db.Song.remove({ "date" : { $lt : expirationTime } }).exec(function(err,songs){
    if (err) {
      console.log("Error on remove search: " + err);
    } else if (songs) {
      console.log("Success on removal");
    }
  });

}

module.exports = {
  removeOldSongs: removeOldSongs
};
