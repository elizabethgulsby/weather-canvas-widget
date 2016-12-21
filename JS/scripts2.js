$(document).ready(function() {

	//2 AJAX calls; both on submit
	$('#user-input').submit(function() {
		//keep form from submitting
		event.preventDefault();

		//get value of input field by id
		var location = $('#location').val();

		//checking to see if input is a number AND 5 digits long
		// if ($.isNumeric(location) == true && location.length == 5) {

			//want current weather data returned based on zip entered (don't forget apiKey at the end of the URL!)
			var weatherURLbyZIP = 'http://api.openweathermap.org/data/2.5/weather?units=imperial&zip=' + location + ',us&appid=' + apiKey; 

			//AJAX call 1) Get current weather data for zip entered
			$.getJSON(weatherURLbyZIP, function(data) {
				console.log(data);

				//getting the date and formatting it to Month/dd
				var dateInUnix = data.dt;
				getMonthDay(dateInUnix);

				//getting the current temp
				var currTemp = data.main.temp;

				//getting the daily high/low temp
				var tempMax = data.main.temp_max;
				var tempMin = data.main.temp_min;

				//getting the city name
				var cityName = data.main.name;

				//getting the current weather description
				var currConditions = data.weather[0].description;
				console.log(currConditions); //assign this to a div below the image - make the div!

				//getting corresponding icons for current weather description, matching them to local icons of same name
				var icon = data.weather[0].icon + '.png';
				$('#current-temp-image').html('<img src="./Weather-Icons/' + icon + '">');

			});

		// }

		// else {
			//want forecast data - can only obtain this if city was entered (NEED STATE for accurate results, below URL only returns an arbitrary city - but state not an option for forecast data)
			var forecastURLbyCity = 'http://api.openweathermap.org/data/2.5/forecast?q=' + location + ',us&mode=xml&appid=' + apiKey;
			console.log(forecastURLbyCity);
			//AJAX Call 2) Get 5 day forecast for city
			// }




			
		



//FUNCTIONS
		//returning Month/dd from unix timestamp (dt)
		function getMonthDay(unixDate) {
			var date = new Date(unixDate * 1000);
			var day = date.getDate();
			var locale = "en-us";
			var month = date.toLocaleString(locale, {month: "short"}); //first 3 letters of the month

			newdate = month + " " + day;
			return newdate;
		}

	});




});