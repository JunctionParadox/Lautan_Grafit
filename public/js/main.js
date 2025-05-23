const canvas = document.getElementById("defaultCanvas");
const pencil = document.getElementById("pencilTool");
const line = document.getElementById("lineTool");
const eraser = document.getElementById("eraserTool");
const bucket = document.getElementById("bucketTool");
const colourButton = document.getElementById("colourButton");
const colour = document.getElementById("colourSelection");
const colourDisplay = document.querySelector("colourDisplay");
const colourHide = document.getElementById("colourHide");
const sizeDisplay = document.getElementById("sizeDisplay");
const lock = document.getElementById("lockToggle");
const reset = document.getElementById("resetTool");
const fileList = document.getElementById("fileList");
const ctx = canvas.getContext("2d");
var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
var data = imageData.data;
var state = 0;
var canvasBackgroundcolour =  "#FFFFFF";
var pencilColor = "#000000";
var pencilSize = 10;
let isDrawing = false;
let x = 0;
let y = 0;

pencil.onclick = function() {togglePencil()};
line.onclick = function() {toggleLine()};
eraser.onclick = function() {toggleEraser()};
bucket.onclick = function() {toggleBucket()};
colourButton.onclick = function() {showColourWindow()};
colourHide.onclick = function() {hideColourWindow()};
lock.onchange = function() {toggleLock()};
reset.onclick = function() {resetCanvas(ctx)};
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
	if (state == 3)
	{
		flood(ctx, e, y);
	}
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
	ctx.lineWidth = pencilSize;
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
	ctx.closePath();
};

function drawLine(ctx, x1, y1, x2, y2) {
	ctx.beginPath();
	ctx.strokeStyle = pencilSize;
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
	colourDisplay.innerHTML = pencilColor;
	colourDisplay.style.backgroundColor = pencilColor;
	if ((red + green + blue) > 255) {
		colourDisplay.style.color = "#000000";
	}
	else {
		colourDisplay.style.color = "#FFFFFF";
	}
}

function setPencilSize() {
	pencilSize = document.getElementById("pencilsize").value;
	sizeDisplay.innerHTML = pencilSize + " px";
}

//img = new Image();

/* function flood() {
	for(let i = 0; i < data.length; i += 4) {
		const red = data[i];
		const green = data[i + 1];
		const blue = data[i + 2];
		const alpha = data[i + 3];
		console.log(red, green, blue, alpha)
	}
	ctx.drawImage(img, 0, 0);
}  */

//img.src = "wawa.png";

function flood(x, y)
{
}

function showColourWindow() {
	colour.show();
}

function hideColourWindow() {
	colour.close();
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

function toggleBucket() {
	state = 3;
	console.log(state);
};

function toggleLock() {
	if (lock.checked == true) {
		reset.disabled = false;
	}
	else {
		reset.disabled = true;
	}
}

function resetCanvas(ctx) {
	ctx.fillStyle = "#FFFFFF";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	state = 0;
	pencilColor = "#000000";
	lock.checked = false;
	toggleLock();
}

const save = document.getElementById("saveButton");
save.onclick = function() {saveCanvas()};

const load = document.getElementById("loadButton");
load.onclick = function() {loadCanvas()};

async function saveCanvas() {
	var value = document.getElementById("saveFileName").value;
	const data = canvas.toDataURL("image/png")
	const url = "http://localhost:3000/images/" + value;
	const response = await fetch(url, {
		method: "POST",
		body: data,
	})
	.then(response => {
		if (response.ok) return response;
		else throw Error("Server returned ${response.status}: ${repsonse.statusText}") 
	})
	//.then(response => {console.log(response.text())})
	.catch(err => {
		alert(err);
	});
	console.log(response.status)
}

async function loadCanvas() {
	const url = "http://localhost:3000/images/"
	const response = await fetch(url)
	.then(response => {
		if (response.ok) {
			return response.json()
			.then((data) => {fileList.innerHTML = JSON.stringify(data)});
		}
	})
	.catch(err => {
		alert(err);
	})
}