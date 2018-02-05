# Interactive-canvas-video-player
HTML5 canvas and video player to add functionality of drawing over the video

Substitute <source src="./Intro_Stephen.mp4" type='video/mp4'> in index.html for your video url.

It supports adding hotspots that are currently objects stored in an array. Adding more properties  to the hotspots
is straighforawrd just modify: var hotspot={posx:mouse.x,posy:mouse.y,start:c_time,end:v_end, link:"video"} on the function addHotspot()
