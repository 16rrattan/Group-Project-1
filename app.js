var user;
$(document).ready(function() {

$("#submit-btn").on("click", function(event) {
    event.preventDefault();
    console.log("Clicked");
    var userName = $("#username").text();
    var textMsg = $("#chat").val();

    console.log(userName);
    console.log(textMsg);

    // var newRow = $("<li>").append(
    //     $("<p>").text(userName),
    //     $("<p>").text(textMsg)
    
    // );
        // console.log(newRow);
    $("#chat-box").append("<p class='username-color'> "+userName+":</p>");
    $("#chat-box").append("<p class ='chat-color'>--  "+textMsg+"</p>");
    
  });

  

$("#addGif").on("click", function(event) {
        
  event.preventDefault();
  $("#gifDisplay").empty();
  $("#addSendGif").empty();

  var gif = $("#gifKeyword").val().trim();
  console.log(gif);
  
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
  gif + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=1";

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  var results = response.data;
  console.log(results);

  for (var i=0; i < results.length; i++) {
      var carDiv = $("<div>");


      var carImage = $("<img>");
      var testING = results[i].images.fixed_height.url;
      carImage.attr("src", testING);
      carImage.attr("value", testING);
      carImage.attr("id", "gifff");
      console.log(testING);
    // carImage.attr("data-state", "still");
    // carImage.attr("data-still", results[i].images.fixed_height_still.url);
    // carImage.attr("data-animate", results[i].images.fixed_height.url);
      carImage.addClass("gif");
        
        // var button = $("<button>");
        // button.text("Shuffle");
        // button.addClass("nextGif");

  carDiv.append(carImage);


  $("#gifDisplay").prepend(carDiv);

  var sendGif = $("<br><button id='sendGif-btn' type='submit' class='btn btn-danger' style = 'width: 100px; height: 50px'>");
  sendGif.text("Send Gif");
  $("#addSendGif").prepend(sendGif);

}
 

});

});

$(document).on("click", "#sendGif-btn", function(event) {
  
  event.preventDefault();

  console.log("Clicked");
  var userName = $("#username").text();
  var textMsg = $("#gifff").attr("src");

  console.log(userName);
  console.log(textMsg);

  // var newRow = $("<li>").append(
  //     $("<p>").text(userName),
  //     $("<p>").text(textMsg)
  
  // );
      // console.log(newRow);
  $("#chat-box").append("<p class='username-color'> "+userName+":</p>");
  $("#chat-box").append("<img src="+ textMsg + "></img>");
  
});

});