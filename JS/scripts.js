// * Ideas 

//     * Make it change color based on X 

//     * Change the circle... 

//         * Make it into a thermometer that fills up 

//         * Make it a car that leaves tracks 

//         * Make it into a bottle of sunscreen that shoots the temp out 

//         * Etc. 

//     * Change the background based on the weather code 

// * Explore the API 

//     * There is a lot more that you can do than what we covered. 

//     * http://openweathermap.org/weather-conditions 

//     * See if you can find and use other end points 

//     * See what else is the object we are already getting back and what you can do with it 

// * Make it a full-blown widget someone would want on their page! 

// * Make a modal via bootstrap or Fancybox that pops open the wind speed, etc. 

// * Go look at other widgets online and follow suit.

// *** Can abandon canvas altogether - use jQuery & icons instead, other jQuery plugins to create a better widget!


$(document).ready(function() {

	$('#weather-form').submit(function() {
		//stop the form from submitting
		event.preventDefault();

		// Input field has id of location.  Go get it.
		var location = $('#location').val();

		var weatherURL = 'http://api.openweathermap.org/data/2.5/weather?units=imperial&zip=' + location + ',us&appid=' + apiKey;  //we added our own api key to access the data from openweather; is looking for whatever user searched for
		console.log(weatherURL);

		//telling JS to make am AJAX call to this url (can request more than what's requested here)
		$.getJSON(weatherURL, function(weatherData) {
			console.log(weatherData);
			var currTemp = weatherData.main.temp;
			var name = weatherData.name;
			var icon = weatherData.weather[0].icon + '.png';
			$('#current-temp').html('<img src="http://openweathermap.org/img/w/'+ icon + '"> The temperature in ' + name + ' is currently ' + currTemp + '&deg;'); 

			//target canvas, make it 2d
			var canvas = $('#weather-canvas');
			var context = canvas[0].getContext('2d');


			
			// Set up the outer circle
			var currPercent = 0;
			function animate(current) {
				//draw the inner circle
				context.fillStyle = '#ccc';
				context.beginPath();  //ready to start drawing
				context.arc(155, 75, 65, Math.PI*0, Math.PI*2)  //draws a full circle starting at 155,65 with a 65 radius that starts at 3:00 and ends back around at 3:00
				context.closePath();  //JS knows we're done here
				context.fill();  //fills the circle we drew with the grey color specified in fillStyle();

				//draw the outer circle
				context.lineWidth = 10; //make a thick outer line
				context.strokeColor = '#129793';
				context.beginPath(); //let JS know we're ready to start drawing
				context.arc(155, 75, 70, Math.PI*1.5, (Math.PI * 2 * current ) + Math.PI*1.5); //need line to start outside of our arc; line is 10 wide, so we need a radius of 70 (5 will be on the inside, 5 will be on the outside); the first Math.PI* 1.5 starts at 12:00; (Math.PI) * 2 * current + Math.PI*1.5 draws the outer arc beginning at 12:00
				context.stroke(); //stroke, not fill - we want a line
				currPercent++ //increment currPercent
				if (currPercent < currTemp) {
					requestAnimationFrame(function() {
						animate(currPercent / 100); //we want a percentage of the circle rather than drawing entirely around
					});
				}

			}
			animate();

		});
	})

});