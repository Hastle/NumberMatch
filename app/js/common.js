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
let iconElement = null;

const colors = [
	'#FF5733',
	'#FFC300',
	'#FF6363',
	'#FF8C00',
	'#FFB6C1',
	'#FF1493',
	'#7FFFD4',
	'#00FF7F',
	'#00CED1',
	'#00BFFF',
	'#4B0082',
	'#9932CC',
	'#800080',
	'#7B68EE',
	'#4682B4',
	'#00FA9A',
	'#ADFF2F',
	'#FFD700',
	'#FFA500',
	'#A0522D' 
];

const animations = [
	'pulse',
	'tada',
	'fadeIn',
	'bounceOut'
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
		const isAnimated = Math.random() < 0.5;
		if (isAnimated) {
			button.classList.add("animated", "infinite");
			const randomAnimationClass = animations[Math.floor(Math.random() * animations.length)];
			button.classList.add(randomAnimationClass);
		} else {
			button.classList.remove("animated", "infinite", ...animations);
		}
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

function showAccuracyResult(isCorrect) {
	const iconClass = isCorrect ? "fas fa-check" : "fas fa-times";
	if (!iconElement) {
		iconElement = document.createElement("i");
		actionArea.appendChild(iconElement);
	}
	iconElement.classList = iconClass;

	setTimeout(() => {
		actionArea.removeChild(iconElement);
		iconElement = null;
	}, 600);
}

function numberHandler() {
	numberButtons.forEach(button => {
		button.addEventListener("click", () => {
			if (button.textContent === numberTask.textContent && isStarted) {
				rightAnswersCount++;
				showAccuracyResult(true);
			} else {
				showAccuracyResult(false);
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
	timerDisplay.textContent = formatTime(remainingTime);
	startHandler();
	numberHandler();
}

initGame();
