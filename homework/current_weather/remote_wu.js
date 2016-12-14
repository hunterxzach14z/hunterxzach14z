// Current Location Scripts
$(function () {

  var status = $('#status');

  (function getGeoLocation() {
    status.text('Getting Location...');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;

        // Call the getData function, send the lat and long
        getData(lat, long);

      });
    } else {
      status.text("Your browser doesn't support Geolocation or it is not enabled!");
    }

  })();

  // Get the data from the wunderground API
  function getData(lat, long){
    $.ajax({
    url :"https://api.wunderground.com/api/f68ea9348fa51d9f/geolookup/conditions/astronomy/almanac/forecast/q/" + lat + "," + long + ".jsonp", 
    dataType : "jsonp",
    success : function(data) {
        console.log
        //This will bring up an appropriate weather image icon
        var image = data['forecast']['period']['icon'];
        //This will ge the data for the city and state you are in
        var location = data['location']['city'];
        var state = data['location']['state']; 
        //This is going to retrieve the temperature and also use the round function to make it a whole number.
        var temp_f = Math.round(parseInt(data['current_observation']['temp_f']));
        //This is going to get the current weather of your location
        var summary = data["current_observation"]["weather"];
        //This is going to get what phase the moon currently is in. Ex. Waxing Gibbous, Full, New, etc.
//        var moonCyce = data["moon_phase"]["ageOfMoon"];
        var lowestTemp = data['almanac']['temp_low']['normal']['F'];
        var zipCode = data['location']['zip'];
       
        
        //This section is going to call all the information and put it into the webpage 
        $("#cityDisplay").text(location + "," + state);
        $("#currentTemp").text(temp_f + "°");
        $("#summary").text(summary);
        $("#add1").text("Days Lowest Temp: " + lowestTemp + "°");
        $('#add2').text("Zip Code: " + zipCode);
        $('#weather_image').push(image);
       // this will add the city and state to the title
        $("title").prepend(location + ", " + state + " | ");


      $("#cover").fadeOut(250);
    }
           });

  }

  // A function for changing a string to TitleCase
  function toTitleCase(str){
    return str.replace(/\w+/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }
});