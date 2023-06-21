// CONSTANTS
const ROW = 23;
const COL = 45;

const graphNode = document.getElementById("graph");
const screenWidth = screen.width;

const graph = new Object();
const grid = [0, 0];
const dfsGraph = new Object();
const dfsGrid = [0, 0];

// VARIABLES
let time = -100;
let timeDFS = -100;
let start = 0; // Initial position
let target = 0; // Target position
let found = false; // whether the destination is found or not
let selector = "blocks";

let routes = [["0"]];

// GENERATORS
function graphGen() {
	const nodeCount = grid[0] * grid[1];

	graph.length = 0;
	for (let nodeID = 0; nodeID < nodeCount; nodeID++) {
		const nodeObj = new Object();
		nodeObj.blocked = false;
		nodeObj.adjacents = getAdj(nodeID);
		graph[`${nodeID}`] = nodeObj;
	}
	graphGenDFS();
}
function graphGenDFS() {
	const nodeCount = dfsGrid[0] * dfsGrid[1];

	dfsGraph.length = 0;
	for (let nodeID = 0; nodeID < nodeCount; nodeID++) {
		const nodeObj = new Object();
		nodeObj.visited = false;
		nodeObj.previous = nodeID == 0 ? "-1" : null;
		nodeObj.complementary = getComplementary(nodeID);
		nodeObj.adjacents = getAdjDFS(nodeID);
		dfsGraph[`${nodeID}`] = nodeObj;
	}
}
function nodeToRow(node, dfs = false) {
	if (dfs) {
		return Math.floor(parseInt(node) / dfsGrid[1]);
	}
	return Math.floor(parseInt(node) / grid[1]);
}
function nodeToCol(node, dfs = false) {
	if (dfs) {
		return node - nodeToRow(node, true) * dfsGrid[1];
	}
	return node - nodeToRow(node) * grid[1];
}
function row_colToNode(row, col, dfs = false) {
	if (dfs) {
		return row * dfsGrid[1] + col;
	}
	return row * grid[1] + col;
}

// TOGGLES
function toggleBlockage(node) {
	graph[node].blocked = !graph[node].blocked;
	document.getElementById(`cell-${node}`).classList.toggle("blocked");
}
function switchSelector() {
	selector = document.forms["selector"]["toggler"].value;
}

// get possible adjacent nodeID(s)
function getAdj(node) {
	const row = nodeToRow(node);
	const col = nodeToCol(node);
	let tempAdjPoints = [
		[row - 1, col],
		[row, col - 1],
		[row, col + 1],
		[row + 1, col],
	];
	return filterAdjs(tempAdjPoints);
}
function filterAdjs(adjsToFilter) {
	let tempFilteredAdjs = [];
	let filteredAdjs = [];
	adjsToFilter.forEach((adj) => {
		if (
			adj[0] >= 0 &&
			adj[0] <= grid[0] - 1 &&
			adj[1] >= 0 &&
			adj[1] <= grid[1] - 1
		) {
			tempFilteredAdjs.push(adj);
		}
	});
	tempFilteredAdjs.forEach((tempFilteredAdj) => {
		const adjVal = row_colToNode(tempFilteredAdj[0], tempFilteredAdj[1]);
		filteredAdjs.push(`${adjVal}`);
	});
	return filteredAdjs;
}
function checkAdjAvailable(node) {
	const { adjacents } = graph[node];
	for (let adj = 0; adj < adjacents.length; adj++) {
		const adjId = adjacents[adj];
		if (!graph[adjId].blocked) {
			return true;
		}
	}
	return false;
}

function getAdjDFS(node) {
	const row = nodeToRow(node, true);
	const col = nodeToCol(node, true);
	let tempAdjPoints = [
		[row - 1, col],
		[row, col - 1],
		[row, col + 1],
		[row + 1, col],
	];
	return filterAdjsDFS(tempAdjPoints);
}
function filterAdjsDFS(adjsToFilter) {
	let tempFilteredAdjs = [];
	let filteredAdjs = [];
	adjsToFilter.forEach((adj) => {
		if (
			adj[0] >= 0 &&
			adj[0] <= dfsGrid[0] - 1 &&
			adj[1] >= 0 &&
			adj[1] <= dfsGrid[1] - 1
		) {
			tempFilteredAdjs.push(adj);
		}
	});
	tempFilteredAdjs.forEach((tempFilteredAdj) => {
		const adjVal = row_colToNode(tempFilteredAdj[0], tempFilteredAdj[1], true);
		filteredAdjs.push(`${adjVal}`);
	});
	return shuffle(filteredAdjs);
}
function checkAdjAvailableDFS(node) {
	const { adjacents } = dfsGraph[node];
	for (let adj = 0; adj < adjacents.length; adj++) {
		if (!dfsGraph[adj].visited) {
			return true;
		}
	}
	return false;
}
function getComplementary(node) {
	// sourcery skip: dont-reassign-parameters
	node = parseInt(node);
	const row = nodeToRow(node, true) * 2;
	const col = nodeToCol(node, true) * 2;
	return `${row_colToNode(row, col)}`;
}
function getEdgeNode(nodeDFS, prevNodeDFS) {
	const node = dfsGraph[parseInt(nodeDFS)].complementary;
	const prevNode = dfsGraph[parseInt(prevNodeDFS)].complementary;
	const nodeArr = [nodeToRow(node), nodeToCol(node)];
	const prevNodeArr = [nodeToRow(prevNode), nodeToCol(prevNode)];
	const edgeRow = (nodeArr[0] + prevNodeArr[0]) / 2;
	const edgeCol = (nodeArr[1] + prevNodeArr[1]) / 2;
	return `${row_colToNode(edgeRow, edgeCol)}`;
}

