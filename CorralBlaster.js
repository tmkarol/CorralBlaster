window.onload = drawBoard;

function drawBoard() {
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");

	// Canvas background color
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// Draw hexagon grid
	drawHex(40, 40, 20);
}

// Draws a hexagon with its top left corner at the given X and Y with the given side length
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