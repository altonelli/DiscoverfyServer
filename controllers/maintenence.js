var db = require('../models');

function removeOldSongs(){

  var expirationTime = Date.now() + 3600;
  db.Song.remove({ "date" : { $gte : expirationTime } }).exec(function(err,songs){
    if (err) {
      console.log("Error on remove search: " + err);
    } else if (songs) {
      console.log(songs);
      console.log("Success on removal");
    }
  });

}
