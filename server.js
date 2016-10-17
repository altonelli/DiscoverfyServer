var env = require("node-env-file");
env(__dirname + '/.env');
console.log(process.env.SECRET_KEY);

var express = require("express");
var bodyParser = require("body-parser");
var cronJob = require('cron').CronJob;

var app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/downloads'));



var ejs = require('ejs');

app.engine('html',ejs.renderFile);
app.set('view engine','html');

var controllers = require('./controllers');

app.post('/api/users', controllers.users.create);

app.get('/api/users/:user/songs', controllers.usersongs.index);

app.post('/api/users/:user/songs', controllers.usersongs.create);

app.get('/api/*', function noRoute (req, res) {
  res.status(404).json("Sorry, nothing was found");
});

app.get('/downloads/iphoneimage', function (req,res){
  res.sendFile('./public/media/iphone6_2.jpg');
});

app.get('*', function (req,res){
  res.render('index.html');
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
  // job.start();
  console.log("atempt 2: "+process.env.SECRET_KEY);

  console.log('Express server is running on http://localhost:3000/');
});
