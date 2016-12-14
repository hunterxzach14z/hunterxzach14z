$.getJSON("https://hunterxzach14z.github.io/homework/aqua-scaping/script/scaping.json", function(data){
var beginner = data["beginner"];
var expert= data["expert"];
console.log(data);
          
$("#beginner").html(beginner);
$("#expert").html(expert);

});