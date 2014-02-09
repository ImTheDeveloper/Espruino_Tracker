function stopGPS(){
console.log("Disabling GPS...");
digitalWrite(C4,0);
}


function startGPS(){
console.log("Starting GPS...");
pinMode(C4,"output");
digitalWrite(C4,1);
//After 10 seconds disable the GPS
setTimeout(function (e) { stopGPS(); }, 10000);
}

function onInit() {
startGPS();
setTimeout(function (e) { onInit(); }, 30000);
}



console.log("Starting up Scripts...");
onInit();

Serial4.setup(9600);
var cmd ="";


function parse(e){
  //Turn the string into an array
  var temp = e.split(',');
 // print(temp[0]);
  if (e.indexOf('$GPGGA') != -1)
  {
digitalPulse(LED1,1,100);
digitalPulse(LED2,1,100);
digitalPulse(LED3,1,100);
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
