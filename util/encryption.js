var crypto = require('crypto');

var encryption_secret = process.env.ENCRYPTION_SECRET || null;



function encrypt(text){
  var cipher = crypto.createCipher('aes-256-ctr',encryption_secret);
  var crypted = cipher.update(text, 'utf8','hex');
  crypted += cipher.final('hex');
  return crypted;
}

function decrypt(text){
  var decipher = crypto.createDecipher('aes-256-ctr',encryption_secret);
  var dec = decipher.update(text,'hex','utf8');
  dec += decipher.final('utf8');
  return dec;
}

module.exports = {
  encrypt: encrypt,
  decrypt: decrypt
};
