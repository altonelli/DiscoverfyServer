var db = require('../models');

function show(req,res){
  db.User.findOne({username:req.body.user}).exec(function (err, user){
    res.send(user);
  });
}

module.exports = {
  show: show
};
