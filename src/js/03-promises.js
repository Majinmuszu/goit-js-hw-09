import Notiflix from 'notiflix';
//make life easier
const qs = selector => document.querySelector(selector);
const qsa = selector => document.querySelectorAll(selector);
const log = something => console.log(something);
const cElem = elem => document.createElement(elem);

const inputDelay = qs('input[name="delay"]');
const inputStep = qs('input[name="step"]');
const inputAmount = qs('input[name="amount"]');
const btnSubmit = qs('button[type="submit"]');

const runFunction = e => {
  e.preventDefault();

  let delayValue = inputDelay.valueAsNumber;
  let stepValue = inputStep.valueAsNumber;

  function createPromise(position, delayValue) {
    return new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;
      setTimeout(() => {
        if (shouldResolve) {
          //Fullfill
          resolve(Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delayValue}ms`));
        } else {
          reject(Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delayValue}ms`));
          //Reject
        }
      }, delayValue);
    });
  }

  for (let i = 1; i <= inputAmount.value; i++) {
    let position = i;
    createPromise(position, delayValue)
      .then(value => {
        console.log(`✅ Fulfilled promise ${position - 1} in ${delayValue}ms`);
      })
      .catch(err => {
        console.log(`❌ Rejected promise ${position - 1} in ${delayValue}ms`);
      });
      
    delayValue = delayValue + stepValue;
    console.log(delayValue);
    position++;
  }
};

btnSubmit.addEventListener('click', runFunction);
