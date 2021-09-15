const qs = selector => document.querySelector(selector);
const qsa = selector => document.querySelectorAll(selector);
const log = something => console.log(something);
const cElem = elem => document.createElement(elem);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const body = qs('body');
const btnStart = qs('button[data-start]');
const btnStop = qs('button[data-stop]');
let timerId = null;

log(body);
log(btnStart);
log(btnStop);

btnStop.setAttribute('disabled', true);
btnStart.addEventListener('click', () => {
  timerId = setInterval(() => {
    let newColor = getRandomHexColor();
    body.style.backgroundColor = newColor;
  }, 1000);
  btnStart.setAttribute('disabled', true);
  btnStop.removeAttribute('disabled');
});

btnStop.addEventListener('click', () => {
  clearInterval(timerId);
  btnStart.removeAttribute('disabled');
  btnStop.setAttribute('disabled', true);
});
