// Initialize Firebase
  var config = {
    apiKey: "AIzaSyABwUWqgL4pgKm9Ec_jHCrISgVMRNsdxIA",
    authDomain: "testcreatingproj-237df.firebaseapp.com",
    databaseURL: "https://testcreatingproj-237df.firebaseio.com",
    projectId: "testcreatingproj-237df",
    storageBucket: "testcreatingproj-237df.appspot.com",
    messagingSenderId: "986440387358"
  };
  firebase.initializeApp(config);
  //create database called database
  var database = firebase.database();
var currentUser = "";

sessionStorage.setItem("username", "Gabi");

  function start(){
    var username = sessionStorage.username;
    currentUser = username;
  }

  //function to generate a number
  function numGen() {
    var pin = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
      for (i=0; i<5; i++){
        pin += possible.charAt(Math.floor(Math.random() * possible.length));
      };

    //if/else code to look through database and see if the pin has been used before
    return pin;
}
//Store the data of the project
  function storeData(){
    var className = document.getElementById('name').value;
    var projName = document.getElementById('email').value;
    var dateDue = document.getElementById('duedate').value;
    //Generate project id
    var projId = numGen();
    sessionStorage.setItem("id", projId);
    //print project id on screen and replace contents of screen
    document.getElementById('create').style = "display:none;";
    var pin = document.createElement('h3');
    pin.textContent = "Your project id is: " + projId;
    document.body.appendChild(pin);
    var link = document.createElement('a');
    link.href = "project.html";
    link.innerHTML = "Go to project";
    document.body.appendChild(link);
    //Add project data to the database
    firebase.database().ref("groups/" + projId).set({
      //TODO add user to list of users
      name: projName,
      duedate: dateDue,
      classname: className,
      summary: "",
    });
    firebase.database().ref("groups/" + projId + "/members/" + currentUser).set({
      tasks : false,
    });
  }
