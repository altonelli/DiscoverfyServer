var url = require('url');
var request = require('request');
var util = require('../util');
var encryption = util.encryption;

var stateKey = 'spotify_auth_state';
var spotifyEndpoint = 'https://accounts.spotify.com/api/token';


var client_id = process.env.CLIENT_ID || null;
var client_secret = process.env.CLIENT_SECRET || null;
var ios_redirect_uri = process.env.IOS_REDIRECT_URI || null;
var local_redirect_uri = process.env.LOCAL_REDIRECT_URI || null;
var disc_redirect_uri = process.env.DISC_REDIRECT_URI || null;

var authString = new Buffer(client_id + ':' + client_secret).toString('base64');
var authHeader = 'Basic ' + authString;


function login(req,res){
  var state = randomString(16);
  res.cookie(stateKey,state);

  var scope = 'streaming playlist-modify-public playlist-read-private user-top-read user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize?'+
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: local_redirect_uri,
      state: state
    }));
}

function callback(req,res){
  console.log("WOOT WOOT");
  var code;


  res.redirect('discoverfyprotocol://callback');
}

function tokenSwap(req,res){
  console.log("tokenSwap checking");
  // console.log(req);
  if ( !req.body || !req.body.hasOwnProperty('code')){
    res.status(550).send("Error: Missing Auth Code. Access Denied");
    return;
  }

  var formData = {
    grant_type: "authorization_code",
    redirect_uri: ios_redirect_uri,
    code:req.body.code
  };
  var options = {
      uri: url.parse(spotifyEndpoint),
      headers: {
        'Authorization': authHeader
      },
      form:formData,
      method: 'POST',
      json: true
    };

  request(options, function(error,response,body){
    if(error){
      response.status(500).send("Internal Server Error");
      return;
    }
    if( response.statusCode != 200 ){
      console.log(response.statusMessage);
      res.status(550).send('Error: Access Denied');
      return;
    }

    body.refresh_token = encryption.encrypt(body.refresh_token);
    res.status(response.statusCode);
    res.json(body);
  });
}

function tokenRefresh(req,res){
  console.log("tokenRefresh checking");
  // console.log(req);


}



function randomString(length){
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++){
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

module.exports = {
  login: login,
  callback: callback,
  tokenSwap: tokenSwap,
  tokenRefresh:tokenRefresh
};
