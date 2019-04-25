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

function calc() {
  var text = document.getElementById("searchBox").value;
  text = eval(text);
  document.getElementById("searchBox").value = text;
  document.getElementById('searchBox').select();
}

function onLoadFunction(){//allows you to submit serach by pressing Enter or run calc() by pressing Shift+Enter
  document.getElementById("menu").style.display = 'block';
  document.getElementById("searchBox")
      .addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode === 13 && event.shiftKey) {
          calc();
      }
      if (event.keyCode === 13 && !event.shiftKey && !event.ctrlKey) {
          document.getElementById("searchButton1").click();
      }
      if (event.keyCode === 13 && event.ctrlKey) {
          copyTextToClipboard();
      }
  });
}

function displayMenu() {
  document.getElementById("menu").style.display = 'block';
}

function copyTextToClipboard() {
  var textArea = document.createElement("textarea");

  // Place in top-left corner of screen regardless of scroll position.
  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;

  // Ensure it has a small width and height. Setting to 1px / 1em
  // doesn't work as this gives a negative w/h on some browsers.
  textArea.style.width = '2em';
  textArea.style.height = '2em';

  // We don't need padding, reducing the size if it does flash render.
  textArea.style.padding = 0;

  // Clean up any borders.
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';

  // Avoid flash of white box if rendered for any reason.
  textArea.style.background = 'transparent';

  textArea.value = document.getElementById("searchBox").value;
  document.body.appendChild(textArea);
  textArea.select();
  var successful = document.execCommand('copy');
  document.body.removeChild(textArea);
  if(successful) {
    document.getElementById('searchBox').value = "";
    document.getElementById('searchBox').focus();
  } else {
    alert("Error: Copy was unsuccessful");
  }
}

document.addEventListener('DOMContentLoaded', function() {//Puts cursor in search box
   document.getElementById('searchBox').focus();
}, false);
