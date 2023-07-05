const gameContainer = document.querySelector('.game-container');
const overlay = document.querySelector('.overlay');
const actionArea = document.getElementById("action-area");
const numberTask = document.getElementById("number-task");
const totalAnswersElement = document.getElementById("total-answers");
const rightAnswersElement = document.getElementById("right-answers");
const timerDisplay = document.getElementById("timer-display");
let isStarted = false;
let timer;
const allTime = 60;
let remainingTime = allTime;
let totalAnswersCount = 0;
let rightAnswersCount = 0;

const colors = [
	'#FF4136',
	'#FF851B',
	'#FFDC00',
	'#2ECC40',
	'#0074D9',
	'#39CCCC',
	'#B10DC9',
	'#FF0080',
	'#F012BE',
	'#85144b' 
];

for (let i = 0; i < 6; i++) {
	const button = document.createElement("button");
	button.classList.add("number");
	actionArea.appendChild(button);
}

const numberButtons = document.querySelectorAll('.number');

function setNumbers() {
	numberButtons.forEach(button => {
		const randomNumber = Math.floor(Math.random() * 100);
		button.textContent = randomNumber;
		const randomColorIndex = Math.floor(Math.random() * colors.length);
		button.style.backgroundColor = colors[randomColorIndex];
	});
	const randomButtonIndex = Math.floor(Math.random() * numberButtons.length);
	const randomButton = numberButtons[randomButtonIndex];
	numberTask.textContent = randomButton.textContent;
}

function formatTime(seconds) {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;
	const formattedMinutes = minutes.toString().padStart(2, '0');
	const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
	return `${formattedMinutes}:${formattedSeconds}`;
}

function numberHandler() {
	numberButtons.forEach(button => {
		button.addEventListener("click", () => {
			if (button.textContent === numberTask.textContent & isStarted) {
				rightAnswersCount++;
				console.log("Верно");
			} else {
				console.log("Неверно");
			}
			totalAnswersElement.textContent = totalAnswersCount;
			rightAnswersElement.textContent = rightAnswersCount;
			totalAnswersCount++;
			setNumbers();
		});
	});
}

function startTimer() {
	timer = setInterval(() => {
		remainingTime--;
		timerDisplay.textContent = formatTime(remainingTime);
		if (remainingTime === 0) {
			clearInterval(timer);
			console.log("Таймер завершен");
			isStarted = false;
		}
	}, 1000);
}

function startHandler() {
	numberButtons.forEach(button => {
		button.addEventListener("click", () => {
			if (!isStarted) {
				gameContainer.classList.add('overlay');
				const overlay = document.querySelector('.overlay');
				totalAnswersCount = 0;
				rightAnswersCount = 0;
				let count = 3;
				const countDown = setInterval(() => {
					overlay.style.setProperty('--content', `"${count}"`);
					count--;
					if (count < 0) {
						clearInterval(countDown);
						overlay.style.setProperty('--content', '""');
						setTimeout(() => {
							gameContainer.classList.remove('overlay');
							isStarted = true;
							startTimer();
							remainingTime = allTime;
							timerDisplay.textContent = formatTime(remainingTime);
						}, 100);
					}
				}, 1000);
			}
		});
	});
}


function initGame() {
	setNumbers();
	totalAnswersElement.textContent = totalAnswersCount;
	rightAnswersElement.textContent = rightAnswersCount;
	startHandler();
	numberHandler();
	timerDisplay.textContent = formatTime(remainingTime);
}

initGame();
