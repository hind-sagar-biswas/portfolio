function listSkills(skillList) {
	const skillListContainer = document.getElementById("skill-list");
	for (let index = 0; index < skillList.length; index++) {
		setTimeout(() => {
			const skill = skillList[index];

			const skillBox = document.createElement("div");
			skillBox.classList.add("skill");

			const icon = document.createElement("i");
			icon.classList.add("fa-solid", "fa-circle-check");
			skillBox.appendChild(icon);

			const text = document.createElement("span");
			text.textContent = skill;
			skillBox.appendChild(text);

			skillListContainer.appendChild(skillBox);
		}, 100 * index);
	}
}

function listLanguages(languages, target) {
	return new Promise((resolve, reject) => {
		const languageContainer = document.createElement("div");
		languageContainer.id = "langs";
		target.appendChild(languageContainer);

		let index = 0

		for (const languageObjectName in languages) {
			if (Object.hasOwnProperty.call(languages, languageObjectName)) {
				const languageObj = languages[languageObjectName];

				const languageContainer = document.getElementById("langs");
				setTimeout(() => {

					const language = document.createElement("div");
					language.classList.add("tag");

					const icon = document.createElement("i");
					icon.classList.add(languageObj.icon[0], languageObj.icon[1]);
					language.appendChild(icon);

					const text = document.createElement("span");
					text.textContent = ` ${languageObj.name}`;
					language.appendChild(text);

					languageContainer.appendChild(language);

					if (index >= Object.keys(languages).length - 1) {
						resolve();
					}
				}, 100 * index);
				index++;
			}
		}
	});
}

function listFrameworks(frameworks, target) {
	const frameworkContainer = document.createElement("div");
	frameworkContainer.id = "frameworks";
	target.appendChild(frameworkContainer);

	let index = 0;
	for (const frameworkObjectName in frameworks) {
		if (Object.hasOwnProperty.call(frameworks, frameworkObjectName)) {
			const frameworkObj = frameworks[frameworkObjectName];
			const frameworkContainer = document.getElementById("frameworks");

			setTimeout(() => {
				const framework = document.createElement("div");
				framework.classList.add("tag");

				const icon = document.createElement("i");
				icon.classList.add(frameworkObj.icon[0], frameworkObj.icon[1]);
				framework.appendChild(icon);

				const text = document.createElement("span");
				text.textContent = ` ${frameworkObj.name}`;
				framework.appendChild(text);

				frameworkContainer.appendChild(framework);
			}, 100 * index);
			index++;
		}
	}
}

function listLanguagesAndFrameworks(languages, frameworks) {
	const listContainer = document.getElementById("language-list");
	listLanguages(languages, listContainer).then(() => {
		listFrameworks(frameworks, listContainer);
	});
}

typeWriterRepeat(
	"type-writer-target",
	"Programmer",
	"Full-stack dev",
	"UI/UX Designer"
);
addProjects(projects, {...languages, ...frameworks});

window.addEventListener("load", () => {
	socialScrollSpy("first-section", "scroll-target");
	revealSets("skill-list", "skills", () => {
		listSkills(skillList);
	});
	revealSets("language-list", "languages", () => {
		listLanguagesAndFrameworks(languages, frameworks);
	});
});



/*
I am doing a set time out in a for-in loop in JS, every time the loop runs, a variable named index increases, and the time for setTimeOut is based on index. When index reaches maximum (length of object) i.e. when it is the last iteration, a resolve would be called:
function listLanguages(languages, target) {
	return new Promise((resolve, reject) => {
		const languageContainer = document.createElement("div");
		languageContainer.id = "langs";
		target.appendChild(languageContainer);

		let index = 0

		for (const languageObjectName in languages) {
			if (Object.hasOwnProperty.call(languages, languageObjectName)) {
				const languageObj = languages[languageObjectName];

				const languageContainer = document.getElementById("langs");
				setTimeout(() => {

					const language = document.createElement("div");
					language.classList.add("tag");

					const icon = document.createElement("i");
					icon.classList.add(languageObj.icon[0], languageObj.icon[1]);
					language.appendChild(icon);

					const text = document.createElement("span");
					text.textContent = ` ${languageObj.name}`;
					language.appendChild(text);

					languageContainer.appendChild(language);

					if (index >= Object.keys(languages).length - 1) {
						resolve();
					}
				}, 100 * index);
				index++;
			}
		}
	});
}
But the resolve is being called as soon as first time out is over. When debugging, I found that, on the condition `if (index >= Object.keys(languages).length - 1)`, index is not what is should be (like, the object has 10 keys. during the first timeout, expected value of index is 1, but it is 10 in every loop)

*/