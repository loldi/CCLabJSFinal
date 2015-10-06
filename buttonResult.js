
var j5 = require("johnny-five");
var board = new j5.Board();
var request = require('request');
var cheerio = require('cheerio')
var url = "http://www.nfl.com/liveupdate/scorestrip/ss.json"
 
board.on("ready", function(){
  var array = new j5.Leds([3, 5, 6]);
  var btn = new j5.Button(7);
 
  btn.on("hit", function(){


request({
    url: url,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
        // console.log(body) // Print the json response
        var a = body.gms[3].vs;

        console.log(a);

        var b = body.gms[3].hs;

        if (a  > b ) {
    

      array[0].pulse();
      array[2].off();
      console.log("GREEN")
      console.log("they winnin");

   

    } else if (a < b) {

      array[0].off();
      array[2].pulse();
      console.log("RED");
      console.log("they losin");
  }



       
    }
     
});




  });  

  btn.on("release", function(){
    array[0].off();
    array[2].off();
  });
 
  
});