//make life easier (Mikołaj, for You "ce" is now "cElem" :D)
const qs = selector => document.querySelector(selector);
const qsa = selector => document.querySelectorAll(selector);
const log = something => console.log(something);
const cElem = elem => document.createElement(elem);
//random hexagonal color function
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

//binding body and buttons to variables
const body = qs('body');
const btnStart = qs('button[data-start]');
const btnStop = qs('button[data-stop]');

//timerId will be needed later to clear it
let timerId = null;

//by default "stop" button is disabled
btnStop.setAttribute('disabled', true);

//clicking on button "start" activates interval and changes
//color randomly once in every 1s. 
btnStart.addEventListener('click', () => {
  timerId = setInterval(() => {
    let newColor = getRandomHexColor();
    body.style.backgroundColor = newColor;
  }, 1000);
  //also sets "stop" button as enabled and "start" as disabled
  btnStart.setAttribute('disabled', true);
  btnStop.removeAttribute('disabled');
});

//clicking on "stop" when random color change is active 
//clears interval and changes "start"=>enabled, "stop"=>disabled
btnStop.addEventListener('click', () => {
  clearInterval(timerId);
  btnStart.removeAttribute('disabled');
  btnStop.setAttribute('disabled', true);
});
