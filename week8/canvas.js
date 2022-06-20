var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
context.strokeStyle = "red";
context.fillStyle = "rgba(0, 0, 255, 0.5)";
context.fillRect(10, 10, 100, 100);
context.strokeRect(10, 10, 100, 100);

function drawPattern() {
    var canvas = document.getElementById("demo2");
    var context = canvas.getContext("2d");
    context.strokeStyle = 'red';
    
    var img = new Image();
    img.src = "../images/flame.jpg";
    img.onload = function() {
        var pattern = context.createPattern(img, 'repeat');
        context.fillStyle = pattern;
        context.fillRect(10, 10, 150, 150);
        context.strokeRect(10, 10, 150, 150);
    };
}

drawPattern();

function drawGradient() {
    var canvas = document.getElementById("demo3");
    var context = canvas.getContext("2d");
    context.strokeStyle = 'red';
    var gradient = context.createLinearGradient(0, 0, 0, 200)
    gradient.addColorStop(0, "blue");
    gradient.addColorStop(0, "white");
    context.fillStyle = gradient;
    context.fillRect(10, 10, 100, 100);
    context.strokeRect(10, 10, 100, 100);
}

drawGradient();

var canvas4 = document.getElementById("demo4");

function drawCircle(canvas) {
    var context = canvas.getContext('2d');
    context.beginPath();
    context.arc(100, 100, 50, 0, Math.PI*2, true);
    context.closePath();
    context.strokeStyle = 'blue';
    context.fillStyle = 'yellow';
    context.lineWidth = 3;
    context.fill();
    context.stroke();
}

drawCircle(canvas4);

var canvas5 = document.getElementById("demo5");
var context = canvas5.getContext("2d");
context.strokeStyle = "red";
context.fillStyle = "rgba(0, 0, 255, 0.5)";
context.fillRect(10, 10, 100, 100);
context.strokeRect(10, 10, 100, 100);

function saveDrawing() {  
    var canvas5 = document.getElementById("demo5");
    window.open(canvas5.toDataURL("image/png"));
}

var button = document.getElementById("saveButton");
button.addEventListener("click", saveDrawing, false);