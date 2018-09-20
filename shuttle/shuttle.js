function update(){
  var currentTime;
  var shuttleTime;
  var nextANC = "";
  var nextCLC = "";
  var CLCtoANC = ["07:38",
                  "07:55",
                  "08:08",
                  "08:38",
                  "08:44",
                  "09:08",
                  "09:38",
                  "10:08",
                  "10:34",
                  "10:38",
                  "11:08",
                  "11:08",
                  "11:38",
                  "12:08",
                  "12:22",
                  "12:38",
                  "13:07",
                  "13:08",
                  "13:38",
                  "14:08",
                  "14:38",
                  "14:55",
                  "15:08",
                  "15:29",
                  "15:38",
                  "16:08",
                  "16:08",
                  "16:38",
                  "17:08"];

  var ANCtoCLC = ["07:45",
                  "08:15",
                  "08:37",
                  "08:45",
                  "09:14",
                  "09:15",
                  "09:45",
                  "10:15",
                  "10:45",
                  "11:01",
                  "11:15",
                  "11:45",
                  "12:15",
                  "12:15",
                  "12:45",
                  "13:00",
                  "13:15",
                  "13:34",
                  "13:45",
                  "14:15",
                  "14:45",
                  "15:15",
                  "15:22",
                  "15:45",
                  "16:01",
                  "16:15",
                  "16:30",
                  "16:45",
                  "17:15"];


    currentTime = timeNow() + "";

    for (i = ANCtoCLC.length; i > -1; i=i-1) {
      shuttleTime = ANCtoCLC[i];
      if(shuttleTime > currentTime) {
        nextANC = shuttleTime;
      }
    }
    if(nextANC==""){
      nextANC = ANCtoCLC[0];
    }
    document.getElementById("anc").innerHTML = militaryToStandard(nextANC);


    for (i = CLCtoANC.length; i > -1; i=i-1) {
      shuttleTime = CLCtoANC[i];
      if(shuttleTime > currentTime) {
        nextCLC = shuttleTime;
      }
    }
    if(nextCLC==""){
      nextCLC = CLCtoANC[0];
    }
    document.getElementById("clc").innerHTML = militaryToStandard(nextCLC);
}


function timeNow() {
  var d = new Date(),
      h = (d.getHours()<10?'0':'') + d.getHours(),
      m = (d.getMinutes()<10?'0':'') + d.getMinutes();
  return h + ':' + m;
}

function militaryToStandard(time){
  time = time.split(':'); // convert to array

  var hours = Number(time[0]);
  var minutes = Number(time[1]);

  var timeValue;

  if (hours > 0 && hours <= 12) {
    timeValue= "" + hours;
  } else if (hours > 12) {
    timeValue= "" + (hours - 12);
  } else if (hours == 0) {
    timeValue= "12";
  }

  timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
  timeValue += (hours >= 12) ? " P.M." : " A.M.";  // get AM/PM

  return timeValue
}
