let previousKey = false; // Variable auxiliar para encontrar un nodo
let toggleValues = false; // Variable auxiliar para botón de alternancia
let maxpath = 0; // Ayudantes para obtener la altura del árbol / nodo
let maxH = 0;

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0, 0);
	canvas.style("z-index", "-1"); 
	// Pon un fondo debajo del documento
	colorMode(HSB);
	background('red');

	// Llenar árbol con nodos aleatorios
	tree = new Tree();
	for (let i = 0; i < 15; i++) {
		try {
			tree.insertNode(floor(random(0, 100)), "node");
		} catch (e) {
			location.reload();
		}
	}
}

function draw() { } // Requerido por p5, pero no usado aquí

// Controladores de eventos
document
	.getElementsByClassName("onoffswitch-label")[0]
	.addEventListener("click", e => {
		toggleValues = !toggleValues;
		clear();
		colorMode(HSB);
		background(255, 204, 100);
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

	// Borrar campos de entrada
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

	// Borrar campo de entrada
	document.getElementsByClassName("key")[1].value = "";
});

document.getElementsByClassName("findBtn")[0].addEventListener("click", e => {
	e.preventDefault();

	// Borrar aspectos destacados anteriores
	if (previousKey) {
		clear();
		colorMode(HSB);
		background(255, 204, 100);
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


//VISUALIZACION DE RESUMEN DE ARBOL
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
