//Traigo el carrito guardado en el session storage
let carritoImportado = JSON.parse(sessionStorage.getItem("carrito"));
const lista = document.querySelector(".list-group");
const vaciar = document.querySelector(".vaciar");

// Muestro la lista del carrito

const mostrarCarrito = (carro) => {
	let suma = 0;
	carro.forEach((prod) => {
		suma = prod.precio + suma;
		let item = document.createElement("li");
		item.setAttribute(
			"class",
			"list-group-item d-flex justify-content-between align-items-center"
		);
		item.innerHTML = `${prod.nombre} 
        <span class="badge badge-primary badge-pill">$${prod.precio}</span>`;
		lista.appendChild(item);
	});
	let total = document.createElement("li");
	total.setAttribute(
		"class",
		"list-group-item d-flex justify-content-between align-items-center"
	);
	total.innerHTML = `<b>Total</b><span class="badge badge-primary badge-pill">$${suma}</span>`;
	lista.appendChild(total);
};
mostrarCarrito(carritoImportado);

//Vaciar carrito

vaciar.addEventListener("click", () => {
	sessionStorage.clear();
	lista.innerHTML = ``;
});
