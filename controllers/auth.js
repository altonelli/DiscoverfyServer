

function login(req,res){
  var state = randomString(16);
  res.cookie(stateKey,state);

  


}



function randomString(lenght){
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++){
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}
