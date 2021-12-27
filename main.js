let catalogoImportado = JSON.parse(localStorage.getItem("catalogo"));
const fila = document.querySelector("#fila");
const buscador = document.querySelector("#buscador");
const botonBuscar = document.querySelector("#botonBuscar");

//Generar las cartas a mostrar
const mostrarCartas = (cat) => {
	cat.forEach((e) => {
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
};
mostrarCartas(catalogoImportado);

class Producto {
	constructor(nombre, marca, precio, unidades, rubro) {
		this.nombre = nombre;
		this.marca = marca;
		this.precio = precio;
		this.unidades = unidades;
		this.rubro = rubro;
	}
	modificarPrecio = (nuevoPrecio) => (this.precio = nuevoPrecio);
}

let carrito = [];

//BUSCADOR POR RUBRO
botonBuscar.addEventListener("click", (e) => {
	e.preventDefault();
	let filtrado = catalogoImportado.filter(
		(prod) => prod.rubro == buscador.children[0].value.toLowerCase().trim()
	);
	console.log(filtrado);
	fila.innerHTML = "";
	mostrarCartas(filtrado);
});
