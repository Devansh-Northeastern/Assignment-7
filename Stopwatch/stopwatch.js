let timer;
let time = 0;

const displayCurrentDate = () => {
    let today = new Date().toISOString().split('T')[0];
    document.getElementById('date').value = today;
}

const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const startTimer = async() => {
    stopTimer();
    await delay(1); // Delay start by 1 ms for startup purposes

    return new Promise(resolve => {
        timer = setInterval(() => {
            updateTime()
        }, 1000);
        resolve();
    });
}

const stopTimer = () => {
    clearInterval(timer);
}

const resetTimer = () => {
    stopTimer();
    time = 0;
    document.getElementById('display').innerText = formatTime(0);
}

const updateTime = () => {
    time++;
    document.getElementById('display').innerText = formatTime(time);
}

const formatTime = (timeInSeconds) => {
    let hours = Math.floor(timeInSeconds / 3600);
    let minutes = Math.floor((timeInSeconds % 3600) / 60);
    let seconds = timeInSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function increaseDate() {
    let dateInput = document.getElementById('date');
    let currentDate = new Date(dateInput.value);
    currentDate.setDate(currentDate.getDate() + 1);
    dateInput.value = currentDate.toISOString().split('T')[0];
}

function decreaseDate() {
    let dateInput = document.getElementById('date');
    let currentDate = new Date(dateInput.value);
    currentDate.setDate(currentDate.getDate() - 1);
    dateInput.value = currentDate.toISOString().split('T')[0];
}

document.addEventListener('DOMContentLoaded', function() {
    displayCurrentDate();
});