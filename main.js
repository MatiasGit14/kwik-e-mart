//VARIABLES
const catalogoImportado = JSON.parse(localStorage.getItem("catalogo"));
const fila = document.querySelector("#fila");
const buscador = document.querySelector("#buscador");
const botonBuscar = document.querySelector("#botonBuscar");
const opcionRubro = document.querySelector(".form-select");
const vaciar = document.querySelector(".vaciar");

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
					<button  type="button" id=${e.id} class="btn btn-outline-success card-link agregarCarrito">Agregar al carrito</button>
				</div>
		</div>`;
		fila.appendChild(columnaCarta);
	});
};
mostrarCartas(catalogoImportado);

/* ***FUNCIONES*** */

//AGREGAR AL CARRITO
let carrito = [];

const agregarCarrito = (e) => {
	//Indico que solo tome el evento si uno de los elementos HTML tiene esta clase
	if (e.target.classList.contains("agregarCarrito")) {
		//Me fijo si el articulo ya se habia agregado y que me devuelva true si ya esta
		let incluido = carrito.some((prod) => prod.id === parseInt(e.target.id));

		//Si ya esta en el carrito, busco ese articulo y le modifico la cantidad
		if (incluido) {
			let nuevaCantidad = carrito.find(
				(prod) => prod.id === parseInt(e.target.id)
			);
			nuevaCantidad.cantidad += 1;
			// Alerta de que se agrego correctamente
			$("#alerta").fadeIn(1500).fadeOut(3000);
		} else {
			//Si no esta en el carrito lo pusheo entero
			carrito.push(
				catalogoImportado.find((prod) => prod.id === parseInt(e.target.id))
			);
			// Alerta de que se agrego correctamente
			$("#alerta").fadeIn(1500).fadeOut(3000);
		}
	}

	sessionStorage.setItem("carrito", JSON.stringify(carrito));
	e.stopPropagation();
};

//Notificacion de productos en el carrito con jQuery

const mostrarNotif = () => {
	if (carrito.length > 0) {
		$(".carrito").removeClass("escondido");
	} else {
		$(".carrito").addClass("escondido");
	}
};

/* ***EVENTOS*** */

//AGREGAR AL CARRITO
fila.addEventListener("click", (e) => {
	e.preventDefault();
	agregarCarrito(e);
	mostrarNotif();
});

//VACIAR EL CARRITO
vaciar.addEventListener("click", () => {
	sessionStorage.clear();
	carrito = [];
	fila.innerHTML = ``;
	mostrarCartas(catalogoImportado);
	mostrarNotif();
});

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

//BUSCADOR POR RUBRO
opcionRubro.addEventListener("click", (e) => {
	e.preventDefault();
	if (e.target.value != 0) {
		let rubroFiltrado = catalogoImportado.filter(
			(prod) => prod.rubro === e.target.value.toLowerCase()
		);
		fila.innerHTML = "";
		mostrarCartas(rubroFiltrado);
	} else {
		fila.innerHTML = "";
		mostrarCartas(catalogoImportado);
	}
});
