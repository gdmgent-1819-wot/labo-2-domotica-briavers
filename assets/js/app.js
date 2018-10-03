
    // Initialize Firebase
    // TODO: Replace with your project's customized code snippet
var config = {
    apiKey: "AIzaSyDMujpxVSdyU5x3DHF_75UyRXc203ZdJY0",
    authDomain: "wot-1819-briavers.firebaseapp.com",
    databaseURL: "https://wot-1819-briavers.firebaseio.com",
    projectId: "wot-1819-briavers",
    storageBucket: "wot-1819-briavers.appspot.com",
    messagingSenderId: "1030285743994"
  };
  firebase.initializeApp(config)

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";

    var user = firebase.auth().currentUser;

    if(user != null){

      var email_id = user.email;
      document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;
      console.log(user)
      getStatus(user.uid);
    }

  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";

  }
});

function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

}

function logout(){
  firebase.auth().signOut();
}

let tempstr = '';

function createGrid() {
  for (let i = 0; i < 8; i++) {
    tempstr += `<tr>`
    for (let j = 0; j < 8; j++) {
      tempstr += `<td class='square' id='${i},${j}' </td>`
    }
    tempstr += `</tr>`

  }
  console.log('grided')
};
createGrid();

let table = document.getElementById('home');
table.innerHTML = tempstr;



function getStatus(userId) {

  let domoticaData;
  console.log(userId);


  var domotica = firebase.database().ref('domotica/users/' + userId);
  domotica.on('value', function (snapshot) {
        domoticaData = snapshot.val();
        console.log('loaded')
        writeStuff()
        raspberryDataDemo()
  });

  function writeStuff(){
    if (domoticaData == undefined){
      console.log("domoticaData")
      console.log(domoticaData)
      writeUserData(userId);
      
      
    }else{
      console.log("domoticaData")
      console.log(domoticaData)
      let statusRapport = document.getElementById('statusRapport')
      let tempstr = '';
      tempstr += (domoticaData.lights.light1) ? "<li> Licht 1 is aan</li>" : "<li> Licht 1 is uit </li>";
      tempstr += (domoticaData.lights.light2) ? "<li> Licht 2 is aan</li>" : "<li> Licht 2 is uit </li>";
      tempstr += (domoticaData.lights.light3) ? "<li> Licht 3 is aan</li>" : "<li> Licht 3 is uit </li>";
      tempstr += (domoticaData.lights.light4) ? "<li> Licht 4 is aan</li>" : "<li> Licht 4 is uit </li>";
      tempstr += (domoticaData.sockets.socket1) ? "<li> Stekker 1 is aan</li>" : "<li> Stekker 1 is uit </li>";
      tempstr += (domoticaData.sockets.socket2) ? "<li> Stekker 2 is aan</li>" : "<li> Stekker 2 is uit </li>";
      tempstr += (domoticaData.sockets.socket3) ? "<li> Stekker 3 is aan</li>" : "<li> Stekker 3 is uit </li>";
      tempstr += (domoticaData.sockets.socket4) ? "<li> Stekker 4 is aan</li>" : "<li> Stekker 4 is uit </li>";
      tempstr += (domoticaData.doors.door1) ? "<li> deur 1 is open</li>" : "<li> deur 1 is dicht </li>";
      tempstr += (domoticaData.doors.door2) ? "<li> deur 2 is open</li>" : "<li> deur 2 is dicht </li>";
      tempstr += (domoticaData.alarms.lights) ? "<li>lichten alarm gaat af </li>" : "<li> lichten alarm is uitgeschakeld </li>";
      tempstr += (domoticaData.alarms.sounds) ? "<li> geluids alarm gaat af</li>" : "<li>  geluids alarm is uitgeschakeld </li>";
      statusRapport.innerHTML = tempstr;

      if (domoticaData.lights.light1){
        document.getElementById(`2,3`).style.backgroundColor = "rgb(250,250,0)"
        document.getElementById(`2,3`).setAttribute('onclick', 'changeState("lights", "light1", false);')
      } else{
        document.getElementById(`2,3`).style.backgroundColor = "rgb(80, 80, 0)"
        document.getElementById(`2,3`).setAttribute('onclick', 'changeState("lights", "light1", true);')
      }
      if (domoticaData.lights.light2){
        document.getElementById(`2,7`).style.backgroundColor = "rgb(250,250,0)"
        document.getElementById(`2,7`).setAttribute('onclick', 'changeState("lights", "light2", false);')
      } else{
        document.getElementById(`2,7`).style.backgroundColor = "rgb(80, 80, 0)"
        document.getElementById(`2,7`).setAttribute('onclick', 'changeState("lights", "light2", true);')
      }
      if (domoticaData.lights.light3){
        document.getElementById(`5,3`).style.backgroundColor = "rgb(250,250,0)"
        document.getElementById(`5,3`).setAttribute('onclick', 'changeState("lights", "light3", false);')
      } else{
        document.getElementById(`5,3`).style.backgroundColor = "rgb(80, 80, 0)"
        document.getElementById(`5,3`).setAttribute('onclick', 'changeState("lights", "light3", true);')
      }
      if (domoticaData.lights.light4){
        document.getElementById(`5,7`).style.backgroundColor = "rgb(250,250,0)"
        document.getElementById(`5,7`).setAttribute('onclick', 'changeState("lights", "light4", false);')
      } else{
        document.getElementById(`5,7`).style.backgroundColor = "rgb(80, 80, 0)"
        document.getElementById(`5,7`).setAttribute('onclick', 'changeState("lights", "light4", true);')
      }



      if (domoticaData.sockets.socket1){
        document.getElementById(`3,0`).style.backgroundColor = "rgb(0,250,250)"
        document.getElementById(`3,0`).setAttribute('onclick', 'changeState("sockets", "socket1", false);')
      } else{
        document.getElementById(`3,0`).style.backgroundColor = "rgb(0, 80, 80)"
        document.getElementById(`3,0`).setAttribute('onclick', 'changeState("sockets", "socket1", true);')
      }
      if (domoticaData.sockets.socket2){
        document.getElementById(`0,4`).style.backgroundColor = "rgb(0,250,250)"
        document.getElementById(`0,4`).setAttribute('onclick', 'changeState("sockets", "socket2", false);')
      } else{
        document.getElementById(`0,4`).style.backgroundColor = "rgb(0, 80, 80)"
        document.getElementById(`0,4`).setAttribute('onclick', 'changeState("sockets", "socket2", true);')
      }
      if (domoticaData.sockets.socket3){
        document.getElementById(`4,0`).style.backgroundColor = "rgb(0,250,250)"
        document.getElementById(`4,0`).setAttribute('onclick', 'changeState("sockets", "socket3", false);')
      } else{
        document.getElementById(`4,0`).style.backgroundColor = "rgb(0, 80, 80)"
        document.getElementById(`4,0`).setAttribute('onclick', 'changeState("sockets", "socket3", true);')
      }
      if (domoticaData.sockets.socket4){
        document.getElementById(`7,4`).style.backgroundColor = "rgb(0,250,250)"
        document.getElementById(`7,4`).setAttribute('onclick', 'changeState("sockets", "socket4", false);')
      } else{
        document.getElementById(`7,4`).style.backgroundColor = "rgb(0, 80, 80)"
        document.getElementById(`7,4`).setAttribute('onclick', 'changeState("sockets", "socket4", true);')
      }


      if (domoticaData.doors.door1){
        document.getElementById(`0,0`).style.backgroundColor = "rgb(250,0,0)"
        document.getElementById(`0,1`).style.backgroundColor = "rgb(250,0,0)"
        document.getElementById(`0,2`).style.backgroundColor = "rgb(250,0,0)"
      } else{
        document.getElementById(`0,0`).style.backgroundColor = "rgb(80,0,0)"
        document.getElementById(`0,1`).style.backgroundColor = "rgb(80,0,0)"
        document.getElementById(`0,2`).style.backgroundColor = "rgb(80,0,0)"
      }
      if (domoticaData.doors.door2){
        document.getElementById(`7,0`).style.backgroundColor = "rgb(0,0,250)"
        document.getElementById(`7,1`).style.backgroundColor = "rgb(0,0,250)"
        document.getElementById(`7,2`).style.backgroundColor = "rgb(0,0,250)"
      } else{
        document.getElementById(`7,0`).style.backgroundColor = "rgb(0, 0, 80)"
        document.getElementById(`7,1`).style.backgroundColor = "rgb(0, 0, 80)"
        document.getElementById(`7,2`).style.backgroundColor = "rgb(0, 0, 80)"
      }

    }
  }
}


