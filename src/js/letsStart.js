const store = [];
document.querySelectorAll('section').forEach((section, idx) => {
	let offset = section.getBoundingClientRect();
	let out = {
		idx,
		left: offset.left,
		top: offset.top,
	}
	store.push(out)
})

console.log(store)

let lines = [
	'New project, huh?',
	'Glad for you',
	'Or not',
	'Actually i don\'t know about your project',
	'Good luck anyway!',
];
const greetings = (arr, speed, target) => {
		let idx = 0;
		const newLine = setInterval(() => {
			if(arr[idx]) {
				target.innerText = arr[idx]
				console.log(arr[idx])
			} else {
				clearInterval(newLine);
				let btn = document.querySelector('button');
				btn.classList.add('visible');
				btn.addEventListener('click', () => {
					greetings(arr, speed, target);
					btn.classList.remove('visible')
				})
				return
			}
			idx++;

		}, speed)
}
console.log(greetings(lines, 1500, document.querySelector('#greeting h1')))
