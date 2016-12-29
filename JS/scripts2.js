$(document).ready(function() {

	//2 AJAX calls; both on submit


	$('#user-input').submit(function() {
		//keep form from submitting
		event.preventDefault();

		//get value of input field by id
		var location = $('#location').val();

			//want current weather data returned based on zip entered (don't forget apiKey at the end of the URL!)
			var weatherURLbyZIP = 'http://api.openweathermap.org/data/2.5/weather?units=imperial&zip=' + location + ',us&appid=' + apiKey; 

			//AJAX call 1) Get current weather data for zip entered
			$.getJSON(weatherURLbyZIP, function(data) {
				console.log(data);

				//getting the date and formatting it to day of the week/month/dd
				var dateInUnix = data.dt;
				console.log(weekdayMonthDay(dateInUnix)); //remove the console.log later
				$('.current-date').html(weekdayMonthDay(dateInUnix));

				//getting the current temp
				var currTemp = Math.round(data.main.temp);
				$('#current-temp').html(currTemp + '&deg;');

				//getting the daily high/low temp
				var tempMax = Math.round(data.main.temp_max);
				var tempMin = Math.round(data.main.temp_min);
				$('#high-low').html(tempMax + '&deg;' + '/' + tempMin + '&deg;');

				//getting the city name
				var cityName = data.name;
				$('#city').html(cityName);

				//getting the city ID (for use in forecast data retrieval)
				var cityID = data.id;
				console.log(cityID);

				//getting the current weather description (i.e. 'haze', 'partly cloudy')
				var currConditions = data.weather[0].description;
				$('#current-conditions').html(currConditions);

				//getting corresponding icons for current weather description, matching them to local icons of same name
				var icon = data.weather[0].icon + '.png';
				$('#current-temp-image').html('<img src="./Weather-Icons/' + icon + '">');


				//5 DAY FORECAST DATA

				//want 5-day forecast data returned based on zip entered
				var forecastURLbyCity = 'http://api.openweathermap.org/data/2.5/forecast/daily?id=' + cityID + '&units=imperial&appid=' + apiKey + '&cnt=5';

				//2nd AJAX call (nested); returning 5-day forecast data
				$.getJSON(forecastURLbyCity, function(forecastData) {
					console.log(forecastData);
					var days = data.list; //array of days here

					//calling weekdayMonthDay for each day; getting icon for overall weather for the day, each day; daily high/low temps
					for (var i = 0; i < forecastData.list.length; i++) {
						var forecastDate = forecastData.list[i].dt;
						console.log(weekdayMonthDay(forecastDate));
						$('#day' + (i+1)).html(weekdayMonthDay(forecastDate));

						var forecastIcon = forecastData.list[i].weather[0].icon + '.png';
						$('#day' + (i+1) + '-icon').html('<img src="./Weather-Icons/' + forecastIcon + '">');

						var dailyHigh = Math.round(forecastData.list[i].temp.max);
						var dailyLow = Math.round(forecastData.list[i].temp.min);
						$('.hi-low-daily-' + (i+1)).html(dailyHigh + '&deg;' + '/' + dailyLow + '&deg;')
					}
					

				})

			});



//FUNCTIONS

		//returning day of the week/month/dd from unix timestamp (dt)
		function weekdayMonthDay(unixDate) {
			var daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
			var date = new Date(unixDate * 1000);
			var day = date.getDate();
			var dayOfWeek = date.getDay();
			var locale = "en-us";
			var month = date.toLocaleString(locale, {month: "short"}); //first 3 letters of the month

			newdate = daysOfWeek[dayOfWeek] + " " + month + " " + day;
			return newdate;
		}

	});




});