$(() => {
	if (sessionStorage.getItem("carrito") != null) {
		//TRAIGO EL CARRITO GUARDADO EN EL SESSION STORAGE
		let carritoImportado = JSON.parse(sessionStorage.getItem("carrito"));

		// VARIABLES PARA MANIPULAR EL DOM
		const lista = $(".list-group");
		let cantidad = 1;

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
			$(this).parent().parent().remove();
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
			console.log($(this).parent().children()[1].text());
		});

		$(".down_count").on("click", function () {
			console.log($(this).parent().children()[1]);
		});
		//CON
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
