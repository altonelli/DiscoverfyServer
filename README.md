# Discoverfy Server

This is the the back end of the Discoverfy iOS app which can be found [here](https://github.com/altonelli/Discoverfy). It is a Node.js server with a MongoDB database.

## Contributing

### Cloning

You will need to have a Spotify Developer Account which can be created [here](https://developer.spotify.com/).

After cloning, `bundle install`. You will also need to create a `.env` file to store your Spotify keys, redirect uri's, and encryption key. The encryption key is a random string to which the Spotify token will be encrypted against to be stored in the database. Place the following in the `.env` file.

```
CLIENT_ID='YOUR_CLIENT_ID'
CLIENT_SECRET='YOUR_CLIENT_SECRET'
CLIENT_REDIRECT_URI='YOUR_REDIRECT_URI'
DISC_REDIRECT_URI='YOUR_APP_REDIRECT_URI'

ENCRYPTION_SECRET='YOUR_ENCRYPTION_SECRET'
```

### Issues

Issues are tracked [here](https://github.com/altonelli/DiscoverfyServer/issues).

## Built With

* [Node.js](https://nodejs.org/en/docs/)
* [MongoDB](https://docs.mongodb.com/manual/)
* [Spotify API](https://developer.spotify.com/)

## Author

**Arthur Tonelli** - Feel free to check out my website [here](http://arthurtonelli.me) or my GitHub [here](https://github.com/altonelli).

## Acknowledgements

* *[rorygilchrist](https://github.com/rorygilchrist)* - Great repo about the Spotify token swap [here](https://github.com/rorygilchrist/node-spotify-token-swap).
* *[Jesper Svennevid](https://github.com/jsvennevid)* - Another resource about the Spotify token swap [here](https://github.com/microcode/spotify_token_swap).