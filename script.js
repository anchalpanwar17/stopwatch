let isRunning = false;
let time = 0; // time in seconds
let interval;
const lapTimes = [];



const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapTimesList = document.getElementById('lapTimes');

window.onload = () => {
    startStopBtn.style.backgroundColor = '#52d681';
    resetBtn.style.backgroundColor = '#ff5200';
};

const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    const msecs = Math.floor((milliseconds % 1000) / 10);
    return `${hrs.toString().padStart(2, '0')}:${mins.toString()
        .padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${msecs.toString().padStart(2, '0')}`;
};

// Update the display
const updateDisplay = () => {
    display.textContent = formatTime(time);
};

// Start or stop the stopwatch
const handleStartStop = () => {
    if (isRunning) {
        clearInterval(interval);
        startStopBtn.textContent = 'Start';
    } else {
        interval = setInterval(() => {
            time = time+10;
            updateDisplay();
        }, 10);
        startStopBtn.textContent = 'Stop';
    }
    
    isRunning = !isRunning;
    startStopBtn.style.backgroundColor = isRunning ? '#f2676a' : '#52d681';
    lapBtn.disabled = !isRunning; 
};

// Reset the stopwatch
const handleReset = () => {
    clearInterval(interval);
    isRunning = false;
    time = 0;
    updateDisplay();
    lapTimes.length = 0; 
    lapTimesList.innerHTML = ''; 
    startStopBtn.textContent = 'Start';
    startStopBtn.style.backgroundColor = isRunning ? '#f2676a' : '#52d681';
    lapBtn.disabled = true; 
};

// Record a lap
const handleLap = () => {
    lapTimes.push(time);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapTimes.length}: ${formatTime(time)}`;
    lapTimesList.appendChild(lapItem);
};

// Event listeners
startStopBtn.addEventListener('click', handleStartStop);
resetBtn.addEventListener('click', handleReset);
lapBtn.addEventListener('click', handleLap);

// Initial display update
updateDisplay();
