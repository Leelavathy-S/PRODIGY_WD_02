let startTime, updatedTime, difference, interval;
let isRunning = false;
let lapCount = 0;

const display = document.getElementById('display');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const laps = document.getElementById('laps');

function updateTime() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;
  
  const time = new Date(difference);
  const minutes = time.getUTCMinutes().toString().padStart(2, '0');
  const seconds = time.getUTCSeconds().toString().padStart(2, '0');
  const milliseconds = Math.floor(time.getUTCMilliseconds() / 10)
    .toString()
    .padStart(2, '0');

  display.textContent = `${minutes}:${seconds}:${milliseconds}`;
}

startBtn.onclick = () => {
  if (!isRunning) {
    startTime = new Date().getTime() - (difference || 0);
    interval = setInterval(updateTime, 10);
    isRunning = true;
  }
};

pauseBtn.onclick = () => {
  if (isRunning) {
    clearInterval(interval);
    isRunning = false;
  }
};

resetBtn.onclick = () => {
  clearInterval(interval);
  isRunning = false;
  difference = 0;
  display.textContent = "00:00:00";
  laps.innerHTML = "";
  lapCount = 0;
};

lapBtn.onclick = () => {
  if (isRunning) {
    lapCount++;
    const lapTime = display.textContent;
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
    laps.appendChild(lapItem);
  }
};
