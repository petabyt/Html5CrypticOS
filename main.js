var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");
// Mouse
var mouse = {
	x:0,
	y:0,
	down:false,
	stopDragging:"none",
	offsetX:0,
	offsetY:0,
	up: true
}

// System stuffs (no touchy)
var system = {
	unlocked:false,
	fileSystem:"not ready"
}

// Settings
var settings = {
	backgroundColor:"green",
	taskbarColor:"lightgreen",
	techyInfo:false
}

// Hovers
var hover = {
	startButton:false
}

// Windows Open
var windowsOpen = [
	["welcome",window.innerWidth / 2 - 250,window.innerHeight / 2 - 300,"500","500"]
];
function renderButton(x,y,txt,winOut) {
	c.lineWidth = "2";
	c.strokeStyle = "black";
	c.fillStyle = "white"
	c.fillRect(x,y,x+50,y+50);
	c.font = "15px Arial";
	c.fillStyle = "black";
	c.fillText(txt,x,y+100);
	if(mouse.up && mouse.down && mouse.x>= x && mouse.y>=y && mouse.x<=x+50 && mouse.y<=y+50) {
	windowsOpen.push(winOut);
		mouse.up = false;
	}
	if(!mouse.down) {
	mouse.up = true;
	}
}

// Main Loop
setInterval(function() {

	// Do some stuff
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	c.clearRect(0,0,canvas.width,canvas.height);

	if (system.unlocked) {
		// Draw GUI
		c.fillStyle = settings.backgroundColor;
		c.fillRect(0,0,canvas.width,canvas.height);

		// Taskbar
		c.fillStyle = settings.taskbarColor;
		c.fillRect(0,canvas.height - 50,canvas.width,50);

		// Start Button
		c.strokeStyle = settings.taskbarColor;
		c.beginPath();
		c.arc(25,canvas.height - 25,20,0,2*Math.PI);
		c.stroke();
		if (hover.startButton) {
			c.fillStyle = "#3b3b3b";
		} else {
			c.fillStyle = "#2b2b2b";
		}
		c.fill();
		c.strokeStyle = "#757474";
		c.lineWidth = "5";
		c.strokeRect(15,canvas.height - 35,20,20);
		c.beginPath();
		c.moveTo(35,canvas.height - 35);
		c.lineTo(15,canvas.height - 15);
		c.stroke();

		// Do calculations for the time, and draw it to the desktop.
		c.fillStyle = "black";
		c.font = "20px Arial";
		var d = new Date();
		var time = ["","",""];
		if (d.getHours() > 12) {
			time[2] = "PM"
			time[0] = d.getHours() - 12;
		} else {
			time[2] = "AM";
			time[0] = d.getHours();
		}
		if (String(d.getMinutes()).length == 1) {
			time[1] = "0" + String(d.getMinutes());
		} else {
			time[1] = String(d.getMinutes());
		}
		c.fillText(time[0] + ":" + time[1] + " " + time[2],canvas.width - 90, canvas.height - 18);
		renderButton(10,10,"Welcome.txt",["welcome",window.innerWidth / 2 - 250,window.innerHeight / 2 - 300,"500","500"]);

		// Windows
		for (var i = 0; i < windowsOpen.length; i++) {
			// Data stuffs
			var windowData = {
				title:"",
				data:"",
				mouseOverTitle:""
			}
			if(windowsOpen[i][2]<=0) {
				windowsOpen[i][2] = 1;
			}
			if(windowsOpen[i][1]<=0) {
				windowsOpen[i][1] = 1;
			}
			if(windowsOpen[i][2]>=canvas.height-Number(windowsOpen[i][4])-50) {
				windowsOpen[i][2] = canvas.height-51-Number(windowsOpen[i][4]);
			}
			if(windowsOpen[i][1]>=canvas.width-Number(windowsOpen[i][3])) {
				windowsOpen[i][1] = canvas.width-1-Number(windowsOpen[i][3]);
			}
			// Check if the mouse is over the window title
			if (mouse.x > windowsOpen[i][1] && mouse.x < windowsOpen[i][1] + Number(windowsOpen[i][3]) && mouse.y > windowsOpen[i][2] && mouse.y < windowsOpen[i][2] + 30) {
				windowData.mouseOverTitle = true;
				if(mouse.stopDragging != i) {
				mouse.offsetX = windowsOpen[i][1]-mouse.x;
				mouse.offsetY = windowsOpen[i][2]-mouse.y;
				}
				
				mouse.stopDragging = i;
			}

			// Draw the basics of the window
			
			c.lineWidth = "2";
			c.strokeStyle = "black";
			if (mouse.down && mouse.stopDragging == i) {
				c.fillStyle = "lightgrey";
				c.globalAlpha = 0.5;
				c.fillRect(windowsOpen[i][1] - 5,windowsOpen[i][2] + 5,windowsOpen[i][3],windowsOpen[i][4]);
				c.globalAlpha = 1.0;
			}
			c.fillStyle = "white";
			c.fillRect(windowsOpen[i][1],windowsOpen[i][2],windowsOpen[i][3],windowsOpen[i][4]);
			c.fillStyle = "lightgrey";
			c.fillRect(windowsOpen[i][1],windowsOpen[i][2],windowsOpen[i][3],30);
			c.strokeRect(windowsOpen[i][1],windowsOpen[i][2],windowsOpen[i][3],windowsOpen[i][4]);
			c.strokeRect(windowsOpen[i][1],windowsOpen[i][2],windowsOpen[i][3],30);
			c.fillStyle = "black";
			c.font = "25px Arial";
			
			c.strokeStyle = "red";
			c.lineWidth = "2";
			c.beginPath();
			c.moveTo(windowsOpen[i][1] + Number(windowsOpen[i][3]) - 20,windowsOpen[i][2] + 10);
			c.lineTo(windowsOpen[i][1] + Number(windowsOpen[i][3]) - 10,windowsOpen[i][2] + 20);
			c.stroke();
			c.beginPath();
			c.moveTo(windowsOpen[i][1] + Number(windowsOpen[i][3]) - 10,windowsOpen[i][2] + 10);
			c.lineTo(windowsOpen[i][1] + Number(windowsOpen[i][3]) - 20,windowsOpen[i][2] + 20);
			c.stroke();
			// Get if the X is clicked
			if(mouse.down && mouse.x >= windowsOpen[i][1] + Number(windowsOpen[i][3]) - 20 && mouse.x <= windowsOpen[i][1] + Number(windowsOpen[i][3]) - 10 && mouse.y <= windowsOpen[i][2] + 20 && mouse.y >=windowsOpen[i][2] + 10) {
				console.log(windowsOpen.pop(i));
				i--;
				continue;
			}
			
			c.strokeStyle = "black";
			
			if (windowsOpen[i][0] == "welcome") {
				windowData.title = "Welcome to CrypticOS!";
				windowData.data = "Cool stuff will come soon.";
			}

			// Resume drawing the window
			c.fillText(windowData.title,Number(windowsOpen[i][1]) + 3,Number(windowsOpen[i][2]) + 23);
			c.fillText(windowData.data,Number(windowsOpen[i][1]) + 3,Number(windowsOpen[i][2]) + 53);

			// Window dragging
			if (mouse.down && mouse.stopDragging == i && system.unlocked) {
				windowsOpen[i][1] = mouse.x + mouse.offsetX;
				windowsOpen[i][2] = mouse.y + mouse.offsetY;
			}
		}

		// Code to stop dragging if mouse is not down
		if (!mouse.down) {
			mouse.stopDragging = "none";
		}


		// Start Menu Detector
		if (mouse.x > 5 && mouse.x < 45 && mouse.y > canvas.height - 45 && mouse.y < canvas.height - 5) {
			hover.startButton = true;
		} else {
			hover.startButton = false;
		}
	} else {
		// Login Screen
		c.fillStyle = "lightblue";
		c.fillRect(0,0,canvas.width,canvas.height);
		c.fillStyle = "white";
		c.font = "30px Arial";
		c.fillText("Welcome Back, user!",canvas.width / 2 - 130,100);
	}


	// Techy Info 
	if (settings.techyInfo) {
		c.font = "15px Arial";
		c.fillStyle = "white";
		c.fillText("CrypticOS HTML5 Test",3,15);
		c.fillText("Mouse X: " + mouse.x + " Mouse Y: " + mouse.x,3,30);
		c.fillText("Mouse Down: " + mouse.down,3,45);
		c.fillText("Current Window Dragging: " + mouse.stopDragging,3,60);
	}

	// Check for clicks
	if (mouse.down) {
		system.unlocked = true;
	}
},.1);

// Get mouse X and Y
function getMouse(event) {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
}

// Handle Key Presses
document.body.onkeydown = function(e) {
	if (e.key == "F3") {
		e.preventDefault();
		if (settings.techyInfo) {
			settings.techyInfo = false;
		} else {
			settings.techyInfo = true;
		}
	}
}

// Easy Function to open window
function openWindow(type) {

}
