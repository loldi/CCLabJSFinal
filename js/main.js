
$( document ).ready(function(){
   $.ajax({
      url: 'http://www.nfl.com/liveupdate/scorestrip/ss.json',
      data: {
         format: 'json'
      },
      error: function() {
         $('#info').html('<p>An error has occurred</p>');
      },
      dataType: 'json',
      success: function(data) {
         // var $title = $('<h1>').text(data.w);
         var $description = $('<p>').text(data.gms[3].v);
         var $score = $('<p>').text(data.gms[3].vs);

         var $description2 = $('<p>').text(data.gms[3].h);
         var $score2 = $('<p>').text(data.gms[3].hs);

         var $difference = (data.gms[3].vs) - (data.gms[3].hs);

         var $giantScore = data.gms[3].vs;
         var $visitorScore = data.gms[3].hs;

         var $quarter = data.gms[3].q;

         var win;
         
         var stillPlaying;

         if ($quarter == 'F'){
         	stillPlaying = false;
         } else {
         	stillPlaying = true;
         };

         var outcome;

         if ($giantScore > $visitorScore)
         {
         	win = true;
         } else {
         	win = false;
         };


         if (win && !stillPlaying){
         	var outcome = "won";
         	

         } else {
         	var outcome = "lost";
         };



         if (win && stillPlaying){
         	var outcome = "are winning";
         } else if (win == false && stillPlaying == true) {
         	var outcome = "are losing";
         };

         
        
       if ($giantScore > $visitorScore && $quarter == 'F'){

     	

      document.getElementsByClassName("answer")[0].innerHTML = "NO";

      

         $('#scoreline')

        .append("The Giants " + outcome + " by " + $difference);

         };

       if ($giantScore < $visitorScore && $quarter == 'F') {

        document.getElementsByClassName("answer")[0].innerHTML = "YES";

           $('#scoreline')

        .append("The Giants " + outcome + " by " + $difference);



       };

         $('#info')
            // .append($title)
            .append($description)
            .append($score)
            .append($description2)
            .append($score2);
            

      },
      type: 'GET'
   });
});


