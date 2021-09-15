//make life easier
const qs = selector => document.querySelector(selector);
const qsa = selector => document.querySelectorAll(selector);
const log = something => console.log(something);
const cElem = elem => document.createElement(elem);

const inputDelay = qs('input[name="delay"]');
const inputStep = qs('input[name="step"]');
const inputAmount = qs('input[name="amount"]');
const btnsubmit = qs('button[type="submit"]');

let delay = null;

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}

for (let i = 1; i < inputAmount.value; i++) {
  if ((i = 1)) {
    delay = inputDelay.value;
  } else {
    delay = inputStep.Value;
  }
  createPromise(i, delay)
    .then(({ position, delay }) => {
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}
