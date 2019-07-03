var firebaseConfig = {
    apiKey: "AIzaSyCPbfphGW7DWX4GIJkViNL3xwBFIS0whQs",
    authDomain: "class-hub-b60f9.firebaseapp.com",
    databaseURL: "https://class-hub-b60f9.firebaseio.com",
    projectId: "class-hub-b60f9",
    storageBucket: "",
    messagingSenderId: "665595775100",
    appId: "1:665595775100:web:8132c1150ff72dff"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();
var i;
var tempidname;
var globalname = localStorage.getItem("signedinname");
var onevote = true;

// when the user clicks submit project -->
$(".add-project").on("click", function(event) {
    event.preventDefault();
    cleartopdiv();

    // user input
    var Tproject = $("#input-project").val().trim();

    //member object
    if (globalname != "" && Tproject != "") {


        database.ref('profiles/' + globalname).once("value", function(snapshot) {
            console.log(globalname);
            console.log(Tproject);

            database.ref("profiles/" + globalname + "/project").set(Tproject);

            // database.ref(name + "/name").set(name);
            // database.ref(name + "/project").set(project);
            // database.ref(name + "/value").set(0);
            database.ref("ranking/" + globalname).set(0)

        })


    }

    $("#input-project").val("");
    cleartopdiv();
    clearbottomdiv();
    display();
})




//code when the leaderboard or bio is clicked -->

$("body").on("click ", '.link', function() {
    console.log("button works")
    console.log(this.id);
    database.ref('profiles/' + this.id + "/project").once("value", function(snapshot) {

        window.open(snapshot.val())
    })

});

$("body").on("click ", '.git', function() {
    console.log("button works")
    console.log(this.id);
    database.ref('profiles/' + this.id + "/github").once("value", function(snapshot) {
        console.log(this.id)
        console.log(snapshot.val())
        window.open(snapshot.val())
    })

});


//buttons for the voting system -->

$("body").on("click ", '.down', function() {
    console.log(onevote);
    if (onevote == true) {
        tempidname = this.id;
        database.ref("ranking/" + tempidname).once("value", function(Snapshot) {
            var tempval = Snapshot.val() + 1;
            console.log(tempval);
            console.log("down button works");
            console.log(tempidname);
            database.ref("ranking/" + tempidname).set(tempval);
            onevote = false;
            console.log(onevote);
        })

    }
});

$("body").on("click ", '.up', function() {
    console.log(onevote);
    if (onevote == true) {
        tempidname = this.id;
        database.ref("ranking/" + tempidname).once("value", function(Snapshot) {
            var tempval = Snapshot.val() - 1;
            console.log(tempval);
            console.log("up button works");
            console.log(tempidname);
            database.ref("ranking/" + tempidname).set(tempval);
            onevote = false;
            console.log(onevote);
        })

    }
});


//used to clear the containers for the leaderboard and voting board

function cleartopdiv() {
    $('#leaderboard_display').empty();

}

function clearbottomdiv() {
    $('#voting_box').empty();

}




//used to display the leaderboard in ranking value order -->

function display() {

    var ranking = firebase.database().ref("ranking/");

    ranking.orderByValue().on("value", function(data) {
        cleartopdiv();

        data.forEach(function(data) {
            var buttons = $('<button class="btn btn-info link" style="margin: 3px"' + 'id="' + data.key + '">' + data.key + '</button>')
            $("#leaderboard_display").append(buttons);
        });

    });
    database.ref("ranking").on("value", function(data) {
        clearbottomdiv();

        data.forEach(function(data) {
            var voting = $('<li class="list-group-item">' + data.key + '<button class="btn btn-outline-danger down"' + 'id="' + data.key + '" style="float: right">Sucks</button>' + '<button class="btn btn-outline-success up"' + 'id="' + data.key + '"  style="float: right">Great</button>' + '</li>')
            $("#voting_box").append(voting);
        });

    });
};


//Below is the login logic

$("#submit-login").on("click", function(event) {
    event.preventDefault();
    console.log("login button works")

    // user input
    var loginname = $("#login-name").val().trim();
    var loginpassword = $("#login-password").val().trim();
    // console.log(loginname);
    // console.log(loginpassword);

    if (loginname != "" && loginpassword != "") {

        database.ref('profiles/').on("child_added", function(snapshot) {
            var printname = snapshot.val().name;
            var printpassword = snapshot.val().password;
            console.log(printname);
            console.log(printpassword);
            if (loginname == printname && loginpassword == printpassword) {
                localStorage.setItem("signedinname", printname);
                globalname = localStorage.getItem("signedinname")
                console.log(globalname)
            } else {
                console.log(globalname)
            }
        })
    }
    $("#login-name").empty()
    $("#login-password").empty()
    window.location.replace("https://16rrattan.github.io/Group-Project-1/index.html");
});


//create profile logic -->
function clearcprofile() {

    $("#input-name-create").val("");
    $("#input-password-create").val("");
    $("#input-github-create").val("");
    $("#input-bio-create").val("");
};

$("#add-profile").on("click", function(event) {
    event.preventDefault();

    // user input
    var Tname = $("#input-name-create").val().trim();
    var Tpassword = $("#input-password-create").val().trim();
    var Tgithub = $("#input-github-create").val().trim();
    var Tbio = $("#input-bio-create").val().trim();
    console.log(Tname);
    console.log(Tpassword);
    console.log(Tgithub);
    console.log(Tbio);

    //member object
    if (Tname != "" && Tpassword != "") {
        console.log("step 1")

        database.ref('profiles').once("value", function(snapshot) {
            var locprofiles = {
                name: Tname,
                password: Tpassword,
                github: Tgithub,
                bio: Tbio
            };

            var checkname;
            database.ref('profiles/').once("value", function(snapshot) {

                checkname = snapshot.val();
                console.log(checkname)
                if (Tname !== checkname) {

                    clearcprofile();
                    database.ref("profiles/" + Tname).set(locprofiles);
                    database.ref("ranking/" + Tname).set(0);
                } else {
                    console.log("account already exists")
                    clearcprofile();
                }
            })

        })

    }
})




//this is for the chatroom 

$("#chat-submit").on("click", function(event) {
    event.preventDefault();

    chatbuttonsubmit();

})

//variables for chat display and button
var Ttext;
var inputtext;
///

function chatbuttonsubmit() {
    // user input
    Ttext = $("#input-text").val().trim();
    console.log(Ttext);
    inputtext = "<li>" + globalname + ": " + Ttext + "</li>";
    console.log(inputtext);
    $("#input-text").val("")
    chatdisplay();


}

function chatdisplaystart() {
    database.ref('chat').once("value", function(snapshot) {
        var totalchat = snapshot.val();
        console.log(totalchat);
        $("#chat-box").empty();
        $("#chat-box").append(totalchat);
        $("#chat-box").animate({
            scrollTop: $("#chat-box")[0].scrollHeight - $("#chat-box").height()
        }, 1, function() {

        })

    })
};

function chatdisplay() {
    //chat storage
    database.ref('chat').once("value", function(snapshot) {
        $("#chat-box").empty();
        var oldtext = snapshot.val();
        console.log(oldtext);
        if (oldtext != null) {
            var newtext = oldtext + inputtext;
        } else {
            var newtext = inputtext;
            console.log("old null text")

        }
        console.log(newtext);
        database.ref("chat").set(newtext);
        database.ref('chat').once("value", function(snapshot) {
            var totalchat = snapshot.val();
            console.log(totalchat);
            $("#chat-box").empty();
            $("#chat-box").append(totalchat);

        })

    })


}



$("#chat-clear").on("click", function(event) {
    event.preventDefault();
    database.ref('chat').once("value", function(snapshot) {
        database.ref("chat").remove();
    })
    setTimeout(chatdisplaystart, 1000)

})








//ajax
// $("#addGif").on("click", function(event) {

//     event.preventDefault();
//     $("#gifDisplay").empty();
//     $("#addSendGif").empty();

//     var gif = $("#gifKeyword").val().trim();
//     console.log(gif);

//     var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
//         gif + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=1";

//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function(response) {
//         var results = response.data;
//         console.log(results);

//         for (var i = 0; i < results.length; i++) {
//             var carDiv = $("<div>");


//             var carImage = $("<img>");
//             var testING = results[i].images.fixed_height.url;
//             carImage.attr("src", testING);
//             carImage.attr("value", testING);
//             carImage.attr("id", "gifff");
//             console.log(testING);
//             // carImage.attr("data-state", "still");
//             // carImage.attr("data-still", results[i].images.fixed_height_still.url);
//             // carImage.attr("data-animate", results[i].images.fixed_height.url);
//             carImage.addClass("gif");

//             // var button = $("<button>");
//             // button.text("Shuffle");
//             // button.addClass("nextGif");

//             carDiv.append(carImage);


//             $("#gifDisplay").prepend(carDiv);

//             var sendGif = $("<br><button id='sendGif-btn' type='submit' class='btn btn-danger' style = 'width: 100px; height: 50px'>");
//             sendGif.text("Send Gif");
//             $("#addSendGif").prepend(sendGif);

//         }


//     });

// });

$(document).on("click", "#sendGif-btn", function(event) {

    event.preventDefault();

    var textMsg = "<img src=" + $("#gifff").attr("src") + "></img>";
    console.log(textMsg);
    var gifupload = "<li>" + globalname + ": " + textMsg + "</li>";

    database.ref('chat').once("value", function(snapshot) {
        $("#chat-box").empty();
        var oldtext = snapshot.val();
        console.log(oldtext);
        if (oldtext != null) {
            var newtext = oldtext + gifupload;
        } else {
            var newtext = gifupload;
            console.log("old null text")

        }
        console.log(newtext);
        database.ref("chat").set(newtext);
        database.ref('chat').once("value", function(snapshot) {
            var totalchat = snapshot.val();
            console.log(totalchat);
            $("#chat-box").empty();
            $("#chat-box").append(totalchat);

        })

    })

});



function biolist() {


    var ranking = firebase.database().ref("ranking/");

    ranking.orderByValue().on("value", function(data) {
        cleartopdiv();
        console.log("wrote to top div")
        data.forEach(function(data) {
            var buttons = $('<button class="btn btn-sm btn-info biolist" style="margin: 3px"' + 'id="' + data.key + '">' + data.key + '</button>')
            $(".bio_list").append(buttons);
            console.log("big dumb dumb")
        });

    });

}


$("body").on("click ", '.biolist', function() {
    var bioname;
    var biobio;
    $("#bio_name").empty();
    $("#bio_github").empty();
    $("#bio_bio").empty();
    console.log("button works")
    console.log(this.id);
    database.ref('profiles/' + this.id + "/name").once("value", function(snapshot) {
        bioname = snapshot.val();
        console.log(bioname);
        $("#bio_name").append(bioname);
        var biobutton = $('<button class="btn btn-danger git" id="' + bioname + '">Github Profile</button>')
        $("#bio_github").append(biobutton);
    })
    database.ref('profiles/' + this.id + "/bio").once("value", function(snapshot) {
        biobio = snapshot.val();
        console.log(biobio);
        $("#bio_bio").append(biobio);
    })

});

// function updateScroll() {
//     var element = document.getElementById("chat-window");
//     element.scrollTop = element.scrollHeight;
// }

// var $el = $("#chat-box");

// function anim() {
//     var st = $el.scrollTop();
//     var sb = $el.prop("scrollHeight");
//     $el.animate({ scrollTop: st < sb / 5 ? sb : 0 }, 1000, anim);
// }

// function stop() {
//     $el.stop();
// }
// anim();
// $el.hover(stop, anim);




biolist();
window.setInterval(chatdisplaystart, 1000);
display();