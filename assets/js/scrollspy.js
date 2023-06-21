function socialScrollSpy(hiderId, targetClassName) {
	const targets = document.querySelectorAll(`.${targetClassName}`);
	const hider = document.getElementById(hiderId);

	window.addEventListener("scroll", () => {
		if (window.scrollY >= hider.offsetTop) {
			targets.forEach((target) => {
				if (!target.classList.contains("social-link")) {
					target.classList.add("social-link");
				}
			});
		} else {
			targets.forEach((target) => {
				if (target.classList.contains("social-link")) {
					target.classList.remove("social-link");
				}
			});
		}
	});
}

function reveal(target) {
	return new Promise((resolve, reject) => {
		target.classList.remove("hide");
		resolve()
	});
}

function revealSets(setId, name, lister) {
	const writeTarget = document.getElementById(`${name}-cmd`);
	const viewRect = writeTarget.getBoundingClientRect();

	window.addEventListener("scroll", () => {
		let position =
			viewRect.top -
			writeTarget.offsetTop -
			window.screen.height / 2 -
			window.scrollY;
		if (
			position <= writeTarget.offsetTop &&
			!writeTarget.classList.contains("revealed")
		) {
			typeWriter(`${name}-cmd`, `list --user ${name}`, () => {
				reveal(document.getElementById(setId)).then(lister);
			});
			writeTarget.classList.add("revealed");
		}
	});
}