// Route creation
function createNewRoute(currentRoute) {
	const formedRoutes = [];
	const currentRouteId = parseInt(currentRoute.at(-1));
	let currentRouteAdjs = graph[currentRouteId].adjacents;
	currentRouteAdjs.forEach((currentRouteAdj) => {
		if (!graph[currentRouteAdj].blocked) {
			const newFormedRoute = [];
			currentRoute.forEach((node) => {
				newFormedRoute.push(node);
			});
			newFormedRoute.push(currentRouteAdj);
			formedRoutes.push(newFormedRoute);
		}
	});
	return formedRoutes;
}
function filterRoutes(routesToFilter) {
	let filteredRoutes = [];
	let sameEndSets = new Object();
	// sourcery skip: dont-reassign-parameters
	routesToFilter = shuffle(routesToFilter);
	routesToFilter.forEach((routeToFilter) => {
		const routeEndPoint = routeToFilter.at(-1);
		if (
			!Object.hasOwnProperty.call(sameEndSets, routeEndPoint) ||
			sameEndSets[routeEndPoint].length > routeToFilter.length
		) {
			sameEndSets[routeEndPoint] = routeToFilter;
		}
	});
	for (const endPointKey in sameEndSets) {
		if (Object.hasOwnProperty.call(sameEndSets, endPointKey)) {
			const filteredRoute = sameEndSets[endPointKey];
			filteredRoutes.push(filteredRoute);
		}
	}
	return filteredRoutes;
}

// MAIN FUNCTIONS
function DFS(node = "0", prevNode = "-1") {
	if (!dfsGraph[node].visited) {
		dfsGraph[node].previous = prevNode;
		dfsGraph[node].visited = true;
	}

	drawDFS(node, prevNode);

	// if (!checkAdjAvailableDFS(node)) return true;
	const adjNodes = shuffle(dfsGraph[node].adjacents);
	adjNodes.forEach((adjNode) => {
		if (adjNode != prevNode && !dfsGraph[adjNode].visited) {
			return DFS(adjNode, node);
		}
	});
	return;
}

// VISUALIZERS
function drawGraph() {
	while (graphNode.firstChild) {
		graphNode.removeChild(graphNode.lastChild);
	}
	for (let rowCount = 0; rowCount < grid[0]; rowCount++) {
		const rowElement = document.createElement("div");
		rowElement.className = "row";
		rowElement.id = `row-${rowCount}`;
		graphNode.appendChild(rowElement);
	}
	for (const node in graph) {
		if (Object.hasOwnProperty.call(graph, node)) {
			const nodeObj = graph[node];
			const rowId = `row-${nodeToRow(node)}`;
			if (node != "length") {
				const nodeElement = document.createElement("div");
				nodeElement.className = "cell ";
				if (nodeObj.blocked) {
					nodeElement.className += "blocked ";
				}
				nodeElement.id = `cell-${node}`;
				document.getElementById(rowId).appendChild(nodeElement);
			}
		}
	}
	if (screenWidth <= 500) {
		graphNode.style.width = `${screenWidth - 40}px`;
		graphNode.style.height = `${screenWidth - 40}px`;

		const cellSide = (screenWidth - 40) / grid[0];
		const cellWidth = (screenWidth - 40) / grid[1];
		const cellList = document.getElementsByClassName("cell");

		for (let cellCount = 0; cellCount < cellList.length; cellCount++) {
			const cellElement = cellList[cellCount];
			cellElement.style.height = `${cellSide}px`;
			cellElement.style.width = `${cellWidth}px`;
		}
	}
}

function drawDFS(node, prevNode) {
	selector = "blocks";
	if (node != 0) {
		timeDFS += 50;
		const edgeNode = getEdgeNode(node, prevNode);
		setTimeout(() => {
			toggleBlockage(edgeNode);
		}, timeDFS);
	}
	timeDFS += 50;
	setTimeout(() => {
		toggleBlockage(dfsGraph[node].complementary);
	}, timeDFS);
}

// EXECUTORS
function generate() {
	graphNode.style.pointerEvents = "all";

	// Resets
	grid[0] = 0;
	grid[1] = 0;
	dfsGrid[0] = 0;
	dfsGrid[1] = 0;
	target = 0;
	found = false;

	// Get values
	grid[0] = ROW;
	grid[1] = COL;
	dfsGrid[0] = Math.ceil(grid[0] / 2);
	dfsGrid[1] = Math.ceil(grid[1] / 2);

	target = grid[0] * grid[1] - 2 - grid[0];
	start = row_colToNode(1, 1);

	// Generate graph
	graphGen();
	drawGraph();

	// Set value of routes
	routes = [[start]];
	return false;
}

function shuffle(array) {
	let currentIndex = array.length,
		randomIndex;

	while (currentIndex != 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex],
			array[currentIndex],
		];
	}

	return array;
}

// Executions
window.addEventListener("load", () => {
	if (screenWidth > 750) {
		generate();
		DFS();
	}
});
