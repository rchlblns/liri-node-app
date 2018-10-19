require("dotenv").config();
let keys = require("./keys.js");
let request = require("request")
let Spotify = require("node-spotify-api");
let fs = require("fs");

let command = process.argv[2];
let userInput = process.argv[3];

switch(command) {
    case "spotify-this-song":
    spotifyThis();
    break;

    case "concert-this":
    concertThis();
    break;

    case "movie-this":
    movieThis();
    break
}

function spotifyThis() {
    var spotify = new Spotify(keys.spotify);
    spotify.search ({ type: "track", query: userInput, limit: 1 }, function (err, data) {
        
        if (err) {
            console.log("Error occured");
        } else if (!userInput) {
            userInput = "All Star";
        } else {
            let songInfo = data.tracks.items[0];
            console.log("Song: " + songInfo.name);
            console.log("Artist: " + songInfo.album.artists[0].name);
            console.log("Album: " +songInfo.album.name);
            console.log("Preview song here: " + songInfo.album.external_urls.spotify);

        }

    });
}

function concertThis() {
    var concertQuery = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp"

    request(concertQuery, function(err, response, body) {
        if (err) {
            console.log("Error occurred");
        } else {
            console.log(JSON.parse(body));
            console.log("Venue: " + body.venue);
            // console.log("Location: " + body.city);
            // console.log("Date: " + body.datetime);
        }
    })
}

function movieThis() {
    var omdb = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy"

    request(omdb, function(err, response, body){
        if (err) {
            console.log("Error occurred");
        } else {
            let movieInfo = (JSON.parse(body));
            console.log("Title: " + movieInfo.Title);
            console.log("Release Year: " + movieInfo.Year);
            console.log("IMDB Rating: " + movieInfo.imdbRating);
            console.log("Rotten Tomatoes Rating: " + movieInfo.Ratings[1].Value);
            console.log("Produced In: " + movieInfo.Country);
            console.log("Languages: " + movieInfo.Language);
            console.log("Plot: " + movieInfo.Plot);
            console.log("Actors: " + movieInfo.Actors);
        }
    })
}
