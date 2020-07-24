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

function searchJira() {
  var text = document.getElementById("searchBox").value;
  if(Number.isInteger(text)){
    var url="https://jira.bethel.edu/secure/QuickSearch.jspa?searchString=ITS-"+text;
  }else{
    var url="https://jira.bethel.edu/secure/QuickSearch.jspa?searchString="+text;
  }
  window.open(url, "_self");
}

function searchDashboard() {
  var text = document.getElementById("searchBox").value;
  if(!isNaN(text)){
    var url="https://jira.bethel.edu/secure/QuickSearch.jspa?searchString=ITS-"+text;
  }else{
    var url='https://jira.bethel.edu/issues/?jql=text%20~%20%22'+text+'%22%20AND%20project%20%3D%20%22Information%20Technology%20Services%22%20AND%20(%22ITS%20Team%22%20%3D%20%22CRM%20Admin%22%20OR%20assignee%20%3D%20currentUser()%20OR%20reporter%20%3D%20currentUser()%20OR%20watcher%20%3D%20currentUser()%20OR%20%22Request%20participants%22%20%3D%20currentUser())%20AND%20statusCategory%20!%3D%20Done%20ORDER%20BY%20updatedDate%20DESC';
  }
  window.open(url,  "_self");
}

function searchSF() {
  var text = document.getElementById("searchBox").value;
  var url;
  if(text.length == 18 && !/[\s~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?()\._]/g.test(text)) {
    url = 'https://bethel-university.lightning.force.com/' + text;
  } else {
    var encodedText = '{"componentDef":"forceSearch:search","attributes":{"term":"' + text + '","scopeMap":{"type":"TOP_RESULTS"},"context":{"disableSpellCorrection":false,"SEARCH_ACTIVITY":{"term":"' + text + '"}}}}';
    encodedText = window.btoa(encodedText);
    var url='https://bethel-university.lightning.force.com/one/one.app#'+encodedText;
  }
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

function copyTextToClipboard2(myVar) {
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

  textArea.value = myVar;
  document.body.appendChild(textArea);
  textArea.select();
  var successful = document.execCommand('copy');
  document.body.removeChild(textArea);
  if(successful) {
    alert("Successfully Copied Calendar Shareable URL to Clipboard");
  } else {
    alert("Copy was unsuccessful");
  }
}

function focusToSearch(){
  document.getElementById('searchBox').focus();
}

document.addEventListener('DOMContentLoaded', function() {//Puts cursor in search box
   //myVar = setTimeout(focusToSearch, 100);
   document.getElementById('searchBox').focus();
}, false);

document.addEventListener("keyup", function(event) {//focus to search bar if tab key is pressed
  if (event.keyCode === 9) {
      document.getElementById('searchBox').focus();
  }
}, false);

// document.addEventListener("visibilitychange", handleVisibilityChange, false);
//
// function handleVisibilityChange() {
//   if(document.hidden) {
//     // the page is hidden
//   } else {
//     // the page is visible
//     document.getElementById('searchBox').focus();
//   }
// }
