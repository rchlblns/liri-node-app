require("dotenv").config();
let keys = require("./keys.js");
let request = require("request")
let Spotify = require("node-spotify-api");
let fs = require("fs");

let command = process.argv[2];
let userInput = process.argv[3];

switch(command) {
    case "spotify-this-song":
    spotifyThisSong();
    break;
}

function spotifyThisSong() {
    var spotify = new Spotify(keys.spotify);
    spotify.search ({ type: "track", query: userInput, limit: 1 }, function (err, data) {
        
        if (err) {
            console.log("Error occured");
        }
        else if (!userInput) {
            userInput = "All Star";
        }
        else {
            let songInfo = data.tracks.items[0];
            console.log("Song: " + songInfo.name);
            console.log("Artist: " + songInfo.album.artists[0].name);
            console.log("Album: " +songInfo.album.name);
            console.log("Preview song here: " + songInfo.album.external_urls.spotify);

        }

    });
}
