import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// Initialize vars
let userSelectedDate = Date.now();
const startBtn = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');

// Helper functions
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

function addLeadingZero(value) {
  return value.toString().padStart(2, 0);
}

// Initialize 
startBtn.disabled = true;
input.disabled = false;

// Date picker

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate.getTime() < Date.now()) {
      startBtn.disabled = true;
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight'
     });
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr("#datetime-picker", options);

// Start button

let timerId = null;

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  input.disabled = true;

  timerId = setInterval(() => {
    const deltaTime = userSelectedDate.getTime() - Date.now();

    if (deltaTime <= 0) {
      clearInterval(timerId);
      input.disabled = false;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    document.querySelector('[data-days]').textContent = addLeadingZero(days);
    document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
    document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
    document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
  }, 1000);
})
