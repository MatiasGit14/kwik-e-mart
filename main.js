$(() => {
	const catalogoImportado = JSON.parse(localStorage.getItem("catalogo"));
	const fila = document.querySelector("#fila");
	const buscador = document.querySelector("#buscador");
	const botonBuscar = document.querySelector("#botonBuscar");
	const opcionRubro = document.querySelector(".form-select");
	const vaciar = document.querySelector(".vaciar");

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
					<button type="button" id=${e.id} class="btn btn-outline-success card-link">Agregar al carrito</button>
				</div>
		</div>`;
			fila.appendChild(columnaCarta);
		});
	};
	mostrarCartas(catalogoImportado);

	//AGREGAR AL CARRITO
	let carrito = [];

	fila.addEventListener("click", (e) => {
		e.preventDefault();
		agregarCarrito(e);
		mostrarNotif();
		$("#alerta").show(1500).hide(1500);
	});

	const agregarCarrito = (e) => {
		if (e.target.classList.contains("btn-outline-success")) {
			carrito.push(
				catalogoImportado.find((prod) => prod.id === parseInt(e.target.id))
			);
		}
		sessionStorage.setItem("carrito", JSON.stringify(carrito));
		e.stopPropagation();
	};

	//Notificacion de productos en el carrito con jQuery

	const mostrarNotif = () => {
		console.log(carrito);
		if (carrito.length > 0) {
			$(".carrito").removeClass("escondido");
			console.log("Aca entro");
		} else {
			$(".carrito").addClass("escondido");
		}
	};

	//Cartel succes cuando se agrega al carrito
	/*const productoAgregadoCorrectamente = () => {
		
	};*/
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
});
