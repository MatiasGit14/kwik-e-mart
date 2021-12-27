let catalogoImportado = JSON.parse(localStorage.getItem("catalogo"));
console.log(catalogoImportado);
const fila = document.querySelector("#fila");

catalogoImportado.forEach((e) => {
	let columnaCarta = document.createElement("div");
	columnaCarta.setAttribute("class", "col");
	columnaCarta.innerHTML = `
	<div class="card" style="width: 18rem">
		<img src=${e.img} class="card-img-top" alt=${e.nombre}/>
		<div class="card-body">
			<h5 class="card-title">${e.nombre}</h5>
			<p class="card-text">${e.descripcion}</p>
		</div>
		<ul class="list-group list-group-flush">
			<li class="list-group-item">$ ${e.precio}</li>
		</ul>
			<div class="card-body">
				<a href="..." class="card-link">Agregar al carrito</a>
			</div>
	</div>`;
	fila.appendChild(columnaCarta);
});

/*class Producto {
	constructor(nombre, marca, precio, unidades, rubro) {
		this.nombre = nombre;
		this.marca = marca;
		this.precio = precio;
		this.unidades = unidades;
		this.rubro = rubro;
	}
	modificarPrecio = (nuevoPrecio) => (this.precio = nuevoPrecio);
}

let cantProductos = parseInt(
	prompt("Ingrese la cantidad de productos que va a poner en el carrito")
);

let carrito = [];

const agregarProductosCarrito = () => {
	let nombre = prompt("Ingrese el nombre del producto");
	let marca = prompt("Ingrese la marca");
	let precio = parseInt(prompt("Ingrese el precio"));
	let unidades = parseInt(prompt("Ingrese la cantidad que desea agregar"));
	let rubro = prompt(
		"Ingrese el rubro del articulo. (Almacen, Limpieza, Comida)"
	).toLowerCase();
	let nuevoProducto = new Producto(nombre, marca, precio, unidades, rubro);
	carrito.push(nuevoProducto);
};

for (i = 0; i < cantProductos; i++) {
	agregarProductosCarrito();
}

//Funcion del buscador de productos
let filtrado = carrito.filter((producto) => producto.rubro == "almacen");

console.log(carrito);
console.log(filtrado);*/
