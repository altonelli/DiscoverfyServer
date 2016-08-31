var db = require('../models');

function create(req,res){
  console.log("req.body.name " + req.body.user);
  db.User.findOne({name:req.body.user}).exec(function (err, user){
    if (user) {
      console.log("here is your user 1 " + user);
      res.status(200).json(user);
    } else {
      var newUser = new db.User({
        name: req.body.name,
        songs: []
      });
      newUser.save(function(err,user){
        if(err || !user){
          res.status(500).json("An error occured while creating this user");
        } else {
          console.log("here is your user 2 " + user);
          res.status(200).json(user);
        }
      });
    }
  });
}

module.exports = {
  create: create
};
