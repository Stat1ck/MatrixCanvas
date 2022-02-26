'use strict';

const strChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮйцукенгшщзхъфывапролджэячсмитьбю0123456789';

window.addEventListener('load', () => {

	let arr, canvas, body, context, width, height, config, maxRows, kol = 0;

	config = {
		background: 	'rgba(0, 0, 0, 0.05)',
		color:      	'rgba(40, 150, 0, 1)',
		fontsize:   	20,
		maxLetter:  	100,
		maxColumn:  	10,
		maxWidth: 		10,
	}

	canvas = document.getElementById('canvas');
	body = document.getElementById('body');
	context = canvas.getContext('2d');

	class Char{

		constructor(x, y) {
			this.x 			= x;
			this.y 			= y;
			this.char 		= strChars[random(strChars.length - 1)];
		}

		draw() {
			context.font = `${config.fontsize}px serif`;
			context.fillStyle = config.color;
			context.fillText(this.char, this.x, this.y, config.maxWidth);

			this.speed += (config.fontsize + 5);
			this.y += this.speed;
		}
	}

	function drawCanvas() {
		context.fillStyle = config.background;
		context.fillRect(0, 0, width, height);
	}

	function addChars() {
		arr = [];

		let i = 0;
		while (i <= config.maxLetter) {
			let column = random(config.maxColumn);
			let x = random(maxRows) * config.maxWidth;
			let y = random(height);
			for (let j = 0; j <= column; j++) {
				y += (config.fontsize + 5);
				if (y >= height) y = 0;
				arr.push(new Char(x, y));
			}
			i += column;
		}
	}

	function draw() {
		drawCanvas();
		
		addChars();

		if (kol >= 0.49) {
			for (let i = 0; i < arr.length; i++) {
				arr[i].draw();
			}
		}

		kol = Math.random();

		window.requestAnimationFrame(draw);
	}

	window.addEventListener('resize', () => {
		sizeWindow();
	})

	function sizeWindow() {
		width  = canvas.width  = innerWidth;
		height = canvas.height = innerHeight;
		maxRows = Math.floor(width / config.maxWidth);
	}

	sizeWindow();

	draw();
})

function random(max) {
	return Math.floor(Math.random() * (max + 1));
}
