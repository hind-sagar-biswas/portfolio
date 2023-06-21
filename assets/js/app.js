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

		for (let index = 0; index < languages.length; index++) {
			const languageObj = languages[index];
			
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

				if (index == languages.length - 1) {
					resolve();
				}
			}, 100 * index);
		}
	});
}

function listFrameworks(frameworks, target) {
	const frameworkContainer = document.createElement("div");
	frameworkContainer.id = "frameworks";
	target.appendChild(frameworkContainer);

	for (let index = 0; index < frameworks.length; index++) {
		const frameworkObj = frameworks[index];
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
	}
}

function listLanguagesAndFrameworks(languages, frameworks) {
	const listContainer = document.getElementById("language-list");
	listLanguages(languages, listContainer).then(() => {listFrameworks(frameworks, listContainer);});
}

typeWriterRepeat(
	"type-writer-target",
	"Programmer",
	"Full-stack dev",
	"UI/UX Designer"
);

window.addEventListener("load", () => {
	socialScrollSpy("first-section", "scroll-target");
	revealSets("skill-list", "skills", () => {
		listSkills(skillList);
	});
	revealSets("language-list", "languages", () => {
		listLanguagesAndFrameworks(languages, frameworks)
	});
});
