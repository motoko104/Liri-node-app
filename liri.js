require("dotenv").config();
let keys = require("./keys");
let fs = require("fs");
let request = require("request");
let Spotify = require("node-spotify-api");
let omdb = require("omdb");
let BandsIT = require("bandsintown");

let spotify = new Spotify(keys.spotify);
let omdbKey = keys.omdb;
//let bands = new BandsIT();

let command = process.argv[2];
let input = process.argv.splice(3);

// Funtions that perform specific task
// Searching Spotify by song
let spotifySong = (song) => {

    // cannot get default to work for some reason
    if (song.length < 1) {
        song = "The Sign";
    };

    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            console.log("Oops! error: " + err);
            return;
        } else {
            console.log("\n-------------------\n Song Info " + song + " \n------------------- \n");
            console.log("Artist:  " + data.tracks.items[0].album.artists[0].name);
            console.log("Song Name: " + data.tracks.items[0].name);
            console.log("Preview Link: " + data.tracks.items[0].preview_url);
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log("\n -------------------\n");
        }
    });
}
//Searching Bands in town by band
let BandEvnt = (input) => {

};

//Searching IMDB by movie titles
let movieSearch = (mov) => {
    if (!mov) {
        mov = 'Mr. Nobody';
    }
    let search = "http://www.omdbapi.com/?apikey=" + omdbKey.key + "&t=" + mov + "&plot=short";

    // need to fix defaul error
    request(search, function (err, res, body) {
        if (err) {
            console.log("Ooops! Error occured: " + err);
            return;
        } else {
            let data = JSON.parse(body);
            console.log("\n-------------------\n Movie \"" + mov + "\" Info  \n------------------- \n");
            console.log("Title: " + data.Title);
            console.log("Year: " + data.Year);
            console.log("IMDB Rating: " + data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + data.Ratings[1].Value);
            console.log("County of Production: " + data.Country);
            console.log("Language: " + data.Language);
            console.log("Plot: " + data.Plot)
            console.log("Actors: " + data.Actors);
            console.log("\n -------------------\n");
        }
    });
}

//Displays list of commands that are acceptable
const optionsList = () => {

};

// Codes for each command input
switch (command) {
    case 'spotify-this-song':
        spotifySong(input);
        break;
    case 'concert-this':
        BandEvnt();
        break;
    case 'movie-this':
        movieSearch(input);
        break;
    default:
        optionsList();
}