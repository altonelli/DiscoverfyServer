var db = require('../models');

function index(req,res){

  if (req.query == {} ) {

    db.User.findOne({name: req.params.user}).exec(function(err,user){
      if (err) {
        res.status(500).json('*** Error while finding user for songs GET');
      } else if (!user) {
        res.status(400).json('*** No user was found' + req.params.user);
      } else {
        var songs = user.songs;
        res.status(200).json(songs);
      }
    });

  } else {

    var username = req.params.user;
    var offset = req.query.offset;
    var limit = req.query.limit;

    db.User.find({ name: username }, { songs: {$slice: [offset,limit]} }).exec(function(err,user){
      if (err) {
        res.status(500).json('*** Error while finding user for songs GET');
      } else if (!user) {
        res.status(400).json('*** No user was found' + req.params.user);
      } else {

        var songs = user.songs;

        res.status(200).json(songs);
      }
    });

  }


}

function create(req, res){
  console.log("in song create function");
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
          console.log("Error on saving song to user", err);
          res.status(500).json("Sorry, song did not save");
        } else {
          user.songs.push(song);
          user.save();
          res.status(200).json(song);
        }
      });
    }
  });
}

module.exports = {
  index: index,
  create: create,
};
