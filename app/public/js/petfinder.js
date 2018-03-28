
/*1f343c6b226b38f88cf2d8cb8a270207
$(document).ready(function(){
    $.getJSON( "http://api.petfinder.com/shelter.getPets?key=1f343c6b226b38f88cf2d8cb8a270207&shelterid=BC248&output=full&format=json", function( data ) {
  var items = [];
  $.each( data, function( key, val ) {
    items.push( "<li id='" + key + "'>" + val + "</li>" );
  });
 
  $( "<ul/>", {
    "class": "my-new-list",
    html: items.join( "" )
  }).appendTo( "body" );
});
});

*/

var baseURL = "https://api.petfinder.com/";
var yourKey = "key=1f343c6b226b38f88cf2d8cb8a270207&";
var format = "format=json";
var callback = "&callback=?";

$(document).ready(function(){

  $("#btnBreed").click(function() {
        
    var selection = $("#mySelector");
    var animalType = selection[0].options[selection[0].selectedIndex].value;
        
    if(animalType !="0")
      {
          document.getElementById("errorMsg").innerHTML = "";
          gttBreedList(animalType) ;         
      }
      else
      {
        document.getElementById("errorMsg").innerHTML = "Select animal type to get breed list.";
      }          
  });

  $("#btnFindPet").click(function() {
        
    var zipcode = document.frm_map.zipCode.value ;
    var selection = $("#mySelector");
    var animalType = selection[0].options[selection[0].selectedIndex].value;

    if(zipcode !="0" && animalType != "0")
    {
      document.getElementById("errorMsg").innerHTML = "";
      findPetByLocation(animalType,zipcode) ; 
    }
    else
    {
      document.getElementById("errorMsg").innerHTML = "Select zipcode and animal type for search.";
    }               
  }); 

  $("#btnReset").click(function() {

        resetSearch();
    }); 

});

function gttBreedList(animalType){

  var reqType = "breed.list?";
  var params = "animal=" + animalType +"&";
  var fullURL = baseURL+reqType+params+yourKey+format+callback;
  var dataSpot = $("#results");
  $.ajax({
    dataType: "jsonp",
    url: fullURL,
    success:(function(data){
    var breeds = data.petfinder.breeds.breed;
    dataSpot.html('<ul id="animalName"><h4>' + animalType + '</h4></ul>');
      $.each(breeds, function(value)
        {
          var li = $('<li/>')
          .text(breeds[value].$t)
          .appendTo($("#animalName"));
        });      
    })
  });
}

function findPetByLocation(animalType,zipcode){
  var reqType = "pet.find?";
  var params = "animal=" + animalType +"&location="+zipcode+"&output=basic&";
  var yourURL = baseURL+reqType+params+yourKey+format+callback;
  var dataSpot = $("#results");

  $.ajax({
    dataType: "jsonp",
    url: yourURL,
    success:(function(data){
      var pets = data.petfinder.pets.pet;  
      dataSpot.html('<ul id="animalName"><h4>' + animalType + '</h4></ul>');
      $.each(pets, function(value)
        {
          var petName = pets[[value]].name.$t;
          var img = pets[[value]].media.photos.photo[0].$t;
          var id = pets[[value]].id.$t;
          
          var li = $('<li/>')

           var newDiv = $("<div>"); //div for the gifs to go inside
           var newPet =$("<a>").text(petName) ;
           newPet.attr("href",'https://www.petfinder.com/petdetail/' + id)
           newDiv.append(newPet);
            // pulling gif
            var petImage = $("<img>");
            petImage.attr("src", img); 
            //gifImage.addClass("image");     
        
            var list = $("<ul>");
            list.attr("id", "List");            
            list.append(newDiv);
            list.append(petImage);
            dataSpot.append(list);
          //.text(pets[value].name.$t)
          //.appendTo($("#animalName"));
        });   

    })
  });  
}

function resetSearch()
{
  $("#zipCode").empty();
  //$("#mySelector")[0].options[selection[0].selectedIndex].value="0";
  $("#results").empty();  
}
