var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");

// Mouse
var mouse = {
	x:0,
	y:0,
	down:false,
	stopDragging:"none"
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
]

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

		// Windows
		for (var i = 0; i < windowsOpen.length; i++) {
			// Data stuffs
			var windowData = {
				title:"",
				data:"",
				mouseOverTitle:""
			}

			// Check if the mouse is over the window title
			if (mouse.x > windowsOpen[i][1] && mouse.x < windowsOpen[i][1] + Number(windowsOpen[i][3]) && mouse.y > windowsOpen[i][2] && mouse.y < windowsOpen[i][2] + 30) {
				windowData.mouseOverTitle = true;
				mouse.stopDragging = i;
			}

			// Draw the basics of the window
			c.lineWidth = "2";
			c.strokeStyle = "black";
			c.fillStyle = "white";
			c.fillRect(windowsOpen[i][1],windowsOpen[i][2],windowsOpen[i][3],windowsOpen[i][4]);
			c.fillStyle = "lightgrey";
			c.fillRect(windowsOpen[i][1],windowsOpen[i][2],windowsOpen[i][3],30);
			c.strokeRect(windowsOpen[i][1],windowsOpen[i][2],windowsOpen[i][3],windowsOpen[i][4]);
			c.strokeRect(windowsOpen[i][1],windowsOpen[i][2],windowsOpen[i][3],30);
			c.fillStyle = "black";
			c.font = "25px Arial";

			if (windowsOpen[i][0] == "welcome") {
				windowData.title = "Welcome to CrypticOS!";
				windowData.data = "CrypticOS Release 1";
			}

			// Resume drawing the window
			c.fillText(windowData.title,Number(windowsOpen[i][1]) + 3,Number(windowsOpen[i][2]) + 23);
			c.fillText(windowData.data,Number(windowsOpen[i][1]) + 3,Number(windowsOpen[i][2]) + 53);

			// Window dragging
			if (mouse.down && mouse.stopDragging == i) {
				windowsOpen[i][1] = mouse.x - 250;
				windowsOpen[i][2] = mouse.y - 15;
			}
		}

		// Code to stop dragging if mouse is not down
		if (!mouse.down) {
			mouse.stopDragging = "none";
		}


		// Start Menu Detector
		if (mouse.x > 5 && mouse.x < 45 && mouse.x > canvas.height - 45 && mouse.x < canvas.height - 5) {
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
		c.fillText("CrypticOS Login",canvas.width / 2 - 120,100);
		c.fillText("Unfinished, press any key.",canvas.width / 2 - 180,140);
	}


	// Techy Info 
	if (settings.techyInfo) {
		c.font = "15px Arial";
		c.fillStyle = "white";
		c.fillText("CrypticOS Release 1",3,15);
		c.fillText("Mouse X: " + mouse.x + " Mouse Y: " + mouse.x,3,30);
		c.fillText("Mouse Down: " + mouse.down,3,45);
		c.fillText("Current Window Dragging: " + mouse.stopDragging,3,60);
	}
},1);

// Get mouse X and Y
function getMouse(event) {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
}

// Handle Key Presses
document.body.onkeydown = function(e) {
	system.unlocked = true;
	if (e.key == "F3") {
		e.preventDefault();
		if (settings.techyInfo) {
			settings.techyInfo = false;
		} else {
			settings.techyInfo = true;
		}
	}
}

function openWindow(type) {

}