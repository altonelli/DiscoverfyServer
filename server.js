var express = require("express");
var bodyParser = require("body-parser");
var cronJob = require('cron').CronJob;

var app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

var ejs = require('ejs');

app.engine('html',ejs.renderFile);
app.set('view engine','html');

var controllers = require('./controllers');

app.post('/api/users', controllers.users.create);

app.get('/api/users/:user/songs', controllers.usersongs.index);
app.post('/api/users/:user/songs', controllers.usersongs.create);

app.get('*', function noRoute (req, res) {
  res.status(404).json("Sorry, nothing was found");
});

var job = new cronJob({
  cronTime: '00 00 00 * * *',
  onTick: function(){

    console.log("running maintainence");
    controllers.maintainence.removeOldSongs();

  },
  start: false,
  timeZone: "America/Los_Angeles"
});


app.listen(process.env.PORT || 3000, function () {
  job.start();
  console.log('Express server is running on http://localhost:3000/');
});
