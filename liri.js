var twitterKeys = require("./keys.js");
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');

var twitterConsumer = twitterKeys.twitterKeys.consumer_key;
var twitterConsumerSecret = twitterKeys.twitterKeys.consumer_secret;
var twitterTokenKey = twitterKeys.twitterKeys.access_token_key;
var twitterTokenSecret = twitterKeys.twitterKeys.access_token_secret;
 
var client = new Twitter({
  consumer_key: twitterConsumer,
  consumer_secret: twitterConsumerSecret,
  access_token_key: twitterTokenKey,
  access_token_secret: twitterTokenSecret
});
 
if (process.argv[2] === "my-tweets") {

client.get('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=luisdajer9&count=20', function(error, tweets, response) {
	for (var i = 0; i < tweets.length; i++) {
		if (!error) {
    	console.log(tweets[i].text.split(","));
  } else {
  		console.log(error);
  }
}

// console.log(tweets);
  
});

}

if (process.argv[2] === "spotify-this-song") {

	spotify.search({ type: 'track', query: process.argv[3]}, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
    // console.log(JSON.stringify(data).split(","));
    console.log("Artist Name: " + data.tracks.items[0].artists[0].name); //artist name
    console.log("Track Name: " + data.tracks.items[0].name); //track name
    console.log("Album: " + data.tracks.items[0].album.name); //album name
    console.log("Spotify Link: " + JSON.stringify(data.tracks.items[0].external_urls)); //link to spotify preview

 
    // Do something with 'data' 
});

}


if (process.argv[2] === "movie-this") {
	request('http://www.omdbapi.com/?t=' + process.argv[3] + "&r=json", function (error, response, body) {

var data = JSON.parse(body)
		  console.log('error:', error);
		  // console.log(response);
		  console.log(data.Title); 
		  console.log(data.Year);
		  console.log(data.imbdRating);
		  console.log(data.Country);
		  console.log(data.Language);
		  console.log(data.Plot);
		  console.log(data.Actors);

});

}



