
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
  firebase.initializeApp(config);
  

let tempstr = '';
function createGrid() {
  for (let i = 0; i < 8; i++) {
    tempstr += `<tr>`
      for (let j = 0; j < 8; j++) {
       tempstr += `<td class='square' id='${i},${j}' onclick='changeColor(${i},${j})' </td>`
      }
    tempstr += `</tr>`
    
  }
  console.log('grided')
};
createGrid();

let table = document.getElementById('arcade');
table.innerHTML = tempstr;


function changeColor(i, j){
  console.log(i, ',',  j)
  let led = document.getElementById(`${i},${j}`);
  if (led.style.backgroundColor == "red") {
    console.log("is black")
    led.style.backgroundColor = "black";
  } else {
    led.style.backgroundColor = "red";
  }
  
  
};
    


function createChar(){
  data = { 
    light: {
      licht1: '#FFFFFF',
      licht2: '#FFFFFF',
      licht3: '#000000',
      licht4: '#FFFFFF',
    },
    socket: {
      socket1: true,
      socket2: false,
      socket3: true,
      socket4: true
    },
    door:{
      door1: true,
      door2: false
    }
  };

  DBPush(data)
  };

let name = new Date().getTime();
function DBPush(data){
  user = 'kcHAmoS4bQQ8AARlHNJyAoVmTLy1'
  firebase.database().ref('users/' + user ).set({
    data,
  });
}