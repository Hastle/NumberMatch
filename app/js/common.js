const numberElements = document.getElementsByClassName('number');

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

for (let i = 0; i < numberElements.length; i++) {
	const randomNumber = Math.floor(Math.random() * 100); // Генерируем случайное число от 0 до 99
	numberElements[i].textContent = randomNumber; // Присваиваем сгенерированное число внутреннему содержимому элемента
	const randomColorIndex = Math.floor(Math.random() * colors.length);
	const randomColor = colors[randomColorIndex];
	numberElements[i].style.backgroundColor = randomColor;

	console.log(randomColorIndex);
}