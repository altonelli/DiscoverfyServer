var stateKey = 'spotify_auth_state';

var client_id = process.env.CLIENT_ID;
var client_secret = process.env.CLIENT_SECRET;
var ios_redirect_uri = process.env.IOS_REDIRECT_URI;
var local_redirect_uri = process.env.LOCAL_REDIRECT_URI;
var disc_redirect_uri = process.env.DISC_REDIRECT_URI;

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
  console.log("tokenSwap");
  console.log(req);

}

function tokenRefresh(req,res){
  console.log("tokenRefresh");
  console.log(req);


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
