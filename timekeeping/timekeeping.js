var action;
var name;
var scanning = false;
var gloabalProx;
var SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwWAi8ncz1oY1iZzVvlpLdH1fAajOoWjZ6gvRudBcxzteZ8AgKh/exec";

function bodyOnload(){
  startTime();
}

var proxInputField = document.getElementById("proxNumber");
proxInputField.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
        scanning = false;
        validate(e);
    }
});

function validate(e) {
    var enteredProx = e.target.value;
    gloabalProx = enteredProx;
    getName(enteredProx);
}

function displayScanID() {
  hide('formBody');
  show('scanID','block');
  scanning = true;
  focusAndClear()
}

function focusAndClear() {
    if(scanning == true){
      document.getElementById('proxNumber').value = "";
      document.getElementById('proxNumber').focus();
      var myVar = setTimeout(focusAndClear, 10000);
    }
}

function getName(prox) {
  var newURL = SCRIPT_URL+"?prox="+prox+"&action="+action+"&first=null"+"&last=null";
  name = httpGet(newURL);
  name = name.substring(1, name.length - 1);;
  if(name != "null" && name != null){
    displayGreeting(name);
  }else{
    getContactInfo();
  }
}

function displayGreeting(name) {
  hide('scanID');
  hide('enterInfo');
  if(action=="in"){
    document.getElementById('message').innerHTML = "Welcome " + name + "!";
  }
  if(action == "out"){
    document.getElementById('message').innerHTML = "Bye " + name + "!";
  }
  show('welcome','block');
  var myVar = setTimeout(redirect, 4000);
}

function getContactInfo() {
  show('enterInfo','block');
  hide('scanID');
}

function updateContactInfo() {
  var first = document.getElementById('FirstInput').value;
  var last = document.getElementById('LastInput').value;
  var newURL = SCRIPT_URL+"?prox="+gloabalProx+"&action="+action+"&first="+first+"&last="+last;
  name = httpGet(newURL);
  name = name.substring(1, name.length - 1);
  displayGreeting(name);
}

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  var half = " AM"
  if(h>12){
    h=h-12;
    half = " PM";
  }
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById('clock').innerHTML =
  h + ":" + m + ":" + s + half;
  var t = setTimeout(startTime, 500);
}

function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}

function ClockIn(){
  selected('in');
  unselected('out');
  action = 'in';
}
function ClockOut(){
  selected('out');
  unselected('in');
  action = 'out';
}

function loadingIcon(action){
  if(action=="start"){
    document.getElementById('spinner').classList.add('is-active');
  }
  if(action=="stop"){
    document.getElementById('spinner').classList.remove('is-active');
  }
}

function redirect() {//redirect back to blank form
  var url = "https://benjamin-john.com/timekeeping";
  window.open(url, "_self");
}

function selected(ID) {//Turn button yellow
  document.getElementById(ID).style.color = '#ffc531';
  document.getElementById(ID).style.borderColor = '#ffc531';
}

function unselected(ID) {//Turn button white
  document.getElementById(ID).style.color = 'white';
  document.getElementById(ID).style.borderColor = '#0069AA';
}

function hide(ID) {//hide passed element
  document.getElementById(ID).style.display = 'none';
}

function show(ID, STYLE) {//show passed element
document.getElementById(ID).style.display = STYLE;
}
