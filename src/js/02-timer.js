import 'flatpickr/dist/flatpickr.min.css';
import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';

//make life easier
const qs = selector => document.querySelector(selector);
const qsa = selector => document.querySelectorAll(selector);
const log = something => console.log(something);
const cElem = elem => document.createElement(elem);

// convwer ms to days,hours,minutes,seconds.
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

//selecting all needed tags
const calendar = qs('#date-selector');
const btnStart = qs('button[data-start]');
const btnStop = qs('button[data-stop]');
const days = qs('span[data-days]');
const hours = qs('span[data-hours]');
const minutes = qs('span[data-minutes]');
const seconds = qs('span[data-seconds]');

//default values for variables
let currentTime = new Date().getTime();
let choosenTime = 0;
let remainingTime = 0;
let currentValue = '';

//by default btnStart is disabled
btnStart.setAttribute('disabled', true);

//function to check if choosen time is correct and 
//adding proper alerts with notiflix
const timeCheck = () => {
  if (currentTime > choosenTime) {
    Notiflix.Notify.failure('Please choose a date in the future');
    //alert('Please choose a date in the future');
  } else {
    btnStart.removeAttribute('disabled');
    Notiflix.Notify.success('Correct date choosen, press start to begin COUNTDOWN (*Europe-final countdown - playing in background*) :)')
  }
};

//function that sets interval and changes values at
// HTML counter using convertMs function
const countdown = () => {
  let time = choosenTime - currentTime;
  remainingTime = setInterval(() => {
    time -= 1000;
    let remaining = convertMs(time);

    days.innerHTML = addLeadingZero(remaining.days);
    hours.innerHTML = addLeadingZero(remaining.hours);
    minutes.innerHTML = addLeadingZero(remaining.minutes);
    seconds.innerHTML = addLeadingZero(remaining.seconds);
  }, 1000);
  btnStart.setAttribute('disabled', true);
};

//function that clears interval and resets values at
//HTML counter
const stopCountdown = () => {
  clearInterval(remainingTime);
  days.innerHTML = '00';
  hours.innerHTML = '00';
  minutes.innerHTML = '00';
  seconds.innerHTML = '00';
  btnStart.setAttribute('disabled', true);
};

//function adding ledaing zero
//(i.e. 07 days, not 7 days; 09 minutes, not 9 minutes)
const addLeadingZero = value => {
  return (currentValue = value.toString().padStart(2, 0));
};

//options object for flatpickr
const opts = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    choosenTime = selectedDates[0].getTime();
    log(choosenTime);
    timeCheck();
  },
};

// make flatpickr to do things :P
const fp = flatpickr(calendar, opts);

//adding click listeners to buttons
btnStart.addEventListener('click', countdown);
btnStop.addEventListener('click', stopCountdown);
