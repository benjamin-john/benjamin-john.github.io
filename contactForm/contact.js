var enteredInfo=false;
function bodyOnload(){

}
function redirect() {
  alert("Thank You");
  document.getElementById("FirstInput").value="";
  document.getElementById("textarea").value="";
  document.getElementById("emailInput").value="";
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
