//Video
var video_element=document.getElementById("my-video");
video_element.width=window.innerWidth;
video_element.height=window.innerHeight;

//Canvas setup
var canvas= document.querySelector("canvas");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
var c=canvas.getContext("2d");


var hotspots=[];

var mouse={
  x:undefined,
  y:undefined
};

canvas.addEventListener("mousemove",getMousePosition,false);
canvas.addEventListener("mousedown",
 function(e){
  if(e.which===1){
    addHotspot();
  }
  else if (e.which===3) {
    deleteHotspot();
  }
}, false);

canvas.addEventListener('ondblclick', deleteHotspot,false);

function getMousePosition(event){
  mouse.x = event.x;
  mouse.y = event.y;
  mouse.x -= canvas.offsetLeft;
  mouse.y -= canvas.offsetTop;
}

function canvasApp(){
  updateHotspots();
  //Refreshes
  setTimeout(canvasApp);
}

function addHotspot(){
  //Only add if it's not over controls
  if(mouse.y<canvas.height-50){
    var c_time=video_element.currentTime;
    var v_end=video_element.duration;
    var hotspot={posx:mouse.x,posy:mouse.y,start:c_time,end:v_end, link:"video"};
    hotspots.push(hotspot);
  }
}

function deleteHotspot(){
  console.log("Len" + hotspots.length);
  for (var i=0;i<hotspots.length;i++){
    var h=hotspots[i];
    if(mouse.x-h.posx<20 && mouse.x-h.posx>-20 &&
    mouse.y-h.posy<20 && mouse.y-h.posy>-20){
      hotspots.splice(i,1);
      console.log(hotspots.length);
    }
  }
}
function updateHotspots(){
  c.clearRect(0, 0, canvas.width,canvas.height);
  for(var i=0;i<hotspots.length;i++){
    var h=hotspots[i];

    //Only if the current time is in the range of start-end
    if(video_element.currentTime>=h.start &&
    video_element.currentTime<=h.end){
      drawHotspots(h.posx,h.posy);

      //Interact with hotspot
      if(mouse.x-h.posx<20 && mouse.x-h.posx>-20 &&
      mouse.y-h.posy<20 && mouse.y-h.posy>-20){
        var link_info = "L: " + h.link ;
        var uv_info = "U: " + h.posx + " V: " + h.posy;
        var start_info = "S: " + h.start;
        var end_info = "E: " + h.end;
        displayHotspotInfo(link_info,uv_info,start_info,end_info,h.posx+15,h.posy+4);
      }
    }
  }
}

function drawHotspots(posx,posy){
  c.fillStyle="red";
  c.beginPath();
  c.arc(posx,posy,10,0, Math.PI*2,false);
  c.fill();
}

function displayHotspotInfo(link_info,uv_info,start_info,end_info,posx,posy){
  c.fillStyle="rgba(0,0,0,0.5)";
  c.fillRect(posx,posy,130,130);
  c.font="18px Arial";
  c.fillStyle="white";
  c.fillText(link_info,posx+5,posy+20);
  c.fillText(uv_info,posx+5,posy+45);
  c.fillText(start_info,posx+5,posy+70);
  c.fillText(end_info,posx+5,posy+95);
}

canvasApp();
