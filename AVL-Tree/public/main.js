let previousKey = false; // Helper variable for finding a node
let toggleValues = false; // Helper variablefor toggle button
let maxpath = 0; // Helpers for getting tree/node height
let maxH = 0;

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0, 0);
	canvas.style("z-index", "-1"); // Put canvas under the document
	background(51);

	// Fill tree with random nodes
	tree = new Tree();
	for (let i = 0; i < 15; i++) {
		try {
			tree.insertNode(floor(random(0, 100)), "node");
		} catch (e) {
			// One in about 100 times there's some weird error
			// occuring in here. When it happens, quickly reload page
			location.reload();
		}
	}
}

function draw() { } // Required by p5, but not used here

// Event handlers
document
	.getElementsByClassName("onoffswitch-label")[0]
	.addEventListener("click", e => {
		toggleValues = !toggleValues;
		clear();
		background(51);
		tree.preOrder(toggleValues);
	});

document.getElementsByClassName("insertBtn")[0].addEventListener("click", e => {
	e.preventDefault();

	let key = document.getElementsByClassName("key")[0].value;
	
	
	let val = document.getElementsByClassName("value")[0].value;
	var i = arreglo.indexOf(key);
	
	if (i < 0) { this.mensajeAgregado(); }
	else { this.mensajeExiste() };
	tree.insertNode(key, val);

	// Clear input fields
	document.getElementsByClassName("key")[0].value = "";
	document.getElementsByClassName("value")[0].value = "";
});

document.getElementsByClassName("removeBtn")[0].addEventListener("click", e => {
	e.preventDefault();

	let key = parseInt(document.getElementsByClassName("key")[1].value);
	// console.log(arreglo)
	var i = arreglo.indexOf(key);

	//console.log(i);
	if (i < 0) { this.alerta() };
	tree.removeNode(key);

	// Clear input field
	document.getElementsByClassName("key")[1].value = "";
});

document.getElementsByClassName("findBtn")[0].addEventListener("click", e => {
	e.preventDefault();

	// Clear previous highlights
	if (previousKey) {
		clear();
		background(51);
		tree.preOrder();
	}

	let key = parseInt(document.getElementsByClassName("key")[2].value);
	var i = arreglo.indexOf(key);

	//console.log(i);
	if (i < 0) { this.alerta() };

	let node = tree.find(key);

	// Highlight a node
	strokeWeight(4);
	stroke("#49E845");
	noFill();
	ellipse(node.x, node.y, 40, 40);

	// Clear input field
	document.getElementsByClassName("key")[2].value = "";
	previousKey = true;
});

// document
// 	.getElementsByClassName("traverseBtn")[0]
// 	.addEventListener("click", e => {
// 		e.preventDefault();
// 	});

function updateInfo() {
	let info = document.getElementsByClassName("tree-data")[0];
	info.innerHTML = `
    <tr>
      <th>Nodo principal:</th>
      <th>${tree.root.key}</th>
    </tr>
    <tr>
      <th>Nivel Máximo de nodos:</th>
      <th>${tree.height}</th>
    </tr>
    <tr>
      <th>Número de nodos:</th>
      <th>${tree.nodes}</th>
    </tr>
	<tr>
	<th>Número mayor:</th>
	<th>${tree.mayor}</th>
  </tr>
  <tr>
      <th>Número menor:</th>
      <th>${tree.menor}</th>
    </tr>

  `;
}

function alerta() {
	var x = document.getElementById("snackbar");
	x.className = "show";
	setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

function mensajeAgregado() {
	var x = document.getElementById("snackadd");
	x.className = "show";
	setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

function mensajeExiste() {
	var x = document.getElementById("snackexist");
	x.className = "show";
	setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}
