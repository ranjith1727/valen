

var canvas = document.getElementById("starfield");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext("2d");
var stars = 500;
var colorrange = [0, 60, 240];
var starArray = [];

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Initialize stars
for (var i = 0; i < stars; i++) {
  var x = Math.random() * canvas.width;
  var y = Math.random() * canvas.height;
  var radius = Math.random() * 1.2;
  var hue = colorrange[getRandom(0, colorrange.length - 1)];
  var sat = getRandom(50, 100);
  var opacity = Math.random();
  starArray.push({ x, y, radius, hue, sat, opacity });
}

var frameNumber = 0;
var opacity = 0;
var secondOpacity = 0;
var thirdOpacity = 0;

var baseFrame = context.getImageData(0, 0, canvas.width, canvas.height);

function drawStars() {
  for (var i = 0; i < stars; i++) {
    var star = starArray[i];
    context.beginPath();
    context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    context.fillStyle = `hsla(${star.hue}, ${star.sat}%, 88%, ${star.opacity})`;
    context.fill();
  }
}

function updateStars() {
  for (var i = 0; i < stars; i++) {
    if (Math.random() > 0.99) {
      starArray[i].opacity = Math.random();
    }
  }
}

const button = document.getElementById("valentinesButton");

// 👉 REDIRECT TO NEXT PAGE
button.addEventListener("click", () => {
  window.location.href = "valentinesday.html";
});

function drawTextWithLineBreaks(lines, x, y, fontSize, lineHeight) {
  lines.forEach((line, index) => {
    context.fillText(line, x, y + index * (fontSize + lineHeight));
  });
}

function drawText() {
  var fontSize = Math.min(30, window.innerWidth / 24);
  var lineHeight = 8;

  context.font = fontSize + "px Comic Sans MS";
  context.textAlign = "center";

  context.shadowColor = "rgba(45, 45, 255, 1)";
  context.shadowBlur = 8;

  if (frameNumber < 250) {
    context.fillStyle = `rgba(45,45,255,${opacity})`;
    context.fillText(
      "everyday I cannot believe how lucky I am",
      canvas.width / 2,
      canvas.height / 2
    );
    opacity += 0.01;
  }

  if (frameNumber >= 250 && frameNumber < 500) {
    context.fillStyle = `rgba(45,45,255,${opacity})`;
    context.fillText(
      "everyday I cannot believe how lucky I am",
      canvas.width / 2,
      canvas.height / 2
    );
    opacity -= 0.01;
  }

  if (frameNumber === 500) opacity = 0;

  if (frameNumber > 500 && frameNumber < 750) {
    context.fillStyle = `rgba(45,45,255,${opacity})`;
    drawTextWithLineBreaks(
      ["amongst trillions of stars,", "over billions of years"],
      canvas.width / 2,
      canvas.height / 2,
      fontSize,
      lineHeight
    );
    opacity += 0.01;
  }

  if (frameNumber >= 750 && frameNumber < 1000) {
    context.fillStyle = `rgba(45,45,255,${opacity})`;
    drawTextWithLineBreaks(
      ["amongst trillions of stars,", "over billions of years"],
      canvas.width / 2,
      canvas.height / 2,
      fontSize,
      lineHeight
    );
    opacity -= 0.01;
  }

  if (frameNumber === 1000) opacity = 0;

  if (frameNumber > 1000 && frameNumber < 1250) {
    context.fillStyle = `rgba(45,45,255,${opacity})`;
    context.fillText(
      "to be alive, and to get to spend this life with you",
      canvas.width / 2,
      canvas.height / 2
    );
    opacity += 0.01;
  }

  if (frameNumber >= 1250 && frameNumber < 1500) {
    context.fillStyle = `rgba(45,45,255,${opacity})`;
    context.fillText(
      "to be alive, and to get to spend this life with you",
      canvas.width / 2,
      canvas.height / 2
    );
    opacity -= 0.01;
  }

  if (frameNumber === 1500) opacity = 0;

  if (frameNumber > 1500 && frameNumber < 1750) {
    context.fillStyle = `rgba(45,45,255,${opacity})`;
    context.fillText(
      "is so incredibly, unfathomably unlikely",
      canvas.width / 2,
      canvas.height / 2
    );
    opacity += 0.01;
  }

  if (frameNumber >= 1750 && frameNumber < 2000) {
    context.fillStyle = `rgba(45,45,255,${opacity})`;
    context.fillText(
      "is so incredibly, unfathomably unlikely",
      canvas.width / 2,
      canvas.height / 2
    );
    opacity -= 0.01;
  }

  if (frameNumber === 2000) opacity = 0;

  if (frameNumber > 2000) {
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
    opacity += 0.01;
  }

  if (frameNumber >= 2750) {
    context.fillStyle = `rgba(45,45,255,${secondOpacity})`;
    context.fillText(
      "Happy Valentine’s Day ❤️",
      canvas.width / 2,
      canvas.height / 2 + 80
    );
    secondOpacity += 0.01;

    button.style.display = "block";
  }

  context.shadowBlur = 0;
}

function draw() {
  context.putImageData(baseFrame, 0, 0);
  drawStars();
  updateStars();
  drawText();
  frameNumber++;
  requestAnimationFrame(draw);
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  baseFrame = context.getImageData(0, 0, canvas.width, canvas.height);
});

requestAnimationFrame(draw);
