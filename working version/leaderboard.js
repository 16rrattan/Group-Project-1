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
var globalname;
var onevote = true;

// when the user clicks submit -->
$("#add-user").on("click", function(event) {
    event.preventDefault();
    cleartopdiv();

    // user input
    var Tproject = $("#input-project").val().trim();

    //member object
    if (globalname != "" && Tproject != "") {


        database.ref('profiles/' + globalname).once("value", function(snapshot) {
            console.log(globalname);
            console.log(Tproject);
            var locprofiles = {
                name: globalname,
                project: Tproject,
            };
            database.ref("profiles").set(locprofiles);

            // database.ref(name + "/name").set(name);
            // database.ref(name + "/project").set(project);
            // database.ref(name + "/value").set(0);
            database.ref("ranking/" + Tname).set(0)

        })

    }

    $("#input-name").val("");
    $("#input-project").val("");
    cleartopdiv();
})




//code when the leaderboard is clicked -->

$("body").on("click ", '.link', function() {
    console.log("button works")
    console.log(this.id);
    database.ref('profiles/' + this.id + "/project").once("value", function(snapshot) {

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
    $('.test').empty();
    console.log("cleared the top div")
}

function clearbottomdiv() {
    $('.list-group').empty();
    console.log("cleared the bottom div")
}




//used to display the leaderboard in ranking value order -->

function display() {

    var ranking = firebase.database().ref("ranking/");

    ranking.orderByValue().on("value", function(data) {
        cleartopdiv();
        console.log("wrote to top div")
        data.forEach(function(data) {
            var buttons = $('<button class="btn btn-info link" style="margin: 3px"' + 'id="' + data.key + '">' + data.key + '</button>')
            $(".test").append(buttons);
        });

    });
    database.ref("ranking").on("value", function(data) {
        clearbottomdiv();
        console.log("wrote to the bottom div")
        data.forEach(function(data) {
            var voting = $('<li class="list-group-item">' + data.key + '<button class="btn btn-outline-danger down"' + 'id="' + data.key + '" style="float: right">Sucks</button>' + '<button class="btn btn-outline-success up"' + 'id="' + data.key + '"  style="float: right">Great</button>' + '</li>')
            $(".list-group").append(voting);
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
                globalname = printname;
                console.log(globalname)
            } else {
                console.log(globalname)
            }
        })
    }
});


//create profile -->
function clearcprofile() {
    $("#input-name").val("");
    $("#input-password").val("");
    $("#input-email").val("");
    $("#input-github").val("");
    $("#input-bio").val("");
};

$("#add-profile").on("click", function(event) {
    event.preventDefault();
    cleartopdiv();

    // user input
    var Tname = $("#input-name").val().trim();
    var Tpassword = $("#input-password").val().trim();
    var Temail = $("#input-email").val().trim();
    var Tgithub = $("#input-github").val().trim();
    var Tbio = $("#input-bio").val().trim();

    //member object
    if (Tname != "" && Tpassword != "") {


        database.ref('profiles').once("value", function(snapshot) {
            var locprofiles = {
                name: Tname,
                password: Tpassword,
                email: Temail,
                github: Tgithub,
                bio: Tbio
            };
            var checkname;
            database.ref('profiles/').on("child_added", function(snapshot) {
                checkname = snapshot.val().name;
                if (Tname !== checkname) {
                    database.ref("profiles").push(locprofiles);
                    database.ref("ranking/" + Tname).set(0)
                    clearcprofile();
                } else {
                    console.log("account already exists")
                    clearcprofile();
                }
            })

        })

    }
})




//this is for the chatroom 

$("chat-submit").on("click", function(event) {
    event.preventDefault();

    // user input
    var Ttext = $("#input-text").val().trim();
    console.log(Ttext);
    var vistext = globalname + ": " + Ttext;
    console.log(vistext);

    //chat storage

    database.ref('chat').once("value", function(snapshot) {

        database.ref("chat").push(vistext);
        var totalchat = snapshot.val();
        $("#chatdiv").append(totalchat);

    })

})




//this is the code for the list of bio buttons
function biolist() {


    var ranking = firebase.database().ref("ranking/");

    ranking.orderByValue().on("value", function(data) {
        cleartopdiv();
        console.log("wrote to top div")
        data.forEach(function(data) {
            var buttons = $('<button class="btn btn-info link" style="margin: 3px"' + 'id="' + data.key + '">' + data.key + '</button>')
            $(".bio_list").append(buttons);
        });

    });

}

biolist();
display();