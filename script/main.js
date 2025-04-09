const canvas = document.getElementById("defaultCanvas");
const pencil = document.getElementById("pencilTool");
const line = document.getElementById("lineTool");
const eraser = document.getElementById("eraserTool");
const colourButton = document.getElementById("colourButton");
const colour = document.getElementById("colourSelection");
const colourDisplay = document.getElementById("colourDisplay");
const ctx = canvas.getContext("2d");
var state = 0;
var canvasBackgroundcolour =  "#FFFFFF";
var pencilColor = "#000000";
let isDrawing = false;
let x = 0;
let y = 0;

pencil.onclick = function() {togglePencil()};
line.onclick = function() {toggleLine()};
eraser.onclick = function() {toggleEraser()};
colourButton.onclick = function() {showColourWindow()};
canvas.onmousemove = function() {moveCursor(event)};
canvas.onmousedown = function() {cursorActivate(event)};
canvas.onmouseup = function() {cursorDeactivate(event)};
canvas.onmouseleave = function() {cursorExit()};

//MUST BE ROUND BECAUSE THE DEFAULT VALUE CAUSES JAGGED LINES AND DOESN'T COMPREHEND 1-DIMENSIONAL LINES
ctx.lineCap = "round";
ctx.imageSmoothingEnabled = false;

function moveCursor(e) {
	if (isDrawing) {
		if (state == 0) {
			drawDefault(ctx, x, y, e.offsetX, e.offsetY);
			x = e.offsetX;
			y = e.offsetY;
		}
		else if(state == 2) {
			erase(ctx, x, y, e.offsetX, e.offsetY);
			x = e.offsetX;
			y = e.offsetY;
		}
	}
};

function cursorActivate(e) {
	x = e.offsetX;
	y = e.offsetY;
	isDrawing = true;
};

function cursorDeactivate(e) {
	if (isDrawing) {
		if(state == 0) {
			drawDefault(ctx, x, y, e.offsetX, e.offsetY);
		}
		else if(state == 1) {
			console.log(ctx, x, y, e.offsetX, e.offsetY);
			drawLine(ctx, x, y, e.offsetX, e.offsetY);
		}
		else if(state == 2) {
			erase(ctx, x, y, e.offsetX, e.offsetY);
		}
		x = e.offsetX;
		y = e.offsetY;
		isDrawing = false;
	}
};

function cursorExit() {
	if (isDrawing) {
		isDrawing = false;
	}
};

function drawDefault(ctx, x1, y1, x2, y2) {
	ctx.beginPath();
	ctx.strokeStyle = pencilColor;
	ctx.lineWidth = 10;
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
	ctx.closePath();
};

function drawLine(ctx, x1, y1, x2, y2) {
	ctx.beginPath();
	ctx.strokeStyle = pencilColor;
	ctx.lineWidth = 10;
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	if (x1 != x2 && y1 != y2) {
		ctx.stroke();
	}
	ctx.closePath();
};

function erase(ctx, x1, y1, x2, y2) {
	ctx.beginPath();
	ctx.strokeStyle = canvasBackgroundcolour;
	ctx.lineWidth = 30;
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	if (x1 != x2 && y1 != y2) {
		ctx.stroke();
	}
	ctx.closePath();
};

function setColour() {
	red = parseInt(document.getElementById("red").value);
	green = parseInt(document.getElementById("green").value);
	blue = parseInt(document.getElementById("blue").value);
	rgb = ((red << 16) + (green << 8) + blue).toString(16).toUpperCase();
	x = rgb.length
	if (rgb.length < 6) {
		for (var i = 0; i < (6 - x);  i++)
		{
		rgb = "0" + rgb;
		}
	}
	pencilColor = "#" + rgb;
	console.log(pencilColor);
	colourDisplay.innerHTML = pencilColor;
	colourDisplay.style.backgroundColor = pencilColor;
	if ((red + green + blue) > 255) {
		colourDisplay.style.color = "#000000";
	}
	else {
		colourDisplay.style.color = "#FFFFFF";
	}
}

function showColourWindow() {
	colour.style.display = "block";
}

function hideColourWindow() {
	colour.style.display = "none";
}

function togglePencil() {
	state = 0;
	console.log(state);
};

function toggleLine() {
	state = 1;
	console.log(state);
};

function toggleEraser() {
	state = 2;
	console.log(state);
};