var hexes=[];
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.addEventListener("mousedown", handleClick, false);
var yourTurn = true;
var score = 156;

// Define board variables
var numRows = 13;
var numCols = 12;
var startX = 40;
var startY = 20;
var sideLen = 20;
var chanceOfWall = 22; // Chances will be 1 in chanceOfWall
var blasterLoc = 150;

$(document).ready(function(){
	// Start by drawing the board
	drawBoard();

	//HighScoreAPI call
	update_scores();
});

// Function to define the set of points for a hexagon and
// add said hexagon to the hexagon list
// X: the top left x position of the hexagon
// Y: the top right x position of the hexagon
// sideLen: the length of each side of the hexagon
function getPoints(X, Y, sideLen) {

	var xPoints = [];
	var yPoints = [];
	xPoints.push(X);
	yPoints.push(Y);

	// Top
	X = X + sideLen;
	xPoints.push(X);
	yPoints.push(Y);

	// Top right
	X = X + sideLen/2;
	Y = Y + sideLen/2 * Math.sqrt(3);
	xPoints.push(X);
	yPoints.push(Y);
	       
	// Bottom right
	X = X - sideLen/2;
	Y = Y + sideLen/2 * Math.sqrt(3);
	xPoints.push(X);
	yPoints.push(Y);

	// Bottom
	X = X - sideLen;
	xPoints.push(X);
	yPoints.push(Y);

	// Bottom Left
	X = X - sideLen/2;
	Y = Y - sideLen/2 * Math.sqrt(3);
	xPoints.push(X);
	yPoints.push(Y);

	// Top Left
	X = X + sideLen/2;
	Y = Y - sideLen/2 * Math.sqrt(3);
	xPoints.push(X);
	yPoints.push(Y);

	var hex={
		Xpts: xPoints,
		Ypts: yPoints,
		color: "lawngreen",
	}

	hexes.push(hex);
}

// Function to draw the board on the canvas 
// Also initializes all of the hexagons
// Takes no arguments
function drawBoard() {

	// Canvas background color
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	var i, j;
	// Define all of the hexagons on the grid (get their points)
	for (j = 0; j < numRows; j++) {
		for (i = 0; i < numCols; i++) {
			getPoints(startX + i*3*sideLen, startY + j*(sideLen * Math.sqrt(3)), sideLen);
		}
		for (i = 0; i < numCols; i++) {
			getPoints(startX + 1.5*sideLen + i*3*sideLen, startY + sideLen/2 * Math.sqrt(3) + j*(sideLen * Math.sqrt(3)), sideLen);
		}
	}

	// Draw all of the hexagons on the canvas
	for (i = 0; i < hexes.length; ++i) {
		if (i == blasterLoc) {
			hexes[i].color = "gray";
		}
		else if (Math.floor(Math.random() * chanceOfWall) == 1) {
			hexes[i].color = "saddlebrown";
		}
		drawHex(hexes[i]);
	}
}

// Function that defines the path around a hexagon
// hex: the hexagon to define the path around
function definePath(hex) {
	var XPoints = hex.Xpts;
	var YPoints = hex.Ypts;
	ctx.beginPath();
	ctx.moveTo(XPoints[0], YPoints[0]);
	for(var i = 1; i < XPoints.length; i++) {
		ctx.lineTo(XPoints[i], YPoints[i]);
	}
}

// Function to draw a single hexagon on the canvas
// hex: the hexagon to draw on the canvas
function drawHex(hex) {
	definePath(hex);
	ctx.fillStyle = hex.color;
	ctx.fill();
	ctx.stroke();
}

// Function to handle a click inside the canvas
// This will put up a wall in the hexagon clicked
// Nothing will happen if it is not the player's turn
// e: the mouse click event
function handleClick(e) {
	// Check that it's the user's turn
	if (yourTurn) {
		// Figure out where has been clicked
		var x = event.pageX;
		var y = event.pageY;
		x -= canvas.offsetLeft;
  		y -= canvas.offsetTop;

  	// Figure out which hexagon has been clicked
  	for (var i = 0; i < hexes.length; ++i) {
  		definePath(hexes[i]);
  		if (ctx.isPointInPath(x, y)) {
  			// Check that the click selection is valid
  			if (hexes[i].color == "lawngreen") {
  				--score;
  				// Put up a wall, switch user turn to false
  				hexes[i].color = "saddlebrown";
  				drawHex(hexes[i]);
  				yourTurn = false;
  				setTimeout(blasterTurn, 500);
  			}
  		}
  	}
	}
}

function blasterTurn() {
	// Move Blaster out of the previous spot
	hexes[blasterLoc].color = "lawngreen";
	drawHex(hexes[blasterLoc]);

	var tempLocation = -1000; // This number must be greater than -(numCols * 2)

	// Choose next spot to enter
	// Choices of offset to move away if Blaster is in an even numbered row
	var evenChoice = [-2*numCols, -1*numCols-1, -1*numCols, numCols-1, numCols, numCols*2]; 
	// Choices of offset to move away if Blaster is in an odd numbered row
	var oddChoice = [-2*numCols, -1*numCols, -1*numCols+1, numCols, numCols+1, numCols*2];
	var choices;

	// Get list of choices based off of which row Blaster is in
	if(Math.floor(blasterLoc/numCols) % 2 == 0) {
		choices = evenChoice;
	}
	else {
		choices = oddChoice;
	}

	// Try choices until one is valid
	while (tempLocation == -1000 && choices.length > 0) {
		var choiceI = Math.floor(Math.random() * choices.length); 
		tempLocation = blasterLoc + choices[choiceI];
		// Check to see if Blaster is still on the board
		if (tempLocation < 0 || tempLocation >= hexes.length) {
			alert("You lose!");
		}
		// Check to see if this was a valid move
		if (hexes[tempLocation].color == "saddlebrown") {
			choices.splice(choiceI, 1);
			tempLocation = -1000;
		}
	}	

	// Check to see if Blaster is stuck
	if (choices.length == 0) {
		highscore(score);
	}

	blasterLoc = tempLocation;

	// Redraw blaster at new spot, set yourTurn to true
	hexes[blasterLoc].color = "gray";
	drawHex(hexes[blasterLoc]);
	yourTurn = true;
}