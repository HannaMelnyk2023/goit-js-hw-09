const form = document.querySelector("form");
let delay = null;
let step = null;
let amount = null;
form.addEventListener('submit', (event) => {
  event.preventDefault();
  delay = Number(form.elements.delay.value);
  step = Number(form.elements.step.value);
  amount = Number(form.elements.amount.value)
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }


}
createPromise(2, 1500)
  .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });