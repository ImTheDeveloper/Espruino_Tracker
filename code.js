function timerFinished() {
  //Disable GPS
  digitalWrite(C4,0);
  // light the red LED for a second to signal that we're done
  console.log("Timer finished");
}

function startTimer(time) {
  // clear the current timer (if there was one)
  if (timerInterval!==undefined)
    clearInterval(timerInterval);
  timerInterval = undefined;
  // if there was a time (it wasn't just blank), start the timer
  if (time>0) {
    console.log("Start "+time+" sec counter");
    timerCount = time;
    // Call this every second...
    timerInterval = setInterval(function() {
      // decrement our counter
      timerCount--;
      if (timerCount<=0) {
        // if we reached zero, stop our timer and call timerFinished()
        clearInterval(timerInterval);
        timerInterval = undefined;
        timerFinished();
      } else {
        // otherwise just blink the green LED
        digitalPulse(LED3, 1, 100);
      }
    }, 1000);
  }
}

function startGPS()
{
  
}

function stopGPS()
{
  
}

function onInit() {
pinMode(C4,"output");
digitalWrite(C4,1);
startTimer(10);
setTimeout(function () { onInit(); }, 20000);
}





console.log("Starting up...");
onInit();
//Every 20 minutes re-run the init
Serial4.setup(9600);
var cmd ="";
var timerInterval;
var timerCount;


function parse(e){
  //Turn the string into an array
  var temp = e.split(',');
  
 // print(temp[0]);
  if (e.indexOf('$GPGGA') != -1)
  {
var sentence = temp.join();
  console.log(sentence);
    //Parse Time
    print('Time: ' +temp[1].substring(0,2)+':'+
          temp[1].substring(2,4)+':'+temp[1].substring(4,6));
    //If good Fix Then give me the Lat and Long
    if (temp[6]==1)
    {
      //Parse Latitude
     print(temp[2] + ' ' +temp[3]);
      //Parse Longitude
     print(temp[4] + ' ' +temp[5]);
      //Disable the GPS as we had a fix
      console.log("Fix Found, Disabling GPS...");
      digitalWrite(C4,0);
    }
  }
}

Serial4.onData(function (e) {
       if (e.data=="\r")
      {
        //print(cmd);
        parse(cmd);
        cmd="";
      }
      else
      {
        cmd += e.data;
      }
});









