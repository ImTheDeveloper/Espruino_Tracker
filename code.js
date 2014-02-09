
Serial4.setup(9600);
var cmd ="";


//Stop our GPS using the enable pin
function stopGPS(){
console.log("Disabling GPS...");
digitalWrite(C4,0);
}

//Start our GPS using the enable pin
function startGPS(){
console.log("Starting GPS...");
pinMode(C4,"output");
digitalWrite(C4,1);
//After 120 seconds disable the GPS
setTimeout(function (e) { stopGPS(); }, 120000);
}

//Startup function
function onInit() {
startGPS();
  //Check for our location every...
setTimeout(function (e) { onInit(); }, 240000);
}


//SMS Sending Script
function sendSMS(input){
console.log("SMS TEXT: ");
console.log(input);
}


//Startup Function Call
onInit();



//Parse the GPS strings
function parse(e){
  //Turn the string into an array
  var temp = e.split(',');
 // print(temp[0]);
  if (e.indexOf('$GPGGA') != -1)
  {
//digitalPulse(LED1,1,100);
//digitalPulse(LED2,1,100);
//digitalPulse(LED3,1,100);
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
      var sms_string = temp[2]+','+temp[3]+','+temp[4]+','+temp[5];
      sendSMS(sms_string);
    }
  }
}


//Receive data from GPS & turn in to a string
Serial4.onData(function (e) {
       if (e.data=="\r")
      {
        parse(cmd);
        cmd="";
      }
      else
      {
        cmd += e.data;
      }
});








