$(() => {
	if (sessionStorage.getItem("carrito") != null) {
		//TRAIGO EL CARRITO GUARDADO EN EL SESSION STORAGE
		let carritoImportado = JSON.parse(sessionStorage.getItem("carrito"));

		// VARIABLES PARA MANIPULAR EL DOM
		let lista = $(".list-group");

		// MOSTRAR LA LISTA DEL CARRITO

		const mostrarCarrito = (carro) => {
			carro.forEach((prod) => {
				lista.append(`
					<li class="list-group-item d-flex justify-content-between align-items-center" > 
						<span class="nombreProducto">${prod.nombre}</span>
						<div class="contenedorContador">
							<button class='btn btn-info down_count'><i class='icon-minus'>-</i></button>
							<span class="contadorUnidades">${prod.cantidad}</span>
							<button class='btn btn-info up_count'><i class='icon-plus'>+</i></button>
						</div>
						<span class="badge badge-primary badge-pill">$${
							prod.precio * prod.cantidad
						}</span>
						<span><button id=${prod.id} class="botonEliminar">X</button></span>
					</li>`);
			});
		};
		mostrarCarrito(carritoImportado);

		//CALCULO EL VALOR TOTAL
		const calcularTotal = (carro) => {
			//variable para calcular el total
			let valorTotal = 0;
			carro.forEach((prod) => (valorTotal += prod.precio * prod.cantidad));
			return valorTotal;
		};

		const mostrarTotal = (carro) => {
			lista.append(
				`<li class="list-group-item d-flex justify-content-between align-items-center"> 
					<p class="total">Total</p>
					<span class="badge badge-primary badge-pill totalNumero">$
					${calcularTotal(carro)}</span>
				</li>`
			);
		};
		mostrarTotal(carritoImportado);

		/* **EVENTOS** */

		//VACIAR CARRITO
		$(".vaciar").on("click", function () {
			sessionStorage.clear();
			lista.remove();
		});

		//ELIMINAR UN ELEMENTO SOLO DEL CARRITO
		$(".botonEliminar").on("click", function () {
			//Elimino la parte visual
			$(this).parent().parent().remove();
			//Elimino del storage
			carritoImportado = carritoImportado.filter(
				(prod) => prod.id !== parseInt(this.id)
			);
			sessionStorage.setItem("carrito", JSON.stringify(carritoImportado));
			//Elimino el total anterior para que no queden dos totales
			$("li").last().remove();
			mostrarTotal(carritoImportado);
		});

		//BOTONES + y - CANTIDADES
		$(".up_count").on("click", function () {
			//Guardo la cantidad anterior y le sumo 1 unidad
			let cantAnterior = parseInt($(this).prev().text());
			//Cambio la cantidad en la vista
			$(this)
				.prev()
				.text(cantAnterior + 1);
			//Busco el id de este producto
			let idProducto = $(this)
				.parent()
				.parent()
				.children()
				.last()
				.children()
				.attr("id");
			//Busco el producto en el carrito del storage
			let prodAcambiar = carritoImportado.find(
				(prod) => prod.id === parseInt(idProducto)
			);
			//Guardo la posicion en el array para no desordenarlo
			let posicionEnArray = carritoImportado.indexOf(prodAcambiar);
			//Le agregao 1 en la cantidad del producto
			prodAcambiar.cantidad += 1;
			//Reemplazo el producto en el array
			carritoImportado.splice(posicionEnArray, 1, prodAcambiar);
			//Seteo en el session Storage con la nueva cantidad
			sessionStorage.setItem("carrito", JSON.stringify(carritoImportado));
			//Luego renderizar solo la nueva lista del carrito
			lista.children().remove();
			mostrarCarrito(carritoImportado);
			mostrarTotal(carritoImportado);
		});

		$(".down_count").on("click", function () {
			//Guardo la cantidad anterior y le resto 1 unidad
			let cantAnterior = parseInt($(this).next().text());
			//Evaluo que la cantidad no sea menor a 1
			if (cantAnterior > 1) {
				$(this)
					.next()
					.text(cantAnterior - 1);

				//Busco el id de este producto
				let idProducto = $(this)
					.parent()
					.parent()
					.children()
					.last()
					.children()
					.attr("id");
				//Busco el producto en el carrito del storage
				let prodAcambiar = carritoImportado.find(
					(prod) => prod.id === parseInt(idProducto)
				);

				//Guardo la posicion en el array para no desordenarlo
				let posicionEnArray = carritoImportado.indexOf(prodAcambiar);
				//Le agregao 1 en la cantidad del producto
				prodAcambiar.cantidad -= 1;
				//Reemplazo el producto en el array
				carritoImportado.splice(posicionEnArray, 1, prodAcambiar);
				//Seteo en el session Storage con la nueva cantidad
				sessionStorage.setItem("carrito", JSON.stringify(carritoImportado));
				//Luego renderizar solo la nueva lista del carrito
				//Elimino la parte visual
				lista.children().remove();
				mostrarCarrito(carritoImportado);
				mostrarTotal(carritoImportado);
			}
		});

		//CONSUMO DE API CON AJAX
		const url = "https://thesimpsonsquoteapi.glitch.me/quotes";
		$(".simpsonsButton").on("click", function () {
			$.get(url, function (data, status) {
				let datos = data[0];
				if (status === "success") {
					$(".principal").append(
						`<div class="card cartaSimpson" style="width: 18rem;">
							<img class="card-img-top" src="${datos.image}" alt="Simpson Character">
							<div class="card-body">
						  	<h5 class="card-title">${datos.character}</h5>
						  	<p class="card-text">${datos.quote}</p>
							</div>
					  	</div>`
					);
					//Ouclto la carta asi no se acumulan al apretar varias veces el boton
					$(".cartaSimpson").delay(1500).fadeOut(2000);
				} else {
					$(".principal").append(
						`<p>Lo siento Los Simpsons no estan disponibles ahora</p> <`
					);
				}
			});
		});
	} else {
		$(".principal")
			.addClass("alternativo")
			.append(
				`<p>Aún no has agregado nada a tu carrito :(</p> <a class="backHome" href="../index.html"">Vuelve al market y añade algo</a>`
			);
	}
});
