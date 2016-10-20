var url = require('url');
var request = require('request');
var util = require('../util');
var encryption = util.encryption;



var client_id = process.env.CLIENT_ID || null;
var client_secret = process.env.CLIENT_SECRET || null;
var client_redirect_uri = process.env.CLIENT_REDIRECT_URI || null;

var spotifyEndpoint = 'https://accounts.spotify.com/api/token';

var authString = new Buffer(client_id + ':' + client_secret).toString('base64');
var authHeader = 'Basic ' + authString;


function tokenSwap(req,res){

  if ( !req.body || !req.body.hasOwnProperty('code')){
    res.status(550).send("Error: Missing Auth Code. Access Denied");
    return;
  }

  var formData = {
    grant_type: "authorization_code",
    redirect_uri: client_redirect_uri,
    code:req.body.code
  };
  var options = {
      uri: url.parse(spotifyEndpoint),
      headers: {
        'Authorization': authHeader
      },
      form: formData,
      method: 'POST',
      json: true
    };

  request(options, function(error,response,body){
    if(error){
      res.status(500).send("Internal Server Error");
      return;
    }
    if( response.statusCode != 200 ){
      console.log(response.statusCode + " : " + response.statusMessage);
      res.status(550).send('Error: Access Denied');
      return;
    }

    body.refresh_token = encryption.encrypt(body.refresh_token);
    res.status(response.statusCode);
    res.json(body);
  });
}

function tokenRefresh(req,res){

  if (!req.body.refresh_token) {
    res.status(400).send("Error: No token in body");
    return;
  }

  var refreshToken = encryption.decrypt(req.body.refresh_token);
  var formData = {
    grant_type: 'refresh_token',
    refresh_token: refreshToken
  };
  var options = {
    uri: url.parse(spotifyEndpoint),
    headers: {
      'Authorization': authHeader
    },
    form: formData,
    method: 'POST',
    json: true
  };

  request(options, function(error,response,body){
    if (error) {
      res.status(500).send("Error: Internal server error");
      return;
    }
    if (response.statusCode != 200) {
      res.status(550).send("Access Denied");
      return;
    }

    res.status(200).json(body);
  });



}


module.exports = {
  tokenSwap: tokenSwap,
  tokenRefresh:tokenRefresh
};
