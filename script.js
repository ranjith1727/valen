<canvas id="starfield"></canvas>
<button id="valentinesButton" style="display:none;">Next</button>
<script>
const canvas = document.getElementById("starfield");
const context = canvas.getContext("2d");

let stars = window.innerWidth < 600 ? 200 : 500; // fewer stars for mobile
let colorrange = [0, 60, 240];
let starArray = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Initialize stars
for (let i = 0; i < stars; i++) {
  let x = Math.random() * canvas.width;
  let y = Math.random() * canvas.height;
  let radius = Math.random() * 1.2;
  let hue = colorrange[getRandom(0, colorrange.length - 1)];
  let sat = getRandom(50, 100);
  let opacity = Math.random();
  starArray.push({ x, y, radius, hue, sat, opacity });
}

const button = document.getElementById("valentinesButton");
button.addEventListener("click", () => {
  window.location.href = "valentinesday.html";
});

// Timing
let startTime = null;

function drawStars() {
  starArray.forEach(star => {
    context.beginPath();
    context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    context.fillStyle = `hsla(${star.hue}, ${star.sat}%, 88%, ${star.opacity})`;
    context.fill();
  });
}

function updateStars() {
  starArray.forEach(star => {
    if (Math.random() > 0.99) star.opacity = Math.random();
  });
}

function drawTextWithLineBreaks(lines, x, y, fontSize, lineHeight, opacity) {
  context.fillStyle = `rgba(45,45,255,${opacity})`;
  lines.forEach((line, index) => {
    context.fillText(line, x, y + index * (fontSize + lineHeight));
  });
}

function draw(timestamp) {
  if (!startTime) startTime = timestamp;
  const elapsed = (timestamp - startTime) / 1000; // seconds

  context.clearRect(0, 0, canvas.width, canvas.height);
  drawStars();
  updateStars();

  const fontSize = Math.min(30, window.innerWidth / 24);
  const lineHeight = 8;
  context.font = fontSize + "px Comic Sans MS";
  context.textAlign = "center";
  context.shadowColor = "rgba(45,45,255,1)";
  context.shadowBlur = 8;

  // Timeline (time in seconds)
  if (elapsed < 5) { // 0-5s
    context.fillStyle = `rgba(45,45,255,${elapsed/5})`;
    context.fillText("everyday I cannot believe how lucky I am", canvas.width/2, canvas.height/2);
  } else if (elapsed < 10) { // 5-10s fade out
    context.fillStyle = `rgba(45,45,255,${1-(elapsed-5)/5})`;
    context.fillText("everyday I cannot believe how lucky I am", canvas.width/2, canvas.height/2);
  } else if (elapsed < 15) { // 10-15s
    drawTextWithLineBreaks(["amongst trillions of stars,", "over billions of years"], canvas.width/2, canvas.height/2, fontSize, lineHeight, (elapsed-10)/5);
  } else if (elapsed < 20) { // 15-20s fade out
    drawTextWithLineBreaks(["amongst trillions of stars,", "over billions of years"], canvas.width/2, canvas.height/2, fontSize, lineHeight, 1-(elapsed-15)/5);
  } else if (elapsed < 25) { // 20-25s
    context.fillText("i want to spend this life with you", canvas.width/2, canvas.height/2);
    context.fillStyle = `rgba(45,45,255,${(elapsed-20)/5})`;
  } else if (elapsed < 30) {
    context.fillText("i want to spend this life with you", canvas.width/2, canvas.height/2);
    context.fillStyle = `rgba(45,45,255,${1-(elapsed-25)/5})`;
  } else if (elapsed < 35) {
    context.fillText("is so incredibly, unfathomably unlikely", canvas.width/2, canvas.height/2);
    context.fillStyle = `rgba(45,45,255,${(elapsed-30)/5})`;
  } else if (elapsed < 40) {
    context.fillText("is so incredibly, unfathomably unlikely", canvas.width/2, canvas.height/2);
    context.fillStyle = `rgba(45,45,255,${1-(elapsed-35)/5})`;
  } else if (elapsed >= 40) {
    drawTextWithLineBreaks(
      ["I love you so much Nikitha,", "more than all time and space can contain"],
      canvas.width/2, canvas.height/2, fontSize, lineHeight, Math.min((elapsed-40)/5,1)
    );
    if(elapsed >= 50){ // show button after 50s
      button.style.display = "block";
    }
  }

  context.shadowBlur = 0;
  requestAnimationFrame(draw);
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

requestAnimationFrame(draw);
</script>
