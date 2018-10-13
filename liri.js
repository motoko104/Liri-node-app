require("dotenv").config();
let keys = require("./keys");
let fs = require("fs");
let request = require("request");
let Spotify = require("node-spotify-api");
//let Omdb = require("omdb");
//let BandsIT = require("bandsintown")(keys.bands);


let spotify = new Spotify(keys.spotify);
//let omdb = new Omdb(keys.omdb);
//let bands = new BandsIT();

let command = process.argv[2];
let input = process.argv.splice(3);


// Funtions that perform specific task
// Searching Spotify by song
let spotifySong = (song) => {

    // cannot get default to work for some reason
    if ( song === undefined ) {
        song = "The Sign";
    };

    spotify.search({ type: 'track', query: song }, function(err, data){
        if (err){
                console.log("Oops! error: " + err);
                return;
        }else{
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
let movieSearch = (input) => {

};

// Codes for each command input
switch(command){
    case 'spotify-this-song':
        spotifySong(input);
        break;
    case 'concert-this':
        BandEvnt();
        break;
    case 'movie-this':
        movieSearch();
        break;
}