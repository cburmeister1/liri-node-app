var keys = require('./keys.js');
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var fs = require('fs');
var client = new Twitter(keys.twitterKeys);
var music = new Spotify(keys.spotifyKeys);

var action = process.argv[2];
    switch(action) {
	    case 'my-tweets':
	      myTweets();
	      break;
	    case 'spotify-this-song':
	      myMusic();
	      break;
	    case 'movie-this':
	      myMovie();
	      break;
	    case 'do-what-it-says':
	      doWhat();
	      break;  
  };

function myTweets(){
	var params = {screen_name: 'cburm10', count: 20};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if(error) throw error;		
            console.log("\n" + 'Last 20 Tweets:' + "\n")
            for (i = 0; i < tweets.length; i++) {
                var number = i + 1;
                console.log([i + 1] + '. ' + tweets[i].text);
                console.log('Created on: ' + tweets[i].created_at + "\n");
			}
	});	
}

function myMovie() {
	if (process.argv[3] != '' && process.argv[3] != null){
		movieTitle = process.argv[3].trim();
	}
	else {
		//if no input, dafault to "Mr. Nobody"
		movieTitle = 'Mr.+Nobody';
	}

		request('http://www.omdbapi.com/?apikey=40e9cece&t=' + movieTitle + '&tomatoes=true&r=json', function(error, response, body) {
			if (!error && response.statusCode === 200) {
				movieSearch = JSON.parse(body);
				console.log("\n" + 'Title: ' + movieSearch.Title);
				console.log('Year: ' + movieSearch.Year);
				console.log('imdbRating: ' + movieSearch.imdbRating);
				console.log('Rotten Tomatoes Rating: ' + movieSearch.tomatoRating);
				console.log('Country: ' + movieSearch.Country);
				console.log('Language: ' + movieSearch.Language);
				console.log('Actors: ' + movieSearch.Actors);
				console.log('Plot: ' + movieSearch.Plot + "\n");				
			}
		});	
}

function myMusic() {
	var querySong;
	if (process.argv[3] != '' && process.argv[3] != null) {
		 var querySong = process.argv[3];
	} 
	// if no input, default to "The Sign" 
	else {
		var querySong = 'The Sign - Ace of Base';
	}

	music.search({ type: 'track', query: querySong }, function(err, data) {
    	if (err) {
    		console.log('Error: ' + err);
    		return;
    	}
    	var mySong = data.tracks.items;

    	for (var i = 0; i < mySong.length; i++) {
    		if((i+1)<=1){
	    		console.log("\n" + 'Artist(s): ' + mySong[i].artists[0].name);
	    		console.log('Song: ' + mySong[i].name);
	    		console.log('Album: ' + mySong[i].album.name);
	    		console.log('Preview song: ' + mySong[i].preview_url + "\n");    			
    		}  
    	}	 
	});
}

function doWhat (){
	fs.readFile("random.txt", "utf8", function(error, data){
		console.log("\n" + data + "\n");
	})
}
