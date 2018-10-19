require("dotenv").config();
const keys = require("./keys.js");
const request = require("request")
const Spotify = require("node-spotify-api");
var fs = require("fs");

function getSpotifySong(songName) {
    let spotify = new Spotify (keys.spotify); 

    if (!songName) {
        songName = "The Sign";
    }
    spotify.search({ type: "track", query: songName }, function(err, data) {
        if (err) throw err;
            console.log("An error occured" + err);

    })
}



    


