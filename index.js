var enteredInfo=false;
function bodyOnload(){

}
function redirect() {
  window.open("https://benjamin-john.com", "_self");
}
function validate() {
  if(document.getElementById("FirstInput").value!="" && document.getElementById("textarea").value!="" && document.getElementById("emailInput").value!=""){
    return true;
  }else{
    alert("You must enter contact information");
    return false;
  }
}
function submitForm(){
  if(validate()==true){
    var myVar = setTimeout(redirect, 200);
    return true;
  }
}

function contactButtonClick(){
  const targetDiv = document.getElementById("contactForm");
  if (targetDiv.style.display !== "none") {
    targetDiv.style.display = "none";
  } else {
    targetDiv.style.display = "block";
  }
}
