var returned;
$('#query').keyup(function () {
    // All code will be inside of this block
    var value = $('#query').val();

    var rExp = new RegExp(value, "i");

    $.getJSON("https://autocomplete.wunderground.com/aq?query=" + value + "&cb=?", function (data) {
        console.log(data);
        returned = data
        var output = '<ol>';
        $.each(data.RESULTS, function (key, val) {
            if (val.name.search(rExp) != -1) {
                output += '<li>';
                output += '<a href="https://www.wunderground.com' + val.l + '" title="See results for ' + val.name + '">' + val.name + '</a>';
                output += '</li>';
            }
        }); // end each
        output += '</ol>';
        $("#searchResults").html(output); // send results to the page



    }); // end getJSON
}); // end keyup

//this function will prevent clicking the location from going to another webpage
$('#searchResults').on('click', 'a', function (event) {
    event.preventDefault();
    index = $(this).index("a");
    getData(returned.RESULTS[index].lat, returned.RESULTS[index].lon);
    $('#searchResults').toggle();
});

 // Get the data from the wunderground API
  function getData(lat, long){
    $.ajax({
    url :"https://api.wunderground.com/api/f68ea9348fa51d9f/geolookup/conditions/astronomy/almanac/forecast/q/" + lat + "," + long + ".jsonp", 
    dataType : "jsonp",
    success : function(data) {
        console.log
       
        //This will ge the data for the city and state you are in
        var location = data['location']['city'];
        var state = data['location']['state']; 
        //This is going to retrieve the temperature and also use the round function to make it a whole number.
        var temp_f = Math.round(parseInt(data['current_observation']['temp_f']));
        //This is going to get the current weather of your location
        var summary = data["current_observation"]["weather"];
        //This is going to get what phase the moon currently is in. Ex. Waxing Gibbous, Full, New, etc.
        //var moonCyce = data["moon_phase"]["ageOfMoon"];
       // var low = data['almanac']['temp_low']['normal']['F'];
        //var high = data['almanac']['temp_high']['normal']['F'];
        //var zipCode = data['location']['zip'];
        var high = data['forecast']['simpleforecast']['forecastday']['0']['high']['fahrenheit'];

        var low = data['forecast']['simpleforecast']['forecastday']['0']['low']['fahrenheit'];
        
        //This section is going to call all the information and put it into the webpage 
        $("#cityDisplay").text(location + "," + state);
        $("#currentTemp").text(temp_f + "F°");
        $("#summary").text(summary);
        //$("#add1").text("Days Lowest Temp: " + lowestTemp + "°");
        //$('#add2').text("Zip Code: " + zipCode);
        $("#add1").text("Hi: " + high + "°" + "F");
        $("#add2").text("Lo: " + low + "°" + "F");
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