//Necessary Files and Packages for running Liri
require("dotenv").config();
const chalk = require('chalk');
const keys = require("./keys");
const moment = require('moment');
const fs = require("fs");
const request = require("request");
const Spotify = require("node-spotify-api");
const omdb = require("omdb");
const BandsIT = require("bandsintown");

//Keys for Spotify, OMDB, and Bands in Town API's
let spotify = new Spotify(keys.spotify);
let omdbKey = keys.omdb;
let bands = keys.bands;

//Variables to save users command and input
let command = process.argv[2];
let input = process.argv.splice(3);

// Funtions that perform specific task
// Searching Spotify by song
let spotifySong = (song) => {
    // cannot get default to work for some reason
    if (song === '') {
        song = "The Sign";
    };
    // search request through spotify
    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            console.log(chalk.redBright("Oops! error: " + err));
            return;
        } else {
            console.log(chalk.magentaBright("\n-------------------------------------------------------------\n \tSong Info For '" + song + "' \n-------------------------------------------------------------\n"));
            console.log(chalk.blueBright("Artist:  ") + data.tracks.items[0].album.artists[0].name);
            console.log(chalk.blueBright("Song Name: ") + data.tracks.items[0].name);
            console.log(chalk.blueBright("Preview Link: ") + data.tracks.items[0].preview_url);
            console.log(chalk.blueBright("Album: ") + data.tracks.items[0].album.name);
            console.log(chalk.magentaBright("\n-------------------------------------------------------------\n"));
        }
    });
}
//Searching Bands in town by band
let BandEvnt = (band) => {
    //need to fix default band conditions
    if (band === '') {
        band = 'Marilyn Manson';
    }
    let search = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=" + bands.id;
    //request to the BandsInTown API
    request(search, function (err, res, body) {
        if (err) {
            console.log(chalk.bold.redBright("Ooops! Error occured: " + err));
            return;
        } else {
            let data = JSON.parse(body);
            console.log(chalk.bold.magentaBright("\n-------------------------------------------------------------\n \t Concert \"" + band + "\" Info  \n-------------------------------------------------------------\n"));
            for (let i = 0; i < data.length; i++) {
                console.log(chalk.bold.magentaBright("-------------------------------------------------------------\n"));
                console.log(chalk.yellow("Venue: ") + data[i].venue.name);
                console.log(chalk.yellow("Location: ") + data[i].venue.city);
                    let startTm = data[i].datetime;
                    let date = moment(startTm).format('MMMM Do YYYY, h:mm:ss a');
                console.log(chalk.yellow("Date of Concert: ") + date);
                console.log(chalk.bold.magentaBright("\n-------------------------------------------------------------\n"));
            }
        }
    });
};
//Searching IMDB by movie titles
let movieSearch = (mov) => {
    //need to find solution for default movie search
    if (mov === '') {
        mov = 'Mr. Nobody';
    }
    let search = "http://www.omdbapi.com/?apikey=" + omdbKey.key + "&t=" + mov + "&plot=short";

    request(search, function (err, res, body) {
        if (err) {
            console.log(chalk.bold.redBright("Ooops! Error occured: " + err));
            return;
        } else {
            let data = JSON.parse(body);
            console.log(chalk.bold.magentaBright("\n-------------------------------------------------------------\n \tMovie Info  \n-------------------------------------------------------------\n"));
            console.log(chalk.greenBright("Title: ") + data.Title);
            console.log(chalk.greenBright("Year: ") + data.Year);
            console.log(chalk.greenBright("IMDB Rating: ") + data.imdbRating);
            console.log(chalk.greenBright("Rotten Tomatoes Rating: ") + data.Ratings[1].Value);
            console.log(chalk.greenBright("County of Production: ") + data.Country);
            console.log(chalk.greenBright("Language: ") + data.Language);
            console.log(chalk.greenBright("Plot: ") + data.Plot)
            console.log(chalk.greenBright("Actors: ") + data.Actors);
            console.log(chalk.bold.magentaBright("\n-------------------------------------------------------------\n"));
        }
    });
}
//Using text in the random.txt file to call one of LIRI's commands
const doingIt = () => {
    fs.readFile("random.txt", (err, data) =>{
        if(err){
            console.log(chalk.redBright("Ooops! Error occured: " + err));
        }
        let text = data.toString();
        data = text.split(",");
        let command = data[0].trim();
        let search = data[1].trim();

        switch(command){
            case 'spotify-this-song':
                spotifySong(search);
                break;
            case 'movie-this':
                movieSearch(search);
                break;
            case 'concert-this':
                BandEvnt(search);
                break;
        }
    });
}
//Displays list of commands that are acceptable
const optionsList = () => {
    console.log(chalk.bold.red("\nSorry invalid command was entered. Please try again. \n \n The requests you can make are:"));
    console.log(chalk.greenBright("\t spotify-this-song 'SONG TITLE GOES HERE' \n \t concert-this 'ARTIST/BAND NAME GOES HERE'\n \t movie-this 'MOVIE TITLE GOES HERE'\n \t do-what-it-says \n"));
};
// Codes for each command input
switch (command) {
    case 'spotify-this-song':
        spotifySong(input);
        break;
    case 'concert-this':
        BandEvnt(input);
        break;
    case 'movie-this':
        movieSearch(input);
        break;
    case 'do-what-it-says':
        doingIt();
        break;
    default:
        optionsList();
}