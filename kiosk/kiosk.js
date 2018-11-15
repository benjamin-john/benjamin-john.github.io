var count=0;
var enteredInfo=false;
function bodyOnload(){

}
function redirect() {
    window.open("https://benjamin-john.com/kiosk", "_self");
}

function validate() {
  if(document.getElementById("resolved").style.color == 'rgb(255, 197, 49)' || document.getElementById("unresolved").style.color == 'rgb(255, 197, 49)'){
    if(document.getElementById("eduroam").style.color == 'rgb(255, 197, 49)' || document.getElementById("printing").style.color == 'rgb(255, 197, 49)' || document.getElementById("other").style.color == 'rgb(255, 197, 49)') {
      if(document.getElementById("contact").style.display == 'block'){
        if(document.getElementById("FirstInput").value!="" && document.getElementById("LastInput").value!="" && document.getElementById("emailInput").value!=""){
          return true;
        }else{
          alert("You must enter contact information");
          return false;
        }
      }else{
        return true;
      }
    } else {
      alert("You must select at least 1 topic");
      return false;
    }
  }else{
    alert("You must say whether your issue was resolved or not");
    return false;
  }
}

function submitForm(){
  var myVar = setTimeout(redirect, 200);
  return true;
}

function other(){

  if(document.getElementById('otherBox').style.display == 'none'){
    document.getElementById("otherBox").style.display = 'block';
  } else {
    document.getElementById("otherBox").style.display = 'none';
  }

  if(document.getElementById('other').style.color == 'rgb(255, 197, 49)'){
    document.getElementById('other').style.color = 'white';
    document.getElementById('other').style.borderColor = '#0069AA';
  } else {
    document.getElementById('other').style.color = '#ffc531';
    document.getElementById('other').style.borderColor = '#ffc531';
  }
}

function wifi() {
  if(document.getElementById('eduroam').style.color == 'rgb(255, 197, 49)'){
    document.getElementById('eduroam').style.color = 'white';
    document.getElementById('eduroam').style.borderColor = '#0069AA';
    document.getElementById("wifiBox").checked = false;
  } else {
    document.getElementById('eduroam').style.color = '#ffc531';
    document.getElementById('eduroam').style.borderColor = '#ffc531';
    document.getElementById("wifiBox").checked = true;
  }
}


function follow() {
  if(document.getElementById('printing').style.color == 'rgb(255, 197, 49)'){
    document.getElementById('printing').style.color = 'white';
    document.getElementById('printing').style.borderColor = '#0069AA';
    document.getElementById("printingBox").checked = false;
  } else {
    document.getElementById('printing').style.color = '#ffc531';
    document.getElementById('printing').style.borderColor = '#ffc531';
    document.getElementById("printingBox").checked = true;
  }
}

function resolved() {
  if(document.getElementById('resolved').style.color == 'rgb(255, 197, 49)'){

  } else {
    if(enteredInfo==false){
      document.getElementById("contact").style.display = 'none';
      document.getElementById("optional").style.display = 'inline-block';
      document.getElementById("optionalTitle").style.display = 'block';
    }
    document.getElementById('unresolved').style.color = 'white';
    document.getElementById('unresolved').style.borderColor = '#0069AA';
    document.getElementById("status2").checked = false;
    document.getElementById('resolved').style.color = '#ffc531';
    document.getElementById('resolved').style.borderColor = '#ffc531';
    document.getElementById("status1").checked = true;
  }
}

function unresolved() {
  if(document.getElementById('unresolved').style.color == 'rgb(255, 197, 49)'){

  } else {
    document.getElementById("contact").style.display = 'block';
    document.getElementById("optional").style.display = 'none';
    document.getElementById("optionalTitle").style.display = 'none';
    document.getElementById('resolved').style.color = 'white';
    document.getElementById('resolved').style.borderColor = '#0069AA';
    document.getElementById("status1").checked = false;
    document.getElementById('unresolved').style.color = '#ffc531';
    document.getElementById('unresolved').style.borderColor = '#ffc531';
    document.getElementById("status2").checked = true;
  }
}


function test() {
  if(validate()==true){
      if(document.getElementById("status2").checked == true){
        document.getElementById("thanks").style.display = 'block';
        document.getElementById("formBody").style.display = 'none';
        document.getElementById("mainTitle").style.display = 'none';
         setTimeout(noThanks,3000);
      }else{
         document.getElementById("survey").style.display = 'block';
         document.getElementById("formBody").style.display = 'none';
         document.getElementById("mainTitle").style.display = 'none';
         setTimeout(noThanks,10000);
     }
   }
}


function onestar() {
  document.getElementById("surveyResult").value = "1";
  document.getElementById("star1").className = "yellowstar";
  document.getElementById("star2").className = "whitestar";
  document.getElementById("star3").className = "whitestar";
  document.getElementById("star4").className = "whitestar";
  document.getElementById("star5").className = "whitestar";
}
function twostar() {
  document.getElementById("surveyResult").value = "2";
  document.getElementById("star1").className = "yellowstar";
  document.getElementById("star2").className = "yellowstar";
  document.getElementById("star3").className = "whitestar";
  document.getElementById("star4").className = "whitestar";
  document.getElementById("star5").className = "whitestar";
}
function threestar() {
  document.getElementById("surveyResult").value = "3";
  document.getElementById("star1").className = "yellowstar";
  document.getElementById("star2").className = "yellowstar";
  document.getElementById("star3").className = "yellowstar";
  document.getElementById("star4").className = "whitestar";
  document.getElementById("star5").className = "whitestar";
}
function fourstar() {
  document.getElementById("surveyResult").value = "4";
  document.getElementById("star1").className = "yellowstar";
  document.getElementById("star2").className = "yellowstar";
  document.getElementById("star3").className = "yellowstar";
  document.getElementById("star4").className = "yellowstar";
  document.getElementById("star5").className = "whitestar";
}
function fivestar() {
  document.getElementById("surveyResult").value = "5";
  document.getElementById("star1").className = "yellowstar";
  document.getElementById("star2").className = "yellowstar";
  document.getElementById("star3").className = "yellowstar";
  document.getElementById("star4").className = "yellowstar";
  document.getElementById("star5").className = "yellowstar";
}

function noThanks(){
  document.getElementById("surveyResult").value = "No Response";
  document.getElementById("submit-form").click();
}

function optional() {
    enteredInfo=true;
    document.getElementById("contact").style.display = 'block';
    document.getElementById("optional").style.display = 'none';
    document.getElementById("optionalTitle").style.display = 'none';
}

function easterEgg() {
  count=count+1;
  if(count==10){
    document.getElementById("logo").style.display = 'none';
    document.getElementById("gif").style.display = 'block';
  }
}
