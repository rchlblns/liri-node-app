require("dotenv").config();
let keys = require("./keys.js");
let request = require("request")
let Spotify = require("node-spotify-api");
let fs = require("fs");
let moment = require("moment");

let command = process.argv[2];
let userInput = process.argv[3];

switch (command) {
    case "spotify-this-song":
        spotifyThis(userInput);
        break;

    case "concert-this":
        concertThis();
        break;

    case "movie-this":
        movieThis();
        break

    case "do-what-it-says":
        justDoIt();
        break;
}

function spotifyThis(userInput) {

    if (!userInput) {
        userInput = "Better Give U Up";
    }

    var spotify = new Spotify(keys.spotify);
    spotify.search({ type: "track", query: userInput, limit: 1 }, function(err, data) {

        if (err) {
            throw err;

        } else {
            let songInfo = data.tracks.items[0];
            console.log("");
            console.log("===== Here is your song information =====");
            console.log("");
            console.log("Song: " + songInfo.name);
            console.log("Artist: " + songInfo.album.artists[0].name);
            console.log("Album: " + songInfo.album.name);
            console.log("Preview song here: " + songInfo.album.external_urls.spotify);
            console.log("");
            console.log("=========================================");
            console.log("");
        }
    });
}

function concertThis() {
    var concertQuery = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp"

    request(concertQuery, function(err, response, body) {
        if (err) {
            throw err;
            // } else if (body = undefined) {
            //     console.log("Sorry! No concert info found.");
        } else {
            let concertInfo = JSON.parse(body);
            let date = moment(concertInfo[0].datetime).format("MM-DD-YYYY");
            console.log("");
            console.log("===== Here is your concert information ======");
            console.log("");
            console.log("Venue: " + concertInfo[0].venue.name);
            console.log("Location: " + concertInfo[0].venue.city);
            console.log("Date: " + date);
            console.log("");
            console.log("=============================================");
            console.log("");
        }
    })
}

function movieThis() {

    if (userInput === undefined) {
        userInput = "Back To The Future";
    }
    var omdb = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy"

    request(omdb, function(err, response, body) {
        if (err) {
            throw err;
        } else {
            let movieInfo = JSON.parse(body);
            console.log("");
            console.log("===== Here are your movie results =====")
            console.log("");
            console.log("Title: " + movieInfo.Title);
            console.log("Release Year: " + movieInfo.Year);
            console.log("IMDB Rating: " + movieInfo.imdbRating);
            console.log("Rotten Tomatoes Rating: " + movieInfo.Ratings[1].Value);
            console.log("Produced In: " + movieInfo.Country);
            console.log("Languages: " + movieInfo.Language);
            console.log("Plot: " + movieInfo.Plot);
            console.log("Actors: " + movieInfo.Actors);
            console.log("");
            console.log("=======================================")
            console.log("");
        }
    })
}

function justDoIt() {
    fs.readFile("random.txt", "utf-8", function(err, data) {
        if (err) {
            throw err;
        } else {
            // console.log(data)
            let txt = data.split(",");
            let dataToRead = txt[1];
            spotifyThis(dataToRead);
        }
    })
}
