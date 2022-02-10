let catalogo = JSON.parse(localStorage.getItem("catalogo"));

// OBJETO DE PRODUCTOS
class Productos {
	constructor(id, nombre, precio, img, rubro, descripcion) {
		this.id = id;
		this.nombre = nombre;
		this.precio = precio;
		this.img = img;
		this.rubro = rubro;
		this.descripcion = descripcion;
		this.cantidad = 1;
	}
	modificarPrecio = (nuevoPrecio) => (this.precio = nuevoPrecio);
}

const nuevoProducto = () => {
	let nuevoId = catalogo.length + 1;
	let nombreProd = document.querySelector(".nuevoNombre").value;
	let precioProd = document.querySelector(".nuevoPrecio").value;
	let imgProd = document.querySelector(".nuevaImg").value;
	let rubroProd = document.querySelector(".nuevoRubro").value;
	let descripcionProd = document.querySelector(".nuevaDescripcion").value;

	let nuevoProd = new Productos(
		nuevoId,
		nombreProd,
		precioProd,
		imgProd,
		rubroProd,
		descripcionProd
	);
	catalogo.push(nuevoProd);
	localStorage.setItem("catalogo", JSON.stringify(catalogo));
};

/****Evento Submit*****/
document.querySelector(".agregarNuevoProd").addEventListener("click", (e) => {
	e.preventDefault();
	nuevoProducto();
});

console.log(catalogo);
// LLEVAR EL NEVO ARRAY AL MAIN PARA RENDERIZAR
//CARTEL AL SUBMIT DE CARGADO CORRECTAMENTE
// VER DE TRANSFORMAR TODO EL CATALOGO EN UN OBJETO O COMO HAGO ESA TRANSICION
