const skillList = [
	"UI/UX Design",
	"Database Design",
	"Critical Thinking",
	"Problem Solving",
	"Fluent English",
];

const languages = {
	html: { icon: ["fa-brands", "fa-html5"], name: "HTML 5", level: 5 },
	css: { icon: ["fa-brands", "fa-css3"], name: "CSS 3", level: 5 },
	js: { icon: ["fa-brands", "fa-js"], name: "JavaScript", level: 5 },
	py: { icon: ["fa-brands", "fa-python"], name: "Python", level: 5 },
	php: { icon: ["fa-brands", "fa-php"], name: "PHP 8", level: 5 },
	mysql: { icon: ["fa-solid", "fa-database"], name: "MySQL", level: 5 },
	node: { icon: ["fa-brands", "fa-node-js"], name: "NodeJS", level: 5 },
	c: { icon: ["fa-solid", "fa-file-code"], name: "C", level: 4 },
	cpp: { icon: ["fa-solid", "fa-file-code"], name: "C++", level: 3 },
	rust: { icon: ["fa-brands", "fa-rust"], name: "Rust", level: 2 },
};

const frameworks = {
	laravel: { icon: ["fa-brands", "fa-laravel"], name: "Laravel 10", level: 5 },
	django: { icon: ["fa-brands", "fa-python"], name: "Django", level: 4 },
	uikit: { icon: ["fa-brands", "fa-uikit"], name: "UiKit", level: 5 },
	bs: { icon: ["fa-brands", "fa-bootstrap"], name: "Bootstrap", level: 5 },
	react: { icon: ["fa-brands", "fa-react"], name: "React", level: 2 },
};

const projects = [
	{
		type: "PyPI Package",
		languages: ["py"],
		tags: ["library", "web scrapper"],
		cmd: "pip install ScrapPyJS",
		project_link: "https://pypi.org/project/ScrapPyJS/",
		source_code_link: "https://github.com/hind-sagar-biswas/ScrapPyJS/",
		image: null,
		status: "stable",
		title: "ScrapPyJS",
		description:
			"The ScrapPyJS class provides functionality for web scraping using Selenium were you can Scrap data via running JS script directly from python.",
	},
	{
		type: "Web Tool",
		languages: ["js", "html", "css"],
		tags: ["tool", "generator"],
		cmd: null,
		project_link: "http://coderaptors.epizy.com/cssgen/",
		source_code_link: "https://github.com/hind-sagar-biswas/cssgen",
		image: null,
		status: "stable",
		title: "CSS Gen",
		description:
			"A Free GUI (Graphical User Interface) web tool to generate CSS codes visually. Change the values and see those changes live!",
	},
	{
		type: "Web App",
		languages: ["php", "mysql", "js", "laravel", "django"],
		tags: ["bookmarking site", "ajax", "bookmarking site"],
		cmd: null,
		project_link: null,
		source_code_link: "https://github.com/hind-sagar-biswas/shiniMark",
		image:
			"https://github.com/hind-sagar-biswas/shiniMark/blob/c801a8a7feb6375d990331b0cc38caf280eeba75/assets/images/logo.png",
		status: "stable",
		title: "ShiniMark",
		description:
			"A personal bookmark management site using AJAX & PHP. There are other versions in Djang and Laravel in other branches.",
	},
	{
		type: "GUI App",
		languages: ["py"],
		tags: ["native app", "gui", "qt5", "reader"],
		cmd: null,
		project_link: null,
		source_code_link: "https://github.com/hind-sagar-biswas/Ramayana",
		image:
			"https://github.com/hind-sagar-biswas/Ramayana/blob/817b680ed82c7109377e31b378c0051e1c91fe0a/src/images/ramayana.png",
		status: "stable",
		title: "Ramayana Reader",
		description:
			"A python GUI reader for Valmiki Ramayana with Sanskrit Slokas and English meanings with Sloka breakdowns.",
	},
	{
		type: "Web tool",
		languages: ["js", "html", "css"],
		tags: ["algorithm", "visualizer", "bfs", "dfs"],
		cmd: null,
		project_link: "https://hind-sagar-biswas.github.io/pathfindr/",
		source_code_link: "https://github.com/hind-sagar-biswas/pathfindr",
		image: null,
		status: "stable",
		title: "PathFindr",
		description:
			"A visualizer of path finder algorithms. Both The BFS and DFS algorithms. DFS -> Maze generator, BFS -> pathfinder",
	},
	{
		type: "PHP Object",
		languages: ["php"],
		tags: ["package", "OOP", "user login"],
		cmd: null,
		project_link: null,
		source_code_link: "https://github.com/hind-sagar-biswas/logger",
		image: null,
		status: "stable",
		title: "Logger",
		description:
			"PHP login and registration system in OOP with Remember me system implemented securely with cookies!",
	},
	{
		type: "PHP Object",
		languages: ["php"],
		tags: ["package", "OOP", "like-unlike"],
		cmd: null,
		project_link: null,
		source_code_link: "https://github.com/hind-sagar-biswas/unLaiked",
		image: null,
		status: "stable",
		title: "unLaiked",
		description: "PHP OOP Like-unlike system for comments and posts!",
	},
	{
		type: "Web App",
		languages: ["php", "js", "mysql", "css"],
		tags: ["cheatsheet", "compiler", "mcq test"],
		cmd: null,
		project_link: "http://coderaptors.epizy.com/c/",
		source_code_link: "https://github.com/hind-sagar-biswas/c-made-easy",
		image: null,
		status: "under dev",
		title: "C Made Easy",
		description:
			"Cheatsheet, MCQ Tests, begginer to intermediate problems and Online compiler for C programmers.",
	},
	{
		type: "Web App",
		languages: ["js", "css", "react"],
		tags: ["react", "weather app", "fetch api"],
		cmd: null,
		project_link: "https://hind-sagar-biswas.github.io/weather-react/",
		source_code_link: "https://github.com/hind-sagar-biswas/weather-react",
		image: null,
		status: "stable",
		title: "Weather React",
		description: "React based weather app with sleek minimalistic design.",
	},
];
