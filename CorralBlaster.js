window.onload = drawBoard;

function drawBoard() {
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");

	// Canvas background color
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// Draw hexagon grid
	var numRows = 13;
	var numCols = 12;
	var startX = 40;
	var startY = 20;
	var sideLen = 20;
	var i;
	for (i = 0; i < numRows; i++) {
		drawRow(numCols, startX, startY + i*(sideLen * Math.sqrt(3)), sideLen);
	}
}

// Draws a single hexagon
// X: x position for the top left corner
// Y: y position for the top left corner
// sideLen: length of each side of the hexagon
function drawHex(X, Y, sideLen) {

	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");

	// Top
	ctx.beginPath();
	ctx.moveTo(X, Y);
	X = X + sideLen;
	ctx.lineTo(X, Y);
	ctx.stroke();

	// Top right
	ctx.beginPath();
	ctx.moveTo(X, Y);
	X = X + sideLen/2;
	Y = Y + sideLen/2 * Math.sqrt(3);
	ctx.lineTo(X, Y);
	ctx.stroke();
	       
	// Bottom right
	ctx.beginPath();
	ctx.moveTo(X, Y);
	X = X - sideLen/2;
	Y = Y + sideLen/2 * Math.sqrt(3);
	ctx.lineTo(X, Y);
	ctx.stroke();

	// Bottom
	ctx.beginPath();
	ctx.moveTo(X, Y);
	X = X - sideLen;
	ctx.lineTo(X, Y);
	ctx.stroke();

	// Bottom Left
	ctx.beginPath();
	ctx.moveTo(X, Y);
	X = X - sideLen/2;
	Y = Y - sideLen/2 * Math.sqrt(3);
	ctx.lineTo(X, Y);
	ctx.stroke();

	// Top Left
	ctx.beginPath();
	ctx.moveTo(X, Y);
	X = X + sideLen/2;
	Y = Y - sideLen/2 * Math.sqrt(3);
	ctx.lineTo(X, Y);
	ctx.stroke();
}

// Draws two rows of hexagons (offset)
// numHexes: Number of hexagons per one row
// startX: top left x position for first hexagon
// startY: top left y position for first hexagon
// sideLen: length of one side of a hexagon
function drawRow(numHexes, startX, startY, sideLen) {
	var i;
	for (i = 0; i < numHexes; i++) {
		drawHex(startX + i*3*sideLen, startY, sideLen);
	}
	for (i = 0; i < numHexes; i++) {
		drawHex(startX + 1.5*sideLen + i*3*sideLen, startY + sideLen/2 * Math.sqrt(3), sideLen);
	}
}