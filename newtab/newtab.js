function search() {
  var url;
  var text = document.getElementById("searchBox").value;
  if(text.indexOf(".com")!== -1 || text.indexOf(".edu")!== -1 || text.indexOf(".org")!== -1){
    url=text;
    if(text.indexOf("http://")== -1 && text.indexOf("https://")== -1) {
      url="http://"+text;
    }
  } else {
    url="https://www.google.com/search?q="+text;
  }
  window.open(url, "_self");
}

function searchBethel() {
  var text = document.getElementById("searchBox").value;
  var url="https://www.bethel.edu/search/?q="+text;
  window.open(url, "_self");
}

function searchConfluence() {
  var text = document.getElementById("searchBox").value;
  var url="https://confluence.bethel.edu/dosearchsite.action?queryString="+text;
  window.open(url, "_self");
}

function onLoadFunction(){//allows you to submit serach by pressing Enter
  document.getElementById("searchBox")
      .addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode === 13) {
          document.getElementById("searchButton1").click();
      }
  });
}

document.addEventListener('DOMContentLoaded', function() {//Puts cursor in search box
   document.getElementById('searchBox').focus();
}, false);
