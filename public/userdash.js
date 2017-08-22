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
sessionStorage.setItem("username", "jnk");
var username = sessionStorage.username;
var val = 0;
window.onload = disProj();

function disProj(){
  var ids = [];
  //FInd ids user is a part of
database.ref("users/" + username + "/projects").once('value').then(function(snapshot){
  snapshot.forEach(function(childSnapshot){
    ids.push(childSnapshot.key);
  })
  //Check if ids in list match ids of groups
  database.ref("groups").once('value').then(function(snapshot){
    snapshot.forEach(function(childSnapshot){
      json = String(childSnapshot.key);
      //Checks if id is valid
      for (var id in ids) {
        if (ids[id] == json) {
          //Calculates completion progress for group
            var num = 0;
            var complete = 0;
            database.ref("groups/" + ids[id] + "/members").once('value').then(function(snapshot){
              snapshot.forEach(function(childSnapshot) {
                childSnapshot.val().tasks.forEach(function(babySnapshot){
                  num += 1;
                  if (babySnapshot.completed == true) {
                    complete += 1;
                  }
                });
              });
              //Sets val equal to percent completed
              if (num == 0) {
                val = 0;
              }
              else {
                var avg = complete/num;
                var per = avg * 100;
                val = per;
              }
            });
            setTimeout(function(){
          //Create div for project
          var element = document.createElement('div');
          //Create project data div and add values
          var element2 = document.createElement('div');
          element2.class = "eachproject";
          var element3 = document.createElement('div');
          element3.class = "titles";
          //Titles div
          var element4 = document.createElement('p');
          //Show project name
          element4.innerHTML = "Project Name: " + childSnapshot.val().name;
          element3.appendChild(element4);
          element4 = document.createElement('p');
          //Add list of members to variable
          var members = "";
          childSnapshot.child('members').forEach(function(babySnapshot){
            members += babySnapshot.key;
            members += ", ";
          })
          element4.innerHTML = "Group Members: " + members;
          element3.appendChild(element4);
          //Add project name
          var element5 = document.createElement('p');
          element5.innerHTML = "Project Name: " + childSnapshot.val().classname;
          element3.appendChild(element5);
          //Add project name
          var element7 = document.createElement('p');
          element7.innerHTML = "Percent Complete: " + val + "%";
          element3.appendChild(element7);
          //Appending titles to project class
          element2.appendChild(element3);
          element.appendChild(element2);
          //Appending to the body
          document.getElementById('projects').appendChild(element);
        }, 1000);
        }
      }
    });
  });
});
}
