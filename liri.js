require("dotenv").config();
let keys = require("./keys");
let request = require("request");

let spotify = new Spotify(keys.spotify);
let omdb = new omdb(keys.omdb);
let bands = new bands(keys.bands);

let input = process.argv.split(3);
console.log("input");

request("https://api.spotify.com/v1/search?q" + input +"", function (error,response, body){
    if(!error && response.statusCode === 200) {

    }
});

//search through spotify
const spotifySearch = () => {
    spotify.search({type: 'track', query:''}, function (err, data) {
        if (err){
            return console.log('Error occured' + err);
        }
        console.log(data);
    })
}

spotify.search({type: 'track', query:''})
request("")
