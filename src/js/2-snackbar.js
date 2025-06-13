import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const createBtn = document.querySelector('button[type="submit"]');
const delayElmt = document.querySelector('input[name="delay"]');
const formElmt = document.querySelector('.form');

const makePromise = ({ state, delay }) => {
  const promiseFullfilledMessage = `✅ Fulfilled promise in ${delay}ms`;
  const promiseRejectedMessage = `❌ Rejected promise in ${delay}ms`;
  return new Promise((resolve, reject) => {
	   setTimeout(() => {
				if(state === "fulfilled") {
					resolve(promiseFullfilledMessage);
				} else {
					reject(promiseRejectedMessage);
				}
			}, delay);
  });
};

createBtn.addEventListener('click', () => {
  const stateElmt = document.querySelector('input[type=radio][name=state]:checked');
  makePromise({ state: stateElmt.value, delay: delayElmt.value })
    .then(value => iziToast.success({message: value, position: 'topRight'}))
    .catch(error => iziToast.error({message: error, position: 'topRight'}));
  console.log("At least i made it to the button");
});

formElmt.addEventListener('submit', evt => {
  const stateElmt = document.querySelector('input[type=radio][name=state]:checked');
  evt.preventDefault();
  delayElmt.value = "";
  stateElmt.checked = false;
});