function writeUserData(userId) {
  firebase.database().ref('domotica/users/' + userId).set({
    lights: {
      light1 : false,
      light2 : false,
      light3 : false,
      light4 : false
    },
    sockets: {
      socket1 : false,
      socket2: false,
      socket3: false,
      socket4: false
    },
    doors: {
      door1 : false,
      door2 : false,
    },
    alarms: {
      sound: false,
      lights: false
    }
  });

};
let AlarmGoing = false
function startAlarm(){
  AlarmGoing = true
  userId = firebase.auth().currentUser.uid;
  firebase.database().ref('domotica/users/' + userId).update({
    alarms: {
      sounds: true,
      lights: true
    }
  })
}
function stopAlarm() {
  AlarmGoing = false
  userId = firebase.auth().currentUser.uid;
  firebase.database().ref('domotica/users/' + userId).update({
    alarms: {
      sounds: false,
      lights: false,
    }
  })
}


function changeState(type , name, newState) {
  userId = firebase.auth().currentUser.uid;
  console.log(newState)
  if (newState == false){
    firebase.database().ref('domotica/users/' + userId +'/' + type).update({
      [name] : false
    })
  }else {
      firebase.database().ref('domotica/users/' + userId +'/' + type).update({
        [name] : true
      })
  }
}


function raspberryDataDemo() {
  let data = [];

  if (AlarmGoing){
    console.log('alarms')
    data.push('ALARM')
  } else {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (document.getElementById(`${i},${j}`).style.backgroundColor == "") {
          data.push('(0,0,0)');
          
        } else {
          let led = document.getElementById(`${i},${j}`);
          let hex = led.style.backgroundColor;
          hex = hex.replace('rgb', '');
          data.push(hex);
        }
        
      }
    }
  }
    DBPush(data)
    function DBPush(data) {
      firebase.database().ref('domotica/liveExample').set({
        data,
      });
    
  };
};
