var five = require("johnny-five");
var board = new five.Board();



var request = require('request');

var cheerio = require('cheerio');

function scoreRequest(callback){

  request('http://selfiesoldier.co/johnny/index.html', function (error, response, html) {
  if (!error && response.statusCode == 200) {

      var $ = cheerio.load(html);
    $('h1.test').each(function(i, element){
      var a = $(this);
      console.log(a.text());
      

 	board.on("ready", function() {

	var array = new five.Leds([3, 5, 6]);


		if (a.text() == "NO") {
	  

	  array[0].pulse();
	  array[2].off();
	  console.log("GREEN")
	  console.log(a.text());

	 

		} else if (a.text() == "YES") {

		array[0].off();
		array[2].pulse();
		console.log("RED");
		console.log(a.text());
		 
	}



	});
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

