//Global Variables
var count = 0;
var enteredInfo = false;
var contactBoxShown = false;
var issueResolved = null;
var selectedOther = null;
var selectedWifi = null;
var selectedPrinting = null;
var passedLocation;
var slider = document.getElementById("myRange");
var output = document.getElementById("time");

function bodyOnload(){
  output.innerHTML = slider.value + " Minutes";
  getUrlParams();
}

function validate() {
  if(selectedOther == null && selectedWifi == null && selectedPrinting == null){//verify user selected a topic
    alert("You must select at least 1 topic");
    return false;
  }
  if(contactBoxShown == true){//verify user entered contact info if the fields are visible
    if(document.getElementById("FirstInput").value=="" && document.getElementById("LastInput").value=="" && document.getElementById("emailInput").value==""){
      alert("You must enter contact information");
      return false;
    }
  }
  if(issueResolved == null){//verify user selected yes/no
    alert("You must say whether your issue was resolved or not");
    return false;
  }
  submitForm();//validation passes
}

function submitForm(){
  var myVar = setTimeout(redirect, 3000);
  show("thanks",'block');
  hide("formBody");
  hide("mainTitle");
  return true;
}

function redirect() {
  var url = "https://benjamin-john.com/kiosk?"+passedLocation;
  window.open(url, "_self");
}

function getUrlParams(){//get parameters from URL
  const urlParams = new URLSearchParams(window.location.search);
  passedLocation = urlParams.get('location');
  if(passedLocation == null){passedLocation = "3900";}
  document.getElementById("formLocation").value = passedLocation;
  alert(document.getElementById("formLocation").value);
}

slider.oninput = function() {//adjust displayed number as user slides input
  output.innerHTML = this.value+ " Minutes";
}

function other(){//user selected OTHER option
  if(selectedOther == true){
    hide('otherBox');
    unselected('other');
    selectedOther = false;
  }else{
    show('otherBox','block');
    selected('other');
    selectedOther = true;
  }
}

function wifi() {//user selected WIFI option
  if(selectedWifi == true){
    unselected('eduroam');
    selectedWifi = false;
    document.getElementById("wifiBox").checked = false;
  }else{
    selected('eduroam');
    selectedWifi = true;
    document.getElementById("wifiBox").checked = true;
  }
}

function follow() {//user selected PRINTING option
  if(selectedPrinting == true){
    unselected('printing');
    selectedPrinting = false;
    document.getElementById("printingBox").checked = false;
  }else{
    selected('printing');
    selectedPrinting = true;
    document.getElementById("printingBox").checked = true;
  }
}

function optional() {//user selected ENTER CONTACT INFO option
    enteredInfo=true;
    contactBoxShown = true;
    show('contact','block');
    hide('optional');
    hide('optionalTitle');
}

function resolved() {//user selected YES
  issueResolved = true;
  unselected('unresolved');
  selected('resolved');
  document.getElementById("status2").checked = false;
  document.getElementById("status1").checked = true;
  if(enteredInfo==false){
    document.getElementById("contact").style.display = 'none';
    hide("contact");
    show("optional",'inline-block');
    show("optionalTitle",'block');
    contactBoxShown = false;
  }
}

function unresolved() {//user selected NO
  issueResolved = false;
  contactBoxShown = true;
  show("contact",'block');
  hide("optional");
  hide("optionalTitle");
  unselected('resolved');
  selected('unresolved');
  document.getElementById("status1").checked = false;
  document.getElementById("status2").checked = true;
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

function easterEgg() {
  count=count+1;
  if(count==10){
    document.getElementById("logo").style.display = 'none';
    document.getElementById("gif").style.display = 'block';
  }
}
