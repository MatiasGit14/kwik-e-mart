let catalogoImportado = JSON.parse(localStorage.getItem("catalogo"));
const fila = document.querySelector("#fila");
const buscador = document.querySelector("#buscador");
const botonBuscar = document.querySelector("#botonBuscar");
const opcionRubro = document.querySelector(".form-select");

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

//BUSCADOR POR NOMBRE
botonBuscar.addEventListener("click", (e) => {
	e.preventDefault();
	let filtrado = catalogoImportado.filter((prod) =>
		prod.nombre
			.toLowerCase()
			.includes(buscador.children[0].value.toLocaleLowerCase())
	);

	fila.innerHTML = "";
	mostrarCartas(filtrado);
});

//Buscador por rubro
opcionRubro.addEventListener("click", (e) => {
	e.preventDefault();
	console.log(opcionRubro.value);
	let rubroFiltrado;
	switch (parseInt(opcionRubro.value)) {
		case 1:
			rubroFiltrado = catalogoImportado.filter((prod) => {
				console.log(prod.rubro);
			});
			console.log(rubroFiltrado);
			fila.innerHTML = "";
			mostrarCartas(rubroFiltrado);
			break;
		case 2:
			rubroFiltrado = catalogoImportado.filter((prod) => {
				prod.rubro == "bebidas";
			});
			break;
		case 3:
			rubroFiltrado = catalogoImportado.filter((prod) => {
				prod.rubro == "bazar";
			});
			break;
		case 4:
			rubroFiltrado = catalogoImportado.filter((prod) => {
				prod.rubro == "congelado";
			});
			break;
		default:
			rubroFiltrado = catalogoImportado;
			break;
	}
});
//prod.rubro == buscador.children[0].value.toLowerCase().trim()
