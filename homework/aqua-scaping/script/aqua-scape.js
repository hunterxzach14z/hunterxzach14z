$.getJSON("https://hunterxzach14z.github.io/homework/aqua-scaping/script/scaping.json", function(data){
var anubias = data["anubias"];
var bacopa= data["bacopa"];
var staurogyne= data["starougyne"];
console.log(data);
          
$("#anubiasinfo").html(anubias);
$("#baccopainfo").html(bacopa);
$("#staurogyne").html(staurogyne);

});