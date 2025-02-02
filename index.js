const start = document.querySelector('.start');
const pause = document.querySelector('.pause');
const restart = document.querySelector('.restart');
const part = document.querySelector('.section');
const audio = new Audio("./src/alarm.mp3")
const minute = document.querySelector('.minutes');
const second = document.querySelector('.seconds');

let timer = 5000;
let id = null;
let state = "PAUSED";
let section = "FOCUS"

RefreshTimer()

function RefreshTimer() {
	minute.textContent = Math.floor(timer / (60 * 1000))
	let seconds = (timer % (60 * 1000)) / 1000;
	seconds < 10 ? second.textContent = "0" + seconds : second.textContent = seconds;
	part.textContent = section.toLowerCase()
}

function CountDown() {
	timer -= 1000;
	RefreshTimer()
}

function Switch() {
	audio.play();
	console.log("END")
	clearInterval(id)
	state = "PAUSED"
	if (section == "FOCUS") {
		section = "RELAX"
		timer = 300000
	}
	else {
		section = "FOCUS"
		timer = 1500000
	}
	RefreshTimer()
}

start.addEventListener('click', () => {
	if (state != "PAUSED") return
	state = "WORKING";
	id = setInterval(() => {
		CountDown();
	}, 1000)
	end = setTimeout(() => {
		Switch()
	}, timer)
});

pause.addEventListener('click', () => {
	state = "PAUSED";
	clearInterval(id)
	clearTimeout(end)
	id = null;
})

restart.addEventListener('click', () => {
	if (id != null) {
		clearInterval(id)
	}
	state = "PAUSED"
	if ( section == "FOCUS" ) {
		timer = 1500000;
	}
	else {
		timer = 300000
	}

	RefreshTimer()
})