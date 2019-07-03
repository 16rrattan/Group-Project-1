var user;
$(document).ready(function() {

    var APIKey = "166a433c57516f51dfab1f7edaed8413";

    // Here we are building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
        "q=Arlington,Virginia&units=imperial&appid=" + APIKey;

    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        // We store all of the retrieved data inside of an object called "response"
        .then(function(response) {

            // Log the queryURL
            console.log(queryURL);

            // Log the resulting object
            console.log(response);
            var coolVaria = "<img src=https://openweathermap.org/img/wn/" + response.weather[0].icon + ".png>";
            console.log(coolVaria);



            // Transfer content to HTML
            $(".icon").html("<a href='https://weather.com/weather/hourbyhour/l/USVA0023:1:US'>" + coolVaria + "</a>");
            $(".temp").text(response.main.temp + "˚ F");

            // Log the data in the console as well
            console.log("Wind Speed: " + response.wind.speed);
            console.log("Humidity: " + response.main.humidity);
            console.log("Temperature (F): " + response.main.temp);
        });
        function myFunction() {
            document.getElementById("myDropdown").classList.toggle("show");
          }
          
          // Close the dropdown if the user clicks outside of it
          window.onclick = function(event) {
            if (!event.target.matches('.dropbtn')) {
              var dropdowns = document.getElementsByClassName("dropdown-content");
              var i;
              for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                  openDropdown.classList.remove('show');
                }
              }
            }
          }
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

            for (var i = 0; i < results.length; i++) {
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
        $("#chat-box").append("<p class='username-color'> " + userName + ":</p>");
        $("#chat-box").append("<img src=" + textMsg + "></img>");

    });

});