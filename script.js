const room = document.getElementById("room");

const lightStatus = document.getElementById("lightStatus");
const sensorStatus = document.getElementById("sensorStatus");
const powerStatus = document.getElementById("powerStatus");
const energyStatus = document.getElementById("energyStatus");

const roomMessage = document.getElementById("roomMessage");

const bulbWatts = 9;

let personInRoom = false;
let energyUsed = 0;
let lastTime = Date.now();

function updateEnergy() {
  const currentTime = Date.now();
  const hoursPassed = (currentTime - lastTime) / 3600000;

  if (personInRoom) {
    energyUsed += bulbWatts * hoursPassed;
  }

  lastTime = currentTime;

  energyStatus.textContent = energyUsed.toFixed(3) + " Wh";
}

function turnLightOn() {
  room.classList.add("light-on");

  lightStatus.textContent = "ON";
  lightStatus.style.color = "#ffdc68";

  sensorStatus.textContent = "Motion";
  sensorStatus.style.color = "#5ee3a2";

  powerStatus.textContent = bulbWatts + " W";
  powerStatus.style.color = "#ffdc68";

  roomMessage.textContent = "Motion detected - Light is ON";
}

function turnLightOff() {
  room.classList.remove("light-on");

  lightStatus.textContent = "OFF";
  lightStatus.style.color = "#a9bad0";

  sensorStatus.textContent = "Standby";
  sensorStatus.style.color = "#a9bad0";

  powerStatus.textContent = "0 W";
  powerStatus.style.color = "#a9bad0";

  roomMessage.textContent = "No motion detected - Light is OFF";
}

room.addEventListener("mouseenter", function () {
  personInRoom = true;
  turnLightOn();
});

room.addEventListener("mouseleave", function () {
  updateEnergy();
  personInRoom = false;
  turnLightOff();
});

setInterval(updateEnergy, 250);