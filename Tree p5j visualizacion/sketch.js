// Creación de objeto Tree 
function Tree() {
  // genera raiz
  this.root = null;
}

// Inicio de recorrido de arbol
Tree.prototype.traverse = function() {
  this.root.visit(this.root);
}

// Inicio de busqueda
Tree.prototype.search = function(val) {
  var found = this.root.search(val);
  return found;
}

// Añade nuevo valor al arbol
Tree.prototype.addValue = function(val) {
  var n = new Node(val);
  if (this.root == null) {
    this.root = n;
    // Posición inicial de raiz
    this.root.x = width / 2;
    this.root.y = 20;
  } else {
    this.root.addNode(n);
  }
}


// Binary tree
var tree;


function setup() {
  createCanvas(1000, 600);

  // New tree
  tree = new Tree();

  // insercion de valores aleatorios
  for (var i = 0; i < 50; i++) {
    tree.addValue(floor(random(0, 50)));
  }

  background(0);

  // Recorrer el arbol
  tree.traverse();

  // Buscar en el arbol
  var result = tree.search(10);
  if (result == null) {
    console.log('not found');
  } else {
    console.log(result);
  }
}

// Distribucion de nodos en el arbol
function Node(val, x, y) {
  this.value = val;
  this.left = null;
  this.right = null;
  // distancia basada en el nivel del arbol
  this.distance = 2;
  //coordenadas
  this.x = x;
  this.y = y;
}

// Busqueda en el árbol
Node.prototype.search = function(val) {
  if (this.value == val) {
    return this;
  } else if (val < this.value && this.left != null) {
    return this.left.search(val);
  } else if (val > this.value && this.right != null) {
    return this.right.search(val);
  }
  return null;
}


Node.prototype.visit = function(parent) {

  if (this.left != null) {
    this.left.visit(this);
  }
  // imprime valores
  console.log(this.value);

  // grtafica linea
  stroke(255); //color de linea
  line(parent.x, parent.y, this.x, this.y);
  // grafica circulo
  stroke(255); //color de perimetro circulo
  fill(map(this.value,0,100,0,255),100,100);
  ellipse(this.x, this.y, 24, 24);
  noStroke();
  // Valor dentro de circulo
  fill(255); //color del valor
  textAlign(CENTER);
  textSize(15); //tamaño texto
  text(this.value, this.x, this.y + 4);//ubicar valor dentro del circulo


  if (this.right != null) {
    this.right.visit(this);
  }
}


// Añadir nuevo nodo
Node.prototype.addNode = function(n) {
  // Si es menor se asigna a la izquierda
  if (n.value < this.value) {
    // Si no hay nada, se añade nodo
    if (this.left == null) {
      this.left = n;
      // Asignacion de distancia entre nodos
      this.left.x = this.x - (width / pow(2, n.distance)); //separacion de nodos en x
      this.left.y = this.y + (height / 10);                //separacion de nodos en y
    } 
    else {
      n.distance++;
      this.left.addNode(n)
    }
    // Si es mayor el valor, recorre a la derecha
  } else if (n.value > this.value) {
    // Si no hay nada, se añade nodo
    if (this.right == null) {
      this.right = n;
      this.right.x = this.x + (width / pow(2, n.distance));
      this.right.y = this.y + (height / 12);
    } else {
      n.distance++;
      this.right.addNode(n);
    }
  }
}