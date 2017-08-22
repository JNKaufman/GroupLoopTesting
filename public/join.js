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
var addProj = 0;
var currentUser = "";
var id = "";
sessionStorage.setItem("username", "Jenna");
function start(){
  var username = sessionStorage.username;
  currentUser = username;
}
function joinProj() {
  var able = true;
  database.ref("groups/" + id + "/members").once('value').then(function(snapshot){
    snapshot.forEach(function(childSnapshot) {
      if (childSnapshot.key == currentUser){
        able = false;
      }
    });
  if (able == true){
    firebase.database().ref("groups/" + id + "/members/" + currentUser).set({
      tasks : false,
    });
    window.location = "project.html";
  }
  else {
    document.getElementById('confirm').style = "display:none;";
    var pin = document.createElement('p');
    pin.textContent = "You are already a member of this group";
    document.body.appendChild(pin);
  };
  });
}
//find the project and add user using id
function findProj() {
  addProj += 1;
  var found = false;
  id = document.getElementById('retrieve').value.toUpperCase();
  database.ref("groups").once('value').then(function(snapshot){
    snapshot.forEach(function(childSnapshot) {
      if (childSnapshot.key == id){
        found = true;
      };
    });
    if (found) {
      database.ref("groups/" + id + "/name").once('value').then(function(snapshot){
        var name = snapshot.name;
      });
      document.getElementById('join').style = "display:none;";
      var pin = document.createElement('div');
      pin.id = "confirm";
      pin.textContent = "The name of this project is : "+ name + ", do you want to join this project?";
      var btn = document.createElement('button');
      btn.innerHTML = "Join Group";
      btn.onclick = joinProj;
      pin.appendChild(btn);
      document.body.appendChild(pin);
      } else {
      if (addProj == 1) {
        var pin = document.createElement('h3');
        pin.setAttribute("id", "error");
        pin.textContent = "Project not found";
        var a = document.getElementById('join');
        a.appendChild(pin);
      };
    };
  });
}
