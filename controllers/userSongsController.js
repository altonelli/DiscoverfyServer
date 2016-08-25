var db = require('../models');

function index(req,res){

  db.User.findOne({username: req.body.user}).exec(function(err,user){
    var songs = user.songs;
    res.send(songs);
  });

}

function create(req, res){
  var newSong = new db.Song({
    songID: req.body.songID,
    type: req.body.type,
    date: Date.now()
  });
  newSong.save(function(error,song){
    if(error || !song){
      console.log("Error on song save");
      res.status(500).json("Sorry, song did not save");
    } else {
      db.User.findOne({name: req.body.user}).exec(function(err, user){
        if(err || !user){
          console.log("Error on saving song to user");
          res.status(500).json("Sorry, song ddi not save");
        } else {
          user.songs.push(song);
          res.status(200).json(song);
        }
      });
    }
  });
}

module.exports = {
  index: index,
  create: create
};
