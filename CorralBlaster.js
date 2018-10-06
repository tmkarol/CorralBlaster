var hexes=[];
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.addEventListener("mousedown", handleClick, false);

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
		color: "lawngreen"
	}

	hexes.push(hex);
}

window.onload = drawBoard;

function drawBoard() {

	// Canvas background color
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// Draw hexagon grid
	var numRows = 13;
	var numCols = 12;
	var startX = 40;
	var startY = 20;
	var sideLen = 20;
	var i, j;

	for (j = 0; j < numRows; j++) {
		for (i = 0; i < numCols; i++) {
			getPoints(startX + i*3*sideLen, startY + j*(sideLen * Math.sqrt(3)), sideLen);
		}
		for (i = 0; i < numCols; i++) {
			getPoints(startX + 1.5*sideLen + i*3*sideLen, startY + sideLen/2 * Math.sqrt(3) + j*(sideLen * Math.sqrt(3)), sideLen);
		}
	}

	for (i = 0; i < hexes.length; ++i) {
		drawHex(hexes[i]);
	}
}

function definePath(hex) {
	var XPoints = hex.Xpts;
	var YPoints = hex.Ypts;
	ctx.beginPath();
	ctx.moveTo(XPoints[0], YPoints[0]);
	for(var i = 1; i < XPoints.length; i++) {
		ctx.lineTo(XPoints[i], YPoints[i]);
	}
}

function drawHex(hex) {

	/*var XPoints = hex.Xpts;
	var YPoints = hex.Ypts;
	ctx.beginPath();
	ctx.moveTo(XPoints[0], YPoints[0]);
	for(var i = 1; i < XPoints.length; i++) {
		ctx.lineTo(XPoints[i], YPoints[i]);
	} */
	definePath(hex);
	ctx.fillStyle = hex.color;
	ctx.fill();
	ctx.stroke();
}

function handleClick(e) {
	var x = event.pageX;
	var y = event.pageY;
	x -= canvas.offsetLeft;
  y -= canvas.offsetTop;

  for (var i = 0; i < hexes.length; ++i) {
  	definePath(hexes[i]);
  	if (ctx.isPointInPath(x, y)) {
  		hexes[i].color = "saddlebrown";
  		drawHex(hexes[i]);
  	}
  }
}