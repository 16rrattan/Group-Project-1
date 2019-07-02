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
});
