function writeRepeat(target, id, ...contents) {
	const content = contents[0][id];

	let current = 1;
	let toForward = true;
	const writeInterval = setInterval(() => {
		const contentToWrite = content.slice(0, current);

		target.innerText = contentToWrite;

		if (toForward) current++;
		else current--;

		if (current >= content.length + 10) toForward = false;
		if (current < 0) {
			id = id > contents.length ? 0 : id + 1;
			clearInterval(writeInterval);
			writeRepeat(target, id, ...contents);
		}
	}, 50);
}

function writeOnce(target, content) {
	return new Promise((resolve, reject) => {
		let current = 1;
		const writeInterval = setInterval(() => {
			const contentToWrite = content.slice(0, current);

			target.innerText = contentToWrite;

			current++;

			if (current >= content.length) {
				clearInterval(writeInterval);
				resolve();
			}
		}, 50);
	});
}

function typeWriterRepeat(targetId, ...contents) {
	const target = document.getElementById(targetId);
	writeRepeat(target, 0, contents);
}

function typeWriter(targetId, content, resolve) {
	const target = document.getElementById(targetId);
	writeOnce(target, content).then(resolve);
}
