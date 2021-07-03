const arreglo = [];

class Tree {
	constructor() {
		this.root = null;
		this.height = 0;
		this.nodes = 0;
		this.mayor = 0;
		this.menor = 0;
	}

	// Se utilizará para comparar claves de nodo.
	compare(a, b) {
		return a > b ? 1 : a < b ? -1 : 0;
	}

	insertNode(key, data) {
		// Asegurar de que la clave no sea una string
		arreglo.push(key)
		this.ordenar();
		
		key = parseInt(key);
		if (isNaN(key)) return 0;

		// No inserte si es un duplicado
		if (this.find(key)) return 0;

		// Fase 1: inserción regular 
		let newNode = new Node(key, data);
		let parent = this.root;

		// Cuando no hay raíz
		if (!parent) {
			this.root = newNode;
			this.nodes++;
			this.height++;
			return this.root;
		}

		// Hasta que no se adjunte en newNode
		while (!newNode.parent) {
			//  A la izquierda o la derecha, actualiza las coordenadas y adjúnta al padre
			if (this.compare(key, parent.key) === -1) {
				if (!parent.left) {
					parent.left = newNode;
					newNode.parent = parent;
				}
				newNode.height++;
				parent = parent.left;
			} else {
				if (!parent.right) {
					parent.right = newNode;
					newNode.parent = parent;
				}
				newNode.height++;
				parent = parent.right;
			}
		}

		// Fase 2 - re balanceo de Árbol 
		if (newNode.parent.parent) {
			let gParent = newNode.parent.parent;
			while (gParent) {
				let balance = gParent.getBalance();

				// caso izquiero iz
				if (balance > 1 && key < gParent.left.key)
					this.root = gParent.rotateLL(this.root);
				// caso derecho der
				else if (balance < -1 && key > gParent.right.key)
					this.root = gParent.rotateRR(this.root);
				// ezquiero - rerecho 
				else if (balance > 1 && key > gParent.left.key)
					this.root = gParent.rotateLR(this.root);
				// derecha izquierda
				else if (balance < -1 && key < gParent.right.key)
					this.root = gParent.rotateRL(this.root);

				gParent = gParent.parent;
			}
		}

		this.nodes++; //  cantidad de nodos
		clear();
		background(51);
		maxpath = 0; //  altura del árbol
		this.preOrder(); // VOlver a renderizar el árbol
		this.height = maxpath;

		updateInfo();
		return newNode;
	}

	removeNode(key) {
		// Fase 1: eliminación regular
		
		this.remover( arreglo, key);

		let node = this.find(key);
		

		let y = null; // Acts as a node
		let z = null; // Acts as a new node's child

		// Si el nodo tiene uno o ningún hijo, y se convierte en nodo
		if (node) {
			

			if (!node.left || !node.right) y = node;
			else y = node.next();

			// Agregar un nuevo hijo, que es z
			if (y.left) z = y.left;
			else z = y.right;

			// Intercambia estos nodos
			if (z) z.parent = y.parent;
			if (!y.parent) this.root = z;
			else if (y === y.parent.left) y.parent.left = z;
			else y.parent.right = z;

			if (y !== node) node.key = y.key;

			// Fase 2 - Árbol de reequilibrio
			while (y) {
				let balance = y.getBalance();
				// izquierda iz
				if (balance > 1 && y.left.getBalance() >= 0)
					this.root = y.rotateLL(this.root);
				// Rderecha dir
				else if (balance < -1 && y.right.getBalance() <= 0)
					this.root = y.rotateRR(this.root);
				// izquierda recha
				else if (balance > 1 && y.left.getBalance() < 0)
					this.root = y.rotateLR(this.root);
				// redecha izquierda
				else if (balance < -1 && y.right.getBalance() > 0)
					this.root = y.rotateRL(this.root);
				y = y.parent;
			}
		} else {
			return 0; // No hacer nada si el nodo no existe
		}

		this.nodes--; // Mantenga un registro de la cantidad de nodos
		clear();
		background(51);
		maxpath = 0; // Mantenga un registro de la altura del árbol
		this.preOrder(); // Volver a renderizar el árbol
		this.height = maxpath;
		updateInfo();
		return node;
	}

	find(nodeKey) {
		// Empiece la busqueda desde la raíz
		let childNode = this.root;

		while (childNode && nodeKey !== childNode.key) {
			if (this.compare(nodeKey, childNode.key) < 0) childNode = childNode.left;
			else childNode = childNode.right;
		}

		return childNode;
	}

	preOrder(toggleValues) {
		this.root.preOrderTraverse(toggleValues);
	}

	inOrder() {
		this.root.inOrderTraverse();
	}

	postOrder() {
		this.root.postOrderTraverse();
	}
	remover ( arr, item ) {
		var i = arr.indexOf( item );
		arr.splice( i, 1 );
		this.ordenar();
	}
	ordenar(){
		this.mayor = Math.max(...arreglo);
		this.menor = Math.min(...arreglo);
	}
}
