const actionArea = document.getElementById("action-area");
const numberTask = document.getElementById("number-task");

for (let i = 0; i < 6; i++) {
	const button = document.createElement("button");
	button.classList.add("number");
	actionArea.appendChild(button);

	button.addEventListener("click", () => {
		if (button.textContent == numberTask.textContent)
			console.log("Верно");
		else
			console.log("Неверно");
	});
}

const numberButtons = document.querySelectorAll('.number');
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
numberButtons.forEach(button => {
	const randomNumber = Math.floor(Math.random() * 100);
	button.textContent = randomNumber;
	const randomColorIndex = Math.floor(Math.random() * colors.length);
	button.style.backgroundColor = colors[randomColorIndex];
	numberTask.textContent = randomNumber;
});



