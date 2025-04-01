const canvas = document.getElementById("defaultCanvas");
const pencil = document.getElementById("pencilTool");
const line = document.getElementById("lineTool");
const ctx = canvas.getContext("2d");
var state = 0;
var canvasBackgroundColor =  "#FFFFFF";
let isDrawing = false;
let x = 0;
let y = 0;

pencil.onclick = function() {togglePencil()};
line.onclick = function() {toggleLine()};
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
	ctx.strokeStyle = "#000000";
	ctx.lineWidth = 10;
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
	ctx.closePath();
};

function drawLine(ctx, x1, y1, x2, y2) {
	ctx.beginPath();
	ctx.strokeStyle = "#000000";
	ctx.lineWidth = 10;
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	if (x1 != x2 && y1 != y2) {
		ctx.stroke();
	}
	ctx.closePath();
};
	

function togglePencil() {
	state = 0;
	console.log(state);
};

function toggleLine() {
	state = 1;
	console.log(state);
=======
};