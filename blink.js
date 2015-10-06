var five = require("johnny-five");
var board = new five.Board();
var request = require('request');
var cheerio = require('cheerio');

function scoreRequest(callback){

  request('http://www.nfl.com/liveupdate/scorestrip/scorestrip.json', function (error, response, body) {
  if (!error && response.statusCode == 200) {

      var $ = cheerio.load(body);

      var a = $(".answer").html();

      console.log(body);
      
 	board.on("ready", function() {

	var array = new five.Leds([3, 5, 6]);

		if (a == "") {
	  

		  array[0].pulse();
		  array[2].off();
		  console.log("GREEN")
		  console.log(a);

	 

		} else if (a == "NO") {

			array[0].off();
			array[2].pulse();
			console.log("RED");
			console.log(a);
	}

	});
   
}

callback(); 
 
});

}

function wait10sec(){
    setTimeout(function(){
        scoreRequest(wait10sec);
        console.log("its been 10 sec");
    }, 10000);
}


scoreRequest(wait10sec);

