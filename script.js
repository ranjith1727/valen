// Get canvas
var canvas = document.getElementById("starfield");
var context = canvas.getContext("2d");

// Resize canvas
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Starfield setup
var stars = window.innerWidth < 600 ? 150 : 500; // fewer stars on mobile
var colorrange = [0, 60, 240];
var starArray = [];

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Initialize stars
for (var i = 0; i < stars; i++) {
  starArray.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.2,
    hue: colorrange[getRandom(0, colorrange.length - 1)],
    sat: getRandom(50, 100),
    opacity: Math.random()
  });
}

// Animation variables
var frameNumber = 0;
var opacity = 0;
var secondOpacity = 0;

const button = document.getElementById("valentinesButton");
button.addEventListener("click", () => {
  window.location.href = "valentinesday.html";
});

// Draw stars
function drawStars() {
  for (var i = 0; i < stars; i++) {
    var star = starArray[i];
    context.beginPath();
    context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    context.fillStyle = `hsla(${star.hue}, ${star.sat}%, 88%, ${star.opacity})`;
    context.fill();
  }
}

// Update stars
function updateStars() {
  for (var i = 0; i < stars; i++) {
    if (Math.random() > 0.99) {
      starArray[i].opacity = Math.random();
    }
  }
}

// Draw text with line breaks
function drawTextWithLineBreaks(lines, x, y, fontSize, lineHeight) {
  lines.forEach((line, index) => {
    context.fillText(line, x, y + index * (fontSize + lineHeight));
  });
}

// Draw animated text
function drawText() {
  var fontSize = Math.min(30, window.innerWidth / 24);
  var lineHeight = 8;
  context.font = fontSize + "px Comic Sans MS";
  context.textAlign = "center";
  context.shadowColor = "rgba(45,45,255,1)";
  context.shadowBlur = window.innerWidth < 600 ? 2 : 8; // lighter shadow for mobile

  // Sequence text animation faster for mobile
  var step = window.innerWidth < 600 ? 0.03 : 0.01; // faster fade for mobile

  if (frameNumber < 500) {
    context.fillStyle = `rgba(45,45,255,${opacity})`;
    context.fillText("everyday I cannot believe how lucky I am", canvas.width / 2, canvas.height / 2);
    opacity += step;
  } else if (frameNumber >= 500 && frameNumber < 1000) {
    context.fillStyle = `rgba(45,45,255,${opacity})`;
    context.fillText("everyday I cannot believe how lucky I am", canvas.width / 2, canvas.height / 2);
    opacity -= step;
  } else if (frameNumber >= 1000) {
    context.fillStyle = `rgba(45,45,255,${opacity})`;
    drawTextWithLineBreaks(
      [
        "I love you so much Nikitha,",
        "more than all time and space can contain"
      ],
      canvas.width / 2,
      canvas.height / 2,
      fontSize,
      lineHeight
    );
    opacity = Math.min(opacity + step, 1);

    // Show button after main message
    context.fillStyle = `rgba(45,45,255,${secondOpacity})`;
    context.fillText("Happy Valentine’s Day ❤️", canvas.width / 2, canvas.height / 2 + 80);
    secondOpacity = Math.min(secondOpacity + step, 1);
    button.style.display = "block";
  }

  context.shadowBlur = 0;
}

// Main draw loop
function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height); // faster than putImageData
  drawStars();
  updateStars();
  drawText();
  frameNumber++;
  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);
