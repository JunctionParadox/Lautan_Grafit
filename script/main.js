const canvas = document.getElementById("defaultCanvas");
const ctx = canvas.getContext("2d");
let isDrawing = false;
let x = 0;
let y = 0;

function moveCursor(e) {
	if (isDrawing) {
		drawDefault(ctx, x, y, e.offsetX, e.offsetY);
		x = e.offsetX;
		y = e.offsetY;
	}
};

function cursorActive(e) {
	x = e.offsetX;
	y = e.offsetY;
	isDrawing = true;
};

function cursorDeactivate(e) {
	if (isDrawing) {
		drawDefault(ctx, x, y, e.offsetX, e.offsetY);
		x = e.offsetX;
		y = e.offsetY;
		isDrawing = false;
	}
};

function drawDefault(ctx, x1, y1, x2, y2) {
	ctx.beginPath();
	ctx.strokeStyle = "#000000"
	ctx.lineWidth = 1;
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
	ctx.closePath();
};