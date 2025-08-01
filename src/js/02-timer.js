import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';
// додатково
import Notiflix from 'notiflix';

const datePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysDisplay = document.querySelector('[data-days]');
const hoursDisplay = document.querySelector('[data-hours]');
const minutesDisplay = document.querySelector('[data-minutes]');
const secondsDisplay = document.querySelector('[data-seconds]');
startBtn.disabled = true;

let selectedDay = null;
let intervalId = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        selectedDay = selectedDates[0];
        const today = new Date();

        if (selectedDay > today) {
            startBtn.disabled = false;
        } else {
            // window.alert('Please choose a date in the future');
            Notiflix.Notify.warning('Please choose a date in the future');
            startBtn.disabled = true;
        };
    }
};

flatpickr(datePicker, options);

// обрробляємо кнопку START
startBtn.addEventListener('click', () => {
    if (intervalId) {
        clearInterval(intervalId);
    };
    intervalId = setInterval(() => {
        const today = new Date();
        const left = selectedDay - today;
        if (left <= 0) {
            clearInterval(intervalId);
            console.log("Time is out");
            updateDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 })
            return;
        }
        const timeParts = convertMs(left);
        // updateDisplay приймає об'єкт!!! не left
        updateDisplay(timeParts);

    }, 1000);
});

// оновлення консолі
function updateDisplay({ days, hours, minutes, seconds }) {
    daysDisplay.textContent = `${days}`;
    hoursDisplay.textContent = addLeadingZero(hours);
    minutesDisplay.textContent = addLeadingZero(minutes);
    secondsDisplay.textContent = addLeadingZero(seconds);
}

// приводить до формату 00
function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

// обчислюємо залишок часу з ms
function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}
