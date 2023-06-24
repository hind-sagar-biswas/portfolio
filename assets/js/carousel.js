function generateTemplate(index, data, languages) {
	const indicator = document.createElement("button");
	indicator.type = "button";
	indicator.setAttribute("data-bs-target", "#projectCarouselIndicators");
	indicator.setAttribute("data-bs-slide-to", `${index}`);
	if (index == 0) indicator.classList.add("active");

	const carousel = document.createElement("div");
	carousel.classList.add("carousel-item");
	if (index == 0) carousel.classList.add("active");

	const project = document.createElement("div");
	project.classList.add("project", "w-100");

	const projectType = document.createElement("h6");
	projectType.classList.add(
		"project-type",
		"text-secondary",
		"d-flex",
		"justify-content-between"
	);

	const projectTypeText = document.createElement("span");
	projectTypeText.textContent = data.type;

	const badge = document.createElement("span");
	badge.classList.add("badge", "bg-danger");
	badge.textContent = data.status;

	projectType.appendChild(projectTypeText);
	projectType.appendChild(badge);

	const projectTitle = document.createElement("h3");
	projectTitle.classList.add("project-title");
	projectTitle.textContent = data.title;

	const projectTags = document.createElement("ul");
	projectTags.classList.add("project-tags");

	for (const tag of data.tags) {
		const tagItem = document.createElement("li");
		tagItem.classList.add("project-tag");
		tagItem.textContent = tag;
		projectTags.appendChild(tagItem);
	}

	const projectDescription = document.createElement("div");
	projectDescription.classList.add("project-description");
	projectDescription.textContent = data.description;

	const projectLanguages = document.createElement("ul");
	projectLanguages.classList.add("project-languages");

	for (const language of data.languages) {
		const languageItem = document.createElement("li");
		languageItem.classList.add('project-language');
		
		const iconClasses = languages[language].icon;
		const languageIcon = document.createElement('i');
		languageIcon.classList.add(...iconClasses)

		languageItem.appendChild(languageIcon);
		projectLanguages.appendChild(languageItem);
	}

	const projectLinks = document.createElement("div");
	projectLinks.classList.add("d-flex", "justify-content-around", "project-links");
	if (data.project_link) {
		const viewLink = document.createElement("a");
		viewLink.classList.add("link-btn");
		viewLink.href = data.project_link;
		viewLink.textContent = "View";
		projectLinks.appendChild(viewLink);
	}
	if (data.source_code_link) {
		const codeLink = document.createElement("a");
		codeLink.classList.add("link-btn");
		codeLink.href = data.source_code_link;
		codeLink.textContent = "Code";
		projectLinks.appendChild(codeLink);
	}


	project.appendChild(projectType);
	project.appendChild(projectTitle);
	project.appendChild(projectLanguages);
	
	if (data.cmd) {
		const cmd = document.createElement("pre");
		cmd.classList.add("cmd");
		cmd.textContent = data.cmd;
		project.appendChild(cmd);
	}
	project.appendChild(projectDescription);
	project.appendChild(projectTags);
	project.appendChild(projectLinks);

	carousel.appendChild(project);

	return [indicator, carousel];
}



function addProjects(data, languagesData) {
    const indicatorsCont = document.getElementById("project-indicators");
    const projectsCont = document.getElementById("projects-container");

    for (let index = 0; index < data.length; index++) {
        const project = data[index];
        const [indicator, carousel] = generateTemplate(index, project, languagesData);

        indicatorsCont.appendChild(indicator);
        projectsCont.appendChild(carousel);
    }
}