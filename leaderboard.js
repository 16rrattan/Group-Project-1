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

// when the user clicks submit -->
$("#add-user").on("click", function(event) {
    event.preventDefault();
    cleartopdiv();

    // user input
    var Tname = $("#input-name").val().trim();
    var Tproject = $("#input-project").val().trim();

    //member object
    if (Tname != "" && Tproject != "") {


        database.ref().once("value", function(snapshot) {
            console.log(Tname);
            console.log(Tproject);
            var profiles = {
                name: Tname,
                project: Tproject,
                value: 0,
            };
            database.ref("profiles").push(profiles);

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

$("body").on("click ", '.link', function() {
    console.log("button works")
    console.log(this.id);
    database.ref(this.id + "/project").once("value", function(snapshot) {

        window.open(snapshot.val())
    })

});

$("body").on("click ", '.down', function() {
    tempidname = this.id;
    database.ref("ranking/" + tempidname).once("value", function(Snapshot) {
        var tempval = Snapshot.val() + 1;
        console.log(tempval);
        console.log("down button works");
        console.log(tempidname);

        database.ref(tempidname + "/value").set(tempval);
        database.ref("ranking/" + tempidname).set(tempval);

    })
});

$("body").on("click ", '.up', function() {
    tempidname = this.id;
    database.ref("ranking/" + tempidname).once("value", function(Snapshot) {
        var tempval = Snapshot.val() - 1;
        console.log(tempval);
        console.log("up button works");
        console.log(tempidname);

        database.ref(tempidname + "/value").set(tempval);
        database.ref("ranking/" + tempidname).set(tempval);

    })
});

function cleartopdiv() {
    $('.test').empty();
    console.log("cleared the top div")
}

function clearbottomdiv() {
    $('.list-group').empty();
    console.log("cleared the bottom div")
}


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

        database.ref('/James Crawford').orderByChild("name").equalTo('James Crawford').on("value", function(snap) {
            console.log(snap.val());
            console.log(snap.val());
        })

        // database.ref('profiles').equalTo(loginname).on("value", function(snapshot) {
        //     console.log(snapshot.val());
        //     var tempLname = snapshot.val();
        //     console.log(tempLname);
        // if (loginname = tempLname) {
        //     database.ref(loginname).orderByKey().equalTo(loginpassword).on("value", function(snapshot) {
        //         console.log(snapshot.key);
        //         var tempLpass = snapshot.key
        //         if (loginpassword = tempLpass) {
        //             globalname = loginname;
        //             console.log(globalname);
        //         } else
        //             alert("wrong name bucko");



        //     })
        // }

        // database.ref(loginname + "/name").set(loginname);
        // database.ref(loginname + "/password").set(loginpassword);
        // console.log(loginname);
        // console.log(loginpassword);

        // });
    }
});
display();
// (data.key + " rating is " + data.val())


// counter = snapshot.val();
//     console.log(counter);

//     function display() {
//         counter = snapshot.val();
//         console.log(counter);
//         $("test").empty();

//         for (i = 0; i < counter + 1; i++) {
//             console.log("loop works")
//             var name = snapshot.val().name;
//             var link = snapshot.val().project;
//             var buttons = $('<button class="btn btn-info" style="margin: 3px"' + 'onclick="window.location.href = ' + link + ';">' + name + '</button>')
//             buttons.appendTo('#test');

//         }
//     }
//     display()