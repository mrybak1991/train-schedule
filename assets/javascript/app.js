$(document).ready(function(){

    var firebaseConfig = {
        apiKey: "AIzaSyB610FfDj27gA8NIhZC36Vj7ZdSMLzdqlQ",
        authDomain: "test-8a006.firebaseapp.com",
        databaseURL: "https://test-8a006.firebaseio.com",
        projectId: "test-8a006",
        storageBucket: "",
        messagingSenderId: "1014797054797",
        appId: "1:1014797054797:web:c0936c916f8cc3e2"
      };
      
      firebase.initializeApp(firebaseConfig);

      var database = firebase.database();

    // var database = new Firebase("https://test-8a006.firebaseio.com/");

      $("#trainBut").on("click", function(){

        event.preventDefault();

        var train = $("#trainInput").val().trim();
        var destination = $("#desInput").val().trim();
        var time = moment($("#timeInput").val().trim(), "HH:mm").subtract(10, "years").format("X");;
        var frequency = $("#freqInput").val().trim();

        console.log(train);

        var newTrain = {
            name: train,
            destination: destination,
            trainTime: time,
            frequency: frequency,
        }

        database.ref().push(newTrain);

        $("#trainInput").val("");
        $("#desInput").val("");
        $("#timeInput").val("");
        $("#freqInput").val("");

        return false;
      });

      database.ref().on("child_added", function(childSnapshot){

        var firebaseName = childSnapshot.val().name;
        var firebaseDestination = childSnapshot.val().destination;
        var firebaseTrainTime = childSnapshot.val().trainTime;
        var firebaseFrequency = childSnapshot.val().frequency;

        var diffTime = moment().diff(moment.unix(firebaseTrainTime), "minutes");
        var timeRemainder = moment().diff(moment.unix(firebaseTrainTime), "minutes") % firebaseFrequency ; 
        var minutes = firebaseFrequency - timeRemainder;

        var nextTrain = moment().add(minutes, "m").format("hh:mm A");

        $("#trainSchedule > tbody").append("<tr><td>" + firebaseName + "</td><td>" + firebaseDestination + "</td><td>" + firebaseFrequency + " mins" + "</td><td>" + nextTrain + "</td><td>" + minutes + "</td></tr>");
      });


});