const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let changeColor = null;

startBtn.addEventListener("click", () => {
    //заборона повторного кліку
    startBtn.disabled = true;
    stopBtn.disabled = false;

    changeColor = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();

    }, 1000);
});


stopBtn.addEventListener("click", () => {
    clearInterval(changeColor);
    startBtn.disabled = false;
    stopBtn.disabled = true;

});

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}